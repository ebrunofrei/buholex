// src/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import { obtenerArticulosBlog, eliminarArticuloBlog } from "@/services/firebaseBlogService";
import BlogPublicarCard from "@/components/BlogPublicarCard";
import { useUserAdminStatus } from "@/hooks/useUserAdminStatus";
import toast, { Toaster } from "react-hot-toast";
import BlogPublicarEditarModal from "@/components/BlogPublicarEditarModal";

export default function Blog() {
  const { isAdmin, checking } = useUserAdminStatus();
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar artículos al inicio y tras publicar
  const cargarArticulos = async () => {
    setCargando(true);
    const lista = await obtenerArticulosBlog();
    setArticulos(lista);
    setCargando(false);
  };

  useEffect(() => { cargarArticulos(); }, []);

  // Eliminar artículo (solo admin)
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este artículo?")) return;
    await eliminarArticuloBlog(id);
    toast.success("Artículo eliminado");
    cargarArticulos();
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-6">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-extrabold text-[#3e2723] text-center mb-4">Blog Jurídico de BúhoLex</h1>

      {/* Solo para admin */}
      {!checking && isAdmin && (
        <BlogPublicarCard onPublicado={cargarArticulos} />
      )}

      <div className="mt-8 flex flex-col gap-6 items-center">
        {cargando && <div className="text-[#7a2518] text-lg">Cargando artículos...</div>}
        {!cargando && articulos.length === 0 && (
          <div className="text-[#3e2723] text-lg">No hay artículos publicados aún.</div>
        )}
        {!cargando && articulos.map(art => (
          <div key={art.id} className="w-full max-w-xl bg-white border-2 border-[#7a2518] rounded-xl shadow p-6 flex flex-col gap-2 relative">
            {art.urlPortada && (
              <img src={art.urlPortada} alt="portada" className="w-full max-h-52 object-cover rounded mb-2" />
            )}
            <h2 className="text-xl font-bold text-[#7a2518]">{art.titulo}</h2>
            <div className="text-[#3e2723] font-semibold mb-1">{art.autor} · <span className="text-xs">{art.categoria}</span></div>
            <div className="text-gray-800 mb-2 italic">{art.resumen}</div>
            <div className="text-[#222] whitespace-pre-line mb-2" style={{ fontSize: "1.06em" }}>{art.contenido.slice(0, 300)}{art.contenido.length > 300 ? "..." : ""}</div>
            {art.tags && art.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {art.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-[#7a2518] text-white text-xs">{tag}</span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-[#3e2723]">{new Date(art.fecha).toLocaleDateString()}</span>
              {isAdmin && (
                <button
                  onClick={() => handleEliminar(art.id)}
                  className="px-3 py-1 rounded bg-red-700 text-white text-xs font-bold hover:bg-red-900 transition"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
