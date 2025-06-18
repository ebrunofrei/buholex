// src/components/InstalarApp.jsx
import React, { useEffect, useState } from "react";

function InstalarApp() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setVisible(false);
      setDeferredPrompt(null);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-3">
      <span>¿Quieres instalar BúhoLex en tu dispositivo?</span>
      <button
        onClick={handleInstallClick}
        className="bg-white text-blue-700 rounded px-4 py-1 font-semibold hover:bg-blue-100"
      >
        Instalar
      </button>
      <button
        onClick={() => setVisible(false)}
        className="ml-2 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
}

export default InstalarApp;
