import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function guardarResumenEnArchivo(expedienteId, archivoId, resumen, datosExtra = {}) {
  const archivoRef = doc(db, "expedientes", expedienteId, "archivos", archivoId);
  await updateDoc(archivoRef, { resumenIA: resumen, ...datosExtra });
}
