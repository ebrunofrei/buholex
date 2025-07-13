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

  // Escucha texto desde eventos externos (OCR/visor)
  useEffect(() => {
    const handler = (e) => {
      setInput(e.detail || "");
      setRespuesta("");
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    };
    window.addEventListener("analizarLitisBot", handler);
    return () => window.removeEventListener("analizarLitisBot", handler);
  }, []);

  // Envía la consulta a la IA y guarda en Firestore
  async function analizarTexto() {
    setEnviando(true);
    setRespuesta("");
    setError("");
    try {
      const respIA = await analizarTextoIA(input);
      setRespuesta(respIA);

      // Guarda en Firestore
      await guardarConsulta({
        pregunta: input,
        respuesta: respIA,
        usuarioId,
        modo: "general"
      });
    } catch (err) {
      setError("Ocurrió un error al analizar con LitisBot. Intenta nuevamente.");
    }
    setEnviando(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4e7e1] via-[#fff] to-[#f4e7e1] flex flex-col items-center justify-center px-2 py-6">
      <motion.div
        className="flex flex-col items-center w-full max-w-xl py-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={buhoLogo}
          alt="Logo BúhoLex"
          className="w-28 md:w-36 mb-5 rounded-2xl border-4 border-[#b03a1a] shadow-xl bg-white"
          draggable={false}
        />
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-[#b03a1a] mb-2 text-center drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          LitisBot — Asistente Legal BúhoLex
        </motion.h1>
        <p className="text-[#7a5229] text-lg md:text-xl mb-6 font-semibold text-center">
          Consulta gratis, redacta escritos y accede a modelos jurídicos personalizados.<br/>
          <span className="font-bold text-[#4b2e19]">¡Haz tu pregunta legal en segundos!</span>
        </p>

        {/* Zona de chat */}
        <div className="w-full bg-white border border-[#b03a1a]/30 rounded-2xl shadow-xl p-5 mb-7">
          <p className="text-[#b03a1a] font-semibold mb-2">
            <span className="text-[#8c581e]">Chat Legal:</span> Escribe tu duda, pega texto o usa el OCR.
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
              className="flex-1 border border-[#b03a1a]/40 rounded-l-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b03a1a] bg-white text-[#4b2e19] font-semibold shadow"
              placeholder="Ej: ¿Cómo presento una demanda de alimentos?"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={enviando}
              maxLength={220}
              autoFocus
            />
            <button
              className="bg-[#b03a1a] hover:bg-[#a87247] text-white px-5 py-2 rounded-r-xl font-bold shadow transition"
              disabled={enviando || !input.trim()}
              type="submit"
            >
              {enviando ? "Analizando..." : "Enviar"}
            </button>
          </form>

          {/* Mensaje de error */}
          {error && (
            <div className="mt-4 bg-red-100 border-l-4 border-[#b03a1a] px-4 py-3 rounded text-[#a52e00]">
              {error}
            </div>
          )}

          {/* Mensaje de respuesta */}
          {respuesta && (
            <div className="mt-4 bg-[#fff6ea] border-l-4 border-[#b03a1a] px-4 py-3 rounded text-[#4b2e19] whitespace-pre-line font-medium">
              <b>Respuesta de LitisBot:</b><br />
              {respuesta}
            </div>
          )}

          {/* Mensaje inicial si no hay respuesta */}
          {!respuesta && !error && (
            <div className="mt-4 text-[#b03a1a]/70 text-center text-sm">
              Ejemplo: <i>¿Cuáles son los requisitos para divorcio rápido?</i>
            </div>
          )}
        </div>

        {/* Botones institucionales */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/"
            className="bg-[#b03a1a] hover:bg-[#4b2e19] text-white px-6 py-2 rounded-full font-semibold border border-[#b03a1a] transition text-center"
          >
            ← Volver al inicio
          </Link>
          <Link
            to="/servicios"
            className="bg-[#ffe6cc] text-[#b03a1a] px-6 py-2 rounded-full font-semibold border border-[#b03a1a] hover:bg-[#fff1e2] transition text-center"
          >
            Ver servicios legales
          </Link>
        </div>
      </motion.div>
      <footer className="w-full mt-10 p-4 text-center text-xs text-[#b03a1a]/70">
        © {new Date().getFullYear()} BúhoLex — Consultas legales sin privilegios.
      </footer>
    </div>
  );
}

  
