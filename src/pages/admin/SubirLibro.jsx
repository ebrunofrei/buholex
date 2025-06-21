// src/pages/SubirLibro.jsx
import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../services/firebaseConfig";

const db = getFirestore(app);

export default function SubirLibro() {
  const [libro, setLibro] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    enlaceLectura: "",
    disponibleParaCompra: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLibro({
      ...libro,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "biblioteca"), libro);
      alert("Libro subido correctamente.");
      setLibro({ titulo: "", autor: "", descripcion: "", enlaceLectura: "", disponibleParaCompra: false });
    } catch (error) {
      alert("Error al subir libro: " + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Subir nuevo libro a la Biblioteca</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titulo"
          value={libro.titulo}
          onChange={handleChange}
          placeholder="Título del libro"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="autor"
          value={libro.autor}
          onChange={handleChange}
          placeholder="Autor"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="descripcion"
          value={libro.descripcion}
          onChange={handleChange}
          placeholder="Descripción breve"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="url"
          name="enlaceLectura"
          value={libro.enlaceLectura}
          onChange={handleChange}
          placeholder="Enlace de Google Drive para visualización"
          className="w-full border p-2 rounded"
          required
        />
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="disponibleParaCompra"
            checked={libro.disponibleParaCompra}
            onChange={handleChange}
          />
          Disponible para compra
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Subir libro
        </button>
      </form>
    </div>
  );
}
