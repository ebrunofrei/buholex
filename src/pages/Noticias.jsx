import React from "react";

export default function Noticias() {
  const noticias = [
    {
      titulo: "Nuevo servicio de asesoría online",
      fecha: "19/06/2025",
      descripcion: "Ahora puedes acceder a consultoría jurídica totalmente en línea y recibir atención prioritaria."
    },
    {
      titulo: "Publicación: Demandas modelo 2025",
      fecha: "17/06/2025",
      descripcion: "Descarga gratis modelos actualizados de demandas civiles y penales desde nuestra biblioteca legal."
    },
    {
      titulo: "BúhoLex en el Congreso Nacional de Derecho",
      fecha: "15/06/2025",
      descripcion: "Fuimos invitados como ponentes en el evento más importante del sector jurídico del país."
    }
  ];
  return (
    <section style={{ margin: "40px auto 0", maxWidth: 680 }}>
      <h3 style={{ color: "#1E2940", fontSize: "1.22rem", fontWeight: 700, marginBottom: 28 }}>
        Noticias
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {noticias.map((n, i) => (
          <li key={i} style={{
            background: "#fff",
            borderRadius: 13,
            border: "1.5px solid #a46a32",
            boxShadow: "0 1px 10px #a46a3233",
            padding: "18px 22px",
            marginBottom: 24,
            textAlign: "left"
          }}>
            <span style={{ color: "#a46a32", fontWeight: 700, fontSize: 17 }}>{n.titulo}</span>
            <span style={{ float: "right", color: "#7a5833", fontSize: 14 }}>{n.fecha}</span>
            <p style={{ color: "#222", fontSize: 16, margin: "10px 0 0 0" }}>{n.descripcion}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
