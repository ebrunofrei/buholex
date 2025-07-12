import React from "react";
import { useNoticias } from "../../context/NoticiasContext";
import { useLitisBotChat } from "../../context/LitisBotChatContext";
import { Megaphone } from "lucide-react"; // Si no tienes lucide-react puedes usar material-icons

export default function NoticiasBotonFlotante() {
  const { showNoticias, setShowNoticias } = useNoticias();
  const { showChat, setShowChat } = useLitisBotChat();

  if (showChat || showNoticias) return null;

  const handleOpenNoticias = () => {
    setShowChat(false);
    setShowNoticias(true);
  };

  return (
    <div
      className="
        fixed
        z-50
        bottom-4
        left-1/2
        transform
        -translate-x-1/2
        md:left-auto md:right-8 md:bottom-8 md:translate-x-0
        flex justify-center
        w-full md:w-auto
        pointer-events-none
      "
      style={{ maxWidth: "100vw" }}
    >
      <button
        onClick={handleOpenNoticias}
        className="
          pointer-events-auto
          flex items-center gap-2 px-5 py-3
          rounded-full shadow-2xl
          bg-[#b03a1a] text-white font-bold text-lg
          hover:bg-[#a87247] transition
          active:scale-95
        "
        aria-label="Abrir noticias"
      >
        <Megaphone size={22} className="text-white" />
        <span className="hidden sm:inline">Noticias</span>
      </button>
    </div>
  );
}
