import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white/95 shadow-lg py-2 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <img src="/src/assets/buho-institucional.png" alt="Logo" className="w-10 h-10" />
        <span className="text-[#4b2e19] font-extrabold text-xl">BúhoLex</span>
      </div>
      <div className="flex gap-7 items-center">
        <Link to="/" className={`text-lg font-bold hover:text-[#e53935] transition ${pathname === "/" ? "underline text-[#b03a1a]" : "text-[#4b2e19]"}`}>
          Inicio
        </Link>
        <Link to="/oficina" className={`text-lg font-bold hover:text-[#e53935] transition ${pathname === "/oficina" ? "underline text-[#b03a1a]" : "text-[#4b2e19]"}`}>
          Oficina Virtual
        </Link>
        <Link to="/proyectos" className="text-lg font-bold text-[#4b2e19] hover:text-[#e53935] transition">
          Proyectos de Investigación
        </Link>
        <Link to="/contacto" className="text-lg font-bold text-[#4b2e19] hover:text-[#e53935] transition">
          Contacto
        </Link>
      </div>
    </nav>
  );
}
