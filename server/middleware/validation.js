// middleware/validation.js
const { body } = require('express-validator');

exports.validateStockRecord = [
  body('fertilizerName')
    .trim()
    .notEmpty().withMessage('Fertilizer name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Fertilizer name must be 2-100 characters'),
  
  body('stateLocation')
    .notEmpty().withMessage('State location is required')
    .isIn([
      'Maharashtra', 'Karnataka', 'Gujarat', 'Punjab', 'Tamil Nadu',
      'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'West Bengal', 'Haryana'
    ]).withMessage('Invalid state location'),
  
  body('stockQuantity')
    .isFloat({ min: 0.01, max: 1000000 })
    .withMessage('Stock quantity must be between 0.01 and 1,000,000 MT'),
  
  body('unitPrice')
    .isFloat({ min: 0.01, max: 100000 })
    .withMessage('Unit price must be between 0.01 and 100,000 INR'),
  
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];
