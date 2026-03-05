const STRIPE_JS_URL = "https://js.stripe.com/v3/";

let stripePromise;

export function loadStripeJs() {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Stripe) {
    return Promise.resolve(true);
  }

  if (stripePromise) {
    return stripePromise;
  }

  stripePromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = STRIPE_JS_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return stripePromise;
}
