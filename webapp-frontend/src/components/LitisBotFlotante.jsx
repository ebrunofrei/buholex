import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import litisbotLogo from "../assets/litisbot-logo.png";
import {
  guardarMensajeLitisBot,
  obtenerHistorialLitisBot,
  borrarMensajeIndividualLitisBot,
  exportarHistorialLitisBot,
  marcarFavoritoLitisBot,
  incrementarContadorMensajes,
  obtenerContadorMensajes
} from "../services/firebaseLitisBotService";
import { analizarTextoConIA, traducirTextoConIA } from "../services/analisisIAService";
import BannerUpgrade from "../components/ui/BannerUpgrade";
import Toast from "../components/ui/Toast";

const LIMITE_FREE = 10;

export default function LitisBotFlotante({ onClose }) {
  const { usuario, isPremium } = useAuth();
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy LitisBot, tu asistente legal. Pregúntame o adjunta documentos jurídicos (PDF, Word, imagen, audio o video) y te ayudo.",
      timestamp: Date.now(),
      favorito: false
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", type: "info" });
  const [contadorHoy, setContadorHoy] = useState(0);
  const [mostrarUpgrade, setMostrarUpgrade] = useState(false);
  const inputArchivoRef = useRef(null);
  const chatRef = useRef(null);

  // Historial y contador
  useEffect(() => {
    if (usuario && !usuario.isAnonymous) {
      obtenerHistorialLitisBot(usuario.uid).then(historial => {
        if (historial && historial.length > 0) setMensajes(historial);
      });
      if (!isPremium) {
        obtenerContadorMensajes(usuario.uid).then(cont => setContadorHoy(cont || 0));
      }
    } else {
      setMensajes([
        {
          role: "assistant",
          content:
            "¡Hola! Soy LitisBot, tu asistente legal. Pregúntame o adjunta documentos jurídicos (PDF, Word, imagen, audio o video) y te ayudo.",
          timestamp: Date.now(),
          favorito: false
        },
      ]);
    }
  }, [usuario, isPremium]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes, loading]);

  // Favorito (like)
  const handleFavorito = async (msgId, favorito) => {
    await marcarFavoritoLitisBot(msgId, favorito);
    setMensajes(prev =>
      prev.map(m =>
        m.id === msgId ? { ...m, favorito } : m
      )
    );
  };

  // Copiar al portapapeles
  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
    setToast({ open: true, message: "Texto copiado al portapapeles", type: "success" });
  };

  // Leer en voz alta
  const leerEnVozAlta = (texto) => {
    const utter = new window.SpeechSynthesisUtterance(texto);
    utter.lang = "es-PE";
    window.speechSynthesis.speak(utter);
  };

  // Comandos resumir/traducir (botón)
  const handleComandoBoton = (tipo, texto) => {
    if (tipo === "resumir") setInput(`/resumir ${texto}`);
    if (tipo === "traducir") setInput(`/traducir inglés ${texto}`);
  };

  // Exportar historial
  const exportarHistorial = async () => {
    const data = await exportarHistorialLitisBot(usuario.uid);
    const blob = new Blob([data.join('\n\n')], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historial-litisbot.txt";
    a.click();
    URL.revokeObjectURL(url);
    setToast({ open: true, message: "Historial exportado", type: "success" });
  };

  // Enviar mensaje
  const enviarMensaje = async () => {
    if (!input.trim()) return;
    if (!isPremium && contadorHoy >= LIMITE_FREE) {
      setToast({ open: true, message: "Límite de mensajes gratis alcanzado. Hazte premium para continuar.", type: "warn" });
      setMostrarUpgrade(true);
      return;
    }
    setLoading(true);

    // --- /resumir
    if (input.trim().toLowerCase().startsWith("/resumir")) {
      const texto = input.replace("/resumir", "").trim();
      let contentToSummarize = texto;
      if (!texto) {
        const lastMsg = mensajes.slice().reverse().find(m => m.role === "user" && m.content && !m.content.startsWith("/"));
        contentToSummarize = lastMsg?.content || "";
      }
      if (!contentToSummarize) {
        setToast({ open: true, message: "No hay texto para resumir.", type: "warn" });
        setLoading(false);
        return;
      }
      setMensajes(prev => [...prev, { role: "user", content: input, timestamp: Date.now() }]);
      setMensajes(prev => [...prev, { role: "assistant", content: "Resumiendo...", timestamp: Date.now() }]);
      try {
        const resp = await analizarTextoConIA(contentToSummarize, "resumir");
        setMensajes(prev => [...prev, { role: "assistant", content: resp.resumen, timestamp: Date.now() }]);
      } catch {
        setToast({ open: true, message: "Error al resumir.", type: "error" });
      }
      setInput("");
      setLoading(false);
      if (!isPremium) {
        const nuevoContador = await incrementarContadorMensajes(usuario.uid);
        setContadorHoy(nuevoContador);
      }
      return;
    }

    // --- /traducir [idioma]
    if (input.trim().toLowerCase().startsWith("/traducir")) {
      const partes = input.trim().split(" ");
      const idioma = partes[1] || "español";
      let textoATraducir = partes.slice(2).join(" ");
      if (!textoATraducir) {
        const lastMsg = mensajes.slice().reverse().find(m => m.role === "user" && m.content && !m.content.startsWith("/"));
        textoATraducir = lastMsg?.content || "";
      }
      if (!textoATraducir) {
        setToast({ open: true, message: "No hay texto para traducir.", type: "warn" });
        setLoading(false);
        return;
      }
      setMensajes(prev => [...prev, { role: "user", content: input, timestamp: Date.now() }]);
      setMensajes(prev => [...prev, { role: "assistant", content: `Traduciendo a ${idioma}...`, timestamp: Date.now() }]);
      try {
        const resp = await traducirTextoConIA(textoATraducir, idioma);
        setMensajes(prev => [...prev, { role: "assistant", content: resp.traduccion, timestamp: Date.now() }]);
      } catch {
        setToast({ open: true, message: "Error al traducir.", type: "error" });
      }
      setInput("");
      setLoading(false);
      if (!isPremium) {
        const nuevoContador = await incrementarContadorMensajes(usuario.uid);
        setContadorHoy(nuevoContador);
      }
      return;
    }

    // --- mensaje normal
    const nuevoMensaje = {
      role: "user",
      content: input,
      timestamp: Date.now(),
      favorito: false
    };
    setMensajes(prev => [...prev, nuevoMensaje]);
    setInput("");
    setLoading(true);

    try {
      const resp = await analizarTextoConIA(nuevoMensaje.content);
      setMensajes(prev => [...prev, { role: "assistant", content: resp.resumen, timestamp: Date.now() }]);
    } catch {
      setToast({ open: true, message: "Error en la IA.", type: "error" });
    }
    setLoading(false);
    if (!isPremium) {
      const nuevoContador = await incrementarContadorMensajes(usuario.uid);
      setContadorHoy(nuevoContador);
    }
  };

  // SUBMIT del FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();
    enviarMensaje();
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        width: 410,
        maxWidth: "98vw",
        height: 570,
        background: "#fff",
        border: "3px solid #b03a1a",
        borderRadius: 26,
        zIndex: 3000,
        boxShadow: "0 10px 40px #0003",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#b03a1a",
          color: "#fff",
          padding: "15px 20px",
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src={litisbotLogo}
            alt="LitisBot"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "bold", fontSize: 21 }}>LitisBot</span>
        </div>
        <button
          style={{
            fontWeight: "bold",
            fontSize: 28,
            border: "none",
            background: "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={onClose}
          title="Cerrar"
        >
          ×
        </button>
      </div>

      {/* Chat */}
      <div ref={chatRef} style={{
        flex: 1,
        overflowY: "auto",
        padding: 24,
        background: "#fff9f5"
      }}>
        {mensajes.map((msg, i) => (
          <div key={msg.id || i} style={{ marginBottom: 18 }}>
            {/* Usuario */}
            {msg.role === "user" ? (
              <div style={{
                display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 8
              }}>
                <span style={{
                  width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#b03a1a", color: "#fff", borderRadius: "50%", fontWeight: "bold", fontSize: 17
                }}>
                  {usuario?.displayName?.[0]?.toUpperCase() || usuario?.email?.[0]?.toUpperCase() || "U"}
                </span>
                <div style={{
                  background: "#b03a1a",
                  color: "#fff",
                  borderRadius: 13,
                  padding: "13px 20px",
                  fontSize: 15,
                  minWidth: 50,
                  marginRight: 12
                }}>{msg.content}</div>
              </div>
            ) : (
              // Assistant (BOT)
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <img src={litisbotLogo} alt="LitisBot" style={{ width: 32, height: 32, borderRadius: "50%" }} />
                  <div style={{
                    background: "#fff",
                    border: "1px solid #b03a1a44",
                    color: "#4b2e19",
                    borderRadius: 13,
                    padding: "13px 20px",
                    fontSize: 15,
                    minWidth: 50,
                    boxShadow: "0 2px 8px #0001",
                    maxWidth: 260
                  }}>
                    {msg.content}
                  </div>
                </div>
                {/* Barra de acciones */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginLeft: 85, marginTop: 6
                }}>
                  <button
                    title="Copiar"
                    style={{ background: "transparent", border: "none", color: "#4b2e19", cursor: "pointer", fontSize: 19, borderRadius: 7, padding: 2 }}
                    onClick={e => { e.stopPropagation(); copiarAlPortapapeles(msg.content); }}
                  >
                    📋
                  </button>
                  <button
                    title="Marcar como útil"
                    style={{ background: "transparent", border: "none", color: "#4b2e19", cursor: "pointer", fontSize: 20, borderRadius: 7, padding: 2 }}
                    onClick={e => { e.stopPropagation(); handleFavorito(msg.id, true); }}
                  >
                    {msg.favorito ? "👍" : "👍"}
                  </button>
                  <button
                    title="Escuchar"
                    style={{ background: "transparent", border: "none", color: "#4b2e19", cursor: "pointer", fontSize: 20, borderRadius: 7, padding: 2 }}
                    onClick={e => { e.stopPropagation(); leerEnVozAlta(msg.content); }}
                  >
                    🔊
                  </button>
                  <button
                    title="Resumir"
                    style={{ background: "transparent", border: "none", color: "#b03a1a", cursor: "pointer", fontSize: 20, borderRadius: 7, padding: 2 }}
                    onClick={e => { e.stopPropagation(); handleComandoBoton("resumir", msg.content); }}
                  >
                    📝
                  </button>
                  <button
                    title="Traducir"
                    style={{ background: "transparent", border: "none", color: "#b03a1a", cursor: "pointer", fontSize: 20, borderRadius: 7, padding: 2 }}
                    onClick={e => { e.stopPropagation(); handleComandoBoton("traducir", msg.content); }}
                  >
                    🌐
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            <img src={litisbotLogo} alt="LitisBot" style={{ width: 32, height: 32, borderRadius: "50%" }} />
            <div style={{
              background: "#fff",
              border: "1px solid #b03a1a33",
              color: "#4e2d0c",
              borderRadius: 12,
              padding: "12px 19px",
              fontSize: 15,
              minWidth: 60,
              boxShadow: "0 2px 8px #0001"
            }}>
              <span style={{ opacity: 0.7 }}>LitisBot está escribiendo...</span>
            </div>
          </div>
        )}
      </div>

      {/* Barra de input y acciones abajo */}
      <form
        style={{
          display: "flex",
          gap: 7,
          alignItems: "center",
          padding: 13,
          borderTop: "1px solid #f2e8df",
          background: "#fff"
        }}
        onSubmit={handleSubmit}
      >
        {/* Limpiar */}
        <button
          type="button"
          title="Limpiar chat"
          style={{ background: "transparent", border: "none", color: "#b03a1a", borderRadius: 8, padding: 2, cursor: "pointer", fontSize: 20 }}
          onClick={() => setMensajes([{
            role: "assistant",
            content: "¡Hola! Soy LitisBot, tu asistente legal. Pregúntame o adjunta documentos jurídicos (PDF, Word, imagen, audio o video) y te ayudo.",
            timestamp: Date.now(), favorito: false
          }])}
        >⟳</button>
        {/* Micro */}
        <button
          type="button"
          title="Hablar"
          style={{ background: "transparent", border: "none", color: "#b03a1a", borderRadius: 8, padding: 2, cursor: "pointer", fontSize: 20 }}
          // Aquí puedes agregar tu lógica de micrófono real
        >🎤</button>
        {/* Adjuntar */}
        <input type="file" accept=".pdf,.docx,.jpg,.jpeg,.png,.mp3,.wav,.m4a,.ogg,.webm,.mp4,.mov,.avi" style={{ display: "none" }} ref={inputArchivoRef} onChange={e => {}} />
        <button
          type="button"
          title="Adjuntar archivo"
          style={{ background: "transparent", border: "none", color: "#b03a1a", borderRadius: 8, padding: 2, cursor: "pointer", fontSize: 20 }}
          onClick={() => inputArchivoRef.current.click()}
        >📎</button>
        {/* Input */}
        <input
          type="text"
          style={{
            flex: 1,
            borderRadius: 14,
            padding: "11px 13px",
            border: "1.5px solid #e7cabb",
            color: "#4e2d0c",
            fontSize: 15,
            background: "#fff",
            outline: "none"
          }}
          placeholder="Escribe, habla o adjunta archivo…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviarMensaje();
            }
          }}
        />
        {/* Enviar */}
        <button
          type="submit"
          title="Enviar"
          style={{ background: "#b03a1a", color: "#fff", borderRadius: "50%", width: 43, height: 43, border: "none", fontSize: 20, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >➤</button>
        {/* Exportar */}
        <button
          type="button"
          style={{ marginLeft: 7, background: "#fff", color: "#b03a1a", borderRadius: 13, fontWeight: "bold", border: "2px solid #b03a1a", cursor: "pointer", fontSize: 18 }}
          onClick={exportarHistorial}
          title="Exportar historial"
        >
          ⬇️
        </button>
      </form>

      {/* Upgrade Banner */}
      {mostrarUpgrade && <BannerUpgrade onUpgrade={() => setMostrarUpgrade(false)} />}
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
}
