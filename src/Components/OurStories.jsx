import React from "react";
import { motion } from "framer-motion";

const clientStories = [
  {
    name: "Ava Martinez",
    city: "New York",
    story:
      "I bought sandals and a handbag for a work trip, and both looked premium while staying comfortable all day. The quality feels much better than most fast-fashion options.",
  },
  {
    name: "Sophia Lee",
    city: "Chicago",
    story:
      "My first order included shoes and perfume. Delivery was smooth, packaging was neat, and customer support helped me exchange size quickly without hassle.",
  },
  {
    name: "Emma Patel",
    city: "San Francisco",
    story:
      "Atelier has become my go-to for minimalist pieces. I can style the same items for office and weekends, which saves time and money.",
  },

  {
    name : "Maya Singh",
    city : "Toronto",
    story : "Shopping online felt effortless. The sizing guide was accurate, and the items arrived exactly as pictured, beautifully packed."
  },

  {
    name : 'Olivia Bennett',
    city : 'London',
    story : '"I ordered a pair of loafers and a tote bag, and both instantly elevated my everyday outfits. They feel durable and look sophisticated without being flashy."'
  },

   {
    name : 'Lucas Moreau',
    city: 'Paris',
    story : '"I appreciate how versatile the designs are. I wore the same jacket to meetings and casual dinners, and it fit perfectly in both settings."'
   }
];

function OurStories() {
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
      <section
        style={{
          background: "#fff",
          border: "1px solid #e3ded8",
          padding: "64px 44px",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p style={smallLabel}>Our Story</p>

        <motion.h2
          className="brand-serif"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ margin: "12px 0 18px", fontSize: "clamp(46px, 7vw, 72px)", lineHeight: 0.9 }}
        >
          What Our Clients Say
        </motion.h2>

        <p style={{ ...copy, marginBottom: "30px", maxWidth: "900px" }}>
          We focus on quality, comfort, and timeless design. Here are a few stories from clients who
          regularly shop with Atelier and trust us for everyday essentials.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "18px",
          }}
        >
          {clientStories.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              style={{
                border: "1px solid #e3ded8",
                padding: "22px",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p style={quoteStyle}>"{item.story}"</p>
              <div>
                <p style={nameStyle}>{item.name}</p>
                <p style={metaStyle}>{item.city}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

const smallLabel = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#4c4c4c",
};

const copy = {
  margin: "0 0 12px",
  color: "#4f4f4f",
  lineHeight: 1.8,
  fontSize: "15px",
};

const quoteStyle = {
  margin: "0 0 20px",
  color: "#444",
  lineHeight: 1.8,
  fontSize: "14px",
};

const nameStyle = {
  margin: "0 0 4px",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.13em",
  color: "#111",
};

const metaStyle = {
  margin: 0,
  fontSize: "11px",
  color: "#666",
};

export default OurStories;
