import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import stocksRouter from "./routes/stocks.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/stockdb";
mongoose.set("strictQuery", false);
mongoose.connect(MONGO)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api/stocks", stocksRouter);

// simple health check
app.get("/", (req, res) => res.send({ ok: true, message: "Stock API running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
