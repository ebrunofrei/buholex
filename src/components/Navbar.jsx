import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-900 tracking-wide">
          Búho<span className="text-yellow-600">Lex</span>
        </Link>
        <nav className="space-x-6 text-sm md:text-base font-medium text-gray-800">
          <Link to="/" className="hover:text-blue-700">Inicio</Link>
          <Link to="/servicios" className="hover:text-blue-700">Servicios</Link>
          <Link to="/contacto" className="hover:text-blue-700">Contáctanos</Link>
          <Link to="/litisbot" className="hover:text-blue-700">LitisBot</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
