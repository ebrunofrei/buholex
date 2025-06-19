import React, { useState } from "react";
import buhoLogo from "../assets/buho-institucional.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      background: "#1E2940",
      color: "#fff",
      boxShadow: "0 2px 8px #0001",
      position: "sticky",
      top: 0,
      zIndex: 20,
      width: "100%",
      minHeight: 62
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0.7rem 5vw", maxWidth: 1400, margin: "0 auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={buhoLogo} alt="BúhoLex" style={{
            width: 42, height: 42, borderRadius: 13, background: "#fff8", objectFit: "cover", boxShadow: "0 1px 6px #2224"
          }} />
          <span style={{
            fontWeight: 700, fontSize: 25, letterSpacing: 1.5, color: "#a46a32"
          }}>
            BúhoLex
          </span>
        </div>
        <div className="nav-links" style={{
          display: "flex", gap: "1.5rem", alignItems: "center"
        }}>
          <div className="menu-desktop" style={{
            display: window.innerWidth > 800 ? "flex" : "none"
          }}>
            <a href="/" style={navLink}>Inicio</a>
            <a href="#servicios" style={navLink}>Servicios</a>
            <a href="#contacto" style={navLink}>Contacto</a>
            <a href="https://litisbot.buholex.com" target="_blank" style={{ ...navLink, color: "#a46a32", fontWeight: 700 }}>LitisBot</a>
          </div>
          {/* Menú hamburguesa móvil */}
          <button
            className="hamburger"
            style={{
              background: "none",
              border: "none",
              display: window.innerWidth <= 800 ? "block" : "none",
              cursor: "pointer",
              padding: 0,
              marginLeft: 12
            }}
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
          >
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.22 }}
              style={{ fontSize: 34, color: "#a46a32" }}
            >☰</motion.div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "#1E2940",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 0 20px 0"
            }}
          >
            <a href="/" style={navLinkMobile} onClick={() => setOpen(false)}>Inicio</a>
            <a href="#servicios" style={navLinkMobile} onClick={() => setOpen(false)}>Servicios</a>
            <a href="#contacto" style={navLinkMobile} onClick={() => setOpen(false)}>Contacto</a>
            <a href="https://litisbot.buholex.com" target="_blank" style={{ ...navLinkMobile, color: "#a46a32", fontWeight: 700 }} onClick={() => setOpen(false)}>LitisBot</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const navLink = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 18,
  fontWeight: 500,
  padding: "6px 0",
  borderRadius: 6,
  margin: "0 8px",
  transition: "background 0.16s, color 0.16s"
};

const navLinkMobile = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 22,
  fontWeight: 600,
  margin: "13px 0",
  transition: "color 0.2s",
};
