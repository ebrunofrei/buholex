import React from "react";

export default function Toast({ open, message, type = "info", onClose }) {
  if (!open) return null;
  const colors = {
    success: "bg-[#e9dcc3] text-[#4b2e19]",
    warn: "bg-[#fde7e7] text-[#b03a1a]",
    error: "bg-red-600 text-white",
    info: "bg-[#b03a1a] text-white",
  };
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-xl z-[100] flex items-center ${colors[type]}`}
      onClick={onClose}
      style={{ cursor: "pointer" }}
    >
      {message}
      <span className="ml-5 text-xl font-bold" style={{ opacity: 0.6 }}>✖</span>
    </div>
  );
}
