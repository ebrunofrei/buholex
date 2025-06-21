// src/services/firebaseCodigosService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const obtenerCodigos = async () => {
  const ref = collection(db, "codigos");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
