// src/pages/Noticias.jsx
import React, { useEffect, useState } from "react";
import { obtenerNoticias } from "../services/firebaseNoticiasService";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function fetchNoticias() {
      const datos = await obtenerNoticias();
      setNoticias(datos);
    }
    fetchNoticias();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-24 lg:px-48">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Noticias Jurídicas
      </h1>

      <div className="space-y-8">
        {noticias.map((n, i) => (
          <div key={i} className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{n.titulo}</h2>
            <p className="text-sm text-gray-600 mb-2">{n.resumen}</p>
            <p className="text-xs text-gray-400 mb-1 italic">{new Date(n.fecha?.toDate()).toLocaleDateString()}</p>
            <a
              href={n.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Leer más
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
