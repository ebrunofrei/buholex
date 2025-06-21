// src/pages/Biblioteca.jsx
import React, { useEffect, useState } from "react";
import { obtenerLibros } from "../services/firebaseLibrosService";

export default function Biblioteca() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    async function fetchLibros() {
      const datos = await obtenerLibros();
      setLibros(datos);
    }
    fetchLibros();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-24 lg:px-48">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Biblioteca Jurídica
      </h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {libros.map((libro, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">{libro.titulo}</h2>
            <p className="text-sm text-gray-500 mb-1">{libro.autor}</p>
            <p className="text-sm text-gray-600 mb-2">{libro.descripcion}</p>
            <a
              href={libro.enlaceLectura}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              Visualizar
            </a>
            {libro.disponibleParaCompra && (
              <button
                className="mt-2 block w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
                onClick={() => alert('Funcionalidad de compra aún en desarrollo.')}
              >
                Comprar PDF
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
