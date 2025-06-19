import React from "react";
import CarruselNoticias from "../components/CarruselNoticias";

export default function Home() {
  return (
    <div style={{
      width: "100%",
      minHeight: "78vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#faf9f7"
    }}>
      {/* Banner de eslogan institucional */}
      <div style={{
        width: "100%",
        background: "#fff6eb",
        padding: "18px 0",
        borderBottom: "2px solid #b88b47",
        boxShadow: "0 2px 16px #b88b4712",
        textAlign: "center",
        fontSize: 20,
        fontWeight: 700,
        color: "#b88b47",
        letterSpacing: 1.1,
        marginBottom: 20
      }}>
        <span>
          <span style={{ color: "#b88b47", fontWeight: 900 }}>BúhoLex: justicia sin privilegios.</span>  
          <span style={{ color: "#1E2940", fontWeight: 600, marginLeft: 8 }}>
            LitisBot te acompaña y te defiende.
          </span>
        </span>
      </div>
      {/* Bienvenida y slogan */}
      <div style={{
        marginTop: 44,
        marginBottom: 18,
        textAlign: "center",
        maxWidth: 700
      }}>
        <h1 style={{
          fontSize: 42,
          color: "#1E2940",
          fontWeight: 800,
          marginBottom: 5,
          letterSpacing: 1
        }}>
          Bienvenido a <span style={{ color: "#b88b47" }}>BúhoLex</span>
        </h1>
        <div style={{
          color: "#b88b47",
          fontWeight: 600,
          fontSize: 23,
          marginBottom: 22
        }}>
          Soluciones jurídicas inteligentes y accesibles para todos
        </div>
        <div style={{
          height: 3, width: 250,
          background: "#b88b47", borderRadius: 2,
          margin: "0 auto 25px auto"
        }} />
      </div>
      {/* Carrusel de Noticias (ajustado, en Desktop solo) */}
      <div style={{
        position: "absolute",
        top: 56, right: 30,
        maxWidth: 500, minWidth: 320,
        zIndex: 100
      }}>
        <CarruselNoticias />
      </div>
    </div>
  );
}

