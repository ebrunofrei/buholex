// src/context/UserContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // TODO: Conecta con tu Auth real (Firebase Auth)
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock inicial (reemplázalo con onAuthStateChanged de Firebase)
    const mock = {
      uid: "uid-demo-123",
      nombre: "Eduardo",
      email: "eduardo@buholex.com",
      tipo: "litigante", // "juez" | "fiscal" | "perito" | "public"
      pro: true,         // membresía
    };
    setUser(mock);
  }, []);

  const value = useMemo(() => ({
    user,
    isPro: !!user?.pro,
    setUser,
  }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return ctx;
}
