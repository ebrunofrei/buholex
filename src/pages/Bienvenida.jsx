import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import buhoLogo from "../assets/buho-institucional.png";
import { Newspaper } from "lucide-react"; // Icono profesional, si usas lucide-react (alt: puedes usar un emoji o svg)

const noticiasHoy = [
  { id: 1, titulo: "El Tribunal Constitucional publica nuevo precedente sobre derechos laborales." },
  { id: 2, titulo: "Se modifica el Código Procesal Civil: conoce los cambios más relevantes." },
  { id: 3, titulo: "Jornada de capacitación: ética en la función pública este viernes." },
  // Puedes agregar más o integrar una API externa luego
];

export default function Bienvenida() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full">
        {/* Logo institucional con animación */}
        <motion.img
          src={buhoLogo}
          alt="Logo institucional de BúhoLex"
          className="mx-auto mb-4 w-36 md:w-48 rounded-2xl shadow-xl border-4 border-amber-700 bg-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ background: "linear-gradient(135deg, #fff 80%, #f4bb53 100%)" }}
        />

        {/* Mensaje institucional profesional y amigable */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-amber-700 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          ¡Bienvenido a BúhoLex!
        </motion.h1>
        <motion.p
          className="mt-2 mb-5 text-lg md:text-xl text-blue-900 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Tu aliado legal, ético y humano, siempre listo para defender tus derechos y mantenerte informado con lo más importante del día.
        </motion.p>

        {/* Bloque de Noticias Importantes del Día */}
        <motion.section
          className="w-full max-w-2xl mx-auto bg-blue-50 border-l-4 border-blue-600 shadow-md rounded-xl p-4 mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center mb-2">
            {/* Icono de noticia */}
            <Newspaper className="text-blue-600 mr-2" size={26} />
            <span className="text-blue-800 font-semibold text-lg tracking-wide">Noticias más importantes del día</span>
          </div>
          <ul className="space-y-2 text-left">
            {noticiasHoy.map((noticia) => (
              <li
                key={noticia.id}
                className="flex items-start gap-2 text-blue-900 hover:text-blue-700 cursor-pointer transition"
              >
                <span className="text-amber-600 font-bold">•</span>
                <span className="truncate">{noticia.titulo}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/servicios"
            className="bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition"
          >
            Ver servicios
          </Link>
          <Link
            to="/litisbot"
            className="border border-blue-700 text-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition"
          >
            Probar LitisBot
          </Link>
          <Link
            to="/biblioteca"
            className="bg-amber-100 text-amber-800 px-6 py-2 rounded-full font-semibold hover:bg-amber-200 border border-amber-700 transition"
          >
            Biblioteca Jurídica
          </Link>
        </div>
      </main>
      <footer className="p-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} BúhoLex. Todos los derechos reservados.
      </footer>
    </div>
  );
}
