import React, { useMemo, useState } from "react";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const title = useMemo(() => (mode === "signin" ? "Sign In" : "Create Account"), [mode]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email || !form.password || (mode === "signup" && !form.name)) {
      alert("Please fill all required fields.");
      return;
    }

    const user = {
      name: mode === "signup" ? form.name.trim() : (form.email.split("@")[0] || "Customer"),
      email: form.email.trim().toLowerCase(),
    };

    onAuthSuccess(user);
    onClose();
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <>
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          border: "none",
          background: "rgba(0, 0, 0, 0.45)",
          zIndex: 1400,
        }}
        aria-label="Close auth modal overlay"
      />

      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(450px, 92vw)",
          background: "#fff",
          border: "1px solid #ddd",
          zIndex: 1500,
          padding: "24px",
        }}
      >
        <p style={smallLabel}>Account</p>
        <h2 style={{ margin: "10px 0 18px", fontSize: "42px", lineHeight: 1 }}>{title}</h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              style={inputStyle}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            style={inputStyle}
          />

          <button type="submit" style={primaryBtn}>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>

          <button
            type="button"
            onClick={() => setMode((prev) => (prev === "signin" ? "signup" : "signin"))}
            style={secondaryBtn}
          >
            {mode === "signin" ? "Need an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </form>
      </div>
    </>
  );
}

const smallLabel = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#4c4c4c",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  fontSize: "13px",
  outline: "none",
};

const primaryBtn = {
  marginTop: "6px",
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  padding: "12px 14px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  fontSize: "11px",
  cursor: "pointer",
};

const secondaryBtn = {
  border: "1px solid #111",
  background: "#fff",
  color: "#111",
  padding: "11px 14px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "10px",
  cursor: "pointer",
};
