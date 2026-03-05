import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ cartCount, onOpenCart, authUser, onOpenAuth, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menu = [
    { name: "Home", id: "home" },
    { name: "Products", id: "products" },
    // { name: "About", id: "about" },
    { name: "Our Story", id: "our-story" },
    { name: "Maps", id: "maps" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        background: "rgba(247, 245, 242, 0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #d9d4cd",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "14px 22px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <nav className="desktop-nav" style={{ display: "flex", gap: "18px", justifySelf: "start" }}>
          {menu.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} style={navBtn}>
              {item.name}
            </button>
          ))}
        </nav>

        <Link to="/" style={{ textDecoration: "none", justifySelf: "center" }}>
          <h2 className="brand-serif" style={{ margin: 0, fontSize: "30px", letterSpacing: "0.22em", fontWeight: 600, color: "#111", lineHeight: 1 }}>
            ATELIER
          </h2>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifySelf: "end" }}>
          {authUser ? (
            <button onClick={onSignOut} style={ghostBtn}>Sign Out</button>
          ) : (
            <button onClick={onOpenAuth} style={ghostBtn}>Sign In</button>
          )}

          <button onClick={onOpenCart} style={darkBtn}>Bag ({cartCount})</button>

          <button className="mobile-nav-btn" onClick={() => setMenuOpen((prev) => !prev)} style={{ ...ghostBtn, display: "none" }}>
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ borderTop: "1px solid #d9d4cd", background: "#f7f5f2", display: "flex", flexDirection: "column", padding: "12px 22px 18px", gap: "12px" }}>
          {menu.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} style={{ ...navBtn, textAlign: "left", width: "fit-content" }}>
              {item.name}
            </button>
          ))}

          {authUser ? (
            <button onClick={onSignOut} style={{ ...ghostBtn, width: "fit-content" }}>Sign Out</button>
          ) : (
            <button onClick={onOpenAuth} style={{ ...ghostBtn, width: "fit-content" }}>Sign In</button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-btn {
            display: inline-block !important;
          }
          header > div {
            grid-template-columns: 1fr auto !important;
          }
        }
      `}</style>
    </header>
  );
}

const navBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "#222",
  padding: 0,
};

const ghostBtn = {
  border: "1px solid #111",
  background: "transparent",
  color: "#111",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  padding: "8px 10px",
  cursor: "pointer",
};

const darkBtn = {
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  padding: "8px 10px",
  cursor: "pointer",
};

export default Header;
