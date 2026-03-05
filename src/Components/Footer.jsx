import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    // update URL
    navigate(`/?category=${category}`);

    // scroll to products section
    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <footer style={{ borderTop: "1px solid #d9d4cd", background: "#f7f5f2", padding: "46px 22px 24px" }}>
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr repeat(3, minmax(0, 1fr))",
          gap: "22px",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 10px", fontSize: "32px" }}>ATELIER</h3>
          <p style={{ fontSize: "12px", color: "#4d4d4d" }}>
            Contemporary essentials with refined materials and clean silhouettes.
          </p>
        </div>

        <div>
          <p style={headingStyle}>Categories</p>
          <p style={bodyStyle} onClick={() => goToCategory("Sandals")}>Sandals</p>
          <p style={bodyStyle} onClick={() => goToCategory("Shoes")}>Shoes</p>
          <p style={bodyStyle} onClick={() => goToCategory("Handbags")}>Handbags</p>
          <p style={bodyStyle} onClick={() => goToCategory("Perfumes")}>Perfumes</p>
        </div>

        <div>
          <p style={headingStyle}>Company</p>
          <p style={bodyStyle}>About</p>
          <p style={bodyStyle}>Contact</p>
          <p style={bodyStyle}>Store Locator</p>
        </div>

        <div>
          <p style={headingStyle}>Customer Care</p>
          <p style={bodyStyle}>+1 (555) 012-3456</p>
          <p style={bodyStyle}>support@atelier.com</p>
        </div>
      </div>
    </footer>
  );
}

const headingStyle = {
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.16em",
};

const bodyStyle = {
  fontSize: "12px",
  color: "#4d4d4d",
  cursor: "pointer",
  marginBottom: "6px",
};