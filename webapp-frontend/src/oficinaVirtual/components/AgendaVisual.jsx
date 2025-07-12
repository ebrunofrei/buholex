import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

// Puedes pasar expedienteId o quitarlo si quieres agenda general
export default function AgendaVisual({ expedienteId }) {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    // Si quieres agenda global (no solo por expediente), ajusta aquí tu query
    if (!expedienteId) return;
    const fetchData = async () => {
      const q = query(
        collection(db, "expedientes", expedienteId, "agenda"),
        orderBy("fecha", "asc")
      );
      const snap = await getDocs(q);
      setEventos(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, [expedienteId]);

  return (
    <div className="my-4 p-4 rounded-xl bg-gray-100">
      <h3 className="font-bold text-lg mb-2 text-black">Agenda / Alertas</h3>
      {eventos.length === 0 && <div className="text-gray-600">Sin eventos próximos.</div>}
      <ul>
        {eventos.map(ev => (
          <li key={ev.id} className="mb-2 p-2 bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <span className="font-semibold text-black">{ev.titulo || ev.evento}</span>
            <span className="text-sm text-gray-700">
              {ev.fecha && new Date(ev.fecha).toLocaleString()}<br />
              {ev.resumen && <span className="italic">{ev.resumen}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
