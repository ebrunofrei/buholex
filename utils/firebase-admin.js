<<<<<<< HEAD
import admin from "firebase-admin";
import fs from "fs/promises";

// Lee el JSON de credenciales usando fs/promises y JSON.parse
const serviceAccount = JSON.parse(
  await fs.readFile(
    new URL("../firebase-service-account.json", import.meta.url)
  )
);
=======
import { createRequire } from "module";
import admin from "firebase-admin";
const require = createRequire(import.meta.url);
import serviceAccount from "../firebase-service-account.json";
>>>>>>> 7223835 (chore: initial backend deploy (api + vercel.json))

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };
