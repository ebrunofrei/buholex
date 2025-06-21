import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../services/firebaseConfig";

export default function Notificaciones() {
  const [usuario] = useAuthState(auth);
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarSoloNoLeidas, setMostrarSoloNoLeidas] = useState(true);

  const obtenerNotificaciones = async () => {
    if (!usuario) return;

    const q = query(
      collection(db, "notificaciones"),
      where("uid", "==", usuario.uid),
      orderBy("fecha", "desc")
    );

    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotificaciones(docs);
  };

  const marcarComoLeida = async (id) => {
    const ref = doc(db, "notificaciones", id);
    await updateDoc(ref, { leido: true });
    obtenerNotificaciones();
  };

  useEffect(() => {
    obtenerNotificaciones();
  }, [usuario]);

  const filtradas = mostrarSoloNoLeidas
    ? notificaciones.filter((n) => !n.leido)
    : notificaciones;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🔔 Notificaciones</h2>
        <button
          onClick={() => setMostrarSoloNoLeidas(!mostrarSoloNoLeidas)}
          className="text-sm text-blue-600 hover:underline"
        >
          {mostrarSoloNoLeidas ? "Ver todas" : "Ver solo no leídas"}
        </button>
      </div>

      {filtradas.length === 0 ? (
        <p className="text-gray-500">No tienes notificaciones.</p>
      ) : (
        <ul className="divide-y">
          {filtradas.map((n) => (
            <li
              key={n.id}
              className={`py-4 px-2 rounded-md ${
                n.leido ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">{n.titulo}</p>
                  <p className="text-sm text-gray-600">{n.mensaje}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(n.fecha.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                {!n.leido && (
                  <button
                    onClick={() => marcarComoLeida(n.id)}
                    className="text-xs text-blue-700 underline ml-4"
                  >
                    Marcar como leída
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
