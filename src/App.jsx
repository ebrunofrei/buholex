import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InstalarApp from "./components/InstalarApp";
import RutaPrivada from "./components/RutaPrivada";
import LitisBot from "./components/LitisBot";
import BibliotecaDrive from "./components/BibliotecaDrive"; // << NUEVO

// Páginas públicas
import Landing from "./pages/Landing";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import Biblioteca from "./pages/Biblioteca";
import Blog from "./pages/Blog";
import Jurisprudencia from "./pages/Jurisprudencia";
import Codigos from "./pages/Codigos";
import Noticias from "./pages/Noticias";
import ArticuloBlog from "./pages/ArticuloBlog";
import Nosotros from "./pages/Nosotros";

// Admin
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import SubirLibro from "./pages/admin/SubirLibro";
import ConsultasAdmin from "./pages/admin/ConsultasAdmin";
import PublicarArticulo from "./pages/admin/PublicarArticulo";

// Otros
import LitisBotPagina from "./pages/LitisBot";
import Error404 from "./pages/Error404";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/litisbot";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/biblioteca-drive" element={<BibliotecaDrive />} /> {/* NUEVA BIBLIOTECA DRIVE */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ArticuloBlog />} />
        <Route path="/jurisprudencia" element={<Jurisprudencia />} />
        <Route path="/codigos" element={<Codigos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/litisbot" element={<LitisBotPagina />} />
        <Route path="/nosotros" element={<Nosotros />} />

        {/* Admin protegidas */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<RutaPrivada><DashboardAdmin /></RutaPrivada>} />
        <Route path="/admin/libros" element={<RutaPrivada><SubirLibro /></RutaPrivada>} />
        <Route path="/admin/consultas" element={<RutaPrivada><ConsultasAdmin /></RutaPrivada>} />
        <Route path="/admin/publicar-articulo" element={<RutaPrivada><PublicarArticulo /></RutaPrivada>} />

        {/* Error */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      {!hideNavbar && <Footer />}
      {!hideNavbar && <InstalarApp />}
      {!hideNavbar && <LitisBot />}
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
