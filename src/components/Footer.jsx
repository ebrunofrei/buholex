import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Columna 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">BúhoLex</h3>
          <p>
            Soluciones legales inteligentes y accesibles para todos.
            Asesoría, defensa jurídica y herramientas digitales.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Enlaces útiles</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:underline">Servicios</Link></li>
            <li><Link to="/litisbot" className="hover:underline">LitisBot</Link></li>
            <li><Link to="/contacto" className="hover:underline">Contáctanos</Link></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contáctanos</h3>
          <p>📍 Jr. Gálvez 844, Barranca</p>
          <p>📞 922 038 280</p>
          <p>✉️ eduardofreib@gmail.com</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-blue-700 mt-6 pt-4 text-center text-xs text-blue-200">
        © {new Date().getFullYear()} BúhoLex. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
