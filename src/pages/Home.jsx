// src/pages/Home.jsx
import React from "react";
import logoBuho from '../assets/buho-institucional.png';

export default function Home() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Fondo gradiente institucional */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #980808 0%, #ff0033 70%, #fff 140%)",
          opacity: 0.93,
        }}
      />
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center px-8 py-20 gap-8 max-w-xl w-full">
        {/* Logo institucional */}
        <img
          src={logoBuho}
          alt="Logo BúhoLex"
          className="w-40 md:w-60 rounded-2xl shadow-2xl bg-white/80 border-4 border-[#4b2e19]"
        />
        {/* Título gigante con color institucional */}
        <h1 className="text-5xl md:text-6xl font-black text-[#4b2e19] text-center drop-shadow-lg">
          BÚHOLEX
        </h1>
        {/* Frase de prueba visible */}
        <p className="text-2xl font-bold text-white text-center drop-shadow">
          Esto es una prueba visual de gradiente y estilos Tailwind.
        </p>
      </div>
    </section>
  );
}
