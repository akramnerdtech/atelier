import React from "react";

export default function About() {
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e3ded8",
          padding: "44px 30px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "28px",
        }}
      >
        <div>
          <p style={smallLabel}>About Atelier</p>
          <h2 className="brand-serif" style={{ margin: "10px 0 14px", fontSize: "48px", lineHeight: 1 }}>
            Designed For Real Wardrobes
          </h2>
          <p style={copy}>
            We build focused collections around clean structure, elevated materials, and timeless neutrals.
            Every piece is made to layer, repeat, and stay relevant far beyond one season.
          </p>
          <p style={copy}>
            From daily essentials to occasionwear, our approach is simple: less noise, better design, and a
            shopping experience that feels calm and intentional.
          </p>
        </div>

        <div style={{ borderLeft: "1px solid #ece8e2", paddingLeft: "20px" }}>
          <p style={miniLabel}>Atelier Values</p>
          <p style={miniItem}>Tailored Simplicity</p>
          <p style={miniItem}>Premium Materials</p>
          <p style={miniItem}>Responsible Production</p>
          <p style={miniItem}>Seasonless Styling</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #about > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const smallLabel = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#4c4c4c",
};

const copy = {
  margin: "0 0 12px",
  maxWidth: "900px",
  color: "#4f4f4f",
  lineHeight: 1.8,
  fontSize: "14px",
};

const miniLabel = {
  margin: "0 0 12px",
  fontSize: "11px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#4c4c4c",
};

const miniItem = {
  margin: "0 0 8px",
  fontSize: "13px",
  color: "#303030",
};
