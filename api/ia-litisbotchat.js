// backend-vercel/api/ia-litisbot.js
import OpenAI from "openai";
import { getApps, initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// ---- OpenAI (SDK v4)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---- Firebase Admin (evitar doble init en serverless)
if (!getApps().length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    initializeApp({ credential: cert(sa) });
  } else {
    // fallback si usas ADC (no recomendado en Vercel)
    initializeApp({ credential: applicationDefault() });
  }
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Solo se permite POST" });
  }

  try {
    // Vercel a veces entrega body como string; soportamos ambos casos.
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { prompt, historial = [], userId = "invitado" } = body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Falta el parámetro 'prompt'." });
    }

    // Normaliza historial a formato Chat Completions
    const messages = [
      ...historial
        .filter(m => m?.role && m?.content)
        .map(m => ({ role: m.role, content: m.content })),
      { role: "user", content: prompt },
    ];

    // Llamada a OpenAI
    const ai = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.4,
      max_tokens: 800,
    });

    const respuesta = ai?.choices?.[0]?.message?.content?.trim() ?? "Sin respuesta del modelo.";

    // Logging en Firestore (no bloqueante)
    try {
      await db
        .collection("litisbot_conversaciones")
        .doc(userId)
        .collection("mensajes")
        .add({
          pregunta: prompt,
          respuesta,
          historial,
          model: ai?.model || "gpt-4o",
          createdAt: FieldValue.serverTimestamp(),
        });
    } catch (e) {
      console.warn("⚠️ No se pudo guardar en Firestore:", e?.message || e);
    }

    return res.status(200).json({ respuesta });
  } catch (e) {
    console.error("❌ Error en ia-litisbot:", e?.message || e);
    return res.status(500).json({ error: e?.message || "Error interno" });
  }
}
