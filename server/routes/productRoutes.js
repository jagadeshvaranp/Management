import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST new product
router.post("/", async (req, res) => {
  const { name, price, stock } = req.body;
  const newProduct = new Product({ name, price, stock });
  await newProduct.save();
  res.json(newProduct);
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
