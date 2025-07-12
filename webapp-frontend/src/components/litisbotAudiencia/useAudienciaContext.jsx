import { createContext, useContext, useState, useEffect } from "react";
import { sugerenciasParaUsuario, guardarInteraccionAudiencia, guardarFeedbackAudiencia } from "../../services/litisbotSugerenciasService";
import { useAuth } from "../../context/AuthContext";

const AudienciaContext = createContext();

export function useAudiencia() {
  return useContext(AudienciaContext);
}

export function AudienciaProvider({ children }) {
  const { usuario } = useAuth();
  const [mensajes, setMensajes] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [micActivo, setMicActivo] = useState(false);

  // Cargar sugerencias personalizadas al iniciar sesión
  useEffect(() => {
    if (usuario) {
      sugerenciasParaUsuario(usuario.uid).then(setSugerencias);
      // Aquí podrías cargar historial si quieres mostrarlo también
    }
  }, [usuario]);

  // Guardar mensaje y feedback en Firestore
  async function guardarMensaje({ textoUsuario, respuestaBot, expedienteID, materia, tipo }) {
    await guardarInteraccionAudiencia({
      usuarioID: usuario.uid, expedienteID, textoUsuario, respuestaBot, materia, tipo
    });
  }

  // Guardar feedback útil/no útil
  async function feedbackMensaje(msgId, utilFeedback) {
    await guardarFeedbackAudiencia({ usuarioID: usuario.uid, msgId, utilFeedback });
  }

  return (
    <AudienciaContext.Provider value={{
      mensajes, setMensajes,
      sugerencias, setSugerencias,
      micActivo, setMicActivo,
      guardarMensaje,
      feedbackMensaje
    }}>
      {children}
    </AudienciaContext.Provider>
  );
}
