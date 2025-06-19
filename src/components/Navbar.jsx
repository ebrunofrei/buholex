// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.2rem 7vw", background: "#0a2647", color: "#fff"
    }}>
      <div style={{ fontWeight: "bold", fontSize: 28, letterSpacing: 1 }}>BúhoLex</div>
      <div>
        <a href="/" style={{ color: "#fff", margin: "0 1rem" }}>Inicio</a>
        <a href="#servicios" style={{ color: "#fff", margin: "0 1rem" }}>Servicios</a>
        <a href="#contacto" style={{ color: "#fff", margin: "0 1rem" }}>Contacto</a>
        <a href="https://litisbot.buholex.com" target="_blank" style={{ color: "#FFD700", margin: "0 1rem", fontWeight: 600 }}>LitisBot</a>
      </div>
    </nav>
  );
}
