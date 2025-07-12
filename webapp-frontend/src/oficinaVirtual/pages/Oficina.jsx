import React from "react";
import { useNavigate } from "react-router-dom";
import { Folder, FileText, CalendarDays, Bell } from "lucide-react";

const accesos = [
  {
    nombre: "Casilla de Expedientes",
    descripcion: "Accede a todos tus expedientes judiciales y administrativos.",
    icono: <Folder size={40} className="text-[#7b1e1e]" />,
    ruta: "/oficinaVirtual/casilla-expedientes" // ← CORREGIDO AQUÍ
  },
  {
    nombre: "Casilla de Resoluciones",
    descripcion: "Revisa autos, decretos y sentencias judiciales, así como resoluciones administrativas.",
    icono: <FileText size={40} className="text-[#7b1e1e]" />,
    ruta: "/oficinaVirtual/buzon"
  },

  {
    nombre: "Agenda de Audiencias",
    descripcion: "Consulta tus próximas audiencias programadas.",
    icono: <CalendarDays size={40} className="text-[#7b1e1e]" />,
    ruta: "/oficinaVirtual/agenda"
  },
  {
    nombre: "Notificaciones",
    descripcion: "Revisa tus notificaciones electrónicas recibidas.",
    icono: <Bell size={40} className="text-[#7b1e1e]" />,
    ruta: "/oficinaVirtual/notificaciones"
  }
];

export default function Oficina() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 md:px-20">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#7b1e1e] mb-10">
        Bienvenido a tu Oficina Virtual
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accesos.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.ruta)}
            className="cursor-pointer rounded-xl bg-white shadow-md hover:shadow-lg transition duration-200 p-6 border border-gray-200"
          >
            <div className="flex justify-center mb-4">{item.icono}</div>
            <h3 className="text-center text-lg font-semibold text-[#333]">
              {item.nombre}
            </h3>
            <p className="text-sm text-gray-600 text-center mt-2">
              {item.descripcion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
