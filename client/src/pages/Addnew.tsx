import React, { useEffect, useState } from "react";
import axios from "axios";

// Types (same as your original)
interface StockRecord {
  _id?: string; // server uses _id
  id?: string;
  fertilizerName: string;
  stateLocation: string;
  stockQuantity: number;
  unitPrice: number;
  totalValue: number;
  timestamp?: string | Date;
}

interface FormData {
  fertilizerName: string;
  stateLocation: string;
  stockQuantity: string;
  unitPrice: string;
}

// Icons & small components (same as your original; shortened here for brevity)
const PlusIcon = () => (/* same svg */ (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
));

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SuccessMessage = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in z-50">
    <div className="bg-white rounded-full p-1"><CheckIcon /></div>
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 hover:bg-green-600 rounded-full p-1">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const InventoryItem = ({ record, onEdit, onDelete }: { record: StockRecord; onEdit: (r: StockRecord) => void; onDelete: (id?: string) => void }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-gray-900">{record.fertilizerName}</h3>
      <div className="text-right">
        <span className="text-xs text-gray-500">{new Date(record.timestamp || Date.now()).toLocaleString('en-IN', {
          day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })}</span>
        <div className="mt-2 flex gap-2">
          <button onClick={() => onEdit(record)} className="text-indigo-600 text-sm font-medium hover:underline">Edit</button>
          <button onClick={() => onDelete(record._id)} className="text-red-600 text-sm font-medium hover:underline">Delete</button>
        </div>
      </div>
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
        <span className="ml-2 font-medium">₹{Number(record.unitPrice).toLocaleString()}</span>
      </div>
      <div>
        <span className="text-gray-600">Total Value:</span>
        <span className="ml-2 font-medium text-green-600">₹{Number(record.totalValue).toLocaleString()}</span>
      </div>
    </div>
  </div>
);

// -------------------- Main Component --------------------


const API_BASE =  "http://localhost:5000/api/stocks";

const RecordStockForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fertilizerName: "",
    stateLocation: "Maharashtra",
    stockQuantity: "",
    unitPrice: ""
  });

  const [currentInventory, setCurrentInventory] = useState<StockRecord[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const states = [
    "Maharashtra","Karnataka","Gujarat","Punjab","Tamil Nadu","Uttar Pradesh","Madhya Pradesh","Rajasthan"
  ];

  useEffect(() => {
    fetchInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(API_BASE);
      // server returns timestamp as Date; map to UI-friendly shape
      setCurrentInventory(res.data.map((r: any) => ({
        ...r,
        timestamp: r.timestamp
      })));
    } catch (err) {
      console.error("Error fetching inventory", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.fertilizerName.trim()) {
      alert("Please enter fertilizer name");
      return false;
    }
    if (!formData.stockQuantity || parseFloat(formData.stockQuantity) <= 0) {
      alert("Please enter valid stock quantity");
      return false;
    }
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) {
      alert("Please enter valid unit price");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        fertilizerName: formData.fertilizerName,
        stateLocation: formData.stateLocation,
        stockQuantity: parseFloat(formData.stockQuantity),
        unitPrice: parseFloat(formData.unitPrice)
      };

      if (editId) {
        // UPDATE
        const res = await axios.put(`${API_BASE}/${editId}`, payload);
        // update local list
        setCurrentInventory(prev => prev.map(p => p._id === editId ? res.data : p));
        setShowSuccess(true);
        setEditId(null);
      } else {
        // CREATE
        const res = await axios.post(API_BASE, payload);
        setCurrentInventory(prev => [res.data, ...prev]);
        setShowSuccess(true);
      }

      // reset
      setFormData({ fertilizerName: "", stateLocation: "Maharashtra", stockQuantity: "", unitPrice: "" });
    } catch (err) {
      console.error("Submit error", err);
      alert("Unable to save record. Check console for details.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 2500);
    }
  };

  const handleEdit = (record: StockRecord) => {
    setEditId(record._id || null);
    setFormData({
      fertilizerName: record.fertilizerName,
      stateLocation: record.stateLocation,
      stockQuantity: String(record.stockQuantity),
      unitPrice: String(record.unitPrice)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this record?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setCurrentInventory(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Unable to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {showSuccess && (
          <SuccessMessage message={editId ? "Stock record updated!" : "Stock record added successfully!"} onClose={() => setShowSuccess(false)} />
        )}

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <PlusIcon />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{editId ? "Edit Stock" : "Record New Stock / Shipment"}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Fertilizer Name</label>
                <input type="text" name="fertilizerName" value={formData.fertilizerName} onChange={handleInputChange} placeholder="e.g., Urea (46% N)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">State Location (Warehouse)</label>
                <select name="stateLocation" value={formData.stateLocation} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity (MT)</label>
                <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} placeholder="e.g., 5000" step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Price (INR)</label>
                <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} placeholder="e.g., 300.50" step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div className="flex gap-3">
                <button onClick={handleSubmit} disabled={isSubmitting}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed">
                  {isSubmitting ? "Recording..." : (editId ? "Update Stock" : "Record New Stock")}
                </button>
                {editId && (
                  <button onClick={() => { setEditId(null); setFormData({ fertilizerName: "", stateLocation: "Maharashtra", stockQuantity: "", unitPrice: "" }); }}
                    className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Current Inventory
              <span className="ml-2 text-sm font-normal text-gray-500">({currentInventory.length} records)</span>
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
                  <InventoryItem key={record._id || record.id} record={record} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default RecordStockForm;
