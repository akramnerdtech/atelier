import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { getCategories, getProducts } from "../api/catalogApi";

export default function ProductPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let mounted = true;

    Promise.all([getProducts(), getCategories()]).then(([productData, categoryData]) => {
      if (!mounted) {
        return;
      }
      setProducts(productData);
      setCategories(categoryData);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (!categoryFromUrl) {
      setActiveCategory("All");
      return;
    }

    const matchedCategory = categories.find(
      (item) => item.toLowerCase() === categoryFromUrl.toLowerCase()
    );

    setActiveCategory(matchedCategory || "All");
  }, [searchParams, categories]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  const visibleProducts = useMemo(() => {
    const byCategory =
      activeCategory === "All"
        ? products
        : products.filter((item) => item.category === activeCategory);

    const byQuery = query.trim()
      ? byCategory.filter((item) =>
          item.productName.toLowerCase().includes(query.trim().toLowerCase())
        )
      : byCategory;

    const sorted = [...byQuery];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "name") {
      sorted.sort((a, b) => a.productName.localeCompare(b.productName));
    }
    return sorted;
  }, [products, activeCategory, query, sortBy]);

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
      <div style={{ marginBottom: "18px", display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-end", flexWrap: "wrap" }}>
        <div>
          <p style={smallLabel}>Woman / Collection</p>
          <h2 className="brand-serif" style={{ margin: "8px 0 0", fontSize: "54px", lineHeight: 0.95 }}>Shop</h2>
        </div>
        <p style={{ margin: 0, fontSize: "11px", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {visibleProducts.length} items
        </p>
      </div>

      <div style={{ border: "1px solid #dfdbd5", background: "#fff", padding: "12px", marginBottom: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", alignItems: "center" }}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name"
            style={{ border: "1px solid #ccc", padding: "10px 12px", fontSize: "12px", width: "100%", textTransform: "uppercase", letterSpacing: "0.08em" }}
          />

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            style={{ border: "1px solid #ccc", padding: "10px 12px", fontSize: "12px", background: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                border: activeCategory === category ? "1px solid #111" : "1px solid #ccc",
                background: activeCategory === category ? "#111" : "#fff",
                color: activeCategory === category ? "#fff" : "#222",
                padding: "8px 10px",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                cursor: "pointer",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading && <p style={{ fontSize: "14px", color: "#666" }}>Loading catalog...</p>}

      {!loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(245px, 1fr))", gap: "18px" }}>
          {visibleProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: index * 0.015 }}
              viewport={{ once: true }}
              style={{ background: "#fff", border: "1px solid #e3ded8", display: "flex", flexDirection: "column" }}
            >
              <div style={{ position: "relative", background: "#f3f0ec", aspectRatio: "4 / 5", overflow: "hidden" }}>
                <img
                  src={product.image}
                  alt={product.productName}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.35s ease" }}
                />
              </div>

              <div style={{ padding: "14px 14px 16px" }}>
                <p style={{ margin: 0, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#666" }}>
                  {product.category}
                </p>
                <h3 className="brand-serif" style={{ margin: "8px 0 6px", fontSize: "28px", lineHeight: 1 }}>{product.productName}</h3>
                <p style={{ margin: 0, fontSize: "13px", color: "#222" }}>${product.price.toFixed(2)}</p>
              </div>

              <div style={{ padding: "0 14px 14px", marginTop: "auto" }}>
                <button onClick={() => onAddToCart(product)} style={addBtn}>
                  Add To Bag
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}

const smallLabel = {
  margin: 0,
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#4c4c4c",
};

const addBtn = {
  width: "100%",
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  padding: "11px 12px",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  cursor: "pointer",
};
