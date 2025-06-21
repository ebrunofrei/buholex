import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import buhoLogo from "../assets/buho-institucional.png";
import guardarConsulta from "../services/firebaseConsultasService";

export default function LitisBot() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <motion.div
        className="flex flex-col items-center max-w-2xl w-full py-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={buhoLogo}
          alt="Logo BúhoLex"
          className="w-24 md:w-32 mb-6 rounded-2xl border-4 border-amber-700 shadow-lg bg-white"
        />
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          LitisBot – Tu Asistente Legal Inteligente
        </motion.h1>
        <p className="text-blue-800 text-lg md:text-xl mb-6 font-medium">
          Resuelve tus dudas legales, redacta escritos y accede a modelos jurídicos personalizados. 
          <br />
          ¡Haz tus preguntas o consulta jurisprudencia en segundos!
        </p>
        
        {/* Simulación de zona de chat */}
        <div className="w-full bg-gray-50 border border-blue-200 rounded-lg shadow p-4 mb-6">
          <p className="text-gray-600 text-sm mb-2">
            <b>Chat Demo:</b> Pronto podrás interactuar en tiempo real con nuestro asistente.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Escribe tu pregunta legal aquí…"
              disabled
            />
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-r-lg font-semibold shadow hover:bg-blue-800 transition"
              disabled
            >
              Enviar
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/"
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-semibold border border-blue-700 hover:bg-blue-200 transition"
          >
            Volver al inicio
          </Link>
          <Link
            to="/servicios"
            className="bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition"
          >
            Ver servicios legales
          </Link>
        </div>
      </motion.div>
      <footer className="w-full mt-10 p-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} BúhoLex. Todos los derechos reservados.
      </footer>
    </div>
  );
}
