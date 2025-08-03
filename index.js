// index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

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
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "3mb" }));

// Rutas personalizadas
app.use("/api/notificaciones", notificaciones);
app.use("/api/litisbot", litisbot);
app.use("/api/litisbot-memory", memory);
app.use("/api/buscar-fuente-legal", scraping);
app.use("/api/buscar-elperuano", elperuano);
app.use("/api/stripe", stripeRoutes);
app.use("/api/culqi", culqiRoutes);
app.use("/api/user", userRoutes);

// Endpoint raíz (opcional)
app.get("/", (req, res) => {
  res.send("LitisBot backend API 🦉 está corriendo.");
});

// Levanta el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("LitisBot backend running at", PORT));
