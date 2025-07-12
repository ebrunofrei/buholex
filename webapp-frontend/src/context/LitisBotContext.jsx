import React, { createContext, useContext, useState } from "react";

const LitisBotContext = createContext();

export function useLitisBot() {
  return useContext(LitisBotContext);
}

export function LitisBotProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [archivoAnalizado, setArchivoAnalizado] = useState(null);
  const [expedienteId, setExpedienteId] = useState(null);

  const abrirBot = ({ archivo, expediente }) => {
    setArchivoAnalizado(archivo);
    setExpedienteId(expediente);
    setVisible(true);
  };

  const cerrarBot = () => {
    setVisible(false);
    setArchivoAnalizado(null);
    setExpedienteId(null);
  };

  return (
    <LitisBotContext.Provider
      value={{ visible, abrirBot, cerrarBot, archivoAnalizado, expedienteId }}
    >
      {children}
    </LitisBotContext.Provider>
  );
}
