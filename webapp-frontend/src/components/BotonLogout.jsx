// src/components/BotonLogout.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function BotonLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
    >
      Cerrar sesión
    </button>
  );
}
