// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Fondo gradiente profesional */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #8e1010 0%, #e53935 60%, #fff 120%)",
          opacity: 1,
        }}
      />
      <div className="relative z-10 flex flex-col items-center px-6 py-12 gap-6 max-w-2xl mx-auto">
        {/* Logo */}
        <img
          src="/src/assets/buho-institucional.png"
          alt="BúhoLex"
          className="w-36 md:w-48 rounded-2xl shadow-2xl mb-2 bg-white/90 border-4 border-[#4b2e19]"
        />
        {/* Nombre e Institucional */}
        <h1 className="text-5xl font-extrabold text-[#4b2e19] drop-shadow-md text-center tracking-tight">
          BÚHOLEX
        </h1>
        <p className="text-lg md:text-2xl text-[#4b2e19] font-semibold text-center mt-2">
          “Porque la justicia no debe ser un privilegio: BúhoLex te defiende”
        </p>
        {/* Botones institucionales */}
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <button
            onClick={() => window.dispatchEvent(new Event("openLitisBot"))}
            className="bg-white text-[#b03a1a] border-2 border-[#b03a1a] rounded-xl px-6 py-3 font-bold shadow-lg hover:bg-[#ffeaea] hover:text-[#8e1010] transition"
          >
            Consultar con LitisBot
          </button>
          <button
            onClick={() => navigate("/oficina")}
            className="bg-[#4b2e19] text-white rounded-xl px-6 py-3 font-bold shadow-lg hover:bg-[#8d6e4a] transition"
          >
            Oficina Virtual Abogados
          </button>
        </div>
        {/* Banner adicional: integración próxima de Proyectos */}
        <div className="mt-10 p-6 rounded-2xl shadow-xl bg-white/80 border-l-8 border-[#e53935] max-w-xl text-center">
          <span className="font-bold text-[#b03a1a] text-xl block mb-2">¡NUEVO!</span>
          <p className="text-[#4b2e19] font-medium">
            Próximamente: <b>Página exclusiva de Proyectos de Investigación Jurídico-Filosófica</b> 
            con integración a repositorios oficiales y contenido premium para la comunidad jurídica.
          </p>
        </div>
      </div>
    </section>
  );
}

