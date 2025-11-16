// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/stockdb";
    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log(`📍 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose disconnected");
});

export default connectDB;
