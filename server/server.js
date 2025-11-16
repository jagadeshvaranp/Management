import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import stocksRouter from "./routes/stocks.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/stockdb";
mongoose.set("strictQuery", false);
mongoose.connect(MONGO)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);      // Auth routes (register/login)
app.use("/api/stocks", stocksRouter);  // Existing stock API

// Health check
app.get("/", (req, res) => res.send({ ok: true, message: "API running" }));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
