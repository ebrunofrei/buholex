import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const noticias = [
  {
    titulo: "Nuevo servicio de asesoría online",
    fecha: "19/06/2025",
    descripcion: "Ahora puedes acceder a consultoría jurídica totalmente en línea y recibir atención prioritaria.",
    enlace: "https://buholex.com/servicios-online"
  },
  {
    titulo: "Publicación: Demandas modelo 2025",
    fecha: "17/06/2025",
    descripcion: "Descarga gratis modelos actualizados de demandas civiles y penales desde nuestra biblioteca legal.",
    enlace: "https://buholex.com/biblioteca"
  },
  {
    titulo: "BúhoLex en el Congreso Nacional de Derecho",
    fecha: "15/06/2025",
    descripcion: "Fuimos invitados como ponentes en el evento más importante del sector jurídico del país.",
    enlace: "https://buholex.com/eventos"
  },
  // ...hasta 10 noticias
];

export default function CarruselNoticias() {
  const [actual, setActual] = useState(0);
  const [dir, setDir] = useState(0); // dirección de animación
  const timerRef = useRef(null);

  // Detecta si es móvil para ajustar tamaño
  const isMobile = window.innerWidth <= 600;

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDir(1); // slide a la derecha
      setActual((prev) => (prev + 1) % noticias.length);
    }, 10000);

    return () => clearTimeout(timerRef.current);
  }, [actual]);

  // Al hacer click en los indicadores
  const handleSet = (idx) => {
    setDir(idx > actual ? 1 : -1);
    setActual(idx);
  };

  return (
    <div style={{
      position: "fixed",
      top: isMobile ? 75 : 110,
      right: isMobile ? 7 : 34,
      width: isMobile ? "96vw" : 360,
      minWidth: isMobile ? "88vw" : 0,
      maxWidth: isMobile ? "98vw" : 360,
      zIndex: 120,
      background: "#fff",
      border: "1.5px solid #a46a32",
      borderRadius: 13,
      boxShadow: "0 4px 24px #a46a3233",
      padding: isMobile ? "13px 8px 13px 11px" : "19px 20px 17px 20px",
      transition: "box-shadow 0.18s, width 0.14s",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start"
    }}>
      <div style={{
        color: "#1E2940", fontWeight: 700, fontSize: 16, marginBottom: 8, letterSpacing: 0.6
      }}>
        <span role="img" aria-label="noticias">📰</span> Noticias
      </div>
      <div style={{ minHeight: 78, width: "100%", position: "relative", overflow: "hidden" }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={actual}
            custom={dir}
            initial={{ x: dir > 0 ? 370 : -370, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? -370 : 370, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 33, opacity: { duration: 0.22 } }}
            style={{
              position: "absolute",
              width: "97%",
              left: 0,
              top: 0
            }}
          >
            <span style={{
              fontWeight: 700,
              color: "#a46a32",
              fontSize: 17
            }}>
              {noticias[actual].titulo}
            </span>
            <span style={{
              float: "right",
              color: "#7a5833",
              fontSize: 13,
              marginLeft: 12
            }}>
              {noticias[actual].fecha}
            </span>
            <p style={{
              color: "#222",
              fontSize: 15,
              margin: "11px 0 0 0"
            }}>{noticias[actual].descripcion}</p>
            {noticias[actual].enlace && (
              <a
                href={noticias[actual].enlace}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#a46a32",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "underline",
                  marginTop: 8,
                  display: "inline-block"
                }}
              >
                Leer más &rarr;
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Indicadores de páginas */}
      <div style={{
        marginTop: 16,
        alignSelf: "center",
        display: "flex",
        gap: 7
      }}>
        {noticias.map((_, i) =>
          <div
            key={i}
            onClick={() => handleSet(i)}
            style={{
              width: 11, height: 11, borderRadius: "50%",
              background: actual === i ? "#a46a32" : "#e2ceb6",
              border: "1px solid #a46a32",
              cursor: "pointer",
              transition: "background 0.22s"
            }}
            title={`Noticia ${i + 1}`}
          />
        )}
      </div>
    </div>
  );
}
