import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  fertilizerName: { type: String, required: true, trim: true },
  stateLocation: { type: String, required: true, trim: true },
  stockQuantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
}, {
  versionKey: false
});

export default mongoose.model("Stock", StockSchema);
