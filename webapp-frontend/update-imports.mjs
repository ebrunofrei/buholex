// update-imports.mjs
import fs from "fs";
import path from "path";

const SRC = "./src";

// Busca recursivamente todos los archivos .js y .jsx
function getAllJSFiles(dir, filesArr = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllJSFiles(fullPath, filesArr);
    } else if (fullPath.endsWith(".js") || fullPath.endsWith(".jsx")) {
      filesArr.push(fullPath);
    }
  });
  return filesArr;
}

// Reemplaza los imports antiguos por el nuevo import limpio
function updateImports(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Regex para cubrir los posibles paths viejos
  content = content.replace(
    /from\s+["'`](?:\.\.\/)?components\/AuthContext(?:\.js|\.jsx)?["'`]/g,
    'from "../context/AuthContext"'
  );
  content = content.replace(
    /from\s+["'`](?:\.\.\/)?context\/AuthContext\.js["'`]/g,
    'from "../context/AuthContext"'
  );
  content = content.replace(
    /from\s+["'`](?:\.\.\/)?context\/AuthContext["'`]/g,
    'from "../context/AuthContext"'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Actualizado:", filePath);
  }
}

// Main
const files = getAllJSFiles(SRC);
files.forEach(updateImports);

console.log("\n✅ Todos los imports de AuthContext han sido actualizados a '../context/AuthContext'.");
