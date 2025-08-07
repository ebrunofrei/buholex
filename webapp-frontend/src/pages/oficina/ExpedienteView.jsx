// src/pages/oficina/ExpedienteView.jsx
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import LitisBotChatBase from "@/components/LitisBotChatBase";
import { useUser } from "@/context/UserContext";

/**
 * Supón que ya obtienes el expediente de Firestore o de tu API.
 * Debe tener al menos:
 * {
 *   id, numero, materia, organo, juez, especialista,
 *   demandantes, demandados,
 *   archivos: [{ nombre, url, tipo }, ...]
 * }
 */
export default function ExpedienteView() {
  const { id } = useParams();
  const { user, isPro } = useUser();
  const [openPanel, setOpenPanel] = useState(false);

  // Mock: reemplaza por fetch real
  const expediente = useMemo(() => ({
    id,
    numero: "00198-2025-0-1301-JR-CI-02",
    materia: "Otorgamiento de Escritura Pública",
    organo: "2do Juzgado Civil de Barranca",
    juez: "Juez(a) Titular",
    especialista: "Sec. Judicial",
    demandantes: ["MICHELLER INGENIEROS S.A.C."],
    demandados: ["Hernán Felipe Trujillo Hidalgo"],
    archivos: [
      { nombre: "Auto_admisorio_12-06-2025.pdf", url: "https://.../auto.pdf", tipo: "application/pdf" },
      { nombre: "Escrito_subsanacion.docx", url: "https://.../subsanacion.docx", tipo: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    ]
  }), [id]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brown-800">Expediente {expediente.numero}</h1>
          <p className="text-gray-600">{expediente.materia} — {expediente.organo}</p>
        </div>
        <button
          onClick={() => setOpenPanel(true)}
          className="bg-yellow-600 hover:bg-yellow-800 text-white font-semibold rounded-xl px-4 py-3"
        >
          🦉 Abrir LitisBot (contexto expediente)
        </button>
      </header>

      {/* Aquí tu visor de documentos, timeline, etc. */}

      {/* Panel LitisBot con contexto de expediente */}
      {openPanel && (
        <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center px-3">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl border-4 border-yellow-600">
            <button
              className="absolute top-2 right-3 text-yellow-800 text-3xl font-bold"
              onClick={() => setOpenPanel(false)}
              aria-label="Cerrar"
            >×</button>

            <LitisBotChatBase
              user={user || { uid: "invitado", nombre: "Invitado", pro: false, tipo: "public" }}
              pro={isPro}
              tipoUsuario={user?.tipo || "litigante"}
              showModal={true}
              setShowModal={setOpenPanel}
              expedientes={[expediente]}  // ← importante
              casoActivo={expediente}     // si tu versión lo admite
            />
          </div>
        </div>
      )}
    </div>
  );
}
