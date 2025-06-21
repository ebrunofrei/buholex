// src/services/firebaseConsultasService.js

import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig"; // asegúrate que la ruta es correcta

const db = getFirestore(app);

/**
 * Guarda una consulta legal en la colección "consultas".
 * @param {Object} datos - Objeto con los datos de la consulta.
 * @returns {Promise<string>} - El ID del documento creado.
 */
export async function guardarConsulta(datos) {
  try {
    const docRef = await addDoc(collection(db, "consultas"), datos);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar la consulta:", error);
    throw error;
  }
}

export default guardarConsulta;
