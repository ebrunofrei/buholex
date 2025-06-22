import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InstalarApp from "./components/InstalarApp";
import RutaPrivada from "./components/RutaPrivada";
import LitisBot from "./components/LitisBot";
import BibliotecaDrive from "./components/BibliotecaDrive";
import NoticiasSlider from "./components/NoticiasSlider"; // <--- IMPORTANTE

// Páginas públicas
import Home from "./pages/Home";
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
    <div className="relative min-h-screen">
      {/* Navbar fijo */}
      {!hideNavbar && <Navbar />}
      <div className="flex pt-20">
        {/* Contenido principal */}
        <main className={`flex-1 max-w-4xl mx-auto px-4 w-full ${!hideNavbar ? "lg:pr-80" : ""}`}>
          <Routes>
            {/* Página principal con Home */}
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/biblioteca-drive" element={<BibliotecaDrive />} />
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
        </main>

        {/* Sidebar lateral derecho: solo cuando el navbar NO está oculto y en escritorio */}
        {!hideNavbar && (
          <aside className="hidden lg:flex flex-col w-80 h-[calc(100vh-80px)] fixed top-20 right-0 z-40">
            <NoticiasSlider />
          </aside>
        )}
      </div>
      {/* Footer, instalar app y litisbot flotante */}
      {!hideNavbar && <Footer />}
      {!hideNavbar && <InstalarApp />}
      {!hideNavbar && <LitisBot />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
