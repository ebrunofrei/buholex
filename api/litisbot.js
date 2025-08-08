// api/ia-litisbotchat.js
// Handler universal (Next.js API / Vercel / Express) para LitisBot con análisis de archivos.

import OpenAI from "openai";
import { guardarConsultaFirestore } from "./_utils/firestore-log.js";
import { traducirTextoGoogle, getCodigoGoogleIdioma } from "../utils/translateHelper.js";
import { analizarPDF, analizarWord, analizarImagen, analizarAudio } from "../services/analisisArchivos.js";

// ---------- OpenAI v4 ----------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------- Utils ----------
function parseBodyMaybeString(body) {
  try {
    return typeof body === "string" ? JSON.parse(body || "{}") : (body || {});
  } catch {
    return {};
  }
}

function buildSystemPrompt({ modo, materia, idioma, contextoExpediente, contextoHistorial, contextoUsuario }) {
  if (modo === "audiencia") {
    return [
      "Eres LitisBot, un abogado litigante experto en audiencias judiciales en Perú.",
      materia === "procesal"
        ? "Responde con base procesal peruana; cita artículos pertinentes y advierte riesgos procesales."
        : materia === "administrativo"
          ? "Responde con normativa administrativa peruana y ejemplos aplicados."
          : "Responde como experto en la materia consultada.",
      "Puedes dar consejos técnicos, redactar estructuras de escritos, identificar plazos y alertar sobre riesgos.",
      "Nunca inventes leyes. Si no puedes responder, indica tus límites y sugiere consultar con un abogado.",
      `Contesta SIEMPRE en el idioma del usuario: ${idioma}.`,
      contextoExpediente, contextoHistorial, contextoUsuario
    ].join(" ");
  }

  // modo "public" por defecto
  return [
    "Eres LitisBot, un asistente legal peruano.",
    "Responde de forma clara, empática y educativa a público general.",
    "No redactes demandas completas ni inventes leyes.",
    "Si no puedes ayudar, sugiere buscar asesoría personalizada.",
    `Contesta SIEMPRE en el idioma del usuario: ${idioma}.`,
    contextoExpediente, contextoHistorial, contextoUsuario
  ].join(" ");
}

function buildContextos({ expediente, historial, usuario, usuarioId, userEmail }) {
  let contextoExpediente = "";
  if (expediente && typeof expediente === "object") {
    contextoExpediente = `
[Expediente]
Número: ${expediente.numero || "-"}
Materia: ${expediente.materia || "-"}
Órgano: ${expediente.organo || expediente.entidad || "-"}
Juez: ${expediente.juez || "-"}
Especialista: ${expediente.especialista || "-"}
Partes: ${(expediente.demandantes || expediente.cliente || []).toString()} / ${(expediente.demandados || "").toString()}
`;
  }

  let contextoHistorial = "";
  if (Array.isArray(historial) && historial.length) {
    contextoHistorial =
      "[Conversación previa]\n" +
      historial
        .filter(m => m?.remitente && m?.texto)
        .map(m => `[${m.remitente}]: ${m.texto}`)
        .join("\n") +
      "\n";
  }

  let contextoUsuario = "";
  if (usuario && typeof usuario === "object") {
    contextoUsuario = `[Usuario]\nNombre: ${usuario.nombre || usuarioId}\nEmail: ${usuario.email || userEmail}\n`;
  }

  return { contextoExpediente, contextoHistorial, contextoUsuario };
}

async function detectarYAnalizarArchivo(consulta, expediente, usuario) {
  const archivos = Array.isArray(expediente?.archivos) ? expediente.archivos : [];
  if (!archivos.length) return { archivoAAnalizar: null, textoExtraido: "" };

  // ¿pide “último archivo / más reciente”?
  let archivoAAnalizar = /últim[oa]s?\s+archivo|más\s+reciente/i.test(consulta) ? archivos.at(-1) : null;

  // ¿pide por nombre? (analiza/resume "archivo.ext")
  const match =
    consulta.match(/analiza[rl]?\s+(?:el|la)?\s*archivo\s*['"]?([\w\-\. ]+)['"]?/i) ||
    consulta.match(/resume[rl]?\s+(?:el|la)?\s*archivo\s*['"]?([\w\-\. ]+)['"]?/i);

  const nombreSolicitado = match?.[1]?.trim();
  if (!archivoAAnalizar && nombreSolicitado) {
    const lower = nombreSolicitado.toLowerCase();
    archivoAAnalizar =
      archivos.find(a => a.nombre?.toLowerCase() === lower) ||
      archivos.find(a => a.nombre?.toLowerCase().includes(lower)) ||
      null;
  }

  if (!archivoAAnalizar) return { archivoAAnalizar: null, textoExtraido: "" };

  // Analiza según tipo/extension
  const tipo = archivoAAnalizar.tipo || "";
  const nombre = archivoAAnalizar.nombre || "";
  let textoExtraido = "";

  if (tipo.includes("pdf") || /\.pdf$/i.test(nombre)) {
    textoExtraido = await analizarPDF(archivoAAnalizar.url, expediente, usuario);
  } else if (tipo.includes("word") || /\.(docx?|doc)$/i.test(nombre)) {
    textoExtraido = await analizarWord(archivoAAnalizar.url, expediente, usuario);
  } else if (tipo.startsWith("image") || /\.(jpg|jpeg|png|gif)$/i.test(nombre)) {
    textoExtraido = await analizarImagen(archivoAAnalizar.url, expediente, usuario);
  } else if (tipo.startsWith("audio") || /\.(mp3|wav|m4a)$/i.test(nombre)) {
    textoExtraido = await analizarAudio(archivoAAnalizar.url, expediente, usuario);
  } else {
    textoExtraido = "El tipo de archivo no es soportado para análisis automático.";
  }

  return { archivoAAnalizar, textoExtraido: typeof textoExtraido === "string" ? textoExtraido : "" };
}

// ---------- Handler ----------
export default async function handler(req, res) {
  if (req.method && req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  const {
    consulta,
    expediente = null,
    historial = [],
    usuario = {},
    materia = "general",
    modo = "public",
    usuarioId = "anonimo",
    userEmail = "",
    idioma = "es"
  } = parseBodyMaybeString(req.body);

  if (!consulta || typeof consulta !== "string") {
    return res.status(400).json({ error: "Consulta vacía o inválida" });
  }

  let respuesta = "";
  let error = "";

  try {
    // 1) ¿Hay un archivo a analizar?
    const { archivoAAnalizar, textoExtraido } = await detectarYAnalizarArchivo(consulta, expediente, usuario);

    if (archivoAAnalizar) {
      const promptAI = `
Analiza el siguiente archivo jurídico extraído del expediente N° ${expediente?.numero || "-"}.
Nombre de archivo: ${archivoAAnalizar.nombre}

[Extracto]
${(textoExtraido || "").substring(0, 3800)}
[Fin del extracto]

Tareas:
1) Resume su contenido y clasifica el tipo (sentencia, escrito, auto, demanda, etc.).
2) Identifica riesgos procesales/materiales relevantes y oportunidades.
3) Sugiere próximas acciones concretas para el usuario, paso a paso.
4) Responde en el idioma del usuario: ${idioma}.
Pregunta del usuario: ${consulta}
      `.trim();

      const ai = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: promptAI }],
        temperature: 0.25,
        max_tokens: 1000,
      });

      respuesta = ai?.choices?.[0]?.message?.content?.trim() || "";
    } else {
      // 2) Lógica habitual (sin archivo)
      const { contextoExpediente, contextoHistorial, contextoUsuario } = buildContextos({
        expediente, historial, usuario, usuarioId, userEmail
      });

      const system = buildSystemPrompt({ modo, materia, idioma, contextoExpediente, contextoHistorial, contextoUsuario });

      const ai = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: system },
          { role: "user", content: consulta }
        ],
        temperature: modo === "audiencia" ? 0.15 : 0.28,
        max_tokens: 1024,
      });

      respuesta = ai?.choices?.[0]?.message?.content?.trim() || "";
    }

    // 3) Traducción si hace falta
    const idiomasSinTraducir = ["es", "en", "pt"];
    if (respuesta && !idiomasSinTraducir.includes(idioma)) {
      const idiomaGoogle = getCodigoGoogleIdioma(idioma);
      respuesta = await traducirTextoGoogle(respuesta, idiomaGoogle);
    }

    // 4) Logging (no bloqueante)
    try {
      await guardarConsultaFirestore({
        pregunta: consulta,
        respuesta,
        error,
        usuarioId,
        userEmail,
        materia,
        modo,
        idioma,
        expediente,
        historial,
        fecha: new Date().toISOString(),
        ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "",
      });
    } catch (e) {
      console.warn("⚠️ Logging Firestore falló:", e?.message || e);
    }

    if (respuesta) return res.status(200).json({ respuesta });
    return res.status(500).json({ error: "OpenAI no respondió." });

  } catch (e) {
    error = e?.message || "Error interno";
    console.error("❌ LitisBot error:", e);
    return res.status(500).json({ error });
  }
}
