import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  signInAnonymously,
} from "firebase/auth";
import { app } from "../services/firebaseConfig";

// --- CONTEXTO ---
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = getAuth(app);

  // Estados principales
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [emailVerificado, setEmailVerificado] = useState(false);

  // Control modal login
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalLoginTab, setModalLoginTab] = useState("login");

  // Toast global (puedes ajustar este sistema de feedback a tu gusto)
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  // --- Funciones de modal ---
  const abrirModalLogin = (tab = "login") => {
    setModalLoginTab(tab);
    setModalLoginOpen(true);
  };
  const cerrarModalLogin = () => setModalLoginOpen(false);

  // --- Funciones de auth ---
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    setToast({ show: true, message: "¡Bienvenido!", type: "success" });
    cerrarModalLogin();
  };

  const register = async (email, password, name = "") => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(res.user, { displayName: name });
    await sendEmailVerification(res.user);
    setToast({ show: true, message: "¡Registro exitoso! Revisa tu correo.", type: "success" });
    cerrarModalLogin();
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    setToast({ show: true, message: "Correo de recuperación enviado.", type: "success" });
    cerrarModalLogin();
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    setToast({ show: true, message: "Sesión cerrada.", type: "info" });
  };

  // --- Listener usuario ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);
      setLoading(false);

      if (user) {
        setEmailVerificado(user.emailVerified || user.isAnonymous);
        // Aquí puedes cargar info de premium si usas Firestore/Stripe
        // Ejemplo fake: setIsPremium(!!user.email && user.email.endsWith("@premium.com"));
        setIsPremium(false); // Por defecto, todos no-premium
      } else {
        // Login anónimo si no hay usuario
        await signInAnonymously(auth);
      }
    });
    return () => unsub();
    // eslint-disable-next-line
  }, []);

  // --- Re-verificar usuario (útil tras registro/verificación) ---
  const refrescarUsuario = useCallback(async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUsuario({ ...auth.currentUser });
      setEmailVerificado(auth.currentUser.emailVerified || auth.currentUser.isAnonymous);
    }
  }, [auth]);

  // --- Proveer contexto ---
  const value = {
    usuario,
    loading,
    isPremium,
    emailVerificado,
    login,
    register,
    resetPassword,
    cerrarSesion,
    abrirModalLogin,
    cerrarModalLogin,
    refrescarUsuario,
    modalLoginOpen,
    modalLoginTab,
    setToast,
    toast,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
