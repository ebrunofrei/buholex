import { Routes, Route } from "react-router-dom";
import PanelConfiguracionOficina from "../pages/configuracion/PanelConfiguracionOficina";
import PagoPRO from "../pages/pagos/PagoPRO";
// ...
<Routes>
  <Route path="/configuracion" element={<PanelConfiguracionOficina />} />
  <Route path="/pagos" element={<PagoPRO />} />
  {/* ...otras rutas */}
</Routes>
