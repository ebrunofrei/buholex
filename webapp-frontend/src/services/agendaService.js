// src/services/agendaService.js
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function crearEventoAgenda({ usuarioId, descripcion, fecha }) {
  try {
    await addDoc(collection(db, "agenda_eventos"), {
      usuarioId,
      descripcion,
      fecha,
      creadoEn: serverTimestamp()
    });
  } catch (e) {
    console.error("Error creando evento agenda:", e);
  }
}
