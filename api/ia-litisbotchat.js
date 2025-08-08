<<<<<<< HEAD
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Cargar credenciales de Firebase si aún no están inicializadas
if (!admin.apps.length) {
  const serviceAccount = require("../firebase-service-account.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

=======
// buholex-backend-nuevo/api/ia-litisbotchat.js
import OpenAI from "openai";
import admin from "firebase-admin";

// ---- OpenAI (SDK v4)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // en Vercel: Settings → Environment Variables
});

// ---- Firebase Admin (evitar doble init en serverless)
if (!admin.apps.length) {
  // Opción A: desde variable de entorno (recomendado en Vercel)
  // Define FIREBASE_SERVICE_ACCOUNT_JSON con el JSON del service account
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(sa),
    });
  } else {
    // Opción B: si usas ADC o ya está configurado en el entorno
    admin.initializeApp();
  }
}

>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo se permite POST" });
  }

<<<<<<< HEAD
  const { prompt, historial = [], userId } = req.body;

  if (!userId) {
    console.warn("⚠️ Solicitud en modo invitado sin userId");
  }

  try {
    const messages = [
      ...historial.map(m => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: prompt },
    ];

=======
  try {
    const { prompt, historial = [], userId = "invitado" } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Falta el parámetro 'prompt'." });
    }

    // Normaliza historial a formato Chat Completions
    const messages = [
      ...historial
        .filter(m => m?.role && m?.content)
        .map(m => ({ role: m.role, content: m.content })),
      { role: "user", content: prompt },
    ];

    // Llamada a OpenAI (Chat Completions v4)
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
    const gptRes = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 512,
      temperature: 0.4,
    });

<<<<<<< HEAD
    const respuesta = gptRes.choices[0].message.content;

    // Guarda en Firestore
    await firestore
      .collection("litisbot_conversaciones")
      .doc(userId)
      .collection("mensajes")
      .add({
        pregunta: prompt,
        respuesta,
        timestamp: new Date(),
      });

    res.status(200).json({ respuesta });
  } catch (e) {
    console.error("❌ Error OpenAI:", e.message);
    res.status(500).json({ error: e.message });
=======
    const respuesta =
      gptRes?.choices?.[0]?.message?.content?.trim() ||
      "⚠️ No se recibió respuesta del modelo.";

    // Guarda en Firestore (opcional)
    try {
      await admin
        .firestore()
        .collection("litisbot_conversaciones")
        .doc(userId || "invitado")
        .collection("mensajes")
        .add({
          pregunta: prompt,
          respuesta,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch (e) {
      // No bloquees la respuesta por un error de logging
      console.warn("Firestore log error:", e?.message || e);
    }

    return res.status(200).json({ respuesta });
  } catch (e) {
    console.error("IA error:", e?.message || e);
    return res.status(500).json({ error: e?.message || "Error interno" });
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
  }
}
