import React, { useState } from "react";
import buhoLogo from "../assets/buho-institucional.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      background: "#1E2940", color: "#fff", boxShadow: "0 2px 8px #0001",
      position: "sticky", top: 0, zIndex: 20, width: "100%", minHeight: 62
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0.7rem 5vw", maxWidth: 1400, margin: "0 auto"
      }}>
        {/* Logo + nombre */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={buhoLogo} alt="BúhoLex" style={{
            width: 44, height: 44, borderRadius: 13, background: "#fff8", objectFit: "cover", boxShadow: "0 1px 6px #2224"
          }} />
          <span style={{
            fontWeight: 700, fontSize: 25, letterSpacing: 1.5, color: "#CEB067"
          }}>
            BúhoLex
          </span>
        </div>
        {/* Menú PC */}
        <div className="nav-links" style={{
          display: "flex",
          gap: "1.1rem",
          alignItems: "center"
        }}>
          <div className="menu-desktop" style={{
            display: window.innerWidth > 800 ? "flex" : "none"
          }}>
            <a href="/" style={navLink}>Inicio</a>
            <a href="#servicios" style={navLink}>Servicios</a>
            <a href="#contacto" style={navLink}>Contacto</a>
            <a href="https://litisbot.buholex.com" target="_blank" style={{ ...navLink, color: "#CEB067", fontWeight: 600 }}>LitisBot</a>
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
              transition={{ duration: 0.25 }}
              style={{ fontSize: 34, color: "#CEB067" }}
            >☰</motion.div>
          </button>
        </div>
      </div>
      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
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
            <a href="https://litisbot.buholex.com" target="_blank" style={{ ...navLinkMobile, color: "#CEB067", fontWeight: 600 }} onClick={() => setOpen(false)}>LitisBot</a>
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
  padding: "5px 0",
  transition: "color 0.18s",
};

const navLinkMobile = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 22,
  fontWeight: 500,
  margin: "13px 0",
  transition: "color 0.2s",
};
