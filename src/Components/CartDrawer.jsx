import React from "react";

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  isPaying,
  authUser,
  onOpenAuth,
}) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <>
      {isOpen && (
        <button
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            border: "none",
            background: "rgba(0,0,0,0.35)",
            zIndex: 1200,
          }}
          aria-label="Close cart overlay"
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-440px",
          width: "min(440px, 100vw)",
          height: "100vh",
          background: "#fff",
          borderLeft: "1px solid #ddd",
          transition: "right 0.24s ease",
          zIndex: 1300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "22px 20px", borderBottom: "1px solid #ececec", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#666" }}>Shopping Bag</p>
            <h3 className="brand-serif" style={{ margin: "8px 0 0", fontSize: "30px" }}>{totalItems} item{totalItems === 1 ? "" : "s"}</h3>
          </div>
          <button onClick={onClose} style={{ border: "1px solid #111", background: "#fff", padding: "8px 10px", cursor: "pointer" }}>Close</button>
        </div>

        <div style={{ padding: "16px 20px", overflowY: "auto", flex: 1 }}>
          {!authUser && (
            <div style={{ border: "1px solid #e1ddd7", background: "#f8f6f3", padding: "10px", marginBottom: "14px" }}>
              <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#444" }}>Sign in to continue checkout.</p>
              <button onClick={onOpenAuth} style={{ border: "1px solid #111", background: "#111", color: "#fff", padding: "8px 10px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                Sign In / Sign Up
              </button>
            </div>
          )}

          {items.length === 0 && <p style={{ color: "#555", fontSize: "14px" }}>Your bag is empty.</p>}

          {items.map((item) => (
            <article key={item.id} style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: "12px", borderBottom: "1px solid #eee", paddingBottom: "14px", marginBottom: "14px" }}>
              <img src={item.image} alt={item.productName} style={{ width: "88px", height: "110px", objectFit: "cover" }} />
              <div>
                <p style={{ margin: 0, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#666" }}>{item.category}</p>
                <h4 className="brand-serif" style={{ margin: "6px 0", fontSize: "20px", lineHeight: 1.15 }}>{item.productName}</h4>
                <p style={{ margin: "0 0 10px", fontSize: "13px" }}>${item.price.toFixed(2)}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => onDecrease(item.id)} style={qtyBtn}>-</button>
                  <span style={{ minWidth: "20px", textAlign: "center", fontSize: "13px" }}>{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)} style={qtyBtn}>+</button>
                  <button onClick={() => onRemove(item.id)} style={{ ...qtyBtn, marginLeft: "8px" }}>Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #ececec", padding: "16px 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Subtotal</span>
            <strong style={{ fontSize: "16px" }}>${subtotal.toFixed(2)}</strong>
          </div>
          <p style={{ margin: "0 0 14px", color: "#666", fontSize: "12px" }}>Taxes and shipping calculated at checkout.</p>
          <button
            onClick={onCheckout}
            disabled={items.length === 0 || isPaying}
            style={{
              width: "100%",
              border: "1px solid #111",
              background: items.length === 0 || isPaying ? "#666" : "#111",
              color: "#fff",
              padding: "12px",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: items.length === 0 || isPaying ? "not-allowed" : "pointer",
            }}
          >
            {isPaying ? "Opening Stripe Checkout..." : "Secure Checkout"}
          </button>
        </div>
      </aside>
    </>
  );
}

const qtyBtn = {
  border: "1px solid #111",
  background: "#fff",
  padding: "4px 8px",
  cursor: "pointer",
  fontSize: "12px",
};
