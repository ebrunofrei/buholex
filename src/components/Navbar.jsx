// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const menu = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/biblioteca", label: "Biblioteca" },
  { to: "/biblioteca-drive", label: "Biblioteca (beta)" },
  { to: "/agenda", label: "Agenda" },
  { to: "/contacto", label: "Contacto" },
  { to: "/nosotros", label: "Nosotros" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Cierra menú al navegar
  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="bg-blue-900 text-white shadow-lg px-6 py-3 flex items-center justify-between relative">
      <Link to="/" className="font-bold text-xl tracking-wide flex items-center gap-2">
        <img src="/logo-buholex.png" alt="BúhoLex" className="h-8 w-8" />
        BúhoLex
      </Link>

      {/* Menú principal - escritorio */}
      <div className="hidden md:flex gap-6">
        {menu.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`hover:text-yellow-300 font-semibold transition ${
              location.pathname === to ? "underline underline-offset-4 text-yellow-300" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Botón hamburguesa - móvil */}
      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
      </button>

      {/* Menú móvil desplegable */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-blue-900 z-50 shadow-lg animate-fade-down">
          <div className="flex flex-col items-start px-6 py-4 gap-4">
            {menu.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={handleLinkClick}
                className={`block w-full text-lg hover:text-yellow-300 font-semibold py-1 ${
                  location.pathname === to ? "underline underline-offset-4 text-yellow-300" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
