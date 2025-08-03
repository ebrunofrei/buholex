import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Guardar/actualizar perfil
export async function actualizarPerfilUsuario(usuarioId, campos) {
  const ref = doc(db, "usuarios_litisbot", usuarioId);
  await setDoc(ref, campos, { merge: true });
}

// Obtener perfil completo
export async function obtenerPerfilUsuario(usuarioId) {
  const ref = doc(db, "usuarios_litisbot", usuarioId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// Añadir anécdota, frase o momento favorito
export async function agregarRecuerdo(usuarioId, campo, texto) {
  const ref = doc(db, "usuarios_litisbot", usuarioId);
  await updateDoc(ref, {
    [campo]: arrayUnion(texto)
  });
}
