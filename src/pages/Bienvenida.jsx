import React from 'react';
import { motion } from 'framer-motion';

const Bienvenida = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Mensaje de bienvenida */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-800">
            ¡Bienvenido a <span className="text-blue-600">BúhoLex</span>!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            BúhoLex es una plataforma innovadora de asesoría legal que combina tecnología con experiencia profesional para brindarte soluciones jurídicas accesibles y confiables.
          </p>
          <p className="mt-2 text-lg text-gray-700">
            Te invitamos a explorar nuestros <span className="font-semibold text-gray-800">Servicios</span>, conversar con <span className="font-semibold text-gray-800">LitisBot</span> y mantenerte al día con nuestras <span className="font-semibold text-gray-800">últimas novedades</span> jurídicas.
          </p>
        </motion.div>

        {/* Botones de navegación */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.a
            href="/servicios"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Servicios
          </motion.a>
          <motion.a
            href="/litisbot"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LitisBot
          </motion.a>
          <motion.a
            href="/contacto"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contacto
          </motion.a>
        </motion.div>

        {/* Sección de últimas novedades */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Últimas novedades</h2>
          <ul className="mt-4 space-y-4">
            <li className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-800 font-medium">Título de la noticia o actualización</h3>
              <p className="text-gray-600 text-sm mt-1">
                Breve descripción de la noticia o actualización jurídica para despertar el interés del lector.
              </p>
            </li>
            <li className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-800 font-medium">Título de la siguiente novedad</h3>
              <p className="text-gray-600 text-sm mt-1">
                Otra breve descripción de una noticia o actualización jurídica reciente para mantener informados a nuestros usuarios.
              </p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Bienvenida;
