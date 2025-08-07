// src/views/PersonalizacionView.jsx
import React from "react";

// Ajusta las rutas según tu estructura real:
import SelectorPlantillaOficina from "@/components/SelectorPlantillaOficina";
import PanelPersonalizacion from "@/oficinaVirtual/components/PanelPersonalizacion";
import PublicarOficinaBtn from "@/components/PublicarOficinaBtn";

export default function PersonalizacionView() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-2">
      <h1 className="text-2xl font-bold text-[#b03a1a] mb-6">
        Personaliza tu Oficina Virtual
      </h1>

      {/* 1. Plantillas prediseñadas (opcional) */}
      <div className="mb-6">
        <SelectorPlantillaOficina />
      </div>

      {/* 2. Panel de personalización */}
      <div className="mb-6">
        <PanelPersonalizacion />
      </div>

      {/* 3. Botón para publicar (URL única) */}
      <div className="mb-2">
        <PublicarOficinaBtn />
      </div>

      {/* 4. (Opcional) Preview en vivo aquí */}
      {/* <PreviewOficina /> */}
    </div>
  );
}
