import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <motion.div
      className="min-h-screen px-4 py-12 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Blog Jurídico
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Encuentra artículos, ensayos y novedades legales redactadas por abogados y colegas registrados en BúhoLex.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Aquí puedes mapear artículos desde una base de datos o archivo JSON */}
          <article className="p-6 rounded-xl shadow-md bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              ¿Cómo impugnar correctamente una resolución administrativa?
            </h2>
            <p className="text-gray-700 mb-4">
              Te explicamos paso a paso cómo presentar recursos administrativos y judiciales, incluyendo modelos de escritos.
            </p>
            <Link
              to="/blog/impugnar-resolucion"
              className="text-blue-600 font-semibold hover:underline"
            >
              Leer más →
            </Link>
          </article>

          <article className="p-6 rounded-xl shadow-md bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              La prueba en los procesos de prescripción adquisitiva de dominio
            </h2>
            <p className="text-gray-700 mb-4">
              Analizamos qué pruebas son fundamentales para acreditar la posesión continua, pacífica y pública del predio.
            </p>
            <Link
              to="/blog/prueba-prescripcion"
              className="text-blue-600 font-semibold hover:underline"
            >
              Leer más →
            </Link>
          </article>

          {/* Puedes seguir agregando artículos aquí */}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/blog/publicar"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition"
          >
            Publicar un nuevo artículo
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
