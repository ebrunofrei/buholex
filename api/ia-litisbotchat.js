// buholex-backend/api/ia-litisbotchat.js
import {  Configuration, OpenAIApi  } from "openai";
import admin from "firebase-admin";

// Configura tu API Key de OpenAI en el entorno (.env o dashboard de tu host)
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo se permite POST" });
  }

  const { prompt, historial = [], userId } = req.body;

  if (!prompt || !userId) {
    return res.status(400).json({ error: "Faltan parámetros obligatorios" });
  }

  try {
    const messages = [
      ...historial.map(m => ({
        role: m.role,
        content: m.content
      })),
      { role: "user", content: prompt }
    ];

    const gptRes = await openai.createChatCompletion({
      model: "gpt-4o",
      messages,
      max_tokens: 512,
      temperature: 0.4,
    });

    const respuesta = gptRes.data.choices[0].message.content;

    // Guarda el mensaje y la respuesta en Firestore (opcional, recomendado)
    if (userId) {
      await admin.firestore()
        .collection("litisbot_conversaciones")
        .doc(userId)
        .collection("mensajes")
        .add({
          pregunta: prompt,
          respuesta,
          timestamp: new Date()
        });
    }

    res.status(200).json({ respuesta });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
