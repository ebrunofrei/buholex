// src/pages/Codigos.jsx
import React, { useEffect, useState } from "react";
import { obtenerCodigos } from "../services/firebaseCodigosService";

export default function Codigos() {
  const [codigos, setCodigos] = useState([]);

  useEffect(() => {
    async function fetchCodigos() {
      const datos = await obtenerCodigos();
      setCodigos(datos);
    }
    fetchCodigos();
  }, []);

  const coloresEstado = {
    vigente: "text-green-600",
    derogado: "text-red-500",
    pendiente: "text-yellow-500",
    "vacatio legis": "text-blue-600"
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-24 lg:px-48">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Códigos Legales del Perú
      </h1>

      <div className="space-y-6">
        {codigos.map((codigo, i) => (
          <div key={i} className="border p-4 rounded shadow-sm bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-blue-700">{codigo.titulo}</h2>
              <span className={`text-sm font-bold ${coloresEstado[codigo.estadoNorma] || "text-gray-500"}`}>
                {codigo.estadoNorma?.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{codigo.descripcion}</p>
            <a
              href={codigo.enlaceLectura}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Ver código completo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
