import express from "express";
const router = express.Router();
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/webhook", express.raw({type: 'application/json'}), async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const usuarioId = session.metadata.usuarioId;
    // Aquí: actualiza a PRO en tu DB
    await db.collection("usuarios").doc(usuarioId).update({
      plan: "pro",
      expiracionPro: new Date(Date.now() + 30*24*60*60*1000) // 30 días PRO, por ejemplo
    });
  }

  res.json({ received: true });
});

export default router;
