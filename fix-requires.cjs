const fs = require("fs");
const path = require("path");

// Carpeta base (ajusta si cambiaste la raíz)
const BASE_DIR = __dirname;

// Expresión para detectar require()
const requireRegex = /const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g;

function fixRequiresInFile(filePath) {
  let data = fs.readFileSync(filePath, "utf8");
  let changed = false;

  data = data.replace(requireRegex, (match, variable, mod) => {
    changed = true;
    return `import ${variable} from "${mod}";`;
  });

  if (changed) {
    fs.writeFileSync(filePath, data, "utf8");
    console.log("✅ Fixed requires in:", filePath);
  }
}

function traverseAndFix(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseAndFix(fullPath);
    } else if (fullPath.endsWith(".js")) {
      fixRequiresInFile(fullPath);
    }
  });
}

// ---- EJECUCIÓN ----
console.log("🔄 Migrando require() a import en:", BASE_DIR);
traverseAndFix(BASE_DIR);
console.log("✨ Migración completada.");
