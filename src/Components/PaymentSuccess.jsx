import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess({ onComplete }) {
  const navigate = useNavigate();

  useEffect(() => {
    onComplete?.();

    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, onComplete]);

  return (
    <main
      style={{
        minHeight: "70vh",
        paddingTop: "120px",
        paddingInline: "22px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <section
        style={{
          maxWidth: "560px",
          width: "100%",
          border: "1px solid #e2ddd7",
          background: "#fff",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#666",
          }}
        >
          Payment Complete
        </p>
        <h1 className="brand-serif" style={{ margin: "10px 0 10px", fontSize: "42px" }}>
          Thank You
        </h1>
        <p style={{ margin: 0, color: "#444", lineHeight: 1.7, fontSize: "14px" }}>
          Your order has been placed successfully. Redirecting you to the homepage...
        </p>
      </section>
    </main>
  );
}
