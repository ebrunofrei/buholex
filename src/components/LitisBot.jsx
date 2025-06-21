import React, { useState } from "react";
import guardarConsulta from "../services/firebaseConsultasService";
import litisbotLogo from "../assets/litisbot-logo.png"; // ¡Asegúrate que el archivo exista en assets!

export default function LitisBot() {
  const [abierto, setAbierto] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const respuestasSimples = {
    penal: "Para delitos penales leves, puedes solicitar defensa pública gratuita.",
    civil: "En procesos civiles debes identificar la pretensión principal y sus pruebas.",
    familia: "Los juicios de alimentos requieren acreditar vínculo filial y capacidad económica.",
    default: "Gracias por tu consulta. Si tu caso es complejo, agenda una cita en nuestra oficina virtual.",
  };

  const procesarPregunta = () => {
    const texto = pregunta.toLowerCase();
    let respuestaElegida = respuestasSimples.default;

    if (texto.includes("alimentos") || texto.includes("demanda")) {
      respuestaElegida = respuestasSimples.civil;
    } else if (texto.includes("delito") || texto.includes("robo")) {
      respuestaElegida = respuestasSimples.penal;
    } else if (texto.includes("familia")) {
      respuestaElegida = respuestasSimples.familia;
    }

    setRespuesta(respuestaElegida);
    guardarConsulta(pregunta, respuestaElegida);
  };

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setAbierto(!abierto)}
          className="rounded-full shadow-2xl bg-white border-4 border-blue-700 w-16 h-16 flex items-center justify-center transition-transform duration-200 hover:scale-110"
          title="LitisBot: Consultas legales"
        >
          <img
            src={litisbotLogo}
            alt="LitisBot"
            className="w-12 h-12 object-cover rounded-full drop-shadow-lg"
          />
        </button>
      </div>

      {/* Ventana de chat */}
      {abierto && (
        <div className="fixed bottom-28 right-6 w-80 max-w-[95vw] bg-white border border-blue-200 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-2">
            <img src={litisbotLogo} alt="LitisBot" className="w-10 h-10 rounded-full" />
            <span className="font-bold text-blue-700 text-lg">LitisBot</span>
            <span className="ml-auto text-xs text-gray-400">AI Legal</span>
          </div>
          <textarea
            className="w-full p-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={2}
            maxLength={300}
            placeholder="Escribe tu consulta legal aquí..."
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
          />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-xl transition duration-150"
            onClick={procesarPregunta}
          >
            Consultar gratis
          </button>
          {respuesta && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-gray-800 mt-2 shadow-inner">
              <span className="font-semibold text-blue-700">Respuesta: </span>
              {respuesta}
            </div>
          )}
          <button
            className="text-xs text-gray-400 mt-2 underline hover:text-blue-700"
            onClick={() => setAbierto(false)}
          >
            Cerrar chat
          </button>
        </div>
      )}
    </>
  );
}
