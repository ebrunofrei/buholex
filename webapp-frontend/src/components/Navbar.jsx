// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoBuhoLex from "../assets/buho-institucional.png";
import { useAuth } from "../context/AuthContext";

const getInitials = (name, email) =>
  (name?.split(" ").map(w => w[0]).join("").toUpperCase() || email?.[0]?.toUpperCase() || "?");

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const menuUserRef = useRef(null);
  const location = useLocation();
  const {
    usuario,
    isPremium,
    emailVerificado,
    abrirModalLogin,
    cerrarSesion,
    setToast,
    loading,
  } = useAuth();

  // Solo mostrar Drawer/Sidebar fuera de Oficina Virtual
  const enOficina = location.pathname.startsWith("/oficina");

  // Cierra menú de usuario al hacer clic afuera
  useEffect(() => {
    function handleClick(e) {
      if (menuUserRef.current && !menuUserRef.current.contains(e.target)) {
        setMenuUser(false);
      }
    }
    if (menuUser) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuUser]);

  // Menú principal
  const menu = [
    { label: "Inicio", to: "/" },
    { label: "Servicios", to: "/servicios" },
    { label: "Jurisprudencia", to: "/jurisprudencia" },
    { label: "Códigos", to: "/codigos" },
    { label: "Biblioteca", to: "/biblioteca" },
    { label: "Agenda", to: "/agenda" },
    { label: "Contacto", to: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-[#b03a1a] shadow-lg border-b-2 border-[#942813]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 md:px-4 py-2">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 min-w-[140px]">
          <img src={logoBuhoLex} alt="BúhoLex" className="h-10 w-10 rounded-md shadow" />
          <span className="text-white font-extrabold text-2xl tracking-widest drop-shadow-lg">BúhoLex</span>
        </Link>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex gap-5 items-center ml-8">
          {menu.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`px-2 font-semibold tracking-wide transition-colors rounded-md ${
                location.pathname === to
                  ? "bg-white text-[#b03a1a] shadow font-bold"
                  : "text-white hover:bg-[#942813] hover:text-[#fff6e6]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-2">
          {loading ? (
            <span className="text-white text-sm animate-pulse px-2">Cargando...</span>
          ) : !usuario || usuario.isAnonymous ? (
            <>
              <button
                onClick={() => abrirModalLogin("login")}
                className="bg-white text-[#a52e00] px-3 py-1 rounded shadow ml-2 font-semibold"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => abrirModalLogin("register")}
                className="border border-white px-3 py-1 rounded font-semibold text-white ml-2 hover:bg-[#fff6e6] hover:text-[#b03a1a]"
              >
                Registrarse
              </button>
              <button
                onClick={() => abrirModalLogin("recuperar")}
                className="ml-2 text-white underline text-xs"
                title="Recuperar contraseña"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </>
          ) : (
            // BOTÓN AVATAR EXTREMADAMENTE A LA DERECHA
            <button
              className="w-10 h-10 flex items-center justify-center bg-[#b03a1a] rounded-full text-white font-bold text-lg relative"
              onClick={() => setMenuUser((v) => !v)}
              aria-label="Menú de usuario"
              style={{ marginLeft: "auto" }}
            >
              {usuario.photoURL ? (
                <img src={usuario.photoURL} alt="avatar" className="w-10 h-10 rounded-full border" />
              ) : (
                getInitials(usuario.displayName, usuario.email)
              )}
            </button>
          )}
        </div>

        {/* MENÚ HAMBURGUESA (MOBILE) - SOLO SI NO ESTÁS EN OFICINA VIRTUAL */}
        {!enOficina && (
          <button
            className="md:hidden ml-2 text-white text-3xl"
            onClick={() => setOpenMenu((o) => !o)}
            aria-label="Abrir menú"
          >
            <span className="material-icons">menu</span>
          </button>
        )}
      </div>

      {/* MOBILE DRAWER MENU (solo fuera de Oficina Virtual) */}
      {!enOficina && openMenu && (
        <div className="fixed inset-0 z-40 bg-black/50 flex justify-start md:hidden">
          <div className="bg-white w-72 h-full p-5 flex flex-col gap-3 animate-fade-in-left shadow-lg relative">
            <button
              className="absolute top-4 right-5 text-2xl"
              onClick={() => setOpenMenu(false)}
            >✖️</button>
            {menu.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpenMenu(false)}
                className={`block px-3 py-2 rounded-md text-lg font-semibold ${
                  location.pathname === to
                    ? "bg-[#b03a1a] text-white"
                    : "text-[#b03a1a] hover:bg-[#f6e0d6]"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              {loading ? (
                <span className="text-[#b03a1a] animate-pulse">Cargando...</span>
              ) : !usuario || usuario.isAnonymous ? (
                <>
                  <button
                    onClick={() => { abrirModalLogin("login"); setOpenMenu(false); }}
                    className="bg-[#a52e00] text-white px-3 py-2 rounded shadow font-semibold"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => { abrirModalLogin("register"); setOpenMenu(false); }}
                    className="bg-[#a52e00] text-white px-3 py-2 rounded shadow font-semibold"
                  >
                    Registrarse
                  </button>
                  <button
                    onClick={() => { abrirModalLogin("recuperar"); setOpenMenu(false); }}
                    className="text-[#a52e00] underline text-xs mt-1"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 rounded font-semibold bg-[#b03a1a] text-white"
                  onClick={() => { setOpenMenu(false); setMenuUser(true); }}
                >
                  <span>
                    {usuario.photoURL ? (
                      <img src={usuario.photoURL} alt="avatar" className="w-8 h-8 rounded-full border inline-block" />
                    ) : (
                      <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#a52e00] text-white text-lg">
                        {getInitials(usuario.displayName, usuario.email)}
                      </span>
                    )}
                  </span>
                  <span>
                    {usuario.displayName?.split(" ")[0] || usuario.email}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* USER MENU (DROPDOWN/MODAL, RESPONSIVE) */}
      {menuUser && usuario && !usuario.isAnonymous && (
        <div
          ref={menuUserRef}
          className="fixed inset-0 z-50 bg-black/40 flex justify-end md:justify-end items-start"
        >
          <div className="bg-white rounded-2xl shadow-2xl border mt-4 mr-4 w-72 max-w-full animate-fade-in-down">
            <div className="px-5 pt-5 pb-2 border-b flex flex-col items-center">
              {usuario.photoURL ? (
                <img src={usuario.photoURL} alt="avatar" className="w-14 h-14 rounded-full border mb-2" />
              ) : (
                <span className="w-14 h-14 flex items-center justify-center rounded-full bg-[#b03a1a] text-white font-bold text-2xl mb-2">
                  {getInitials(usuario.displayName, usuario.email)}
                </span>
              )}
              <div className="font-bold text-[#b03a1a] leading-5 truncate text-center w-full">{usuario.displayName || usuario.email}</div>
              <div className="text-xs text-[#a52e00] truncate w-full text-center">{usuario.email}</div>
              {/* BADGE SOLO AQUÍ */}
              {emailVerificado
                ? isPremium
                  ? <span className="text-xs mt-1 bg-[#b03a1a] text-white px-2 py-1 rounded-full">Premium</span>
                  : <span className="text-xs mt-1 bg-[#a52e00] text-white px-2 py-1 rounded-full">Gratis</span>
                : <span className="text-xs mt-1 bg-yellow-100 text-[#b03a1a] px-2 py-1 rounded-full">Pendiente de verificación</span>
              }
            </div>
            <ul className="py-2 flex flex-col gap-2">
              <li>
                <Link to="/perfil" className="flex items-center gap-2 px-5 py-2 hover:bg-[#fff6e6] text-[#b03a1a] transition" onClick={() => setMenuUser(false)}>
                  Perfil
                </Link>
              </li>
              <li>
                <Link to="/mi-cuenta" className="flex items-center gap-2 px-5 py-2 hover:bg-[#fff6e6] text-[#b03a1a] transition" onClick={() => setMenuUser(false)}>
                  Mi cuenta
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { window.location.href = "/litisbot"; setMenuUser(false); }}
                  className="flex items-center gap-2 px-5 py-2 hover:bg-[#fff6e6] text-[#a52e00] w-full text-left transition"
                >
                  LitisBot Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => { window.location.href = "/oficina"; setMenuUser(false); }}
                  className="flex items-center gap-2 px-5 py-2 hover:bg-[#fff6e6] text-[#a52e00] w-full text-left transition"
                >
                  Oficina Virtual
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-2 px-5 py-2 hover:bg-[#fff6e6] text-[#a52e00] w-full text-left transition"
                  onClick={() => { setMenuUser(false); cerrarSesion(); }}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
            <div className="w-full text-right px-4 pb-3">
              <button
                className="text-[#b03a1a] text-lg"
                onClick={() => setMenuUser(false)}
                aria-label="Cerrar menú"
              >✖️</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
