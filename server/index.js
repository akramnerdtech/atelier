const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables.");
}

const stripe = new Stripe(stripeSecretKey);

app.use(cors({ origin: clientUrl }));

app.post(
  "/api/payment/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      return res.status(400).send("Missing STRIPE_WEBHOOK_SECRET");
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Checkout complete:", session.id);
    }

    return res.json({ received: true });
  }
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "stripe-server" });
});

async function createCheckoutSession(req, res) {
  try {
    const { items = [], successUrl, cancelUrl, customerEmail } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart items are required." });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(Number(item.unitPrice) * 100),
      },
      quantity: Number(item.quantity) || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl || `${clientUrl}/?payment=success`,
      cancel_url: cancelUrl || `${clientUrl}/?payment=cancel`,
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      customer_email: customerEmail || undefined,
      metadata: {
        source: "atelier-web",
      },
    });

    return res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    return res.status(500).json({ error: "Unable to create checkout session." });
  }
}

// Keep both routes so existing frontend env values continue to work.
app.post("/api/payment/stripe/create-checkout-session", createCheckoutSession);
app.post("/create-checkout-session", createCheckoutSession);

app.listen(port, () => {
  console.log(`Stripe server running on http://localhost:${port}`);
});
