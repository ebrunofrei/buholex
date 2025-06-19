import React from "react";
import buhoLogo from "../assets/buho-institucional.png";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.7rem 5vw", background: "#1E2940", color: "#fff", boxShadow: "0 2px 8px #0001"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src={buhoLogo} alt="BúhoLex" style={{
          width: 48, height: 48, borderRadius: 14, background: "#fff7", objectFit: "cover", boxShadow: "0 1px 6px #2224"
        }} />
        <span style={{
          fontWeight: 700, fontSize: 28, letterSpacing: 1.5, color: "#CEB067"
        }}>
          BúhoLex
        </span>
      </div>
      <div>
        <a href="/" style={{ color: "#fff", margin: "0 1.1rem", textDecoration: "none", fontSize: 18 }}>Inicio</a>
        <a href="#servicios" style={{ color: "#fff", margin: "0 1.1rem", textDecoration: "none", fontSize: 18 }}>Servicios</a>
        <a href="#contacto" style={{ color: "#fff", margin: "0 1.1rem", textDecoration: "none", fontSize: 18 }}>Contacto</a>
        <a href="https://litisbot.buholex.com" target="_blank" style={{
          color: "#CEB067", margin: "0 1.1rem", fontWeight: 600, textDecoration: "none", fontSize: 18
        }}>LitisBot</a>
      </div>
    </nav>
  );
}
