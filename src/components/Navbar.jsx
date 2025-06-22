import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoBuhoLex from "../assets/buho-institucional.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menu = [
    { label: "Inicio", to: "/" },
    { label: "Servicios", to: "/servicios" },
    { label: "Jurisprudencia", to: "/jurisprudencia" },
    { label: "Códigos", to: "/codigos" },
    { label: "Biblioteca", to: "/biblioteca" },
    { label: "Agenda", to: "/agenda" },
    { label: "Contacto", to: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-[#b03a1a] shadow-lg border-b-2 border-[#942813]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoBuhoLex} alt="BúhoLex" className="h-10 w-10 rounded-md shadow" />
          <span className="text-white font-extrabold text-2xl tracking-widest drop-shadow-lg">BúhoLex</span>
        </Link>
        <div className="hidden md:flex gap-7">
          {menu.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`px-2 font-semibold tracking-wide transition-colors rounded-md ${
                location.pathname === to
                  ? "bg-white text-[#b03a1a] shadow font-bold"
                  : "text-white hover:bg-[#942813] hover:text-yellow-300"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        {/* Menú móvil */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="material-icons text-white text-3xl">menu</span>
        </button>
        {open && (
          <div className="md:hidden absolute top-16 right-4 bg-white text-[#b03a1a] rounded-lg shadow-lg p-4 flex flex-col gap-4 z-50">
            {menu.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`font-semibold px-3 py-2 rounded ${
                  location.pathname === to
                    ? "bg-[#b03a1a] text-white"
                    : "hover:bg-[#f6e6e6] hover:text-[#b03a1a]"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
