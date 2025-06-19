import React from "react";
import { motion } from "framer-motion";
import buhoLogo from "../assets/buho-institucional.png";

// Banner institucional superior
const Banner = () => (
  <div className="w-full bg-amber-700 py-1 text-white text-center text-xs tracking-wider">
    Sitio oficial: <span className="font-bold">www.buholex.com</span>
  </div>
);

// Barra de navegación institucional
const Navbar = () => (
  <nav className="w-full flex justify-between items-center py-3 px-6 bg-white shadow-sm border-b">
    <div className="text-amber-700 font-bold text-lg tracking-widest">BúhoLex</div>
    <div className="space-x-6 text-gray-700 text-base">
      <a href="/" className="hover:text-amber-600 font-medium">Inicio</a>
      <a href="/servicios" className="hover:text-amber-600 font-medium">Servicios</a>
      <a href="/nosotros" className="hover:text-amber-600 font-medium">Nosotros</a>
      <a href="/contacto" className="hover:text-amber-600 font-medium">Contacto</a>
      <a href="https://www.buholex.com" className="font-bold text-blue-700 hover:text-amber-600 ml-8" target="_blank" rel="noopener noreferrer">www.buholex.com</a>
    </div>
  </nav>
);

// Footer institucional
const Footer = () => (
  <footer className="mt-10 py-4 border-t text-center text-sm text-gray-500 bg-gray-50">
    © {new Date().getFullYear()} BúhoLex · 
    <a href="https://www.buholex.com" className="text-blue-700 hover:underline mx-1" target="_blank" rel="noopener noreferrer">www.buholex.com</a>
    · Todos los derechos reservados.<br />
    <span className="text-xs">Desarrollado en Perú · contacto@buholex.com</span>
  </footer>
);

export default function Bienvenida() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Banner />
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-8">
        {/* LOGO con animación */}
        <motion.div
          initial={{ scale: 0.8, boxShadow: "0 0 0px #FFD700" }}
          animate={{
            scale: [1.15, 0.98, 1.02, 1],
            boxShadow: [
              "0 0 24px #FFD70055, 0 0 8px #FFECB3",
              "0 0 16px #FFD70099",
              "0 0 12px #FFD70033",
              "0 0 0px #FFD70000",
            ],
          }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.45 }}
          className="mx-auto mt-10 mb-2 bg-white rounded-2xl border-4 border-amber-600 shadow-lg"
          style={{
            maxWidth: 200,
            width: "85vw",
            aspectRatio: "1/1",
            overflow: "hidden",
          }}
        >
          <img
            src={buhoLogo}
            alt="Logo BúhoLex"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </motion.div>
        <h1 className="text-3xl font-extrabold text-amber-800 text-center mt-4 tracking-wide drop-shadow">
          BÚHOLEX
        </h1>
        <p className="text-lg font-semibold text-blue-700 text-center mt-1 select-all">
          www.buholex.com
        </p>
        <p className="text-base font-semibold text-gray-700 text-center mb-6 mt-1">
          Justicia sin privilegios.
        </p>
        {/* Enlaces rápidos */}
        <div className="flex flex-col items-center gap-2">
          <a href="/servicios" className="text-blue-700 font-medium underline hover:text-amber-700 transition">Explorar servicios</a>
          <a href="/litisbot" className="text-blue-600 hover:text-amber-700 font-semibold">Probar LitisBot</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
