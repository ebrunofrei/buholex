import React from "react";
import SidebarUnificado from "@/oficinaVirtual/components/SidebarUnificado";
import BarraSuperior from "../components/BarraSuperior";
import Footer from "../components/Footer";

export default function OficinaVirtualLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <BarraSuperior />
      <div className="flex flex-1">
        <SidebarUnificado />
        <main className="flex-1 p-6 pt-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
