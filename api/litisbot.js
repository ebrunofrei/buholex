<<<<<<< HEAD
// src/routes/ia-litisbotchat.js  (o el path de tu handler)
import { guardarConsultaFirestore } from "./_utils/firestore-log.js";
import { traducirTextoGoogle, getCodigoGoogleIdioma } from "../utils/translateHelper.js";
import { analizarPDF, analizarWord, analizarImagen, analizarAudio } from "../services/analisisArchivos.js";
import { consultarIA } from "../services/miServicioIA.js";

// Compatible para Express, Next.js API o middleware
export default async function handler(req, res) {
  if (req.method && req.method !== "POST")
=======
import { guardarConsultaFirestore } from "./_utils/firestore-log.js";
import { traducirTextoGoogle, getCodigoGoogleIdioma } from "../utils/translateHelper.js";

// Importa tus funciones reales de análisis:
import { analizarPDF, analizarWord, analizarImagen, analizarAudio } from "../services/analisisArchivos.js";
import { consultarIA } from "../services/miServicioIA.js"; // (debe ser tu función real para consulta OpenAI)

export default async function handler(req, res) {
  if (req.method !== "POST")
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    return res.status(405).json({ error: "Método no permitido" });

  let {
    consulta,
    expediente = null,
    historial = [],
    usuario = {},
    materia = "general",
    modo = "public",
    usuarioId = "anonimo",
    userEmail = "",
    idioma = "es"
  } = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

<<<<<<< HEAD
  if (!consulta || typeof consulta !== "string") {
    return res.status(400).json({ error: "Consulta vacía o inválida" });
  }

  // 1. Análisis de Archivos si corresponde
=======
  if (!consulta || typeof consulta !== "string")
    return res.status(400).json({ error: "Consulta vacía o inválida" });

  // ============ DETECCIÓN INTELIGENTE DE ANÁLISIS DE ARCHIVOS ============
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
  let respuesta = "";
  let error = "";

  try {
<<<<<<< HEAD
    // Detectar archivo a analizar
    let archivos = expediente?.archivos || [];
    let archivoAAnalizar = null;

    let match = consulta.match(/analiza[rl]?\s+(?:el|la)?\s*archivo\s*['"]?([\w\-\. ]+)['"]?/i)
              || consulta.match(/resume[rl]?\s+(?:el|la)?\s*archivo\s*['"]?([\w\-\. ]+)['"]?/i);

    let nombreSolicitado = match?.[1]?.trim();

    // ¿Último archivo?
    if (/últim[oa]s? archivo|más reciente/i.test(consulta) && archivos.length) {
      archivoAAnalizar = archivos.at(-1);
    }

    // ¿Busca por nombre?
=======
    // 1. ¿El usuario solicita analizar/resumir un archivo?
    let archivos = (expediente && expediente.archivos) ? expediente.archivos : [];
    let archivoAAnalizar = null;

    // Detección por nombre de archivo
    let match = consulta.match(/analiza[rl]?\s+(?:el|la)?\s*archivo\s*['"]?([\w\-\. ]+)['"]?/i)
             || consulta.match(/resume[rl]?\s+(?:el|la)?\s*archivo\s*['"]?([\w\-\. ]+)['"]?/i);

    let nombreSolicitado = match?.[1]?.trim();

    // Detección por "último archivo", "más reciente", etc.
    if (/últim[oa]s? archivo|más reciente/i.test(consulta) && archivos.length) {
      archivoAAnalizar = archivos.slice(-1)[0];
    }

    // Búsqueda por nombre de archivo
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    if (nombreSolicitado && archivos.length) {
      archivoAAnalizar =
        archivos.find(a => a.nombre.toLowerCase() === nombreSolicitado.toLowerCase()) ||
        archivos.find(a => a.nombre.toLowerCase().includes(nombreSolicitado.toLowerCase()));
    }

<<<<<<< HEAD
    // Si hay archivo a analizar...
=======
    // 2. Si hay archivo, analizarlo y responder
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    if (archivoAAnalizar) {
      let textoExtraido = "";
      let tipo = archivoAAnalizar.tipo || "";
      let nombre = archivoAAnalizar.nombre;

      if (tipo.includes("pdf") || nombre.match(/\.pdf$/i)) {
        textoExtraido = await analizarPDF(archivoAAnalizar.url, expediente, usuario);
      } else if (tipo.includes("word") || nombre.match(/\.(docx?|doc)$/i)) {
        textoExtraido = await analizarWord(archivoAAnalizar.url, expediente, usuario);
      } else if (tipo.startsWith("image") || nombre.match(/\.(jpg|jpeg|png|gif)$/i)) {
        textoExtraido = await analizarImagen(archivoAAnalizar.url, expediente, usuario);
      } else if (tipo.startsWith("audio") || nombre.match(/\.(mp3|wav|m4a)$/i)) {
        textoExtraido = await analizarAudio(archivoAAnalizar.url, expediente, usuario);
      } else {
        textoExtraido = "El tipo de archivo no es soportado para análisis automático.";
      }

<<<<<<< HEAD
      // Llama a IA con el extracto
=======
      // Llama a tu IA con el texto extraído del archivo
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
      const promptAI = `
        Analiza el siguiente archivo jurídico extraído del expediente N° ${expediente.numero || "-"}:
        Nombre: ${archivoAAnalizar.nombre}
        [Extracto del archivo]
        ${typeof textoExtraido === "string" ? textoExtraido.substring(0, 3800) : ""}
        [Fin del extracto]
<<<<<<< HEAD
        Resume su contenido, identifica tipo (sentencia, escrito, auto, demanda, etc.),
=======
        Resume su contenido, identifica tipo (sentencia, escrito, auto, demanda, etc.), 
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
        señala riesgos procesales y sugiere próximas acciones para el usuario.
        Usuario pregunta: ${consulta}
      `;
      respuesta = await consultarIA(promptAI);

<<<<<<< HEAD
      // Traducción automática si procede
=======
      // Traducción automática solo si es necesario
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
      const idiomasSinTraducir = ["es", "en", "pt"];
      if (respuesta && !idiomasSinTraducir.includes(idioma)) {
        const idiomaGoogle = getCodigoGoogleIdioma(idioma);
        respuesta = await traducirTextoGoogle(respuesta, idiomaGoogle);
      }

<<<<<<< HEAD
      // Logging a Firestore
=======
      // Logging
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
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
        archivo: archivoAAnalizar,
        fecha: new Date().toISOString(),
        ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "",
      });

      return res.status(200).json({ respuesta });
    }

<<<<<<< HEAD
    // 2. Lógica habitual de IA sin archivo
=======
    // 3. Si no se trata de análisis de archivo, sigue la lógica habitual ↓↓↓

    // ======= GENERA CONTEXTO AVANZADO HABITUAL =======
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
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
      contextoHistorial = "[Conversación previa]\n" + historial.map(
        m => `[${m.remitente}]: ${m.texto}`
      ).join("\n") + "\n";
    }

    let contextoUsuario = "";
    if (usuario && typeof usuario === "object") {
      contextoUsuario = `[Usuario]\nNombre: ${usuario.nombre || usuarioId}\nEmail: ${usuario.email || userEmail}\n`;
    }

<<<<<<< HEAD
    // Prompt según modo
=======
    // ======= CONSTRUYE EL PROMPT SEGÚN CONTEXTO =======
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    const prompts = {
      public: {
        system: [
          "Eres LitisBot, un asistente legal peruano.",
<<<<<<< HEAD
          "Responde de forma clara, empática y educativa a público general.",
          "No redactes demandas completas ni inventes leyes.",
          "Si no puedes ayudar, sugiere buscar asesoría personalizada.",
=======
          "Responde a usuarios del público general de manera clara, empática y educativa.",
          "No brindes consejos técnicos complejos ni redactes demandas completas.",
          "Informa sobre derechos, procedimientos básicos y anima a consultar un abogado humano.",
          "Nunca inventes leyes. Si no puedes responder, sugiere buscar asesoría personalizada.",
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
          `Contesta SIEMPRE en el idioma del usuario: ${idioma}.`,
          contextoExpediente,
          contextoHistorial,
          contextoUsuario
        ].join(" ")
      },
      audiencia: {
        system: [
          "Eres LitisBot, un abogado litigante experto en audiencias judiciales en Perú.",
          materia === "procesal"
<<<<<<< HEAD
            ? "Responde con base procesal peruana, artículos de Códigos Procesales y advertencias."
            : materia === "administrativo"
              ? "Responde con normativa administrativa peruana y ejemplos aplicados."
              : "Responde como experto en la materia consultada.",
          "Puedes dar consejos técnicos y alertar riesgos jurídicos.",
          "No inventes leyes. Si no puedes responder, indica límites y sugiere consultar abogado.",
=======
            ? "Responde con base procesal: artículos del Código Procesal Civil o Penal, ejemplos prácticos y advertencias procesales."
            : materia === "administrativo"
              ? "Responde con normativa administrativa peruana y ejemplos aplicados a procedimientos administrativos."
              : "Responde como experto en la materia consultada, cita artículos y fundamentos doctrinarios cuando sea relevante.",
          "Puedes dar consejos técnicos, redactar escritos, identificar plazos y alertar sobre riesgos jurídicos.",
          "No inventes leyes. Si no puedes responder, indica límites de la IA y sugiere consultar un abogado.",
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
          `Contesta SIEMPRE en el idioma del usuario: ${idioma}.`,
          contextoExpediente,
          contextoHistorial,
          contextoUsuario
        ].join(" ")
      }
    };

    const prompt = prompts[modo] || prompts["public"];

<<<<<<< HEAD
    // Llamada directa a OpenAI si no hay archivo
    const apiKey = process.env.OPENAI_KEY || process.env.OPENAI_API_KEY;
=======
    // ======= LLAMADA A OPENAI =======
    const apiKey = process.env.OPENAI_KEY;
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    let respuestaNormal = "";

    try {
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
<<<<<<< HEAD
          model: "gpt-3.5-turbo", // O usa "gpt-4o" si tienes acceso
=======
          model: "gpt-3.5-turbo", // o "gpt-4o"
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
          messages: [
            { role: "system", content: prompt.system },
            { role: "user", content: consulta }
          ],
          max_tokens: 1024,
          temperature: modo === "audiencia" ? 0.15 : 0.28,
        }),
      });
      const data = await openaiRes.json();
      respuestaNormal = data.choices?.[0]?.message?.content?.trim() || "";
      if (!respuestaNormal) throw new Error("OpenAI no respondió");
    } catch (err) {
      error = err.message;
      respuestaNormal = "";
    }

<<<<<<< HEAD
    // Traducción automática si procede
=======
    // ======= TRADUCCIÓN AUTOMÁTICA =======
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    const idiomasSinTraducir = ["es", "en", "pt"];
    if (respuestaNormal && !idiomasSinTraducir.includes(idioma)) {
      const idiomaGoogle = getCodigoGoogleIdioma(idioma);
      respuestaNormal = await traducirTextoGoogle(respuestaNormal, idiomaGoogle);
    }

<<<<<<< HEAD
    // Logging a Firestore
=======
    // ======= LOGGING =======
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    await guardarConsultaFirestore({
      pregunta: consulta,
      respuesta: respuestaNormal,
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

    if (respuestaNormal)
      return res.status(200).json({ respuesta: respuestaNormal });

    res.status(500).json({ error: error || "Error de LitisBot IA." });

  } catch (err) {
    res.status(500).json({ error: err.message || "Error de LitisBot IA." });
  }
}
