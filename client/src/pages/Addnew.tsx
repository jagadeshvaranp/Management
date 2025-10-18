import React, { useState } from 'react';

// ============================================
// STEP 1: Define TypeScript Interfaces
// ============================================
interface StockRecord {
  id: string;
  fertilizerName: string;
  stateLocation: string;
  stockQuantity: number;
  unitPrice: number;
  totalValue: number;
  timestamp: string;
}

interface FormData {
  fertilizerName: string;
  stateLocation: string;
  stockQuantity: string;
  unitPrice: string;
}

// ============================================
// STEP 2: Icon Components
// ============================================
const PlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// ============================================
// STEP 3: Success Message Component
// ============================================
const SuccessMessage = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in z-50">
    <div className="bg-white rounded-full p-1">
      <CheckIcon />
    </div>
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 hover:bg-green-600 rounded-full p-1">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

// ============================================
// STEP 4: Inventory Item Component
// ============================================
const InventoryItem = ({ record }: { record: StockRecord }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-gray-900">{record.fertilizerName}</h3>
      <span className="text-xs text-gray-500">{record.timestamp}</span>
    </div>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <span className="text-gray-600">Location:</span>
        <span className="ml-2 font-medium">{record.stateLocation}</span>
      </div>
      <div>
        <span className="text-gray-600">Quantity:</span>
        <span className="ml-2 font-medium">{record.stockQuantity} MT</span>
      </div>
      <div>
        <span className="text-gray-600">Unit Price:</span>
        <span className="ml-2 font-medium">₹{record.unitPrice.toLocaleString()}</span>
      </div>
      <div>
        <span className="text-gray-600">Total Value:</span>
        <span className="ml-2 font-medium text-green-600">₹{record.totalValue.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

// ============================================
// STEP 5: Main Component
// ============================================
const RecordStockForm = () => {
  // STEP 5A: Initialize State Variables
  const [formData, setFormData] = useState<FormData>({
    fertilizerName: '',
    stateLocation: 'Maharashtra',
    stockQuantity: '',
    unitPrice: ''
  });

  const [currentInventory, setCurrentInventory] = useState<StockRecord[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const states = [
    'Maharashtra', 
    'Karnataka', 
    'Gujarat', 
    'Punjab', 
    'Tamil Nadu',
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Rajasthan'
  ];

  // STEP 5B: Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // STEP 5C: Validate Form Data
  const validateForm = (): boolean => {
    if (!formData.fertilizerName.trim()) {
      alert('Please enter fertilizer name');
      return false;
    }
    if (!formData.stockQuantity || parseFloat(formData.stockQuantity) <= 0) {
      alert('Please enter valid stock quantity');
      return false;
    }
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) {
      alert('Please enter valid unit price');
      return false;
    }
    return true;
  };

  // STEP 5D: Handle Form Submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const quantity = parseFloat(formData.stockQuantity);
      const price = parseFloat(formData.unitPrice);
      
      const newRecord: StockRecord = {
        id: Date.now().toString(),
        fertilizerName: formData.fertilizerName,
        stateLocation: formData.stateLocation,
        stockQuantity: quantity,
        unitPrice: price,
        totalValue: quantity * price,
        timestamp: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setCurrentInventory(prev => [newRecord, ...prev]);

      setFormData({
        fertilizerName: '',
        stateLocation: 'Maharashtra',
        stockQuantity: '',
        unitPrice: ''
      });

      setShowSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => setShowSuccess(false), 3000);

      console.log('✅ Stock Record Saved:', newRecord);
      console.log('📦 Current Inventory:', [newRecord, ...currentInventory]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {showSuccess && (
          <SuccessMessage 
            message="Stock record added successfully!" 
            onClose={() => setShowSuccess(false)}
          />
        )}

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <PlusIcon />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Record New Stock / Shipment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fertilizer Name
                </label>
                <input
                  type="text"
                  name="fertilizerName"
                  value={formData.fertilizerName}
                  onChange={handleInputChange}
                  placeholder="e.g., Urea (46% N)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State Location (Warehouse)
                </label>
                <select
                  name="stateLocation"
                  value={formData.stateLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Quantity (MT)
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit Price (INR)
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  placeholder="e.g., 300.50"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Recording...' : 'Record New Stock'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Current Inventory
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({currentInventory.length} records)
              </span>
            </h2>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {currentInventory.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="font-medium">No records yet</p>
                  <p className="text-sm">Add your first stock record to get started</p>
                </div>
              ) : (
                currentInventory.map(record => (
                  <InventoryItem key={record.id} record={record} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RecordStockForm;