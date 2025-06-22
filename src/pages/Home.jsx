import React, { useState } from "react";
import logoBuho from "../assets/buho-institucional.png";
import NoticiasSlidebar from "../components/NoticiasSlider";

// Noticias demo
const noticiasEjemplo = [
  { titulo: "LitisBot se integra a la web de BúhoLex", resumen: "Ahora puedes consultar con IA jurídica gratis." },
  { titulo: "Nueva oficina virtual para abogados", resumen: "Organiza tus expedientes online con BúhoLex." },
];

export default function Home() {
  const [openNoticias, setOpenNoticias] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center w-full overflow-hidden">
      {/* Fondo difuminado laterales */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-[#b03a1a]/60 via-transparent to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[150px] bg-gradient-to-l from-[#b03a1a]/60 via-transparent to-transparent" />
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <img
          src={logoBuho}
          alt="Logo BúhoLex"
          className="w-60 max-w-xs rounded-2xl shadow-2xl bg-white/90 border-4 border-[#4b2e19] mb-8"
        />
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#b03a1a] text-center mb-2 leading-tight">
          BúhoLex: justicia sin privilegios.
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-[#4b2e19] text-center mb-8 leading-snug">
          LitisBot ¡¡te acompaña y te defiende!!
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full justify-center">
          <button
            onClick={() => window.dispatchEvent(new Event("openLitisBot"))}
            className="bg-[#4b2e19] text-white rounded-xl px-8 py-4 font-extrabold text-lg shadow-lg hover:bg-[#a87247] transition w-full sm:w-auto"
          >
            Consultar con LitisBot
          </button>
          <button
            onClick={() => window.location.href = '/oficina'}
            className="bg-white text-[#b03a1a] border-2 border-[#b03a1a] rounded-xl px-8 py-4 font-extrabold text-lg shadow-lg hover:bg-[#fff6f6] hover:text-[#980808] transition w-full sm:w-auto"
          >
            Oficina Virtual Abogados
          </button>
        </div>
      </div>

      {/* Botón flotante Noticias */}
      <button
        onClick={() => setOpenNoticias(true)}
        className="fixed bottom-8 right-8 z-50 bg-[#b03a1a] hover:bg-[#a87247] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-lg transition"
        style={{ boxShadow: "0 8px 32px rgba(176,58,26,0.25)" }}
      >
        <span className="material-icons">campaign</span>
        Noticias
      </button>

      {/* Slidebar Noticias */}
      <NoticiasSlidebar open={openNoticias} onClose={() => setOpenNoticias(false)} noticias={noticiasEjemplo} />
    </div>
  );
}
