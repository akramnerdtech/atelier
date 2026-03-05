import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import ProductPage from "./Product";
import Maps from "./Maps";
import Contact from "./Contact";
import OurStories from "./OurStories";

const editCards = [
  {
    title: "City Sandals",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Leather Handbags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Signature Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80",
  },
];

const categoryRail = ["New In", "Sandals", "Shoes", "Handbags", "Perfumes", "Accessories"];

export default function Home({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (!category) return;

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [searchParams]);

  return (
    <div style={{ paddingTop: "74px" }}>
      <section ref={heroRef} id="home" style={{ minHeight: "88vh", position: "relative", overflow: "hidden" }}>
        <motion.div
          initial={{ clipPath: "inset(0 48% 0 48%)", scale: 1.06 }}
          animate={{ clipPath: "inset(0 0% 0 0%)", scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0, y: heroY }}
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1900&q=80"
            alt="Fashion campaign"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={heroOverlay} />
        </motion.div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1240px",
            margin: "0 auto",
            minHeight: "88vh",
            display: "flex",
            alignItems: "center",
            padding: "28px 22px",
          }}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            style={{ maxWidth: "640px", color: "#fff" }}
          >
            <motion.p variants={fadeUp} style={heroLabel}>
              Spring Summer 2026
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="brand-serif"
              style={{
                margin: "10px 0 12px",
                fontSize: "clamp(50px, 8vw, 96px)",
                lineHeight: 0.88,
              }}
            >
              Atelier Collection
            </motion.h1>
            <motion.p variants={fadeUp} style={{ margin: 0, lineHeight: 1.8, fontSize: "14px", color: "#ececec" }}>
              A cleaner editorial look with modern accessories and beauty essentials.
            </motion.p>
            <motion.div variants={fadeUp} style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() =>
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }
                style={heroPrimary}
              >
                Shop New In
              </button>
              <button
                onClick={() =>
                  document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })
                }
                style={heroSecondary}
              >
                Our Story
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={promoBar}>
        <p style={{ margin: 0, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em" }}>
          Free shipping over $150 | Free returns within 30 days | Secure Stripe checkout
        </p>
      </section>

      <section style={categoryRailWrap}>
        <div style={categoryRailInner}>
          {categoryRail.map((item) => (
            <button
              key={item}
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              style={categoryRailItem}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "10px 22px 48px" }}>
        <div style={{ marginBottom: "20px" }}>
          <p style={smallLabel}>Latest Editorial</p>
          <h2 className="brand-serif" style={{ margin: "8px 0 0", fontSize: "52px", lineHeight: 0.92 }}>
            The New Edit
          </h2>
        </div>

        <div style={editGrid}>
          {editCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              style={{
                position: "relative",
                minHeight: index === 0 ? "520px" : "420px",
                overflow: "hidden",
                background: "#151515",
                border: "1px solid #d8d1c9",
              }}
            >
              <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={cardOverlay} />
              <div style={{ position: "absolute", left: "18px", bottom: "18px", color: "#fff", zIndex: 2 }}>
                <p style={cardLabel}>2026 Edit</p>
                <h3 className="brand-serif" style={{ margin: "8px 0", fontSize: "34px", lineHeight: 0.92 }}>
                  {card.title}
                </h3>
                <button
                  onClick={() =>
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={cardBtn}
                >
                  View Collection
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 22px 48px" }}>
        <div style={campaignLayout}>
          <article style={{ background: "#fff", border: "1px solid #d8d1c9", padding: "28px" }}>
            <p style={smallLabel}>Campaign</p>
            <h2 className="brand-serif" style={{ margin: "10px 0 12px", fontSize: "54px", lineHeight: 0.9 }}>
              Minimal Form
            </h2>
            <p style={{ margin: 0, color: "#3f3f3f", lineHeight: 1.9, fontSize: "14px" }}>
              Clean silhouettes and sharp details for daily movement. Inspired by gallery spaces,
              built for the city, made to mix across accessories and beauty.
            </p>
            <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                style={{ ...heroPrimary, borderColor: "#111" }}
              >
                Explore Products
              </button>
            </div>
          </article>
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: "360px", background: "#111" }}
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1500&q=80"
              alt="Campaign portrait"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </section>

      <section id="products" style={{ padding: "24px 22px 40px" }}>
        <ProductPage onAddToCart={onAddToCart} />
      </section>

      <section id="our-story" style={{ padding: "20px 22px 30px" }}>
        <OurStories />
      </section>

      <section id="maps" style={{ padding: "20px 22px 30px" }}>
        <Maps />
      </section>

      <section id="contact" style={{ padding: "20px 22px 70px" }}>
        <Contact />
      </section>
    </div>
  );
}

const stagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0.46) 100%)",
};

const heroLabel = {
  margin: 0,
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const heroPrimary = {
  border: "1px solid #fff",
  background: "#fff",
  color: "#111",
  padding: "12px 22px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontSize: "10px",
  cursor: "pointer",
};

const heroSecondary = {
  border: "1px solid #fff",
  background: "transparent",
  color: "#fff",
  padding: "12px 22px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontSize: "10px",
  cursor: "pointer",
};

const promoBar = {
  background: "#161616",
  color: "#f3eee9",
  margin: "16px 22px 40px",
  padding: "14px",
  textAlign: "center",
  border: "1px solid #2b2b2b",
};

const categoryRailWrap = {
  maxWidth: "1240px",
  margin: "0 auto",
  padding: "0 22px 38px",
};

const categoryRailInner = {
  borderTop: "1px solid #d8d1c9",
  borderBottom: "1px solid #d8d1c9",
  padding: "14px 0",
  display: "flex",
  flexWrap: "wrap",
  gap: "12px 18px",
};

const categoryRailItem = {
  border: "none",
  background: "transparent",
  color: "#222",
  fontSize: "11px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  cursor: "pointer",
  padding: 0,
};

const smallLabel = {
  margin: 0,
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#5a5a5a",
};

const editGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "16px",
};

const cardOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.56) 100%)",
};

const cardLabel = {
  margin: 0,
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const cardBtn = {
  border: "1px solid #fff",
  background: "transparent",
  color: "#fff",
  padding: "9px 12px",
  fontSize: "10px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const campaignLayout = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
};
