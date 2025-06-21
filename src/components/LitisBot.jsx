import React, { useState } from "react";
import litisbotIcon from "/litisbot-logo.png";
import { guardarConsulta } from "../services/firebaseConsultasService";

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

    if (texto.includes("alimentos")) respuestaElegida = respuestasSimples.familia;
    else if (texto.includes("demanda")) respuestaElegida = respuestasSimples.civil;
    else if (texto.includes("delito") || texto.includes("robo")) respuestaElegida = respuestasSimples.penal;

    setRespuesta(respuestaElegida);
    guardarConsulta(pregunta, respuestaElegida);
  };

  return (
    <>
      {/* Botón flotante */}
      <div
        className="fixed bottom-4 right-4 z-50 cursor-pointer"
        onClick={() => setAbierto(!abierto)}
      >
        <img
          src={litisbotIcon}
          alt="LitisBot"
          className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Ventana de chat */}
      {abierto && (
        <div className="fixed bottom-24 right-4 bg-white border border-gray-300 shadow-lg rounded-md w-80 z-50">
          <div className="bg-blue-700 text-white p-3 font-semibold rounded-t-md">
            LitisBot: Consultas legales
          </div>
          <div className="p-3 space-y-2">
            <textarea
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              rows="3"
              placeholder="Escribe tu consulta legal..."
            />
            <button
              onClick={procesarPregunta}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
            >
              Consultar
            </button>
            {respuesta && (
              <div className="text-gray-700 text-sm bg-gray-100 p-2 rounded border mt-2">
                {respuesta}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
