import React, { useState } from "react";

const noticiasEjemplo = [
  {
    titulo: "LitisBot se integra a la web de BúhoLex",
    resumen: "¡Ahora puedes consultar en tiempo real tus dudas legales!",
  },
  {
    titulo: "Nuevo convenio institucional",
    resumen: "BúhoLex firma convenio con Corte Suprema para agilizar procesos.",
  },
];

export default function NoticiaSliderFloat({ noticias = noticiasEjemplo }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#b03a1a] text-white p-3 rounded-full shadow-lg hover:bg-[#4b2e19] transition"
        title="Ver noticias"
        aria-label="Noticias"
      >
        <span className="material-icons" style={{ fontSize: 28 }}>campaign</span>
      </button>
      {/* Sidebar */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l-4 border-[#b03a1a] z-50 flex flex-col animate-slide-in">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="font-bold text-[#b03a1a] text-lg">Noticias</h2>
            <button onClick={() => setOpen(false)} className="text-2xl font-bold hover:text-[#b03a1a]">&times;</button>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {noticias?.length > 0 ? (
              noticias.map((n, idx) => (
                <div key={idx} className="mb-4 pb-2 border-b">
                  <span className="font-semibold">{n.titulo}</span>
                  <p className="text-sm text-gray-700">{n.resumen}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">Sin noticias.</div>
            )}
          </div>
        </div>
      )}
      {/* Animación simple con Tailwind (puedes agregarla a tu index.css) */}
      <style>
        {`
        .animate-slide-in {
          animation: slideInRight 0.3s cubic-bezier(.46,.03,.52,.96);
        }
        @keyframes slideInRight {
          0% { transform: translateX(100%);}
          100% { transform: translateX(0);}
        }
        `}
      </style>
    </>
  );
}
