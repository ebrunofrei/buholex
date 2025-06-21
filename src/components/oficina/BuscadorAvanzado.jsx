import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../services/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  or,
  and,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function BuscadorAvanzado() {
  const [usuario] = useAuthState(auth);
  const [cliente, setCliente] = useState("");
  const [expediente, setExpediente] = useState("");
  const [materia, setMateria] = useState("");
  const [anio, setAnio] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
    if (!usuario) return;

    const ref = collection(db, "archivos");
    let q = query(ref, where("uid", "==", usuario.uid));

    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const filtrados = docs.filter((doc) => {
      return (
        (!cliente || doc.cliente?.toLowerCase().includes(cliente.toLowerCase())) &&
        (!expediente || doc.expediente?.toLowerCase().includes(expediente.toLowerCase())) &&
        (!materia || doc.materia?.toLowerCase().includes(materia.toLowerCase())) &&
        (!anio || doc.anio?.toString() === anio.toString())
      );
    });

    setResultados(filtrados);
  };

  useEffect(() => {
    buscar();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🔎 Búsqueda Avanzada</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
      </div>

      <button
        onClick={buscar}
        className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 mb-6"
      >
        Buscar
      </button>

      <ul className="space-y-3">
        {resultados.length === 0 ? (
          <p className="text-gray-500">No se encontraron coincidencias.</p>
        ) : (
          resultados.map((r) => (
            <li
              key={r.id}
              className="bg-gray-100 p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-blue-800">{r.nombre}</p>
                <p className="text-sm text-gray-600">
                  Cliente: {r.cliente} | Expediente: {r.expediente} | Materia: {r.materia} | Año: {r.anio}
                </p>
              </div>
              <Link
                to={`/oficina/expediente/${r.expediente}`}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Ver expediente →
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
