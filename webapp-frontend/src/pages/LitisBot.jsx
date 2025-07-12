import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import buhoLogo from "../assets/buho-institucional.png";
import { guardarConsulta } from "../services/firebaseConsultasService";
import { analizarTextoIA } from "../services/litisbotService";

export default function LitisBot({ usuarioId = "public" }) {
  const [input, setInput] = useState("");         
  const [respuesta, setRespuesta] = useState(""); 
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Evento global para recibir texto desde OCR/visor
  useEffect(() => {
    const handler = (e) => {
      setInput(e.detail || "");
      setRespuesta("");
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    };
    window.addEventListener("analizarLitisBot", handler);
    return () => window.removeEventListener("analizarLitisBot", handler);
  }, []);

  // Llama a la API avanzada de LitisBot y guarda en Firebase
  async function analizarTexto() {
    setEnviando(true);
    setRespuesta("");
    setError("");
    try {
      const respIA = await analizarTextoIA(input);
      setRespuesta(respIA);

      // Guarda consulta y respuesta en Firestore
      await guardarConsulta({
        pregunta: input,
        respuesta: respIA,
        usuarioId,
        modo: "general"
      });

      // ------ [Integración con agenda automática] ------
      // Si la respuesta contiene fechas/plazos, puedes llamar aquí a tu servicio agenda:
      // Ejemplo:
      // if (respIA.includes("audiencia") && usuarioId !== "public") {
      //   await crearEventoAgenda({ usuarioId, descripcion: respIA, fecha: fechaExtraida });
      // }
    } catch (err) {
      setError("Ocurrió un error al analizar con LitisBot. Intenta nuevamente.");
    }
    setEnviando(false);
  }

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
        {/* Zona de chat funcional */}
        <div className="w-full bg-gray-50 border border-blue-200 rounded-lg shadow p-4 mb-6">
          <p className="text-gray-600 text-sm mb-2">
            <b>Chat Legal:</b> Escribe, pega texto o usa el OCR de expedientes.
          </p>
          <form
            className="flex gap-2"
            onSubmit={e => {
              e.preventDefault();
              if (input.trim()) analizarTexto();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Escribe tu pregunta legal aquí…"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={enviando}
              autoFocus
            />
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-r-lg font-semibold shadow hover:bg-blue-800 transition"
              disabled={enviando || !input.trim()}
              type="submit"
            >
              {enviando ? "Analizando..." : "Enviar"}
            </button>
          </form>
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-700 px-4 py-3 rounded text-red-700">
              {error}
            </div>
          )}
          {respuesta && (
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-700 px-4 py-3 rounded text-blue-900">
              {respuesta}
            </div>
          )}
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

  
