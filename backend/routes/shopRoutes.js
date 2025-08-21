// backend/routes/shopRoutes.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/eco-products", async (req, res) => {
  try {
    // Search for "eco" in DummyJSON products
    const response = await fetch("https://dummyjson.com/products/search?q=eco");
    const data = await response.json();

    const products = data.products.map((item) => ({
      id: item.id,
      title: item.title,
      price: `$${item.price}`,
      url: `https://dummyjson.com/products/${item.id}`,
      image: item.thumbnail,
    }));

    if (products.length === 0) {
      return res.json({ products: [], message: "No eco products found" });
    }

    res.json({ products });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: err.message });
  }
});

export default router;
