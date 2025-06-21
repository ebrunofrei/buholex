import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebaseConfig"; // <--- RUTA CORREGIDA
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/libros");
    } catch (err) {
      setError("Credenciales inválidas o usuario no autorizado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
          Acceso Administrativo
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Correo electrónico</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
