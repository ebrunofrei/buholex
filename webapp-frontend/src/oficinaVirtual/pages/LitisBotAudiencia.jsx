import React, { useEffect, useRef, useState } from "react";
import { analizarArchivoPorLitisBot } from "../../services/litisbotService";
import { guardarResumenEnArchivo } from "../../services/expedientesService";
import { crearEventoAgenda } from "../../services/agendaService";

export default function LitisBotAudiencia({ onClose }) {
  const [mensajes, setMensajes] = useState([]);
  const chatRef = useRef();

  useEffect(() => {
    // Escucha el evento "analizarLitisBot" global
    const handler = async (e) => {
      const archivo = e.detail;
      setMensajes(msgs => [
        ...msgs,
        { remitente: "user", texto: `Analiza el archivo: ${archivo.nombre}`, archivo }
      ]);
      // 1. Análisis con IA
      const resultado = await analizarArchivoPorLitisBot(archivo.url, archivo.nombre);

      // 2. Mostrar resumen
      setMensajes(msgs => [
        ...msgs,
        { remitente: "bot", texto: resultado.resumen }
      ]);

      // 3. Guardar resumen en Firestore
      if (archivo.expedienteId && archivo.id) {
        await guardarResumenEnArchivo(archivo.expedienteId, archivo.id, resultado.resumen);
      }

      // 4. Crear eventos de agenda si hay vencimientos
      if (resultado.vencimientos?.length) {
        for (const v of resultado.vencimientos) {
          await crearEventoAgenda({
            expedienteId: archivo.expedienteId,
            titulo: v.titulo,
            fechaLimite: v.fecha,
            descripcion: v.descripcion
          });
        }
        setMensajes(msgs => [...msgs, { remitente: "bot", texto: "📅 Vencimientos detectados y agregados a la agenda." }]);
      }

      // 5. Sugerencias de recursos/modelos legales (opcional, puedes mostrar botones)
      if (resultado.sugerenciasModelos?.length) {
        setMensajes(msgs => [
          ...msgs,
          { remitente: "bot", texto: "¿Deseas que te ayude a generar un modelo de escrito sugerido? Solo escríbeme cuál quieres y lo preparo al instante." }
        ]);
      }

      // Enfoca y scrollea chat al final
      setTimeout(() => chatRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
    };
    window.addEventListener("analizarLitisBot", handler);
    return () => window.removeEventListener("analizarLitisBot", handler);
  }, []);

  // UI base del chat
  return (
    <div className="bg-white shadow rounded-xl max-w-2xl mx-auto p-6 h-[450px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-3">
        {mensajes.map((msg, i) => (
          <div key={i} className={`mb-2 text-sm ${msg.remitente === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${msg.remitente === "user" ? "bg-[#ffe5dc] text-[#b03a1a]" : "bg-[#f3f4f6] text-gray-700"}`}>
              {msg.texto}
              {msg.archivo && (
                <div>
                  <a href={msg.archivo.url} className="underline text-xs" target="_blank" rel="noopener noreferrer">
                    {msg.archivo.nombre}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>
      {/* Aquí tu input normal para chat */}
      <button className="mt-3 bg-gray-200 px-4 py-2 rounded" onClick={onClose}>Cerrar</button>
    </div>
  );
}
