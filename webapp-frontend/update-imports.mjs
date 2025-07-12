import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ----- CONFIGURA AQUÍ TUS RUTAS DE REEMPLAZO -----
const REEMPLAZOS = [
  // { old: "ruta/antigua", new: "ruta/nueva" },
  { old: "../hooks/usePerfilOficina", new: "../../hooks/usePerfilOficina" },
  { old: "../context/OficinaProvider", new: "../../context/OficinaProvider" },
  { old: "../pages/FirmarEscrito", new: "../pages/escritorio/FirmarEscrito" },
  // Agrega más pares según lo que muevas
];

// Carpeta raíz donde buscar archivos
const ROOT_DIR = "./src";

// Node ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let updated = content;
  let changed = false;
  REEMPLAZOS.forEach(({ old, new: newPath }) => {
    if (updated.includes(old)) {
      updated = updated.split(old).join(newPath);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✔ Import actualizado en: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const absolute = path.join(dir, file);
    if (fs.statSync(absolute).isDirectory()) {
      walkDir(absolute);
    } else if (
      absolute.endsWith(".js") ||
      absolute.endsWith(".jsx") ||
      absolute.endsWith(".ts") ||
      absolute.endsWith(".tsx") ||
      absolute.endsWith(".mjs")
    ) {
      updateImportsInFile(absolute);
    }
  });
}

console.log("🔎 Buscando y actualizando imports...");
walkDir(path.join(__dirname, ROOT_DIR));
console.log("✅ Actualización completa.");
