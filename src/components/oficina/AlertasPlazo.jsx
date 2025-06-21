import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../services/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export default function AlertasPlazo() {
  const [usuario] = useAuthState(auth);
  const [evento, setEvento] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [plazos, setPlazos] = useState([]);

  const registrarPlazo = async () => {
    if (!evento || !fechaLimite || !usuario) return alert("Completa todos los campos");

    await addDoc(collection(db, "alertasPlazo"), {
      uid: usuario.uid,
      evento,
      fechaLimite: new Date(fechaLimite),
      notificado: false,
      creado: Timestamp.now(),
    });

    setEvento("");
    setFechaLimite("");
    obtenerPlazos();
  };

  const obtenerPlazos = async () => {
    if (!usuario) return;
    const q = query(collection(db, "alertasPlazo"), where("uid", "==", usuario.uid));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPlazos(docs);
  };

  const verificarVencimientos = () => {
    const hoy = new Date();
    const mañana = new Date();
    mañana.setDate(hoy.getDate() + 1);

    plazos.forEach((p) => {
      const fechaEvento = new Date(p.fechaLimite.seconds * 1000);

      if (
        fechaEvento.toDateString() === mañana.toDateString() &&
        !p.notificado
      ) {
        alert(`⚠️ Alerta: Mañana vence el plazo para: ${p.evento}`);
        if ("vibrate" in navigator) navigator.vibrate(1000); // Vibración en móviles
        activarLitisBot(p.evento);
      }
    });
  };

  const activarLitisBot = (mensaje) => {
    // Simulación básica: En versión final, invoca a LitisBot visualmente o con voz
    console.log("LitisBot activado → ", mensaje);
  };

  useEffect(() => {
    obtenerPlazos();
  }, [usuario]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      verificarVencimientos();
    }, 60000); // Verifica cada 60 segundos

    return () => clearInterval(intervalo);
  }, [plazos]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📆 Alertas de Plazo</h2>

      {/* Formulario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Evento o actividad legal"
          value={evento}
          onChange={(e) => setEvento(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={registrarPlazo}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Registrar alerta
        </button>
      </div>

      {/* Lista */}
      <ul className="divide-y">
        {plazos.length === 0 ? (
          <p className="text-gray-500">Sin plazos registrados.</p>
        ) : (
          plazos.map((p) => (
            <li key={p.id} className="py-3">
              <p className="font-semibold text-blue-700">{p.evento}</p>
              <p className="text-sm text-gray-500">
                Vence: {new Date(p.fechaLimite.seconds * 1000).toLocaleDateString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
