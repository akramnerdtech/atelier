import React, { useState } from "react";

export default function Contact() {

  const [formData, setFormData]= useState({
    firstName:'',
    lastName:'',
    email:'',
    description:''

  })


   const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log('formData', formData)
    setFormData({
      firstName : '',
      lastName: '',
      email:'',
      description:''
    })
  }
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e3ded8",
          padding: "36px 28px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1.4fr",
          gap: "24px",

        }}
      >
        <div>
          <p style={smallLabel}>Contact</p>
          <h2 className="brand-serif" style={{ margin: "10px 0 14px", fontSize: "46px", lineHeight: 1 }}>
            Client Services
          </h2>
          <p style={{ margin: 0, color: "#525252", fontSize: "13px", lineHeight: 1.8 }}>
            Need sizing guidance, order support, or styling recommendations? Our team usually responds within 24 hours.
          </p>
        </div>

        <form style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }} onSubmit={handleSubmit}>
          <input name="firstName" type="text" placeholder="First name" style={inputStyle} value={formData.firstName} onChange={handleChange} />
          <input name="lastName" type="text" placeholder="Last name" style={inputStyle} value={formData.lastName} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" style={{ ...inputStyle, gridColumn: "1 / -1" }} value={formData.email} onChange={handleChange}/>
          <textarea
            name="description"
            rows="6"
            placeholder="How can we help?"
            style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }}
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit" style={submitBtn}>
            Submit Request
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #contact form {
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

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: 0,
  fontSize: "13px",
  fontFamily: "Montserrat, Avenir Next, Helvetica Neue, sans-serif",
  background: "#fff",
};

const submitBtn = {
  gridColumn: "1 / -1",
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  padding: "13px 18px",
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  fontSize: "11px",
  cursor: "pointer",
};
