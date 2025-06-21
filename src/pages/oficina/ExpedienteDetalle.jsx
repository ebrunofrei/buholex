import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../services/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import VisualizadorDocumento from "../../components/oficina/VisualizadorDocumento";
import { auth } from "../../services/firebaseConfig";

export default function ExpedienteDetalle() {
  const { expedienteId } = useParams(); // Parámetro dinámico
  const [usuario] = useAuthState(auth);
  const [documentos, setDocumentos] = useState([]);
  const [activo, setActivo] = useState(null); // {path, tipo}

  useEffect(() => {
    const obtenerArchivosExpediente = async () => {
      if (!usuario || !expedienteId) return;

      const q = query(
        collection(db, "archivos"),
        where("uid", "==", usuario.uid),
        where("expediente", "==", expedienteId)
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocumentos(docs);
    };

    obtenerArchivosExpediente();
  }, [usuario, expedienteId]);

  const obtenerTipo = (nombre) => {
    if (nombre.endsWith(".pdf")) return "pdf";
    if (nombre.endsWith(".docx")) return "docx";
    if (nombre.match(/\.(jpg|jpeg|png)$/)) return "imagen";
    return "otro";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Expediente: {expedienteId}
      </h1>

      {activo ? (
        <div className="mb-8">
          <button
            onClick={() => setActivo(null)}
            className="mb-4 bg-gray-600 text-white px-4 py-2 rounded"
          >
            ← Volver a lista
          </button>
          <VisualizadorDocumento path={activo.path} tipo={activo.tipo} />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Archivos vinculados</h2>
          {documentos.length === 0 ? (
            <p className="text-gray-500">No hay archivos registrados para este expediente.</p>
          ) : (
            <ul className="space-y-3">
              {documentos.map((doc) => (
                <li
                  key={doc.id}
                  className="bg-gray-50 border p-3 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-blue-800">{doc.nombre}</p>
                    <p className="text-sm text-gray-600">
                      Cliente: {doc.cliente} | Año: {doc.anio} | Materia: {doc.materia}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setActivo({ path: `usuarios/${usuario.uid}/${doc.cliente}_${doc.expediente}_${doc.nombre}`, tipo: obtenerTipo(doc.nombre) })
                    }
                    className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800"
                  >
                    Ver
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
