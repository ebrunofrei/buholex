import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth, storage } from "../../services/firebaseConfig";

export default function BuzonArchivos() {
  const [usuario] = useAuthState(auth);
  const [archivo, setArchivo] = useState(null);
  const [cliente, setCliente] = useState("");
  const [expediente, setExpediente] = useState("");
  const [materia, setMateria] = useState("");
  const [anio, setAnio] = useState("");
  const [archivosSubidos, setArchivosSubidos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const subirArchivo = async () => {
    if (!archivo || !usuario) return alert("Archivo o usuario no válido");

    const nombreArchivo = `${cliente}_${expediente}_${archivo.name}`;
    const ruta = `usuarios/${usuario.uid}/${nombreArchivo}`;

    const storageRef = ref(storage, ruta);
    await uploadBytes(storageRef, archivo);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "archivos"), {
      uid: usuario.uid,
      cliente,
      expediente,
      materia,
      anio,
      url,
      nombre: archivo.name,
      fecha: Timestamp.now(),
    });

    setArchivo(null);
    setCliente("");
    setExpediente("");
    setMateria("");
    setAnio("");
    obtenerArchivos();
  };

  const obtenerArchivos = async () => {
    if (!usuario) return;
    const q = query(collection(db, "archivos"), where("uid", "==", usuario.uid));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setArchivosSubidos(docs);
  };

  useEffect(() => {
    obtenerArchivos();
  }, [usuario]);

  const filtrados = archivosSubidos.filter((a) => {
    return (
      a.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      a.expediente.toLowerCase().includes(filtro.toLowerCase()) ||
      a.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  const esReciente = (fecha) => {
    const hoy = new Date();
    const fechaArchivo = new Date(fecha.seconds * 1000);
    const diferencia = (hoy - fechaArchivo) / (1000 * 3600 * 24);
    return diferencia <= 7;
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📁 Buzón de Archivos</h2>

      {/* Subida */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="file"
          onChange={(e) => setArchivo(e.target.files[0])}
          className="border p-2 rounded col-span-2"
        />
        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Expediente"
          value={expediente}
          onChange={(e) => setExpediente(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={subirArchivo}
          className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 col-span-3"
        >
          Subir archivo
        </button>
      </div>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar por cliente, expediente o archivo"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Visualización */}
      <h3 className="text-xl font-semibold mb-2 text-gray-700">📥 Archivos recientes (últimos 7 días)</h3>
      <ul className="mb-6 space-y-2">
        {filtrados.filter((a) => esReciente(a.fecha)).map((a) => (
          <li key={a.id} className="bg-gray-100 p-3 rounded">
            <p className="font-medium text-blue-800">{a.nombre}</p>
            <p className="text-sm text-gray-500">
              Cliente: {a.cliente} | Expediente: {a.expediente} | Materia: {a.materia}
            </p>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Descargar / Ver →
            </a>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2 text-gray-700">🗂️ Archivos antiguos</h3>
      <ul className="space-y-2">
        {filtrados.filter((a) => !esReciente(a.fecha)).map((a) => (
          <li key={a.id} className="bg-gray-50 p-3 rounded">
            <p className="font-medium text-blue-800">{a.nombre}</p>
            <p className="text-sm text-gray-500">
              Cliente: {a.cliente} | Expediente: {a.expediente} | Materia: {a.materia}
            </p>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Descargar / Ver →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

