import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/ui/Footer";
import InstalarApp from "./components/ui/InstalarApp";

// Páginas principales
import Landing from "./pages/Landing";
import Bienvenida from "./pages/Bienvenida";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import LitisBot from "./pages/LitisBot";
import Blog from "./pages/Blog";
import Biblioteca from "./pages/Biblioteca";
import Escritorio from "./pages/Escritorio";
import Error404 from "./pages/Error404";

function App() {
  const location = useLocation();
  // Opcional: oculta la barra de navegación en ciertas rutas
  const hideNavbarOnPaths = ["/"];

  return (
    <>
      {!hideNavbarOnPaths.includes(location.pathname) && <Navbar />}
      <InstalarApp />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/litisbot" element={<LitisBot />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/escritorio" element={<Escritorio />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
