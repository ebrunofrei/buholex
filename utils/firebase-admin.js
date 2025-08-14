// services/firebaseAdmin.js (ESM, Node 20)
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getMessaging } from "firebase-admin/messaging";

if (!getApps().length) {
  const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  initializeApp({
    credential: cert(sa),
    ...(process.env.FIREBASE_STORAGE_BUCKET
      ? { storageBucket: process.env.FIREBASE_STORAGE_BUCKET }
      : {}),
  });
}

export const db = getFirestore();
export const storage = getStorage();
export const messaging = getMessaging();
