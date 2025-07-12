import React, { useEffect, useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import { useLitisBot } from "@/context/LitisBotContext.jsx";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp, query, getDocs, orderBy } from "firebase/firestore";

export default function ChatLitisBotExpediente() {
  const { visible, cerrarBot, archivoAnalizado, expedienteId } = useLitisBot();
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    const cargarHistorial = async () => {
      if (!expedienteId) return;
      const q = query(collection(db, "expedientes", expedienteId, "chat"), orderBy("fecha"));
      const snap = await getDocs(q);
      setMensajes(snap.docs.map(doc => doc.data()));
    };
    if (visible) cargarHistorial();
  }, [visible, expedienteId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = async () => {
    if (!input.trim()) return;
    const nuevo = {
      remitente: "usuario",
      texto: input,
      fecha: serverTimestamp(),
    };
    setMensajes((prev) => [...prev, { ...nuevo, fecha: new Date() }]);
    setInput("");

    await addDoc(collection(db, "expedientes", expedienteId, "chat"), nuevo);

    // Simular respuesta del bot
    const respuesta = {
      remitente: "litisbot",
      texto: `Análisis en curso del archivo: ${archivoAnalizado?.nombre || "[ninguno]"}`,
      fecha: serverTimestamp(),
    };
    setTimeout(() => {
      setMensajes((prev) => [...prev, { ...respuesta, fecha: new Date() }]);
      addDoc(collection(db, "expedientes", expedienteId, "chat"), respuesta);
    }, 1000);
  };

  const handleArchivoExtra = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMensajes((prev) => [
      ...prev,
      {
        remitente: "usuario",
        texto: `📎 Archivo adicional cargado: ${file.name}`,
        fecha: new Date(),
      },
    ]);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full md:w-[70%] h-[90vh] rounded-xl shadow-xl flex flex-col relative">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-[#b03a1a] text-lg">LitisBot - Expediente {expedienteId}</h2>
          <button onClick={cerrarBot} className="text-gray-500 hover:text-red-600">
            <X size={22} />
          </button>
        </div>

        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
          {mensajes.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[80%] ${
                m.remitente === "usuario" ? "bg-gray-100 self-end ml-auto" : "bg-[#fff6e6] text-[#4b3415]"}`}
            >
              {m.texto}
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex items-center gap-2">
          <input
            type="text"
            placeholder="Escribe tu consulta o comentario..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
          <input
            type="file"
            id="archivo-adicional"
            onChange={handleArchivoExtra}
            className="hidden"
          />
          <label htmlFor="archivo-adicional" title="Subir archivo">
            <Upload className="cursor-pointer text-[#b03a1a] hover:text-black" size={20} />
          </label>
          <button
            onClick={enviarMensaje}
            className="bg-[#b03a1a] text-white px-4 py-2 rounded hover:bg-[#a02a0a]"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
