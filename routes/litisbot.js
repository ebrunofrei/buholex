import { Router } from "express";
<<<<<<< HEAD
import { callOpenAI } from "../services/openaiService.js";
import { obtenerHistorialUsuario, guardarHistorial } from "../services/memoryService.js";
import { buscarFuentesLegales } from "../services/fuenteLegalService.js";
=======
import { callOpenAI } from "../../buholex-backend-nuevo/services/openaiService.js";
import axios from "axios";
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))

const router = Router();

router.post("/", async (req, res) => {
  const { consulta, usuarioId, expedienteId, modo, pro, fuentesOficiales, fuentesEncontradas } = req.body;

  // --- 1. Memoria: trae historial de usuario ---
  let historial = [];
  try {
<<<<<<< HEAD
    historial = await obtenerHistorialUsuario(usuarioId, expedienteId);
  } catch (error) {
    console.warn("No se pudo obtener historial:", error.message);
  }
=======
    const resp = await axios.get("http://localhost:3001/api/litisbot-memory", {
      params: { usuarioId, expedienteId }
    });
    historial = resp.data.historial || [];
  } catch {}
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))

  // --- 2. Fuentes legales ---
  let fuentes = fuentesEncontradas;
  if (!fuentes || !fuentes.length) {
<<<<<<< HEAD
    try {
      fuentes = await buscarFuentesLegales(consulta);
    } catch (error) {
      console.warn("No se pudieron buscar fuentes legales:", error.message);
      fuentes = [];
    }
=======
    // Busca si no te enviaron fuentes
    const resp = await axios.post("http://localhost:3001/api/buscar-fuente-legal", {
      consulta
    });
    fuentes = resp.data.resultado;
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
  }

  // --- 3. Construye prompt para IA ---
  let messages = [
    {
      role: "system",
      content: modo === "legal"
        ? "Eres LitisBot A1, asistente legal peruano especializado. Solo responde con fundamento jurídico real, cita doctrina, jurisprudencia y normas PERUANAS. Da links a las fuentes cuando existan. Nunca inventes normas o jurisprudencia. Si no sabes, responde con humildad."
        : "Eres LitisBot, un asistente legal general que ayuda con modelos, dudas rápidas y consejos prácticos. No inventes leyes, responde solo con temas legales generales."
    }
  ];

  // Memoria/historial breve (máximo 2 mensajes)
  historial.slice(0, 2).forEach(msg => {
    messages.push({ role: "user", content: msg.pregunta });
    messages.push({ role: "assistant", content: msg.respuesta });
  });

  // Incluye fuentes encontradas en el prompt
  if (fuentes && fuentes.length) {
    messages.push({
      role: "system",
      content: "Fuentes oficiales encontradas para la consulta:\n" +
        fuentes.map(f => `- ${f.titulo}: ${f.url} (${f.fuente})`).join("\n")
    });
  }

  // Consulta del usuario
  messages.push({ role: "user", content: consulta });

  // --- 4. Llama a OpenAI (o tu IA) ---
  const respuesta = await callOpenAI(messages);

  // --- 5. Guarda en memoria/historial ---
<<<<<<< HEAD
  try {
    await guardarHistorial(usuarioId, expedienteId, consulta, respuesta);
  } catch (error) {
    console.warn("No se pudo guardar historial:", error.message);
  }
=======
  await axios.post("http://localhost:3001/api/litisbot-memory", {
    usuarioId, expedienteId, pregunta: consulta, respuesta
  });
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))

  res.json({ respuesta });
});

export default router;
