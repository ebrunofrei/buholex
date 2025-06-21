import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebaseConfig"; // Ajusta la ruta si tu archivo está en otro lugar
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const auth = getAuth(app);

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Login Administrador</h1>
      {error && <div className="text-red-600 text-center mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full px-3 py-2 border rounded focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
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
