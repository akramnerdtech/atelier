import React from "react";

export default function Maps() {
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e3ded8",
          padding: "34px 28px",
        }}
      >
        <p style={smallLabel}>Store Locator</p>
        <h2 style={{ margin: "10px 0 18px", fontSize: "42px" }}>Visit Our Flagship</h2>
        <iframe
          title="Atelier Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9613654731202!2d-74.00294142385728!3d40.71952643715944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598d95c62f95%3A0xf7f0d9e2e9b4bf11!2sSoHo%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1718000000000"
          width="100%"
          height="420"
          style={{ border: 0, display: "block" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
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
