import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig"; // Ajusta la ruta

export default function JurisprudenciaVisor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jurisprudencias, setJurisprudencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJurisprudencias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jurisprudencia"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJurisprudencias(data);
      } catch (error) {
        console.error("Error cargando jurisprudencia:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJurisprudencias();
  }, []);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto py-20 text-center">
        <div className="text-lg text-gray-500">Cargando jurisprudencia...</div>
      </section>
    );
  }

  const idx = jurisprudencias.findIndex(j => String(j.id) === String(id));
  const actual = jurisprudencias[idx];

  if (!actual) {
    return (
      <section className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">404 - Jurisprudencia no encontrada</h1>
        <button onClick={() => navigate("/jurisprudencia")} className="bg-blue-600 text-white px-4 py-2 rounded">Volver</button>
      </section>
    );
  }

  const goPrev = () => idx > 0 && navigate(`/jurisprudencia/${jurisprudencias[idx - 1].id}`);
  const goNext = () => idx < jurisprudencias.length - 1 && navigate(`/jurisprudencia/${jurisprudencias[idx + 1].id}`);

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-5 flex justify-between items-center">
        <button onClick={() => navigate("/jurisprudencia")} className="text-blue-700 underline">← Volver a listado</button>
        <div className="flex gap-4">
          <button disabled={idx === 0} onClick={goPrev} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Anterior</button>
          <button disabled={idx === jurisprudencias.length - 1} onClick={goNext} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Siguiente</button>
        </div>
      </div>
      <div className="mb-4">
        <div className="font-bold text-lg">{actual.materia} / {actual.submateria}</div>
        <div className="text-gray-600 mb-2">Recurso: {actual.titulo}</div>
      </div>
      <div className="w-full h-[70vh] mb-4 border rounded overflow-hidden">
        {actual.pdf_url ? (
          <iframe
            src={actual.pdf_url + "#toolbar=1"}
            title={actual.titulo}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <div className="text-center text-red-500 py-16">No se encontró el PDF.</div>
        )}
      </div>
      {actual.pdf_url && (
        <div className="flex gap-4">
          <a href={actual.pdf_url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Abrir en pestaña</a>
          <a href={actual.pdf_url} download className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Descargar PDF</a>
        </div>
      )}
    </section>
  );
}
