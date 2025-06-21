import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../services/firebaseConfig";
import * as mammoth from "mammoth";
import Tesseract from "tesseract.js";

export default function VisualizadorDocumento({ path, tipo }) {
  const [contenido, setContenido] = useState("");
  const [cargando, setCargando] = useState(true);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const cargarDocumento = async () => {
      setCargando(true);
      try {
        const archivoRef = ref(storage, path);
        const downloadUrl = await getDownloadURL(archivoRef);
        setUrl(downloadUrl);

        if (tipo === "pdf") {
          setCargando(false); // Solo mostrar iframe
        } else if (tipo === "docx") {
          const response = await fetch(downloadUrl);
          const arrayBuffer = await response.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setContenido(result.value);
        } else if (tipo === "imagen") {
          const result = await Tesseract.recognize(downloadUrl, "spa", {
            logger: (m) => console.log(m),
          });
          setContenido(result.data.text);
        }
      } catch (error) {
        console.error("Error al cargar documento:", error);
        setContenido("Error al visualizar el documento.");
      } finally {
        setCargando(false);
      }
    };

    if (path) {
      cargarDocumento();
    }
  }, [path, tipo]);

  if (cargando) return <p className="text-center">Cargando documento...</p>;

  if (tipo === "pdf" && url) {
    return (
      <iframe
        title="Documento PDF"
        src={url}
        className="w-full h-screen border"
      />
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Contenido del documento</h2>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contenido }}
      />
    </div>
  );
}
