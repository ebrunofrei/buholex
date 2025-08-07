import React, { useState } from "react";
import SidebarChats from "@/components/SidebarChats";
import LitisBotChatBasePro from "@/components/LitisBotChatBasePro"; // Usamos el clon PRO

export default function LitisBot({ user: userProp }) {
  // Responsive: abierto por defecto en desktop, cerrado en mobile
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [showModal, setShowModal] = useState(false);

  // Estado de chats/casos
  const [casos, setCasos] = useState([]);
  const [casoActivo, setCasoActivo] = useState(null);

  // Usuario demo (ajusta según contexto de auth real)
  // Usa el prop si viene de arriba, si no crea uno temporal
  const user = userProp || { nombre: "Eduardo", pro: true, uid: "invitado" };

  // Abre Herramientas (modal), cierra sidebar en mobile
  function handleOpenHerramientas() {
    setShowModal(true);
    if (window.innerWidth < 768) setSidebarOpen(false);
  }

  return (
    <div
      className="flex w-full min-h-screen"
      style={{
        background: "#fff",
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        inset: 0,
        zIndex: 1,
        overflow: "auto",
      }}
    >
      {/* Sidebar SIEMPRE visible en desktop, Drawer en mobile */}
      <SidebarChats
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        casos={casos}
        setCasos={setCasos}
        casoActivo={casoActivo}
        setCasoActivo={setCasoActivo}
        user={user}
        onOpenHerramientas={handleOpenHerramientas}
      />
      {/* Chat central, ocupa todo el espacio restante */}
      <div className="flex-1 flex flex-col">
        <LitisBotChatBasePro
          user={user}
          pro={user.pro}
          showModal={showModal}
          setShowModal={setShowModal}
          casoActivo={casoActivo}
          expedientes={casos}
        />
      </div>
    </div>
  );
}
