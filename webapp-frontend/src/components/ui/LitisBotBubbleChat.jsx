import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LitisBotChatBase from "@/components/LitisBotChatBase";
import litisbotLogo from "@/assets/litisbot-logo.png";
import { X } from "lucide-react";

// Rutas donde NO debe mostrarse el bubble (hay chat principal)
const DEFAULT_HIDDEN_PATHS = [
  "/litisbot",
  "/oficinaVirtual/litisbot",
];

export default function LitisBotBubbleChat({
  user,                  // opcional: pásalo desde App si quieres
  hiddenPaths = [],      // rutas extra para ocultar
}) {
  const location = useLocation();

  // ----- Ocultar en rutas con chat principal -----
  const mustHide = [...DEFAULT_HIDDEN_PATHS, ...hiddenPaths].some((path) =>
    path.endsWith("*")
      ? location.pathname.startsWith(path.slice(0, -1))
      : location.pathname === path
  );
  if (mustHide) return null;

  // ----- Estado UI / drag -----
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("litisbot-pos")) || {
          x: window.innerWidth - 90,
          y: window.innerHeight - 120,
        }
      );
    } catch {
      return { x: window.innerWidth - 90, y: window.innerHeight - 120 };
    }
  });
  const [drag, setDrag] = useState(false);
  const [lockDrag, setLockDrag] = useState(false); // evita “arrastrar” mientras escribes/clicks
  const offset = useRef({ x: 0, y: 0 });

  // ----- Drag & Drop nativo -----
  const startDrag = (x, y) => {
    if (lockDrag) return;
    setDrag(true);
    offset.current = { x: x - pos.x, y: y - pos.y };
    document.body.style.userSelect = "none";
  };

  const onMouseDown = (e) => startDrag(e.clientX, e.clientY);
  const onTouchStart = (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY);

  useEffect(() => {
    if (!drag) return;
    const move = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      let x = cx - offset.current.x;
      let y = cy - offset.current.y;
      x = Math.max(10, Math.min(x, window.innerWidth - 80));
      y = Math.max(10, Math.min(y, window.innerHeight - (open ? 460 : 80)));
      setPos({ x, y });
    };
    const up = () => {
      setDrag(false);
      try { localStorage.setItem("litisbot-pos", JSON.stringify(pos)); } catch {}
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [drag, open, pos]);

  useEffect(() => {
    const fix = () =>
      setPos((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 80),
        y: Math.min(prev.y, window.innerHeight - (open ? 460 : 80)),
      }));
    window.addEventListener("resize", fix);
    return () => window.removeEventListener("resize", fix);
  }, [open]);

  // helpers para bloquear drag cuando interactúas dentro del chat
  const lock = () => setLockDrag(true);
  const unlock = () => setLockDrag(false);

  return (
    <>
      {/* Bubble flotante */}
      {!open && (
        <div
          className="fixed z-[9999] cursor-move select-none flex items-center justify-center"
          style={{
            left: pos.x,
            top: pos.y,
            width: 64,
            height: 64,
            borderRadius: 32,
            background: "#6d4a28",
            boxShadow: "0 8px 32px #0002",
            border: "4px solid #fff",
            userSelect: "none",
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          title="Arrastra para mover"
        >
          <button
            className="w-12 h-12 rounded-full bg-[#6d4a28] flex items-center justify-center"
            style={{ border: "none" }}
            onClick={() => setOpen(true)}
            tabIndex={-1}
          >
            <img src={litisbotLogo} alt="LitisBot" className="w-9 h-9" />
          </button>
        </div>
      )}

      {/* Modal/ventana flotante con el chat REAL */}
      {open && (
        <div
          className="fixed z-[10000] bg-white rounded-2xl shadow-xl border border-[#6d4a28] flex flex-col"
          style={{
            left: pos.x,
            top: pos.y,
            width: 360,
            maxWidth: "98vw",
            height: 460,
            minHeight: 340,
            borderRadius: 24,
            userSelect: "none",
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          tabIndex={-1}
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#6d4a28] text-white rounded-t-2xl cursor-move">
            <div className="flex items-center gap-2">
              <img src={litisbotLogo} alt="LitisBot" className="w-7 h-7" />
              <span className="font-bold">LitisBot</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-[#ecd5b0] p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contenido del chat: bloquea drag mientras interactúas */}
          <div
            className="flex-1 overflow-hidden"
            onMouseDown={(e) => { e.stopPropagation(); lock(); }}
            onMouseUp={(e) => { e.stopPropagation(); unlock(); }}
            onTouchStart={(e) => { e.stopPropagation(); lock(); }}
            onTouchEnd={(e) => { e.stopPropagation(); unlock(); }}
          >
            <LitisBotChatBase
              user={user || { uid: "invitado", nombre: "Invitado", pro: false, tipo: "public" }}
              showModal={false}         // el propio bubble gestiona apertura
              setShowModal={() => {}}   // no requerido aquí
            />
          </div>
        </div>
      )}
    </>
  );
}
