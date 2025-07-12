import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Blog() {
  const [articulos, setArticulos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [searchParams] = useSearchParams();
  const categoriaInicial = searchParams.get("categoria") || "Todas";
  const [categoriaFiltro, setCategoriaFiltro] = useState(categoriaInicial);

  useEffect(() => {
    const obtenerArticulos = async () => {
      const ref = query(collection(db, "articulosBlog"), orderBy("fecha", "desc"));
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha?.toDate()?.toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) || "Sin fecha"
      }));
      setArticulos(data);
    };

    obtenerArticulos();
  }, []);

  const articulosFiltrados = articulos.filter((a) => {
    const coincideCategoria = categoriaFiltro === "Todas" || a.categoria === categoriaFiltro;
    const coincideBusqueda =
      a.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.contenido.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-24 lg:px-48">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Blog Jurídico de BúhoLex
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Buscar por palabra clave..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full md:w-2/3 p-2 border border-gray-300 rounded"
        />
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Opinión Jurídica">Opinión Jurídica</option>
          <option value="Actualidad Legal">Actualidad Legal</option>
          <option value="Casos y Fallos">Casos y Fallos</option>
          <option value="Constitucional">Constitucional</option>
        </select>
      </div>

      {articulosFiltrados.length === 0 ? (
        <p className="text-gray-600 text-center">No se encontraron artículos con esos criterios.</p>
      ) : (
        articulosFiltrados.map((articulo) => (
          <article key={articulo.id} className="bg-gray-100 shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{articulo.titulo}</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Publicado en:</strong> {articulo.categoria} · {articulo.fecha}
            </p>
            <p className="text-sm text-gray-600 mb-4 italic">
              <strong>Por:</strong> {articulo.autor}
            </p>
            <p className="text-gray-800 mb-4">
              {articulo.contenido.length > 300
                ? articulo.contenido.substring(0, 300) + "..."
                : articulo.contenido}
            </p>
            <Link
              to={`/blog/${articulo.id}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              Leer más →
            </Link>
          </article>
        ))
      )}
    </div>
  );
}
