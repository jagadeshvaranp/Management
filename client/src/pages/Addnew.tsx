import React, { useEffect, useState } from "react";

interface StockRecord {
  _id?: string;
  id?: string;
  fertilizerName: string;
  sku: string;
  stateLocation: string;
  stockQuantity: number;
  unitPrice: number;
  totalValue: number;
  timestamp?: string | Date;
}

interface FormData {
  fertilizerName: string;
  sku: string;
  stateLocation: string;
  stockQuantity: string;
  unitPrice: string;
}

const API_BASE = "/api/stocks";

const FertilizerStockManagement: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fertilizerName: "",
    sku: "",
    stateLocation: "Maharashtra",
    stockQuantity: "",
    unitPrice: ""
  });

  const [currentInventory, setCurrentInventory] = useState<StockRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const states = [
    "Maharashtra", "Karnataka", "Gujarat", "Punjab", "Tamil Nadu", 
    "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"
  ];

  const categories = [
    "Electronics", "Apprael", "Groceries", "Furniture", "Books"
  ];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setCurrentInventory(data.map((r: any) => ({
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
      alert("Please enter product name");
      return false;
    }
    if (!formData.stockQuantity || parseFloat(formData.stockQuantity) < 0) {
      alert("Please enter valid stock quantity");
      return false;
    }
    if (!formData.unitPrice || parseFloat(formData.unitPrice) < 0) {
      alert("Please enter valid price");
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
        sku: formData.sku,
        stateLocation: formData.stateLocation,
        stockQuantity: parseFloat(formData.stockQuantity),
        unitPrice: parseFloat(formData.unitPrice)
      };

      if (editId) {
        const res = await fetch(`${API_BASE}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const updatedRecord = await res.json();
        setCurrentInventory(prev => prev.map(p => p._id === editId ? updatedRecord : p));
        setEditId(null);
      } else {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const newRecord = await res.json();
        setCurrentInventory(prev => [newRecord, ...prev]);
      }

      setFormData({ fertilizerName: "", sku: "", stateLocation: "Maharashtra", stockQuantity: "", unitPrice: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Submit error", err);
      alert("Unable to save record. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (record: StockRecord) => {
    setEditId(record._id || null);
    setFormData({
      fertilizerName: record.fertilizerName,
      sku: record.sku,
      stateLocation: record.stateLocation,
      stockQuantity: String(record.stockQuantity),
      unitPrice: String(record.unitPrice)
    });
    setShowModal(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this record?")) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      setCurrentInventory(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      alert("Unable to delete");
    }
  };

  const filteredInventory = currentInventory.filter(item =>
    item.fertilizerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.stateLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStockColor = (qty: number) => {
    if (qty < 10) return "text-red-600";
    if (qty < 50) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Product Catalog ({currentInventory.length})
            </h1>
            <button
              onClick={() => {
                setEditId(null);
                setFormData({ fertilizerName: "", sku: "", stateLocation: "Maharashtra", stockQuantity: "", unitPrice: "" });
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Stock
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price ($)
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="font-medium">No product records found</p>
                        <p className="text-sm">Add your first product to get started</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((record) => (
                    <tr key={record._id || record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{record.fertilizerName}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {record.sku || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 text-sm bg-cyan-100 text-cyan-800 rounded-full">
                          {record.stateLocation}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-semibold ${getStockColor(record.stockQuantity)}`}>
                          {record.stockQuantity}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-medium">
                        ${Number(record.unitPrice).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(record)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(record._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editId ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="fertilizerName"
                  value={formData.fertilizerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="stateLocation"
                    value={formData.stateLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    placeholder="0"
                    step="1"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    placeholder="0"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-cyan-700 transition-colors disabled:bg-cyan-400 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerStockManagement;