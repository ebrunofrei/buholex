// src/services/firebaseNoticiasService.js
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const obtenerNoticias = async () => {
  const ref = query(collection(db, "noticias"), orderBy("fecha", "desc"));
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

