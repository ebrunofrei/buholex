import React from "react";
import SocialBar from "./SocialBar";

export default function Footer() {
  return (
    <footer style={{
      background: "#003366", color: "#eee", padding: "2rem 0 1rem", textAlign: "center"
    }}>
      <SocialBar />
      <div style={{ marginTop: 14, fontSize: "1.05rem" }}>
        <b>BúhoLex</b> © {new Date().getFullYear()} | contacto@buholex.com <br />
        Jr. Gálvez 844 - Barranca, Perú
      </div>
    </footer>
  );
}
