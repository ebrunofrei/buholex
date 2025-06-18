import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Servicios = () => {
  const navigate = useNavigate();

  const handleAgendar = () => {
    navigate("/contacto", { state: { servicio: "personalizado" } });
  };

  return (
    <section className="px-4 py-12 max-w-5xl mx-auto">
      <motion.h1
        className="text-3xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Servicios Jurídicos Profesionales
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 border"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold mb-2">Patrocinio Legal</h2>
          <p className="text-gray-700">
            Representación técnica en procesos judiciales y administrativos, con defensa activa en todas las etapas del proceso. Elaboración de demandas, denuncias, escritos y recursos de impugnación con estilo argumentativo y profesional.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 border"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold mb-2">Asesoría Legal</h2>
          <p className="text-gray-700">
            Consultas y orientación especializada en Derecho civil, penal, administrativo, laboral y constitucional. Te ayudamos a prevenir contingencias legales antes de que ocurran.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 border"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold mb-2">Defensa Judicial</h2>
          <p className="text-gray-700">
            Defensa técnica en procesos penales, civiles, contencioso-administrativos y más. Elaboración de estrategias de defensa sólidas y recursos legales a tu medida.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 border"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-xl font-semibold mb-2">Videoconferencia Personalizada</h2>
          <p className="text-gray-700 mb-4">
            Programa una videollamada con nuestro equipo para recibir asesoría legal directa, en tiempo real, desde la comodidad de tu hogar.
          </p>
          <Button onClick={handleAgendar}>Solicitar servicio</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Servicios;
