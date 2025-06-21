import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../../services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default function BibliotecaPersonal() {
  const [usuario] = useAuthState(auth);
  const [archivo, setArchivo] = useState(null);
  const [nombreDoc, setNombreDoc] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const subirArchivo = async () => {
    if (!archivo || !nombreDoc || !usuario) return alert("Completa todos los campos");

    const storageRef = ref(storage, `usuarios/${usuario.uid}/${archivo.name}`);
    await uploadBytes(storageRef, archivo);

    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "documentosUsuarios"), {
      uid: usuario.uid,
      nombre: nombreDoc,
      url,
      fecha: Timestamp.now(),
    });

    setArchivo(null);
    setNombreDoc("");
    obtenerDocumentos();
  };

  const obtenerDocumentos = async () => {
    if (!usuario) return;
    const q = query(
      collection(db, "documentosUsuarios"),
      where("uid", "==", usuario.uid)
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDocumentos(docs);
  };

  useEffect(() => {
    obtenerDocumentos();
  }, [usuario]);

  const filtrados = documentos.filter((doc) =>
    doc.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📁 Mi Biblioteca Jurídica</h2>

      {/* Formulario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nombre del documento"
          value={nombreDoc}
          onChange={(e) => setNombreDoc(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setArchivo(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          onClick={subirArchivo}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Subir documento
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />

      {/* Lista de documentos */}
      <ul className="divide-y">
        {filtrados.length === 0 ? (
          <p className="text-gray-500">No hay documentos subidos.</p>
        ) : (
          filtrados.map((doc) => (
            <li key={doc.id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-700">{doc.nombre}</p>
                  <p className="text-xs text-gray-500">
                    Subido: {new Date(doc.fecha.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ver / Descargar
                </a>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
