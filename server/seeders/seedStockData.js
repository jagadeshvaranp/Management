// seeders/seedStockData.js
require('dotenv').config();
const mongoose = require('mongoose');
const StockRecord = require('../models/StockRecord');

const sampleData = [
  {
    fertilizerName: 'Urea (46% N)',
    stateLocation: 'Maharashtra',
    stockQuantity: 5000,
    unitPrice: 850,
    recordedBy: 'Admin',
    notes: 'Initial stock for Maharashtra warehouse'
  },
  {
    fertilizerName: 'DAP (18-46-0)',
    stateLocation: 'Punjab',
    stockQuantity: 3500,
    unitPrice: 1500,
    recordedBy: 'Admin',
    notes: 'New shipment received'
  },
  {
    fertilizerName: 'MOP (Muriate of Potash)',
    stateLocation: 'Gujarat',
    stockQuantity: 4200,
    unitPrice: 1200,
    recordedBy: 'Admin',
    notes: 'Stock for Gujarat region'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await StockRecord.deleteMany({});
    console.log('🗑️  Cleared existing stock records');

    // Insert sample data
    const inserted = await StockRecord.insertMany(sampleData);
    console.log(`✅ Inserted ${inserted.length} stock records`);

    inserted.forEach(record => {
      console.log(`  - ${record.fertilizerName} (${record.stateLocation}): ${record.stockQuantity} MT`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
