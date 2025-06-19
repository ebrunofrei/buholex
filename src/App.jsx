import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import BannerEslogan from "./components/BannerEslogan";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import LitisBot from "./pages/LitisBot";
// Agrega aquí otros imports de páginas si tienes

function App() {
  return (
    <Router>
      <div
        style={{
          background: "#faf9f7",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* NAVBAR con LOGO */}
        <Navbar />

        {/* BANNER INSTITUCIONAL */}
        <BannerEslogan />

        {/* CONTENIDO PRINCIPAL */}
        <main
          style={{
            minHeight: "70vh",
            padding: "32px 12px 12px 12px",
            maxWidth: 980,
            margin: "0 auto",
            flex: 1,
            position: "relative"
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/litisbot" element={<LitisBot />} />
            {/* Agrega más rutas aquí */}
          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />

        {/* BOTÓN FLOTANTE WHATSAPP */}
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
