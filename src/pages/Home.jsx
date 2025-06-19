import React from "react";
import CarruselNoticias from "../components/CarruselNoticias";

export default function Home() {
  return (
    <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
      <CarruselNoticias />
      <h1 style={{
        fontSize: "2.2rem",
        fontWeight: 800,
        margin: "46px 0 18px 0",
        color: "#1E2940",
        letterSpacing: 1.2
      }}>
        Bienvenido a <span style={{ color: "#a46a32" }}>BúhoLex</span>
      </h1>
      <h2 style={{
        fontSize: "1.15rem",
        fontWeight: 500,
        color: "#a46a32",
        margin: "0 0 24px 0"
      }}>
        Soluciones jurídicas inteligentes y accesibles para todos
      </h2>
      <hr style={{ marginBottom: 32 }} />
      {/* Agrega aquí más contenido si deseas */}
    </div>
  );
}

