import express from "express";
import Stock from "../models/Stock.js";

const router = express.Router();

/**
 * GET /api/stocks
 * Return all stock records (sorted newest -> oldest)
 */
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ timestamp: -1 });
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching stocks" });
  }
});

/**
 * GET /api/stocks/:id
 * Return a single stock record by id
 */
router.get("/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Record not found" });
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/stocks
 * Create new stock record
 */
router.post("/", async (req, res) => {
  try {
    const { fertilizerName, stateLocation, stockQuantity, unitPrice } = req.body;
    if (!fertilizerName || !stateLocation || stockQuantity == null || unitPrice == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const qty = parseFloat(stockQuantity);
    const price = parseFloat(unitPrice);
    const totalValue = qty * price;

    const newStock = new Stock({
      fertilizerName,
      stateLocation,
      stockQuantity: qty,
      unitPrice: price,
      totalValue
    });

    const saved = await newStock.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating stock" });
  }
});

/**
 * PUT /api/stocks/:id
 * Update a stock record
 */
router.put("/:id", async (req, res) => {
  try {
    const { fertilizerName, stateLocation, stockQuantity, unitPrice } = req.body;
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Record not found" });

    if (fertilizerName != null) stock.fertilizerName = fertilizerName;
    if (stateLocation != null) stock.stateLocation = stateLocation;
    if (stockQuantity != null) stock.stockQuantity = parseFloat(stockQuantity);
    if (unitPrice != null) stock.unitPrice = parseFloat(unitPrice);
    if (stockQuantity != null || unitPrice != null) {
      stock.totalValue = stock.stockQuantity * stock.unitPrice;
    }

    const updated = await stock.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating stock" });
  }
});

/**
 * DELETE /api/stocks/:id
 * Delete a stock record
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted", id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting stock" });
  }
});

export default router;
