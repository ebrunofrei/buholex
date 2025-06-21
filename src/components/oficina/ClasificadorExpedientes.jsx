import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../services/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export default function ClasificadorExpedientes() {
  const [usuario] = useAuthState(auth);
  const [expedientes, setExpedientes] = useState([]);
  const [nuevo, setNuevo] = useState({
    cliente: "",
    numero: "",
    anio: "",
    materia: "",
    juzgado: "",
    secretario: "",
    tipo: "Judicial",
  });
  const [filtroMateria, setFiltroMateria] = useState("");
  const [busquedaCliente, setBusquedaCliente] = useState("");

  const materias = [
    "Civil",
    "Penal",
    "Administrativo",
    "Constitucional",
    "Laboral",
    "Familia",
    "Tributario",
    "Otros",
  ];

  const guardarExpediente = async () => {
    if (!usuario || !nuevo.numero || !nuevo.materia) return alert("Completa los campos obligatorios.");

    await addDoc(collection(db, "expedientes"), {
      ...nuevo,
      uid: usuario.uid,
      creado: Timestamp.now(),
    });

    setNuevo({
      cliente: "",
      numero: "",
      anio: "",
      materia: "",
      juzgado: "",
      secretario: "",
      tipo: "Judicial",
    });

    obtenerExpedientes();
  };

  const obtenerExpedientes = async () => {
    if (!usuario) return;
    const q = query(collection(db, "expedientes"), where("uid", "==", usuario.uid));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setExpedientes(docs);
  };

  useEffect(() => {
    obtenerExpedientes();
  }, [usuario]);

  const filtrados = expedientes.filter((e) => {
    return (
      (filtroMateria === "" || e.materia === filtroMateria) &&
      e.cliente.toLowerCase().includes(busquedaCliente.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📂 Clasificación de Expedientes</h2>

      {/* Registro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Cliente / Parte"
          value={nuevo.cliente}
          onChange={(e) => setNuevo({ ...nuevo, cliente: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Número de expediente"
          value={nuevo.numero}
          onChange={(e) => setNuevo({ ...nuevo, numero: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Año"
          value={nuevo.anio}
          onChange={(e) => setNuevo({ ...nuevo, anio: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={nuevo.materia}
          onChange={(e) => setNuevo({ ...nuevo, materia: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Selecciona materia</option>
          {materias.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Juzgado / Fiscalía"
          value={nuevo.juzgado}
          onChange={(e) => setNuevo({ ...nuevo, juzgado: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Secretario / Especialista"
          value={nuevo.secretario}
          onChange={(e) => setNuevo({ ...nuevo, secretario: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={nuevo.tipo}
          onChange={(e) => setNuevo({ ...nuevo, tipo: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="Judicial">Judicial</option>
          <option value="Administrativo">Administrativo</option>
          <option value="Fiscal">Fiscal</option>
        </select>
        <button
          onClick={guardarExpediente}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-3"
        >
          Guardar expediente
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <select
          value={filtroMateria}
          onChange={(e) => setFiltroMateria(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas las materias</option>
          {materias.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar por cliente"
          value={busquedaCliente}
          onChange={(e) => setBusquedaCliente(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      {/* Listado */}
      <ul className="space-y-4">
        {filtrados.length === 0 ? (
          <p className="text-gray-500">No se encontraron expedientes.</p>
        ) : (
          filtrados.map((e) => (
            <li key={e.id} className="bg-gray-100 rounded p-4 shadow-sm">
              <p className="font-bold text-blue-800">
                {e.numero} - {e.anio} | {e.materia}
              </p>
              <p className="text-sm text-gray-700">
                Cliente: {e.cliente} | Tipo: {e.tipo}
              </p>
              <p className="text-xs text-gray-500">
                Juzgado: {e.juzgado} | Secretario: {e.secretario}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
