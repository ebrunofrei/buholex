import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InstalarApp from "./components/InstalarApp";

// Páginas
import Landing from "./pages/Landing";
import Bienvenida from "./pages/Bienvenida";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import LitisBot from "./pages/LitisBot";
import Blog from "./pages/Blog";
import Biblioteca from "./pages/Biblioteca";
import Escritorio from "./pages/Escritorio";
import Jurisprudencia from "./pages/Jurisprudencia";
import Codigos from "./pages/Codigos";
import Agenda from "./pages/Agenda";
import OficinaVirtual from "./pages/OficinaVirtual";

// Blog artículo específico
import ArticuloTavara from "./pages/ArticuloTavara";

// Página de error
import Error404 from "./pages/Error404";

function AppContent() {
  const location = useLocation();
  const hideNavbarOnPaths = ["/litisbot"];

  return (
    <>
      {!hideNavbarOnPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/inicio" element={<Landing />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/litisbot" element={<LitisBot />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/articulo-tavara" element={<ArticuloTavara />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/escritorio" element={<Escritorio />} />
        <Route path="/jurisprudencia" element={<Jurisprudencia />} />
        <Route path="/codigos" element={<Codigos />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/oficina-virtual" element={<OficinaVirtual />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
      <InstalarApp />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
