import React from "react";
import Navbar from "./components/Navbar";
import BannerEslogan from "./components/BannerEslogan";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
// Si usas react-router-dom, importa aquí tus rutas/páginas
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Nosotros from "./pages/Nosotros";
// import Servicios from "./pages/Servicios";
// import Contacto from "./pages/Contacto";

function App() {
  return (
    <div>
      <Navbar />
      <BannerEslogan />

      <main
        style={{
          minHeight: "70vh",
          padding: "32px 12px 0 12px",
          maxWidth: 980,
          margin: "0 auto"
        }}
      >
        {/* Aquí puedes usar rutas o un componente de página */}
        {/* Si usas rutas: */}
        {/* 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        */}
        {/* O si es una sola página: */}
        {/* <Home /> */}
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
