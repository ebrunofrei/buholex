import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e53935] py-7 text-center text-[#4b2e19] font-bold text-lg tracking-wide">
      © {new Date().getFullYear()} BúhoLex | Soluciones legales, IA y comunidad jurídica. 
    </footer>
  );
}
