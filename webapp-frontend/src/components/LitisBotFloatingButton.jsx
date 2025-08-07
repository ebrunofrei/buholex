// src/components/LitisBotFloatingButton.jsx
import { useState } from "react";
import LitisBotChatBase from "@/components/LitisBotChatBase";
import { useUser } from "@/context/UserContext";

export default function LitisBotFloatingButton() {
  const { user, isPro } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-7 right-7 z-50 bg-yellow-600 hover:bg-yellow-800 text-white font-bold rounded-full shadow-lg p-4 text-xl flex items-center gap-2"
        title="Chat legal con LitisBot"
        aria-label="Abrir chat LitisBot"
      >
        🦉 <span className="hidden md:inline">LitisBot</span>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center px-3">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl border-4 border-yellow-600">
            <button
              className="absolute top-2 right-3 text-yellow-800 text-3xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >×</button>

            <LitisBotChatBase
              user={user || { uid: "invitado", nombre: "Invitado", pro: false, tipo: "public" }}
              pro={isPro}
              tipoUsuario={user?.tipo || "public"}
              showModal={true}
              setShowModal={setOpen}
            />
          </div>
        </div>
      )}
    </>
  );
}
