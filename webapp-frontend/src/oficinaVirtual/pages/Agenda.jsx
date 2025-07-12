// src/oficinaVirtual/pages/Agenda.jsx
import React from "react";
import AgendaVisual from "../components/AgendaVisual";
export default function Agenda() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Agenda y Audiencias</h2>
      <AgendaVisual />
    </div>
  );
}
