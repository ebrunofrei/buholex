import React, { useState, useEffect } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { useLitisBot } from "@/context/LitisBotContext.jsx";
import { db } from "@/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";

export default function AgendadorPlazos({ expedienteId }) {
  const [plazos, setPlazos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { archivoAnalizado } = useLitisBot();

  useEffect(() => {
    if (expedienteId) cargarPlazos();
  }, [expedienteId]);

  const cargarPlazos = async () => {
    setCargando(true);
    const q = query(
      collection(db, "plazos"),
      where("expedienteId", "==", expedienteId)
    );
    const snap = await getDocs(q);
    const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlazos(lista);
    setCargando(false);
  };

  const registrarPlazo = async (descripcion, fechaLimite) => {
    await addDoc(collection(db, "plazos"), {
      expedienteId,
      descripcion,
      fechaLimite,
      creado: Date.now(),
      estado: "pendiente",
    });
    cargarPlazos();
  };

  const analizarYAgregar = () => {
    if (!archivoAnalizado?.contenido) return;
    const texto = archivoAnalizado.contenido;
    const regexFecha = /(?:hasta el|dentro del plazo de|en el plazo de)\s+(\d+)\s+(días?|meses?)\s*(?:\w+)?\s*(?:a partir del)?\s*(\d{1,2}\/\d{1,2}\/\d{4})?/gi;

    let match;
    while ((match = regexFecha.exec(texto)) !== null) {
      const cantidad = parseInt(match[1]);
      const unidad = match[2].startsWith("mes") ? "month" : "day";
      const desde = match[3] ? dayjs(match[3], "DD/MM/YYYY") : dayjs();
      const fechaLimite = desde.add(cantidad, unidad);

      registrarPlazo(match[0], fechaLimite.toISOString());
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-xl shadow-md">
      <h3 className="font-bold text-lg flex items-center gap-2 text-[#b03a1a]">
        <CalendarDays size={20} /> Plazos detectados
      </h3>

      <button
        onClick={analizarYAgregar}
        className="mt-2 text-sm bg-[#b03a1a] text-white px-3 py-1 rounded hover:bg-[#912f15]"
      >
        Analizar documento actual con LitisBot
      </button>

      {cargando ? (
        <p className="text-sm mt-4 text-gray-500">Cargando plazos...</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {plazos.map((p, i) => (
            <li key={i} className="border p-2 rounded bg-gray-50">
              <div className="font-semibold text-[#b03a1a]">
                {p.descripcion}
              </div>
              <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                <Clock size={14} />{" "}
                {dayjs(p.fechaLimite).format("DD MMM YYYY")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
