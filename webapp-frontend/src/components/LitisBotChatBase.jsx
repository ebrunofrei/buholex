import React, { useState, useRef, useEffect } from "react";
import {
  FaMicrophone, FaVolumeUp, FaPaperclip,
  FaRegCopy, FaRegEdit, FaRegThumbsUp, FaRegThumbsDown
} from "react-icons/fa";
import { MdSend } from "react-icons/md";
import HerramientaTercioPena from "./Herramientas/HerramientaTercioPena";
import HerramientaLiquidacionLaboral from "./Herramientas/HerramientaLiquidacionLaboral";
import { buscarNormas } from "@/services/firebaseNormasService"; // Asegúrate de la ruta

// ---------- HERRAMIENTAS FUNCIONALES -----------
// Puedes separar cada una en su archivo después

function HerramientaMultilingue() {
  const [texto, setTexto] = useState("");
  const [idioma, setIdioma] = useState("en");
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  async function traducir() {
    if (!texto) return;
    setCargando(true);
    try {
      const res = await fetch(
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(texto) + `&langpair=es|${idioma}`
      );
      const data = await res.json();
      const traducido = data?.responseData?.translatedText || "(sin traducción)";
      setResultado(traducido);
    } catch (e) {
      setResultado("Error de traducción");
    }
    setCargando(false);
  }

  return (
    <div className="py-2 flex flex-col gap-3">
      <label className="font-bold">Texto a traducir:</label>
      <textarea
        className="border rounded p-1"
        rows={2}
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe el texto aquí..."
      />
      <div className="flex items-center gap-2">
        <label>Idioma:</label>
        <select className="border p-1 rounded" value={idioma} onChange={e => setIdioma(e.target.value)}>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
          <option value="pt">Portugués</option>
          <option value="it">Italiano</option>
          <option value="de">Alemán</option>
        </select>
        <button className="px-4 py-2 bg-blue-700 text-white rounded" onClick={traducir} disabled={cargando || !texto}>
          {cargando ? "Traduciendo..." : "Traducir"}
        </button>
      </div>
      {resultado && (
        <div className="p-3 bg-gray-100 rounded mt-2">
          <strong>Resultado:</strong> {resultado}
        </div>
      )}
    </div>
  );
}

function HerramientaAnalizador() {
  const [file, setFile] = useState(null);
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleAnalyze() {
    if (!file) return;
    setCargando(true);
    setTimeout(() => {
      const result = `Archivo "${file.name}" analizado: [Extracto legal simulado]`;
      setResultado(result);
      setCargando(false);
    }, 1200);
  }

  return (
    <div className="py-2 flex flex-col gap-3">
      <label className="font-bold">Sube un archivo PDF, Word o audio:</label>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleAnalyze}
        disabled={!file || cargando}
      >
        {cargando ? "Analizando..." : "Analizar"}
      </button>
      {resultado && (
        <div className="p-3 bg-gray-100 rounded mt-3">
          <strong>Resultado:</strong> {resultado}
        </div>
      )}
    </div>
  );
}

function HerramientaAgenda() {
  const [evento, setEvento] = useState("");
  const [fecha, setFecha] = useState("");
  const [agenda, setAgenda] = useState([]);

  function agregarEvento() {
    if (!evento || !fecha) return;
    setAgenda(a => [...a, { evento, fecha }]);
    setEvento(""); setFecha("");
  }

  return (
    <div className="py-2 flex flex-col gap-3">
      <label className="font-bold">Nuevo evento o audiencia:</label>
      <input type="text" className="border rounded p-1" placeholder="Descripción del evento" value={evento} onChange={e => setEvento(e.target.value)} />
      <input type="date" className="border rounded p-1" value={fecha} onChange={e => setFecha(e.target.value)} />
      <button className="px-4 py-2 bg-green-700 text-white rounded" onClick={agregarEvento} disabled={!evento || !fecha}>Agregar a agenda</button>
      <ul className="mt-2">
        {agenda.map((e, idx) => (
          <li key={idx} className="text-sm">📅 <b>{e.evento}</b> para el {e.fecha}</li>
        ))}
      </ul>
    </div>
  );
}

function HerramientaRecordatorios() {
  const [texto, setTexto] = useState("");
  const [fecha, setFecha] = useState("");
  const [records, setRecords] = useState([]);

  function agregarRecordatorio() {
    if (!texto || !fecha) return;
    setRecords(r => [...r, { texto, fecha }]);
    setTexto(""); setFecha("");
  }

  return (
    <div className="py-2 flex flex-col gap-3">
      <label className="font-bold">Nuevo recordatorio:</label>
      <input type="text" className="border rounded p-1" placeholder="¿Qué debes recordar?" value={texto} onChange={e => setTexto(e.target.value)} />
      <input type="datetime-local" className="border rounded p-1" value={fecha} onChange={e => setFecha(e.target.value)} />
      <button className="px-4 py-2 bg-orange-600 text-white rounded" onClick={agregarRecordatorio} disabled={!texto || !fecha}>Agregar recordatorio</button>
      <ul className="mt-2">
        {records.map((r, idx) => (
          <li key={idx} className="text-sm">⏰ <b>{r.texto}</b> para {r.fecha}</li>
        ))}
      </ul>
    </div>
  );
}

function HerramientaAudiencia() {
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState([]);
  const TIPS = [
    "Mantén la calma y pide la palabra con respeto.",
    "Presenta objeciones claramente: relevancia, impertinencia, etc.",
    "Anota los plazos y decisiones del juez en tiempo real.",
    "Pide aclaraciones si alguna parte no es precisa.",
    "Alega siempre con fundamento legal y preciso."
  ];

  function guardarNota() {
    if (!nota) return;
    setNotas(n => [...n, nota]);
    setNota("");
  }

  return (
    <div className="py-2 flex flex-col gap-3">
      <div className="font-bold mb-2">Guía rápida para audiencia:</div>
      <ul className="list-disc ml-5 text-sm text-gray-700">
        {TIPS.map(tip => <li key={tip}>{tip}</li>)}
      </ul>
      <textarea className="border rounded p-2 mt-3" rows={2} placeholder="Agrega una nota rápida sobre tu audiencia" value={nota} onChange={e => setNota(e.target.value)} />
      <button className="px-4 py-2 bg-purple-700 text-white rounded" onClick={guardarNota} disabled={!nota}>Guardar nota</button>
      <ul className="mt-2">
        {notas.map((n, idx) => <li key={idx} className="text-sm">📝 {n}</li>)}
      </ul>
    </div>
  );
}

function HerramientaTraducir() {
  const [texto, setTexto] = useState("");
  const [idioma, setIdioma] = useState("en");
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  async function traducir() {
    if (!texto) return;
    setCargando(true);
    try {
      const res = await fetch(
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(texto) + `&langpair=es|${idioma}`
      );
      const data = await res.json();
      const traducido = data?.responseData?.translatedText || "(sin traducción)";
      setResultado(traducido);
    } catch (e) {
      setResultado("Error de traducción");
    }
    setCargando(false);
  }

  return (
    <div className="py-2 flex flex-col gap-3">
      <label className="font-bold">Texto a traducir:</label>
      <textarea className="border rounded p-1" rows={2} value={texto} onChange={e => setTexto(e.target.value)} placeholder="Escribe el texto aquí..." />
      <div className="flex items-center gap-2">
        <label>Idioma:</label>
        <select className="border p-1 rounded" value={idioma} onChange={e => setIdioma(e.target.value)}>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
          <option value="pt">Portugués</option>
          <option value="it">Italiano</option>
          <option value="de">Alemán</option>
        </select>
        <button className="px-4 py-2 bg-blue-700 text-white rounded" onClick={traducir} disabled={cargando || !texto}>
          {cargando ? "Traduciendo..." : "Traducir"}
        </button>
      </div>
      {resultado && (
        <div className="p-3 bg-gray-100 rounded mt-2">
          <strong>Resultado:</strong> {resultado}
        </div>
      )}
    </div>
  );
}

// --------- MODAL DE HERRAMIENTAS ---------
function ModalHerramientas({ onClose, herramienta, setHerramienta, pro, error, setError }) {
 const HERRAMIENTAS = [
  { label: "Multilingüe", key: "multilingue", pro: false, desc: "Haz tus consultas legales en cualquier idioma." },
  { label: "Modo Audiencia", key: "audiencia", pro: true, desc: "Guía de objeciones, alegatos y tips de litigio para audiencias (PRO)." },
  { label: "Analizar Archivo", key: "analizador", pro: true, desc: "Sube archivos PDF, Word o audio para análisis legal (PRO)." },
  { label: "Traducir", key: "traducir", pro: false, desc: "Traduce textos o documentos legales." },
  { label: "Agenda", key: "agenda", pro: true, desc: "Gestiona tus plazos, audiencias y recordatorios (PRO)." },
  { label: "Recordatorios", key: "recordatorios", pro: true, desc: "Configura alertas importantes para tu práctica legal (PRO)." },
  { label: "Tercio de la Pena", key: "tercio_pena", pro: false, desc: "Calcula el tercio de la pena impuesta según el Código Penal." },
  { label: "Liquidación Laboral", key: "liquidacion_laboral", pro: false, desc: "Calcula CTS, vacaciones, gratificaciones y beneficios sociales." }
];

  function renderHerramienta() {
    switch (herramienta) {
      case "multilingue":
        return <HerramientaMultilingue />;
      case "analizador":
        return <HerramientaAnalizador />;
      case "agenda":
        return <HerramientaAgenda />;
      case "recordatorios":
        return <HerramientaRecordatorios />;
      case "audiencia":
        return <HerramientaAudiencia />;
      case "traducir":
        return <HerramientaTraducir />;
      case "tercio_pena": return <HerramientaTercioPena />;
      case "liquidacion_laboral": return <HerramientaLiquidacionLaboral />;
      default:
        return null;
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
      <div className="bg-white rounded-2xl shadow-lg p-7 min-w-[350px] max-w-md w-full relative border-2 border-yellow-600">
        <button onClick={onClose} className="absolute right-3 top-2 text-yellow-700 text-2xl font-bold">×</button>
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
            <button onClick={() => setHerramienta(null)} className="text-xs text-yellow-700 underline mb-2">← Volver a herramientas</button>
            {renderHerramienta()}
          </>
        )}
        {error && <div className="mt-2 text-red-700 text-sm">{error}</div>}
      </div>
    </div>
  );
}

// MENSAJE BURBUJA
function MensajeBot({ msg, onCopy, onEdit, onFeedback }) {
  const [editando, setEditando] = useState(false);
  const [editValue, setEditValue] = useState(msg.content);
  const [leyendo, setLeyendo] = useState(false);

  function handleSpeak() {
    setLeyendo(true);
    const plain = msg.content.replace(/<[^>]+>/g, " ");
    const speech = new window.SpeechSynthesisUtterance(plain);
    speech.lang = "es-PE";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
    speech.onend = () => setLeyendo(false);
  }

  function handleGuardar() {
    setEditando(false);
    onEdit && onEdit(editValue);
  }
  return (
    <div className="relative group">
      {!editando ? (
        <div className="flex items-center gap-2">
          <div
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: msg.content }}
            style={{ fontSize: 21, color: "#6b2f12" }}
          />
          <button style={{ background: "#5C2E0B", color: "#fff", minWidth: 36, minHeight: 36 }}
            className="p-1 rounded-full flex items-center justify-center hover:bg-yellow-600"
            onClick={handleSpeak} title="Leer este mensaje en voz alta" disabled={leyendo}>
            <FaVolumeUp size={18} />
          </button>
          <button className="ml-1 hover:text-yellow-800" onClick={() => onCopy(msg.content)} title="Copiar"><FaRegCopy /></button>
          <button className="ml-1 hover:text-yellow-800" onClick={() => setEditando(true)} title="Editar"><FaRegEdit /></button>
          <button className="ml-1 hover:text-green-700" onClick={() => onFeedback("up")} title="Me gusta"><FaRegThumbsUp /></button>
          <button className="ml-1 hover:text-red-700" onClick={() => onFeedback("down")} title="No me gusta"><FaRegThumbsDown /></button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input value={editValue} onChange={e => setEditValue(e.target.value)}
            className="border border-yellow-300 px-2 py-1 rounded"
            style={{ fontSize: 20, color: "#6b2f12" }} />
          <button onClick={handleGuardar} className="text-green-700">Guardar</button>
          <button onClick={() => setEditando(false)} className="text-red-700">Cancelar</button>
        </div>
      )}
    </div>
  );
}

// -------------- MENSAJE INICIAL --------------
const INIT_MSG = {
  general: {
    role: "system",
    content: "🦉 Bienvenido a LitisBot. Consulta tus dudas legales y recibe respuestas rápidas y confiables."
  },
  pro: {
    role: "system",
    content: "🦉 Bienvenido al Asistente Legal LitisBot PRO. Analiza expedientes, agenda plazos y recibe ayuda jurídica con herramientas avanzadas."
  }
};

// -------------- COMPONENTE PRINCIPAL --------------
export default function LitisBotChatBase({
  user = {},
  pro = false,
  showModal,
  setShowModal,
  expedientes = []
}) {
  const [adjuntos, setAdjuntos] = useState([]);
const [mensajes, setMensajes] = useState([pro ? INIT_MSG.pro : INIT_MSG.general]);
const [input, setInput] = useState(""); // <--- Aquí
const [grabando, setGrabando] = useState(false); // <--- Y aquí
const [herramienta, setHerramienta] = useState(null);
const [alertaAdjuntos, setAlertaAdjuntos] = useState("");
const [error, setError] = useState("");
const [cargando, setCargando] = useState(false);
const chatEndRef = useRef(null);
const textareaRef = useRef(null);

  const MAX_ADJUNTOS = pro ? 10 : 3;
  const MAX_MB = 25;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 6 * 28)}px`;
    }
  }, [input]);

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    let nuevos = [];
    for (const f of files) {
      if (adjuntos.length + nuevos.length >= MAX_ADJUNTOS) break;
      if (f.size > MAX_MB * 1024 * 1024) {
        setAlertaAdjuntos(`El archivo "${f.name}" supera el máximo de ${MAX_MB} MB y no será adjuntado.`);
        continue;
      }
      nuevos.push(f);
    }
    setAdjuntos(prev => [...prev, ...nuevos]);
  }
  function handleRemoveAdjunto(idx) {
    setAdjuntos(prev => prev.filter((_, i) => i !== idx));
  }

  // ---- Lógica PRINCIPAL de consulta legal ----
  async function handleConsultaLegal(mensaje) {
  setCargando(true);
  let respuesta = "";
  try {
    const historial = mensajes
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => ({ role: m.role, content: m.content }));

    const res = await fetch("/api/ia-litisbotchat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: mensaje,
        historial,
        userId: user?.uid, // asegúrate que el usuario esté autenticado
      }),
    });
    const data = await res.json();
    respuesta = data.respuesta || "Error al obtener respuesta del asistente legal.";
  } catch (err) {
    respuesta = "Error consultando el asistente legal. Intenta nuevamente.";
  }
  setMensajes(msgs => [...msgs, { role: "assistant", content: respuesta }]);
  setCargando(false);
}

  // ---- ENVÍO ----
  async function handleSend(e) {
    e.preventDefault();
    setAlertaAdjuntos("");
    if (adjuntos.length > 0) {
      setMensajes(msgs => [
        ...msgs,
        ...adjuntos.map(file => ({ role: "user", content: `📎 Archivo subido: <b>${file.name}</b>`, tipo: "archivo" })),
        ...adjuntos.map(file => ({ role: "assistant", content: `📑 Archivo recibido: <b>${file.name}</b>.<br /> <b>Simulando análisis IA del documento...</b>`, tipo: "archivo" }))
      ]);
      setAdjuntos([]); setInput(""); return;
    }
    if (!input.trim()) return;
    setMensajes(msgs => [...msgs, { role: "user", content: input }]);
    setInput("");
    await handleConsultaLegal(input);
  }

  const handleVoice = () => {
    if (!grabando) {
      setGrabando(true);
      setInput(input + "[dictado de voz...]");
      setTimeout(() => {
        setGrabando(false);
        setInput(input + " (audio convertido a texto)");
      }, 1200);
    }
  };

  function handleCopy(text) {
    navigator.clipboard.writeText(
      text.replace(/<[^>]+>/g, " ")
    );
  }
  function handleEdit(idx, nuevoTexto) {
    setMensajes(ms =>
      ms.map((m, i) => (i === idx ? { ...m, content: nuevoTexto } : m))
    );
  }
  function handleFeedback(idx, type) {
    setMensajes(ms =>
      ms.map((m, i) => i === idx ? { ...m, feedback: type } : m)
    );
  }

  function closeHerramientas() { setShowModal && setShowModal(false); setHerramienta(null); }
  function handleAbrirHerramientas() { setShowModal(true); setHerramienta(null); }
  function handleHerramientaClick(key) { setHerramienta(key); }

  return (
    <div
      className="flex flex-col w-full items-center bg-white"
      style={{ minHeight: "100vh" }}
      onPaste={e => {
        if (e.clipboardData.files && e.clipboardData.files.length > 0) {
          handleFileChange({ target: { files: e.clipboardData.files } });
        }
      }}
    >
      <div
        className="flex flex-col justify-end w-full max-w-4xl mx-auto h-[72vh] max-h-[80vh] overflow-y-auto bg-white"
        style={{ marginTop: 30, marginBottom: 18, borderRadius: 32, boxShadow: "0 4px 28px 0 #0001" }}
      >
        <div className="flex flex-col gap-2 w-full">
          {mensajes.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} w-full`}>
              <div
                className={`
                  px-6 py-4 rounded-[2.5rem] shadow max-w-[85%] break-words
                  ${m.role === "user"
                    ? "bg-brown-700 text-white self-end"
                    : "bg-yellow-50 text-brown-900 self-start"
                  } text-[21px] font-medium relative`}
                style={{ border: 0 }}
              >
                {m.role === "assistant" ? (
                  <MensajeBot
                    msg={m}
                    onCopy={handleCopy}
                    onEdit={nuevo => handleEdit(i, nuevo)}
                    onFeedback={type => handleFeedback(i, type)}
                  />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: m.content }} />
                )}
              </div>
            </div>
          ))}
          {cargando && (
            <div className="flex justify-start w-full">
              <div className="px-6 py-4 rounded-[2.5rem] shadow bg-yellow-100 text-brown-700 text-[21px] font-medium">Buscando en bases legales...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      {/* Barra de entrada EXPANDIBLE */}
      <form
        className="w-full max-w-4xl mx-auto flex items-end gap-2 bg-white shadow-xl rounded-[2.5rem] border-2 border-yellow-300 px-4 py-2 mt-2"
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 50,
          minHeight: 62,
          transition: "min-height 0.2s"
        }}
        onSubmit={handleSend}
      >
        {/* Adjuntar archivo */}
        <label
          style={{ background: "#5C2E0B", color: "#fff" }}
          className={`hover:bg-yellow-600 p-2 rounded-full cursor-pointer flex-shrink-0 ${adjuntos.length >= MAX_ADJUNTOS ? "opacity-40 pointer-events-none" : ""}`}
          title={`Adjuntar archivo (máx. ${MAX_ADJUNTOS}, hasta ${MAX_MB} MB c/u)`}
        >
          <FaPaperclip size={24} />
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            disabled={adjuntos.length >= MAX_ADJUNTOS}
          />
        </label>
        {adjuntos.map((adj, idx) => (
          <div key={idx} className="relative mr-2 flex-shrink-0 group">
            {adj.type && adj.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(adj)}
                alt={adj.name}
                className="rounded-xl w-28 h-20 object-cover border-2 border-yellow-400 shadow"
                style={{ minWidth: 80, minHeight: 60, maxWidth: 120, maxHeight: 80 }}
              />
            ) : (
              <div
                className="bg-yellow-50 border-2 border-yellow-300 rounded-xl flex flex-col items-center justify-center text-brown-700 font-bold"
                style={{ width: 120, height: 80, fontSize: 15, padding: 8 }}
              >
                <div style={{ fontSize: 32, marginBottom: 2 }}>
                  {adj.name.toLowerCase().endsWith(".pdf")
                    ? "📄"
                    : adj.name.toLowerCase().endsWith(".doc") || adj.name.toLowerCase().endsWith(".docx")
                      ? "📝"
                      : adj.name.toLowerCase().endsWith(".xls") || adj.name.toLowerCase().endsWith(".xlsx")
                        ? "📊"
                        : "📎"}
                </div>
                <div
                  className="truncate w-full text-center"
                  title={adj.name}
                  style={{
                    fontSize: 13,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {adj.name.length > 18 ? adj.name.slice(0, 17) + "…" : adj.name}
                </div>
              </div>
            )}
            <button
              type="button"
              className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-80 group-hover:opacity-100 transition"
              onClick={() => handleRemoveAdjunto(idx)} tabIndex={-1}
              style={{ fontSize: 16, lineHeight: 1 }}
              title="Eliminar archivo"
            >×</button>
          </div>
        ))}
        {/* Entrada de texto EXPANDIBLE */}
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent outline-none px-3 py-3 text-[19px] font-medium text-brown-700 border-none resize-none"
          placeholder="Escribe o pega tu pregunta legal aquí…"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={grabando}
          rows={1}
          style={{
            minHeight: 40,
            maxHeight: 168,
            overflowY: "auto"
          }}
        />
        {/* Micrófono (dictado por voz) */}
        <button
          type="button"
          style={{ background: "#5C2E0B", color: "#fff", minWidth: 40, minHeight: 40 }}
          className="p-2 rounded-full flex items-center justify-center hover:bg-yellow-600"
          title="Dictar voz"
          onClick={handleVoice}
          disabled={grabando}
        >
          <FaMicrophone size={22} />
        </button>
        {/* Botón enviar */}
        <button
          type="submit"
          style={{ background: "#5C2E0B", color: "#fff", minWidth: 48, minHeight: 48, fontWeight: 'bold' }}
          className={`p-2 rounded-full flex items-center justify-center hover:bg-yellow-600 transition
            ${(!input.trim() && adjuntos.length === 0) ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!input.trim() && adjuntos.length === 0 || cargando}
          title="Enviar"
        >
          <MdSend size={26} />
        </button>
      </form>
      {alertaAdjuntos && (
        <div className="text-red-600 text-center w-full pb-2">{alertaAdjuntos}</div>
      )}
      {error && <div className="p-2 mt-2 text-red-700 text-lg">{error}</div>}

      {/* MODAL HERRAMIENTAS */}
      {showModal && (
        <ModalHerramientas
          onClose={closeHerramientas}
          herramienta={herramienta}
          setHerramienta={setHerramienta}
          handleHerramientaClick={handleHerramientaClick}
          pro={pro}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
}
