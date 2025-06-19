import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/paisaje-buholex.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          BÚHOLEX
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          “Porque la justicia no debe ser un privilegio: Litigator te defiende”
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/servicios"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Ver Servicios
          </Link>
          <Link
            to="/oficina-virtual"
            className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
          >
            Oficina Virtual
          </Link>
          <Link
            to="/contacto"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Contáctanos
          </Link>
        </div>

        <div className="mt-10 flex justify-center">
          <img
            src="/fundador-eduardo.jpeg"
            alt="Fundador de BúhoLex"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        <p className="mt-4 font-light text-sm">Eduardo Frei Bruno Gómez — Fundador de BúhoLex</p>
      </div>
    </section>
  );
}
