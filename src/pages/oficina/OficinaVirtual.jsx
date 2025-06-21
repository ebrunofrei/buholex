import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import VisorDocumentos from "../../components/VisorDocumentos"; // 👈 Asegúrate de crearlo

export default function OficinaVirtual() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Oficina Virtual</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="documentos" className="hover:underline">📁 Documentos</Link>
          <Link to="notificaciones" className="hover:underline">🔔 Notificaciones</Link>
          <Link to="biblioteca" className="hover:underline">📚 Biblioteca</Link>
          <Link to="casos" className="hover:underline">⚖️ Casos Legales</Link>
          <Link to="buzon" className="hover:underline">📬 Buzón</Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="documentos" element={<Documentos />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="biblioteca" element={<Biblioteca />} />
          <Route path="casos" element={<Casos />} />
          <Route path="buzon" element={<Buzon />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
}

// Subcomponentes temporales
function Bienvenida() {
  return <h1 className="text-2xl font-semibold text-gray-700">Bienvenido a tu Oficina Virtual.</h1>;
}

function Documentos() {
  return <VisorDocumentos />;
}

function Notificaciones() {
  return <p>Panel de notificaciones legales y mensajes.</p>;
}

function Biblioteca() {
  return <p>Tu biblioteca jurídica personalizada.</p>;
}

function Casos() {
  return <p>Gestión de casos por expediente, materia y más.</p>;
}

function Buzon() {
  return <p>Buzón de archivos nuevos y antiguos.</p>;
}
