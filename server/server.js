import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import stocksRouter from "./routes/stocks.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
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

// ---------    User Authentication        --------- //
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const User = mongoose.model("User", userSchema);

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.status(200).json({ user, message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------- Stock API --------- //
app.use("/api/stocks", stocksRouter);

// Health check
app.get("/", (req, res) => res.send({ ok: true, message: "API running" }));

// Start server
const PORT =  5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));