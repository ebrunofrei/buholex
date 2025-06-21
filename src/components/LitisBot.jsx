import React, { useEffect, useState } from "react";

export default function LitisBot() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener("openLitisBot", handleOpen);
    return () => window.removeEventListener("openLitisBot", handleOpen);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white border-2 border-[#e53935] rounded-2xl shadow-xl p-5 w-[360px] h-[500px]">
      {/* Aquí va tu chat funcional */}
      <h4 className="text-[#b03a1a] font-bold text-xl mb-3">LitisBot Asistente Legal</h4>
      {/* ... resto de tu componente */}
      <button className="absolute top-3 right-3 text-[#b03a1a] font-bold" onClick={() => setVisible(false)}>X</button>
    </div>
  );
}
