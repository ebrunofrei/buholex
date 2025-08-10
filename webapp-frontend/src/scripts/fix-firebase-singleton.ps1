# Fija una sola inicialización de Firebase en el FRONTEND y limpia duplicados.
# Ejecutar desde la raíz del repo o desde webapp-frontend.

$ErrorActionPreference = "Stop"

# 1) Detectar carpeta del frontend/src
$cwd = (Get-Location).Path
$frontSrc = Join-Path $cwd "src"
if (!(Test-Path $frontSrc)) {
  $frontSrc = Join-Path $cwd "webapp-frontend\src"
  if (!(Test-Path $frontSrc)) {
    throw "No encuentro la carpeta 'src' ni 'webapp-frontend\src'."
  }
}

# 2) Crear inicialización canónica si no existe
$canonDir = Join-Path $frontSrc "firebase"
$canonFile = Join-Path $canonDir "index.js"
New-Item -ItemType Directory $canonDir -Force | Out-Null
if (!(Test-Path $canonFile)) {
$canon = @'
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = (getApps().length ? getApp() : initializeApp(firebaseConfig));

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
'@
[System.IO.File]::WriteAllText($canonFile, $canon)
}

# 3) Respaldar y eliminar configs duplicadas SOLO en src
$backup = Join-Path $cwd ("backup_firebase_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
New-Item -ItemType Directory $backup | Out-Null

Get-ChildItem -Recurse $frontSrc -Filter firebaseConfig.js | ForEach-Object {
  Copy-Item $_.FullName $backup
  Remove-Item $_.FullName
}
Get-ChildItem -Recurse $frontSrc -Filter firebase.js | ForEach-Object {
  if ($_.FullName -ne $canonFile) {
    Copy-Item $_.FullName $backup
    Remove-Item $_.FullName
  }
}

# 4) Reescribir imports y quitar initializeApp residuales en src (sin -Raw)
$files = Get-ChildItem -Recurse $frontSrc -Include *.js,*.jsx,*.ts,*.tsx
foreach ($f in $files) {
  $c = [System.IO.File]::ReadAllText($f.FullName)

  # Cambiar imports a '@/firebase'
  $c = [Regex]::Replace($c, "from\s+['""](\.\/|\.\.\/)*firebaseConfig['""]", "from '@/firebase'")
  $c = [Regex]::Replace($c, "from\s+['""](\.\/|\.\.\/)*firebase['""]", "from '@/firebase'")

  # Eliminar imports de initializeApp (fuera del canónico) y comentar llamadas
  if ($f.FullName -ne $canonFile) {
    $c = [Regex]::Replace($c, "import\s*{[^}]*initializeApp[^}]*}\s*from\s*['""]firebase\/app['""]\s*;?", "")
    $c = [Regex]::Replace($c, "initializeApp\s*\(", "// initializeApp(")
  }

  [System.IO.File]::WriteAllText($f.FullName, $c)
}

Write-Host "`nArchivos que AÚN llaman initializeApp() en src (debería estar vacío):" -ForegroundColor Yellow
(Get-ChildItem -Recurse $frontSrc -Include *.js,*.jsx,*.ts,*.tsx |
  Select-String -Pattern "initializeApp\(" |
  Select-Object -ExpandProperty Path -Unique) | ForEach-Object { Write-Host $_ }

Write-Host "`nListo. Reinicia Vite (npm run dev)." -ForegroundColor Green
