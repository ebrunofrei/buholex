// src/pages/Jurisprudencia.jsx
import React, { useEffect, useState } from "react";
import { obtenerJurisprudencia } from "../services/firebaseJurisprudenciaService";

export default function Jurisprudencia() {
  const [sentencias, setSentencias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const datos = await obtenerJurisprudencia();
      setSentencias(datos);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-24 lg:px-48">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Jurisprudencia Destacada
      </h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sentencias.map((s, i) => (
          <div key={i} className="border rounded shadow-sm p-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-blue-700">{s.titulo}</h2>
            <p className="text-sm text-gray-600 mb-2">{s.resumen}</p>
            <p className="text-xs text-gray-400 mb-2 italic">Materia: {s.materia}</p>
            <a
              href={s.enlacePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              Ver sentencia completa
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
