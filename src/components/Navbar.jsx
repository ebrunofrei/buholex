import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoBuhoLex from "../assets/buho-institucional.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menu = [
    { label: "Inicio", to: "/" },
    { label: "Servicios", to: "/servicios" },
    { label: "Noticias", to: "/noticias" },
    { label: "Jurisprudencia", to: "/jurisprudencia" },
    { label: "Códigos", to: "/codigos" },
    { label: "Biblioteca", to: "/biblioteca" },
    { label: "Agenda", to: "/agenda" },
    { label: "Contacto", to: "/contacto" },
  ];

  return (
    <nav className="bg-blue-900 text-white shadow-lg px-6 py-3 flex items-center justify-between">
      <Link to="/" className="font-bold text-xl tracking-wide flex items-center gap-2">
        <img src={logoBuhoLex} alt="BúhoLex" className="h-8 w-8" />
        BúhoLex
      </Link>
      <div className="hidden md:flex gap-6">
        {menu.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={
              "hover:text-yellow-300 font-semibold transition" +
              (location.pathname === to ? " underline underline-offset-4 text-yellow-300" : "")
            }
          >
            {label}
          </Link>
        ))}
      </div>
      {/* Menú móvil */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        <span className="material-icons">menu</span>
      </button>
      {open && (
        <div className="md:hidden absolute top-16 right-6 bg-white text-blue-900 rounded-lg shadow-lg p-4 flex flex-col gap-4 z-50">
          {menu.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={
                "hover:text-blue-600 font-semibold transition" +
                (location.pathname === to ? " underline underline-offset-4 text-yellow-800" : "")
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
