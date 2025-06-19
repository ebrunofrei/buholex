import React from "react";
import CarruselNoticias from "../components/CarruselNoticias";
// Si quieres el banner solo aquí, importa y úsalo, si no ya está en App.jsx:
// import BannerEslogan from "../components/BannerEslogan";
import Noticias from "./Noticias"; // Si tienes un listado de noticias tradicional

export default function Home() {
  return (
    <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
      {/* Banner del eslogan SOLO si no lo tienes global en App.jsx */}
      {/* <BannerEslogan /> */}

      {/* Carrusel de noticias (slide y responsive) */}
      <CarruselNoticias />

      {/* Bienvenida principal */}
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

      {/* Otras secciones o contenido de la página de inicio */}
      <Noticias />
      {/* Puedes seguir agregando más secciones aquí */}
    </div>
  );
}

