import products from "../data/products";

const NETWORK_DELAY_MS = 220;

export async function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), NETWORK_DELAY_MS);
  });
}

export async function getCategories() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = ["All", ...new Set(products.map((item) => item.category))];
      resolve(categories);
    }, NETWORK_DELAY_MS);
  });
}
