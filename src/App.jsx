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
// Puedes agregar más rutas según tu estructura

function App() {
  return (
    <Router>
      <div style={{ background: "#faf9f7", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <BannerEslogan />

        <main style={{
          minHeight: "70vh",
          padding: "32px 12px 12px 12px",
          maxWidth: 980,
          margin: "0 auto",
          flex: 1
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/litisbot" element={<LitisBot />} />
            {/* Agrega más rutas aquí según necesites */}
          </Routes>
        </main>

        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
