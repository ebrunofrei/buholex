// src/components/RutaPrivada.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function RutaPrivada({ children }) {
  const [usuario, loading] = useAuthState(auth);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Verificando sesión...</p>;
  }

  if (!usuario) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
