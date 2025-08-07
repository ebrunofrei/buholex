import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import LitisBotBubbleChat from "@/components/ui/LitisBotBubbleChat";

export default function OficinaVirtualLayout({ children }) {
  const location = useLocation();

  // Rutas donde NO debe aparecer el bubble (porque ya hay chat “grande”)
  const ocultarBubble = [
    "/litisbot",                   // chat principal público
    "/oficinaVirtual/litisbot",    // chat principal en oficina
  ];

  const hideBubble = ocultarBubble.some(path =>
    path.endsWith("*")
      ? location.pathname.startsWith(path.replace("*", ""))
      : location.pathname === path
  );

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4">{children}</main>

      {/* Bubble flotante SOLO si no estamos en páginas con chat principal */}
      {!hideBubble && <LitisBotBubbleChat />}
    </div>
  );
}
