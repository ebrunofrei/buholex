import React from "react";
import Noticias from "./Noticias";
import { motion } from "framer-motion"; // Si no tienes instalado, haz: npm install framer-motion

export default function Home() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {/* Banner del eslogan */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: "#fff7e6",
          border: "1.5px solid #a46a32",
          color: "#a46a32",
          borderRadius: 12,
          fontWeight: 600,
          fontSize: "1.13rem",
          maxWidth: 510,
          margin: "22px auto 30px auto",
          boxShadow: "0 1px 12px #a46a3222",
          padding: "13px 24px",
          letterSpacing: 0.3,
        }}
      >
        <span style={{ fontWeight: 700, color: "#a46a32" }}>
          BúhoLex:
        </span>{" "}
        justicia sin privilegios.{" "}
        <span style={{ color: "#1e2940", fontWeight: 500 }}>
          LitisBot te acompaña y te defiende.
        </span>
      </motion.div>

      <h1 style={{
        fontSize: "2.2rem",
        fontWeight: 800,
        margin: "10px 0 18px 0",
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
      <hr />
      <Noticias />
    </div>
  )

