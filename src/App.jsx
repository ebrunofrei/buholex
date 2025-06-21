import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout";
import Home from "./pages/Home";
import Oficina from "./pages/oficina/Escritorio";
import Proyectos from "./pages/Proyectos";
// Otras páginas...

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/oficina" element={<Oficina />} />
          <Route path="/proyectos" element={<Proyectos />} />
          {/* Agrega tus otras rutas aquí */}
        </Route>
      </Routes>
    </Router>
  );
}
