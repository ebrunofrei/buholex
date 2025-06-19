// src/components/Footer.jsx
import React from "react";
import SocialBar from "./SocialBar";

export default function Footer() {
  return (
    <footer style={{
      background: "#102841", color: "#eee", padding: "2rem 0 1rem", textAlign: "center", marginTop: 50
    }}>
      <SocialBar />
      <div style={{ marginTop: 18, fontSize: "1.1rem" }}>
        <b>BúhoLex</b> © {new Date().getFullYear()} | contacto@buholex.com <br />
        Jr. Gálvez 844 - Barranca, Perú
      </div>
    </footer>
  );
}
