import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import buhoLogo from "../assets/buho-institucional.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      {/* Header institucional */}
      <header className="p-6 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-blue-800">BúhoLex</h1>
        <nav className="space-x-4">
          <Link to="/app" className="text-blue-700 hover:underline">App</Link>
          <Link to="/biblioteca" className="text-blue-700 hover:underline">Biblioteca</Link>
          <Link to="/jurisprudencia" className="text-blue-700 hover:underline">Jurisprudencia</Link>
          <Link to="/ingreso" className="text-white bg-blue-700 hover:bg-blue-800 rounded px-3 py-1">Ingresar</Link>
        </nav>
      </header>

      {/* Hero principal */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 w-full">
        {/* Imagen institucional sin slogan */}
        <motion.img
          src={buhoLogo}
          alt="BúhoLex Logo institucional"
          className="mx-auto mb-6 w-40 sm:w-48 md:w-56 max-w-xs rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        />

        {/* Slogan institucional */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-2 text-blue-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          BúhoLex: justicia sin privilegios.
        </motion.h2>
        <motion.p
          className="text-lg md:text-2xl text-blue-800 mb-6 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          LitisBot te acompaña y te defiende.
        </motion.p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
          <Link
            to="/servicios"
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300 font-semibold"
          >
            Explorar servicios
          </Link>
          <Link
            to="/litisbot"
            className="border border-blue-700 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-100 transition duration-300 font-semibold"
          >
            Probar LitisBot
          </Link>
          <Link
            to="/ingreso"
            className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-200 transition duration-300 font-semibold"
          >
            Registrarse / Ingresar
          </Link>
        </div>

        {/* Secciones por tipo de usuario */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full"
        >
          {[
            {
              rol: "Docentes universitarios",
              texto:
                "Crea, comparte y adapta modelos de clase, jurisprudencia y casos prácticos en tiempo real.",
            },
            {
              rol: "Jueces y Fiscales",
              texto:
                "Consulta precedentes vinculantes, doctrina relevante y resuelve dudas legales de inmediato.",
            },
            {
              rol: "Abogados y Litigantes",
              texto:
                "Accede a modelos de demandas, biblioteca virtual y agenda legal desde un solo lugar.",
            },
            {
              rol: "Estudiantes de Derecho",
              texto:
                "Aprende con LitisBot, explora casos reales, modelos de escritos y prepara tus propios documentos.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-lg p-6 rounded-xl border hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {item.rol}
              </h3>
              <p className="text-gray-600">{item.texto}</p>
            </div>
          ))}
        </motion.section>
      </main>

      {/* Footer institucional */}
      <footer className="p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BúhoLex. Todos los derechos reservados.
      </footer>
    </div>
  );
}
