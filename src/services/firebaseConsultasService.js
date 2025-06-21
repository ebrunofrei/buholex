// src/services/firebaseConsultasService.js
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Asegúrate que ./firebaseConfig.js exporta db

/**
 * Guarda la consulta en Firestore.
 * @param {string} pregunta 
 * @param {string} respuesta 
 */
export default async function guardarConsulta(pregunta, respuesta) {
  try {
    const consultasRef = collection(db, "consultas");
    await addDoc(consultasRef, {
      pregunta,
      respuesta,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error guardando la consulta:", error);
  }
}
