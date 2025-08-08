import express from "express";
const router = express.Router();
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Crea sesión de pago (Stripe Checkout)
router.post("/create-checkout-session", async (req, res) => {
  const { usuarioId } = req.body; // Puedes recibir más data
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Plan Pro LitisBot', description: 'Consultas y descargas ilimitadas.' },
        unit_amount: 9900, // $99.00 (centavos)
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: process.env.FRONTEND_URL + '/pago-exitoso?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: process.env.FRONTEND_URL + '/pago-cancelado',
    metadata: { usuarioId }
  });
  res.json({ id: session.id });
});

export default router;
