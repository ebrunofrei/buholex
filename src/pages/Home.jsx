import React from "react";

export default function Home() {
  return (
    <div style={{
      minHeight: "62vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "2.6rem", fontWeight: 800, margin: "48px 0 10px", color: "#1E2940", letterSpacing: 1.2 }}>BúhoLex</h1>
      <h2 style={{ fontSize: "1.15rem", fontWeight: 500, color: "#CEB067", margin: "14px 0 0" }}>
        Soluciones jurídicas inteligentes y accesibles
      </h2>
      <p style={{ maxWidth: 480, fontSize: "1.1rem", margin: "20px 0 0", textAlign: "center", color: "#1E2940" }}>
        Asesoría legal, defensa penal, redacción de demandas, modelos, biblioteca y más.<br />
        Atención presencial y digital a nivel nacional.
      </p>
      <a href="#contacto" style={{
        background: "#1E2940", color: "#CEB067", borderRadius: 8, padding: "12px 34px", fontSize: 18, marginTop: 30, textDecoration: "none", fontWeight: 600, border: "2px solid #CEB067"
      }}>Contáctanos</a>
    </div>
  );
}
