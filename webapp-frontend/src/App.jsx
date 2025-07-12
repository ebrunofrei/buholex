import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// CONTEXTOS
import { LitisBotChatProvider } from "./context/LitisBotChatContext";
import { NoticiasProvider } from "./context/NoticiasContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LitisBotProvider } from "./context/LitisBotContext";

// COMPONENTES GENERALES
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InstalarApp from "./components/InstalarApp";
import RutaPrivada from "./components/RutaPrivada";
import NoticiasSlider from "./components/NoticiasSlider";
import NoticiasBotonFlotante from "./components/ui/NoticiasBotonFlotante";
import ModalLogin from "./components/ModalLogin";
import RecuperarPassword from "./components/RecuperarPassword";

// LITISBOT
import LitisBotPagina from "./pages/LitisBot";

// OFICINA VIRTUAL MODULAR
import Sidebar from "./components/Sidebar";
import Oficina from "./oficinaVirtual/pages/Oficina";
import ListaExpedientes from "./oficinaVirtual/components/ListaExpedientes";
import Expedientes from "./oficinaVirtual/pages/Expedientes";
import CasillaExpedientes from "./oficinaVirtual/pages/CasillaExpedientes";
import ExpedienteDetalle from "./oficinaVirtual/pages/ExpedienteDetalle";
import ExpedienteJudicialDetalle from "./oficinaVirtual/pages/ExpedienteJudicialDetalle";
import ExpedienteAdministrativoDetalle from "./oficinaVirtual/pages/ExpedienteAdministrativoDetalle";
import Biblioteca from "./oficinaVirtual/pages/Biblioteca";
import Agenda from "./oficinaVirtual/pages/Agenda";
import LitisBotAudienciaPage from "./oficinaVirtual/pages/LitisBotAudiencia";
import Notificaciones from "./oficinaVirtual/pages/Notificaciones";
import Perfil from "./oficinaVirtual/pages/Perfil";
import HazteConocido from "./oficinaVirtual/pages/HazteConocido";
import FirmarEscrito from "./oficinaVirtual/pages/escritorio/FirmarEscrito"; // <- ASEGÚRATE QUE ESTE ARCHIVO Y EXPORT EXISTEN
import ChatLitisBotExpediente from "./oficinaVirtual/components/ChatLitisBotExpediente";

// PÁGINAS PÚBLICAS Y ADMIN
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import BibliotecaJ from "./pages/Biblioteca";
import Jurisprudencia from "./pages/Jurisprudencia";
import Codigos from "./pages/Codigos";
import Noticias from "./pages/Noticias";
import ArticuloBlog from "./pages/ArticuloBlog";
import Nosotros from "./pages/Nosotros";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import SubirLibro from "./pages/admin/SubirLibro";
import ConsultasAdmin from "./pages/admin/ConsultasAdmin";
import PublicarArticulo from "./pages/admin/PublicarArticulo";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import MiCuenta from "./pages/MiCuenta";
import HistorialArchivos from "./pages/HistorialArchivos";
import BibliotecaDrive from "./components/BibliotecaDrive";

// FIREBASE AUTH + FCM
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "./services/firebaseConfig";
const VAPID_KEY = "BK_FdBKoZZeavWPaEvAjEY5GZDI7gs-Kpt05ctgk4aUfp_mdT-aqDdnaefwu8pMAUvNDTaghKrhDnpI0Ej9PgUU";

function useFirebaseAuthAndFcm() {
  React.useEffect(() => {
    const auth = getAuth(app);
    const messaging = getMessaging(app);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      } else if (!user.isAnonymous) {
        try {
          if (window.Notification && Notification.permission !== "granted") {
            await Notification.requestPermission();
          }
          const token = await getToken(messaging, { vapidKey: VAPID_KEY });
          if (token) {
            console.log("FCM Token:", token);
          }
        } catch (err) {
          console.warn("No se pudo obtener el token FCM: " + err.message);
        }
      }
    });
    return () => unsub();
  }, []);
}

function OficinaVirtualLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4">{children}</main>
    </div>
  );
}

function AppContent() {
  useFirebaseAuthAndFcm();
  const { usuario, loading, abrirLogin } = useAuth?.() || {};
  const location = useLocation();
  const enOficinaVirtual = /^\/oficinaVirtual(\/|$)/.test(location.pathname);
  const hideNavbar = location.pathname === "/litisbot";

  function BibliotecaProtegida() {
    if (loading) return <div className="text-center mt-16">Verificando acceso...</div>;
    if (!usuario) {
      return (
        <div className="text-center p-10">
          <p>Inicia sesión para acceder a la Biblioteca Jurídica.</p>
          <button onClick={abrirLogin} className="bg-[#a52e00] text-white px-4 py-2 rounded shadow">
            Iniciar sesión
          </button>
          <div className="mt-2 text-sm text-center">
            <button onClick={() => abrirLogin("recuperar")} className="text-blue-700 underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>
      );
    }
    return <BibliotecaJ />;
  }

  return (
    <div className="relative min-h-screen">
      {!enOficinaVirtual && (
        <>
          {!hideNavbar && <Navbar />}
          <div className="flex pt-20">
            <main className={`flex-1 max-w-4xl mx-auto px-4 w-full ${!hideNavbar ? "lg:pr-80" : ""}`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/oficina" element={<Navigate to="/oficinaVirtual" replace />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/biblioteca" element={<BibliotecaProtegida />} />
                <Route path="/biblioteca-drive" element={<BibliotecaDrive />} />
                <Route path="/recuperar" element={<RecuperarPassword />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<ArticuloBlog />} />
                <Route path="/jurisprudencia" element={<Jurisprudencia />} />
                <Route path="/codigos" element={<Codigos />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/litisbot" element={<LitisBotPagina />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/login" element={<Login />} />
                <Route path="/historial-archivos" element={<HistorialArchivos />} />
                <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
                <Route path="/mi-cuenta" element={<RutaPrivada><MiCuenta /></RutaPrivada>} />
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route path="/admin" element={<RutaPrivada redir="/admin/login">{<DashboardAdmin />}</RutaPrivada>} />
                <Route path="/admin/libros" element={<RutaPrivada>{<SubirLibro />}</RutaPrivada>} />
                <Route path="/admin/consultas" element={<RutaPrivada>{<ConsultasAdmin />}</RutaPrivada>} />
                <Route path="/admin/publicar-articulo" element={<RutaPrivada>{<PublicarArticulo />}</RutaPrivada>} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </main>
            {!hideNavbar && (
              <aside className="hidden lg:flex flex-col w-80 h-[calc(100vh-80px)] fixed top-20 right-0 z-40">
                <NoticiasSlider />
              </aside>
            )}
          </div>
          {!hideNavbar && <Footer />}
          {!hideNavbar && <InstalarApp />}
          <NoticiasBotonFlotante />
          <ModalLogin />
        </>
      )}

      {enOficinaVirtual && (
        <OficinaVirtualLayout>
          <Routes>
            <Route path="/oficinaVirtual" element={<Oficina />} />
            <Route path="/oficinaVirtual/casilla-expedientes" element={<CasillaExpedientes />} />
            <Route path="/oficinaVirtual/expediente-jud/:id" element={<ExpedienteJudicialDetalle />} />
            <Route path="/oficinaVirtual/expediente-adm/:id" element={<ExpedienteAdministrativoDetalle />} />
            <Route path="/oficinaVirtual/expedientes/:expedienteId" element={<ExpedienteDetalle />} />
            <Route path="/oficinaVirtual/biblioteca" element={<Biblioteca />} />
            <Route path="/oficinaVirtual/agenda" element={<Agenda />} />
            <Route path="/oficinaVirtual/litisbot" element={<LitisBotAudienciaPage />} />
            <Route path="/oficinaVirtual/firmar-escrito" element={<FirmarEscrito />} /> {/* ✅ CORRECTO */}
            <Route path="/oficinaVirtual/notificaciones" element={<Notificaciones />} />
            <Route path="/oficinaVirtual/noticias" element={<Noticias />} />
            <Route path="/oficinaVirtual/perfil" element={<Perfil />} />
            <Route path="/oficinaVirtual/hazte-conocido" element={<HazteConocido />} />
            <Route path="*" element={<Oficina />} />
          </Routes>
        </OficinaVirtualLayout>
      )}

      <ChatLitisBotExpediente />
    </div>
  );
}

export default function App() {
  return (
    <LitisBotChatProvider>
      <NoticiasProvider>
        <AuthProvider>
          <LitisBotProvider>
            <Router>
              <AppContent />
            </Router>
          </LitisBotProvider>
        </AuthProvider>
      </NoticiasProvider>
    </LitisBotChatProvider>
  );
}
