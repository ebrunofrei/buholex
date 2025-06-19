import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      style={{
        minHeight: "62vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 10px"
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 style={{
        fontSize: "2.3rem",
        fontWeight: 800,
        margin: "48px 0 10px",
        color: "#1E2940",
        letterSpacing: 1.2,
        textAlign: "center"
      }}>
        BúhoLex
      </h1>
      <h2 style={{
        fontSize: "1.12rem",
        fontWeight: 500,
        color: "#CEB067",
        margin: "12px 0 0",
        textAlign: "center"
      }}>
        Soluciones jurídicas inteligentes y accesibles
      </h2>
      <p style={{
        maxWidth: 480,
        fontSize: "1.1rem",
        margin: "20px 0 0",
        textAlign: "center",
        color: "#1E2940"
      }}>
        Asesoría legal, defensa penal, redacción de demandas, modelos, biblioteca y más.<br />
        Atención presencial y digital a nivel nacional.
      </p>
      <motion.a
        href="#contacto"
        style={{
          background: "#1E2940",
          color: "#CEB067",
          borderRadius: 8,
          padding: "12px 34px",
          fontSize: 18,
          marginTop: 30,
          textDecoration: "none",
          fontWeight: 600,
          border: "2px solid #CEB067",
          boxShadow: "0 2px 18px #1e294011"
        }}
        whileHover={{ scale: 1.08, boxShadow: "0 4px 30px #ceb06730" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 17 }}
      >
        Contáctanos
      </motion.a>
    </motion.div>
  );
}

