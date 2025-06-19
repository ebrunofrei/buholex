import React, { useState } from "react";
import { Link } from "react-router-dom";
import buhoLogo from "../assets/buho-institucional.png"; // AJUSTA SI NECESARIO

const menuItems = [
  { label: "Sobre mí", path: "/nosotros" },
  {
    label: "Servicios", children: [
      { label: "Asesoría Legal", path: "/servicios/asesoria" },
      { label: "Defensa Penal", path: "/servicios/penal" },
      { label: "Oficina Virtual", path: "/oficinas" }
    ]
  },
  { label: "Noticias", path: "/noticias" },
  { label: "Jurisprudencia", path: "/jurisprudencia" },
  { label: "Códigos", path: "/codigos" },
  { label: "Biblioteca", path: "/biblioteca" },
  { label: "Agenda", path: "/agenda" },
  { label: "Contacto", path: "/contacto" },
  { label: "LitisBot", path: "/litisbot", highlight: true }
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <nav style={{
      background: "#1E2940",
      color: "#fff",
      padding: "0 0 0 22px",
      height: 68,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontWeight: 600,
      fontSize: 19,
      boxShadow: "0 2px 12px #0002",
      zIndex: 300
    }}>
      {/* Logo e institucional */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={buhoLogo} alt="Logo BúhoLex" style={{ height: 44, marginRight: 12, borderRadius: 8, background: "#fff" }} />
        <span style={{ color: "#b88b47", fontWeight: 800, fontSize: 27, letterSpacing: 1 }}>BúhoLex</span>
      </div>
      {/* Menú principal */}
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {menuItems.map((item, idx) =>
          item.children ? (
            <div
              key={item.label}
              style={{ position: "relative" }}
              onMouseEnter={() => setOpenMenu(idx)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span style={{ cursor: "pointer", color: "#fff" }}>
                {item.label} <span style={{ fontSize: 13 }}>▼</span>
              </span>
              {openMenu === idx &&
                <div style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "#fff",
                  color: "#222",
                  boxShadow: "0 4px 24px #0003",
                  minWidth: 170,
                  borderRadius: 7,
                  zIndex: 800
                }}>
                  {item.children.map((child, i) => (
                    <Link
                      to={child.path}
                      key={i}
                      style={{
                        display: "block",
                        padding: "10px 20px",
                        color: "#1E2940",
                        fontWeight: 500,
                        textDecoration: "none",
                        borderBottom: i !== item.children.length - 1 ? "1px solid #f4eee8" : "none"
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              }
            </div>
          ) : (
            <Link
              to={item.path}
              key={item.label}
              style={{
                color: item.highlight ? "#b88b47" : "#fff",
                background: item.highlight ? "#fff2" : "none",
                borderRadius: 5,
                padding: item.highlight ? "3px 16px" : "0",
                textDecoration: "none",
                fontWeight: item.highlight ? 800 : 600
              }}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
