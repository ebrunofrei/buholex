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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo se permite POST" });
  }

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

    const gptRes = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 512,
      temperature: 0.4,
    });

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
  }
}
