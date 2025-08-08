<<<<<<< HEAD
// index.js (buholex-backend-nuevo)

import express from "express";
import whatsappRouter from "./routes/whatsapp.js";
=======
// index.js
import express from "express";
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

<<<<<<< HEAD
// 1. Carga variables de entorno .env
dotenv.config();

// 2. Importa routers personalizados (todos como ES Modules)
import notificaciones from "./routes/notificaciones.js";
import litisbot from "./routes/litisbot.js";
import memory from "./routes/memory.js";
import scraping from "./routes/scraping.js";
import elperuano from "./routes/elperuano.js";
import culqiRoutes from "./routes/culqi.js";
import userRoutes from "./routes/user.js";
import noticiasRouter from "./routes/noticias.js";

// 3. IMPORTA tu handler IA-litisbotchat directamente
import iaLitisBotChat from "./api/ia-litisbotchat.js";

// 4. Crea la app de Express
=======
// Carga variables de entorno
dotenv.config();

// Importa routers personalizados (asegúrate que todos sean ES Modules)
import notificaciones from "../buholex-backend-nuevo/routes/notificaciones.js";
import litisbot from "../buholex-backend-nuevo/routes/litisbot.js";
import memory from "../buholex-backend-nuevo/routes/memory.js";
import scraping from "../buholex-backend-nuevo/routes/scraping.js";
import elperuano from "../buholex-backend-nuevo/routes/elperuano.js";
import stripeRoutes from "../buholex-backend-nuevo/routes/stripe.js";
import culqiRoutes from "../buholex-backend-nuevo/routes/culqi.js";
import userRoutes from "../buholex-backend-nuevo/routes/user.js";

// Crea la app de Express
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "3mb" }));

<<<<<<< HEAD
// 5. Rutas personalizadas
=======
// Rutas personalizadas
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
app.use("/api/notificaciones", notificaciones);
app.use("/api/litisbot", litisbot);
app.use("/api/litisbot-memory", memory);
app.use("/api/buscar-fuente-legal", scraping);
app.use("/api/buscar-elperuano", elperuano);
<<<<<<< HEAD
app.use("/api/culqi", culqiRoutes);
app.use("/api/user", userRoutes);
app.use("/api", whatsappRouter);
app.use("/api", noticiasRouter);

// 6. NUEVA RUTA DIRECTA para IA LitisBot Chat (POST)
app.post("/api/ia-litisbotchat", iaLitisBotChat); // <-- ¡Clave!

// 7. Endpoint raíz (opcional)
=======
app.use("/api/stripe", stripeRoutes);
app.use("/api/culqi", culqiRoutes);
app.use("/api/user", userRoutes);

// Endpoint raíz (opcional)
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
app.get("/", (req, res) => {
  res.send("LitisBot backend API 🦉 está corriendo.");
});

<<<<<<< HEAD
// 8. Levanta el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ LitisBot backend running at ${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ El puerto ${PORT} ya está en uso`);
    process.exit(1); // evita crash constante
  } else {
    throw err;
  }
});

=======
// Levanta el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("LitisBot backend running at", PORT));
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))
