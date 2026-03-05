import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import CartDrawer from "./Components/CartDrawer";
import AuthModal from "./Components/AuthModal";
import PaymentSuccess from "./Components/PaymentSuccess";
import { loadStripeJs } from "./lib/stripe";
import { clearStoredUser, getStoredUser, setStoredUser } from "./lib/auth";

const CART_KEY = "atelier_cart_items";

async function createStripeCheckoutSession({ cartItems, userEmail }) {
  const checkoutApiUrl = process.env.REACT_APP_STRIPE_CHECKOUT_API;

  if (!checkoutApiUrl) {
    throw new Error("Missing REACT_APP_STRIPE_CHECKOUT_API in .env.");
  }

  const response = await fetch(checkoutApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.productName,
        quantity: item.quantity,
        unitPrice: item.price,
        image: item.image,
      })),
      customerEmail: userEmail,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/?payment=cancel`,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Stripe checkout session.");
  }

  const data = await response.json();

  if (!data?.sessionId) {
    throw new Error("Stripe sessionId missing from backend response.");
  }

  return data.sessionId;
}

function App() {
  // console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");

    if (paymentStatus === "cancel") {
      alert("Payment canceled.");
      window.history.replaceState({}, "", "/");
    }

    const storedUser = getStoredUser();
    if (storedUser) {
      setAuthUser(storedUser);
    }

    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (_error) {
      localStorage.removeItem(CART_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAuthSuccess = (user) => {
    setAuthUser(user);
    setStoredUser(user);
  };

  const handleSignOut = () => {
    setAuthUser(null);
    clearStoredUser();
  };

  const handleCheckout = async () => {
    if (!authUser) {
      alert("Please sign in to continue to payment.");
      setIsAuthOpen(true);
      return;
    }

    if (cartItems.length === 0 || isPaying) {
      return;
    }

    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      alert("Missing Stripe key. Add REACT_APP_STRIPE_PUBLISHABLE_KEY in your .env file.");
      return;
    }

    setIsPaying(true);

    try {
      const stripeLoaded = await loadStripeJs();
      if (!stripeLoaded) {
        throw new Error("Could not load Stripe.js");
      }

      const sessionId = await createStripeCheckoutSession({
        cartItems,
        userEmail: authUser.email,
      });
      const stripe = window.Stripe(publishableKey);

      if (!stripe) {
        throw new Error("Stripe initialization failed.");
      }

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result?.error?.message) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      alert(error.message || "Unable to start Stripe checkout.");
      setIsPaying(false);
    }
  };

  return (
    <Router>
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        authUser={authUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
      />

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/success" element={<PaymentSuccess onComplete={() => setCartItems([])} />} />
        <Route
          path="/payment-success"
          element={<PaymentSuccess onComplete={() => setCartItems([])} />}
        />
      </Routes>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
        isPaying={isPaying}
        authUser={authUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Router>
  );
}

export default App;
