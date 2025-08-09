// src/services/firebaseMessaging.js
import app from "@/firebase";
import { isSupported, getMessaging, getToken, onMessage } from "firebase/messaging";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || "";

let messagingInstance = null;

export async function setupMessaging() {
  try {
    if (!(await isSupported())) return null;
    messagingInstance = getMessaging(app);
    return messagingInstance;
  } catch (e) {
    console.warn("FCM no soportado o error al inicializar:", e);
    return null;
  }
}

export async function getFcmToken() {
  if (!messagingInstance) await setupMessaging();
  if (!messagingInstance) return null;
  try {
    const token = await getToken(
      messagingInstance,
      VAPID_KEY ? { vapidKey: VAPID_KEY } : undefined
    );
    return token || null;
  } catch (e) {
    console.warn("No se pudo obtener token FCM:", e);
    return null;
  }
}

export async function solicitarPermisoYToken() {
  return getFcmToken();
}

export function onForegroundMessage(cb) {
  if (!messagingInstance) return () => {};
  return onMessage(messagingInstance, cb);
}
