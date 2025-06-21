import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Fondo gradiente */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, #980808 0%, #ff0033 70%, #fff 140%)",
          opacity: 0.9,
        }}
      />
      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center px-6 py-16 gap-6 max-w-2xl w-full">
        {/* Logo */}
        <img
          src="/src/assets/buho-institucional.png"
          alt="BúhoLex"
          className="w-40 md:w-56 rounded-2xl shadow-2xl mb-4 bg-white/80 border-4 border-[#4b2e19]"
        />
        {/* Nombre e Institucional */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#4b2e19] drop-shadow-lg text-center tracking-tight mb-2">
          BÚHOLEX
        </h1>
        <p className="text-xl md:text-2xl text-white font-bold text-center mb-6 drop-shadow">
          “Porque la justicia no debe ser un privilegio: BúhoLex te defiende”
        </p>
        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
          <button
            onClick={() => window.dispatchEvent(new Event("openLitisBot"))}
            className="bg-white text-[#b03a1a] border-2 border-[#b03a1a] rounded-xl px-7 py-4 font-extrabold text-lg shadow-lg hover:bg-[#fff6f6] hover:text-[#980808] transition"
          >
            Consultar con LitisBot
          </button>
          <button
            onClick={() => navigate("/oficina")}
            className="bg-[#4b2e19] text-white rounded-xl px-7 py-4 font-extrabold text-lg shadow-lg hover:bg-[#a87247] transition"
          >
            Oficina Virtual Abogados
          </button>
        </div>
        {/* Banner extra */}
        <div className="mt-10 p-6 rounded-2xl shadow-xl bg-white/90 border-l-8 border-[#e53935] max-w-xl text-center">
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
