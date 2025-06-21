// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0f1e3b] text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-xl font-bold mb-2">BúhoLex</h3>
          <p className="text-sm">Litigator te defiende. Soluciones jurídicas inteligentes y accesibles para todos.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Secciones</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-yellow-400">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-yellow-400">Servicios</Link></li>
            <li><Link to="/blog" className="hover:text-yellow-400">Noticias y Blog</Link></li>
            <li><Link to="/jurisprudencia" className="hover:text-yellow-400">Jurisprudencia</Link></li>
            <li><Link to="/biblioteca" className="hover:text-yellow-400">Biblioteca</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contacto</h4>
          <p className="text-sm">Jr. Gálvez 844 - Barranca</p>
          <p className="text-sm">Correo: eduardofreib@gmail.com</p>
          <p className="text-sm">Teléfono: +51 922 038 280</p>
          <div className="mt-2">
            <a
              href="https://wa.me/51922038280"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-10 text-gray-400">
        © {new Date().getFullYear()} BúhoLex. Todos los derechos reservados.
      </div>
    </footer>
  );
}
