import React from "react";
import buhoLogo from "../assets/buho-institucional.png";

export default function Home() {
  return (
    <div style={{
      minHeight: "65vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #f7faff 0%, #e3ebf7 100%)"
    }}>
      <img src={buhoLogo} alt="BúhoLex" style={{ width: 120, margin: "48px 0 20px", borderRadius: "32px", boxShadow: "0 2px 24px #20529544" }} />
      <h1 style={{ fontSize: "2.8rem", fontWeight: 800, margin: 0, color: "#003366" }}>BúhoLex</h1>
      <h2 style={{ fontSize: "1.2rem", fontWeight: 400, color: "#205295", margin: "14px 0 0" }}>
        Soluciones jurídicas inteligentes y accesibles
      </h2>
      <p style={{ maxWidth: 480, fontSize: "1.1rem", margin: "20px 0 0", textAlign: "center", color: "#133049" }}>
        Asesoría legal, defensa penal, redacción de demandas, modelos, biblioteca y más.<br />
        Atención presencial y digital a nivel nacional.
      </p>
      <a href="#contacto" style={{
        background: "#205295", color: "#fff", borderRadius: 8, padding: "12px 34px", fontSize: 18, marginTop: 30, textDecoration: "none"
      }}>Contáctanos</a>
    </div>
  );
}
