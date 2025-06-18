import React, { useState } from "react";
import { motion } from "framer-motion";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Tu mensaje ha sido enviado. Te responderemos pronto.");
    setFormData({
      nombre: "",
      correo: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-12 p-6 rounded-lg shadow-md bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Contáctanos
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Asunto</label>
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Mensaje</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="5"
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 px-6 rounded hover:bg-blue-900 transition"
        >
          Enviar mensaje
        </button>
      </form>
    </motion.div>
  );
};

export default Contacto;
