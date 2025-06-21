import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Guarda una consulta realizada en el chat de LitisBot.
 * @param {string} pregunta - Texto ingresado por el usuario.
 * @param {string} respuesta - Respuesta generada por LitisBot.
 */
export const guardarConsulta = async (pregunta, respuesta) => {
  try {
    const ref = collection(db, "consultas");
    await addDoc(ref, {
      pregunta,
      respuesta,
      fecha: serverTimestamp()
    });
  } catch (error) {
    console.error("Error al guardar la consulta:", error);
  }
};
