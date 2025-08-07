// src/pages/oficina/Dashboard.jsx
import { useState } from "react";
import LitisBotChatBase from "@/components/LitisBotChatBase";
import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const { user, isPro } = useUser();
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-brown-800">Oficina Virtual</h1>
        <p className="text-gray-600">Bienvenido, {user?.nombre || "Invitado"}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tarjeta Lanzador */}
        <button
          onClick={() => setOpenPanel(true)}
          className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5 text-left hover:bg-yellow-100"
        >
          <div className="text-xl font-bold text-yellow-900">🦉 Abrir LitisBot</div>
          <div className="text-sm text-yellow-800 mt-1">Consultas rápidas, modelos y tips de litigio.</div>
        </button>
        {/* ...tus otras tarjetas/estadísticas... */}
      </div>

      {/* Panel centrado (opcional, además del flotante) */}
      {openPanel && (
        <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center px-3">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl border-4 border-yellow-600">
            <button
              className="absolute top-2 right-3 text-yellow-800 text-3xl font-bold"
              onClick={() => setOpenPanel(false)}
              aria-label="Cerrar"
            >×</button>
            <LitisBotChatBase
              user={user || { uid: "invitado", nombre: "Invitado", pro: false, tipo: "public" }}
              pro={isPro}
              tipoUsuario={user?.tipo || "public"}
              showModal={true}
              setShowModal={setOpenPanel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
