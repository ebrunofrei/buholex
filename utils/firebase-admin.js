import { createRequire } from "module";
import admin from "firebase-admin";
const require = createRequire(import.meta.url);
import serviceAccount from "../firebase-service-account.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };
