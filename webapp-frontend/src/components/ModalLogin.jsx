import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function ModalLogin() {
  const { modalLoginOpen, modalLoginTab, cerrarModalLogin } = useAuth();

  // Para evitar que el modal esté en el DOM si no está abierto
  if (!modalLoginOpen) return null;

  // Responsivo: animación bottom-sheet en móvil, centrado en desktop
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={cerrarModalLogin}
      >
        {/* Contenido modal */}
        <motion.div
          className="
            w-full md:max-w-md
            bg-white rounded-t-3xl md:rounded-2xl shadow-xl
            px-6 py-8 md:py-10
            relative
            md:mt-0
            min-h-[40vh] max-h-[90vh] overflow-auto
          "
          initial={{ y: 100, scale: 1, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.23, duration: 0.38 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-[#b03a1a] font-bold"
            onClick={cerrarModalLogin}
            aria-label="Cerrar"
          >×</button>

          {/* Tabs de login, registro y recuperación */}
          <div className="flex justify-center gap-2 mb-7">
            <button
              className={`px-4 py-2 rounded-lg font-bold text-sm ${modalLoginTab === "login" ? "bg-[#b03a1a] text-white" : "bg-gray-100 text-[#a52e00]"}`}
              onClick={() => window.setTimeout(() => document.dispatchEvent(new CustomEvent("modalLoginTab", { detail: "login" })), 0)}
            >Iniciar sesión</button>
            <button
              className={`px-4 py-2 rounded-lg font-bold text-sm ${modalLoginTab === "register" ? "bg-[#b03a1a] text-white" : "bg-gray-100 text-[#a52e00]"}`}
              onClick={() => window.setTimeout(() => document.dispatchEvent(new CustomEvent("modalLoginTab", { detail: "register" })), 0)}
            >Registrarse</button>
            <button
              className={`px-4 py-2 rounded-lg font-bold text-sm ${modalLoginTab === "recuperar" ? "bg-[#b03a1a] text-white" : "bg-gray-100 text-[#a52e00]"}`}
              onClick={() => window.setTimeout(() => document.dispatchEvent(new CustomEvent("modalLoginTab", { detail: "recuperar" })), 0)}
            >¿Olvidaste tu contraseña?</button>
          </div>

          {/* Renderiza formulario correspondiente */}
          {modalLoginTab === "login" && <LoginForm />}
          {modalLoginTab === "register" && <RegisterForm />}
          {modalLoginTab === "recuperar" && <ResetPasswordForm />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Formulario Login (puedes mejorar la UI y validaciones a tu estilo)
function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input className="w-full border px-4 py-2 rounded mb-2" type="email" required placeholder="Correo electrónico" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border px-4 py-2 rounded mb-2" type="password" required placeholder="Contraseña" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button disabled={loading} type="submit" className="w-full bg-[#b03a1a] text-white py-2 rounded font-bold mt-3">
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.email, form.password, form.name);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input className="w-full border px-4 py-2 rounded mb-2" required placeholder="Nombre completo" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="w-full border px-4 py-2 rounded mb-2" required type="email" placeholder="Correo electrónico" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border px-4 py-2 rounded mb-2" required type="password" placeholder="Contraseña" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button disabled={loading} type="submit" className="w-full bg-[#b03a1a] text-white py-2 rounded font-bold mt-3">
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input className="w-full border px-4 py-2 rounded mb-2" required type="email" placeholder="Correo para recuperar contraseña" value={email} onChange={e => setEmail(e.target.value)} />
      <button disabled={loading} type="submit" className="w-full bg-[#b03a1a] text-white py-2 rounded font-bold mt-3">
        {loading ? "Enviando..." : "Enviar correo de recuperación"}
      </button>
    </form>
  );
}
