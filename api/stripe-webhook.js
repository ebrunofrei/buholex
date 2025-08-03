// /api/stripe-webhook.js
import { buffer } from "micro";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }
  // Al detectar pago exitoso
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Busca usuario por email o id en metadata
    const userEmail = session.customer_email;
    const userRef = doc(db, "usuarios", session.metadata.uid, "legalos", "perfil");
    await setDoc(userRef, {
      plan: "pro",
      fechaVencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      pagoId: session.id,
    }, { merge: true });
  }
  res.json({ received: true });
}
