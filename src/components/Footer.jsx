import React from "react";
import SocialBar from "./SocialBar";

export default function Footer() {
  return (
    <footer style={{
      background: "#1E2940", color: "#fff", padding: "2rem 0 1rem", textAlign: "center"
    }}>
      <SocialBar />
      <div style={{ marginTop: 14, fontSize: "1.08rem" }}>
        <b style={{ color: "#CEB067" }}>BúhoLex</b> © {new Date().getFullYear()} | <span style={{ color: "#CEB067" }}>contacto@buholex.com</span>
        <br />
        <span style={{ color: "#CEB067" }}>Jr. Gálvez 844 - Barranca, Perú</span>
      </div>
    </footer>
  );
}
