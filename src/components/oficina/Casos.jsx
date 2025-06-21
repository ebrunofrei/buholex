import React, { useState, useEffect } from "react";
import { db } from "../../services/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export default function Casos() {
  const [form, setForm] = useState({
    cliente: "",
    expediente: "",
    año: "",
    materia: "",
    juzgado: "",
    especialista: "",
    tipo: "Judicial",
  });
  const [casos, setCasos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const registrarCaso = async () => {
    if (!form.cliente || !form.expediente || !form.año) {
      return alert("Rellena los campos obligatorios");
    }

    await addDoc(collection(db, "casos"), {
      ...form,
      fechaRegistro: Timestamp.now(),
    });

    setForm({
      cliente: "",
      expediente: "",
      año: "",
      materia: "",
      juzgado: "",
      especialista: "",
      tipo: "Judicial",
    });

    obtenerCasos();
  };

  const obtenerCasos = async () => {
    const q = query(collection(db, "casos"), orderBy("fechaRegistro", "desc"));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCasos(docs);
  };

  useEffect(() => {
    obtenerCasos();
  }, []);

  const filtrados = casos.filter((c) =>
    Object.values(c).join(" ").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">⚖️ Gestión de Casos</h2>

      {/* Formulario */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["cliente", "expediente", "año", "materia", "juzgado", "especialista"].map((campo) => (
          <input
            key={campo}
            type="text"
            placeholder={campo}
            value={form[campo]}
            onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
            className="border p-2 rounded"
          />
        ))}

        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="Judicial">Judicial</option>
          <option value="Administrativo">Administrativo</option>
          <option value="Fiscal">Fiscal</option>
        </select>

        <button
          onClick={registrarCaso}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Registrar Caso
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por cliente, expediente, materia..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />

      {/* Lista de casos */}
      <ul className="divide-y">
        {filtrados.length === 0 ? (
          <p className="text-gray-500">No se encontraron casos.</p>
        ) : (
          filtrados.map((c) => (
            <li key={c.id} className="py-4">
              <p className="font-bold text-blue-800">Expediente: {c.expediente}</p>
              <p className="text-sm text-gray-600">
                Cliente: {c.cliente} · Año: {c.año} · Tipo: {c.tipo}
              </p>
              <p className="text-sm text-gray-600">
                Materia: {c.materia} · Juzgado: {c.juzgado} · Especialista: {c.especialista}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
