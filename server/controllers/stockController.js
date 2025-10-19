// controllers/stockController.js
const StockRecord = require('../models/StockRecord');
const { validationResult } = require('express-validator');

// CREATE: Add new stock record
exports.createStockRecord = async (req, res) => {
  try {
    console.log('📥 Received stock record data:', req.body);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Create new stock record
    const stockRecord = new StockRecord({
      fertilizerName: req.body.fertilizerName,
      stateLocation: req.body.stateLocation,
      stockQuantity: req.body.stockQuantity,
      unitPrice: req.body.unitPrice,
      recordedBy: req.body.recordedBy || 'System Admin',
      notes: req.body.notes || ''
    });

    // Save to database
    const savedRecord = await stockRecord.save();

    console.log('✅ Stock record saved successfully:', savedRecord._id);

    res.status(201).json({
      success: true,
      message: 'Stock record created successfully',
      data: savedRecord
    });

  } catch (error) {
    console.error('❌ Error creating stock record:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to create stock record',
      error: error.message
    });
  }
};

// READ: Get all stock records with pagination and filters
exports.getAllStockRecords = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter = {};
    if (req.query.stateLocation) {
      filter.stateLocation = req.query.stateLocation;
    }
    if (req.query.fertilizerName) {
      filter.fertilizerName = { $regex: req.query.fertilizerName, $options: 'i' };
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Get total count for pagination
    const totalRecords = await StockRecord.countDocuments(filter);

    // Fetch records with pagination
    const records = await StockRecord.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log(`📊 Retrieved ${records.length} stock records`);

    res.json({
      success: true,
      data: records,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords: totalRecords,
        recordsPerPage: limit
      }
    });

  } catch (error) {
    console.error('❌ Error fetching stock records:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stock records',
      error: error.message
    });
  }
};

// READ: Get single stock record by ID
exports.getStockRecordById = async (req, res) => {
  try {
    const record = await StockRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Stock record not found'
      });
    }

    console.log(`✅ Retrieved stock record: ${record._id}`);

    res.json({
      success: true,
      data: record
    });

  } catch (error) {
    console.error('❌ Error fetching stock record:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stock record',
      error: error.message
    });
  }
};

// UPDATE: Update stock record
exports.updateStockRecord = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedRecord = await StockRecord.findByIdAndUpdate(
      id,
      req.body,
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Stock record not found'
      });
    }

    console.log(`✅ Updated stock record: ${updatedRecord._id}`);

    res.json({
      success: true,
      message: 'Stock record updated successfully',
      data: updatedRecord
    });

  } catch (error) {
    console.error('❌ Error updating stock record:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to update stock record',
      error: error.message
    });
  }
};

// DELETE: Delete stock record
exports.deleteStockRecord = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedRecord = await StockRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Stock record not found'
      });
    }

    console.log(`✅ Deleted stock record: ${deletedRecord._id}`);

    res.json({
      success: true,
      message: 'Stock record deleted successfully',
      data: deletedRecord
    });

  } catch (error) {
    console.error('❌ Error deleting stock record:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete stock record',
      error: error.message
    });
  }
};

// ANALYTICS: Get stock summary by state
exports.getStockSummaryByState = async (req, res) => {
  try {
    const summary = await StockRecord.aggregate([
      { $match: { status: 'Active' } },
      {
        $group: {
          _id: '$stateLocation',
          totalQuantity: { $sum: '$stockQuantity' },
          totalValue: { $sum: '$totalValue' },
          recordCount: { $sum: 1 },
          avgUnitPrice: { $avg: '$unitPrice' }
        }
      },
      { $sort: { totalValue: -1 } }
    ]);

    console.log(`📊 Generated stock summary for ${summary.length} states`);

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('❌ Error generating summary:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to generate stock summary',
      error: error.message
    });
  }
};
