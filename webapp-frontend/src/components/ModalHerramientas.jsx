import React from "react";
// Importa aquí todas tus herramientas, incluyendo la de tercios
import HerramientaMultilingue from "./Herramientas/HerramientaMultilingue";
import HerramientaAnalizador from "./Herramientas/HerramientaAnalizador";
import HerramientaAgenda from "./Herramientas/HerramientaAgenda";
import HerramientaRecordatorios from "./Herramientas/HerramientaRecordatorios";
import HerramientaAudiencia from "./Herramientas/HerramientaAudiencia";
import HerramientaTraducir from "./Herramientas/HerramientaTraducir";
import HerramientaTercioPena from "./Herramientas/HerramientaTercioPena"; // <--- esta es clave
import HerramientaLiquidacionLaboral from "./Herramientas/HerramientaLiquidacionLaboral";

export default function ModalHerramientas({
  onClose, herramienta, setHerramienta, pro, error, setError

}) {
  const HERRAMIENTAS = [
    { label: "Multilingüe", key: "multilingue", pro: false, desc: "Haz tus consultas legales en cualquier idioma." },
    { label: "Modo Audiencia", key: "audiencia", pro: true, desc: "Guía de objeciones, alegatos y tips de litigio para audiencias (PRO)." },
    { label: "Analizar Archivo", key: "analizador", pro: true, desc: "Sube archivos PDF, Word o audio para análisis legal (PRO)." },
    { label: "Traducir", key: "traducir", pro: false, desc: "Traduce textos o documentos legales." },
    { label: "Agenda", key: "agenda", pro: true, desc: "Gestiona tus plazos, audiencias y recordatorios (PRO)." },
    { label: "Recordatorios", key: "recordatorios", pro: true, desc: "Configura alertas importantes para tu práctica legal (PRO)." },
    { label: "Tercio de la Pena", key: "tercio_pena", pro: false, desc: "Calcula el tercio y gradientes de la pena impuesta según el Código Penal." },
    { label: "Liquidación Laboral", key: "liquidacion_laboral", pro: false, desc: "Calcula CTS, vacaciones, gratificaciones y beneficios sociales." }
  ];

  function renderHerramienta() {
    switch (herramienta) {
      case "multilingue": return <HerramientaMultilingue onClose={onClose} />;
      case "analizador": return <HerramientaAnalizador onClose={onClose} />;
      case "agenda": return <HerramientaAgenda onClose={onClose} />;
      case "recordatorios": return <HerramientaRecordatorios onClose={onClose} />;
      case "audiencia": return <HerramientaAudiencia onClose={onClose} />;
      case "traducir": return <HerramientaTraducir onClose={onClose} />;
      case "tercio_pena": return <HerramientaTercioPena onClose={onClose} />;
      case "liquidacion_laboral": return <HerramientaLiquidacionLaboral onClose={onClose} />;
       console.log("Renderizando Liquidación Laboral");
      default: return null;
    }
  }

  function handleClick(key, proRequired) {
    if (proRequired && !pro) {
      setError && setError("Hazte PRO para usar esta herramienta");
      setTimeout(() => setError && setError(""), 2000);
      return;
    }
    setHerramienta(key);
  }

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-3">
      <div className="bg-white rounded-2xl shadow-lg p-7 min-w-[350px] max-w-lg w-full relative border-2 border-yellow-600">
        {/* BOTÓN X CERRAR */}
        <button
          onClick={onClose}
          className="absolute right-3 top-2 text-yellow-700 text-2xl font-bold"
          style={{ cursor: "pointer" }}
          aria-label="Cerrar"
        >×</button>

        <h2 className="font-bold text-2xl mb-4 text-yellow-700 flex items-center gap-2">
          Herramientas LitisBot
        </h2>

        {!herramienta ? (
          <div className="flex flex-col gap-2">
            {HERRAMIENTAS.map(h => (
              <button
                key={h.key}
                className={`flex flex-col text-left px-4 py-2 rounded-xl border border-yellow-200 transition
                ${(!h.pro || pro) ? "bg-yellow-50 hover:bg-yellow-100 text-yellow-900" : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"}`}
                onClick={() => handleClick(h.key, h.pro)}
                disabled={h.pro && !pro}
                title={h.desc}
              >
                <span className="font-bold">{h.label} {h.pro && <span className="ml-1 text-xs bg-yellow-200 px-2 py-0.5 rounded">PRO</span>}</span>
                <span className="text-xs">{h.desc}</span>
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* ENLACE VOLVER */}
            <a
              href="#"
              onClick={e => { e.preventDefault(); setHerramienta(null); }}
              className="text-xs text-yellow-700 underline mb-2 block"
            >← Volver a herramientas</a>
            {renderHerramienta()}
          </>
        )}
        {error && <div className="mt-2 text-red-700 text-sm">{error}</div>}
      </div>
    </div>
  );
}
