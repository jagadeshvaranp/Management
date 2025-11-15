import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api/categories";

// --- New Toast Component ---
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 z-50 flex items-center";
  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
  }[type] || "bg-gray-700";
  
  const icon = type === 'success' ? (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-close after 4 seconds
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      {icon}
      {message}
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
// --- End Toast Component ---

const Categories = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- New Toast State ---
  const [toast, setToast] = useState({ message: '', type: '' });
  
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };
  // --- End New Toast State ---

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast("Please enter category name", 'error'); // CHANGED: Use toast
      return false;
    }
    if (!formData.description.trim()) {
      showToast("Please enter description", 'error'); // CHANGED: Use toast
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const action = editId ? "Updated" : "Created";

    try {
      const payload = {
        name: formData.name,
        description: formData.description
      };

      if (editId) {
        const res = await fetch(`${API_BASE}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const updatedCategory = await res.json();
        setCategories(prev => prev.map(c => c._id === editId ? updatedCategory : c));
        setEditId(null);
      } else {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const newCategory = await res.json();
        setCategories(prev => [...prev, newCategory]);
      }
      
      showToast(`Category successfully ${action}.`, 'success'); // CHANGED: Success toast
      setFormData({ name: "", description: "" });
    } catch (err) {
      console.error("Submit error", err);
      showToast(`Unable to ${action.toLowerCase()} category.`, 'error'); // CHANGED: Error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id || null);
    setFormData({
      name: category.name,
      description: category.description
    });
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!confirm("Delete this category?")) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      setCategories(prev => prev.filter(c => c._id !== id));
      showToast("Category successfully deleted.", 'success'); // CHANGED: Delete toast
    } catch (err) {
      console.error("Delete error", err);
      showToast("Unable to delete category.", 'error'); // CHANGED: Delete error toast
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Inventory Categories ({categories.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">All Categories</h2>

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-gray-500">
                          <p className="font-medium">No categories found</p>
                          <p className="text-sm">Add your first category to get started</p>
                        </td>
                      </tr>
                    ) : (
                      categories.map((category, index) => (
                        <tr
                          key={category._id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition duration-300 ease-in-out"
                          // Animation effect: Fade in and slight slide up
                          style={{
                            opacity: 1,
                            transform: 'translateY(0)',
                            animation: `fadeInUp 0.3s ease-out ${index * 0.05}s forwards`,
                            animationName: 'fadeInUp',
                            animationDuration: '0.3s',
                            animationTimingFunction: 'ease-out',
                            animationDelay: `${index * 0.05}s`,
                            animationFillMode: 'forwards',
                          }}
                        >
                          <td className="py-4 px-4">
                            <div className="font-semibold text-gray-900">{category.name}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-600 text-sm">{category.description}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-gray-900 font-medium">{category.productCount || 0}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleEdit(category)}
                                className="text-cyan-600 hover:text-cyan-700 transition-colors transform hover:scale-110"
                                title="Edit"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(category._id)}
                                className="text-red-600 hover:text-red-700 transition-colors transform hover:scale-110"
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

          {/* Add/Edit Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8 transition-transform duration-300 ease-out transform hover:shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {editId ? "Edit Category" : "Add New Category"}
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                    placeholder="e.g., Electronics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition duration-200"
                    placeholder="Enter category description..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white py-2.5 rounded-lg font-medium hover:bg-cyan-700 transition-all duration-300 ease-in-out disabled:bg-cyan-400 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    <svg className={`w-5 h-5 transition-transform duration-500 ${isSubmitting ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {/* Change icon to a loading spinner when submitting */}
                      {isSubmitting ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                    {isSubmitting ? "Saving..." : (editId ? "Update" : "Create")}
                  </button>
                  {editId && (
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 bg-gray-200 text-gray-800 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors transform hover:scale-[1.02]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the Toast Component */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />

      {/* Required CSS Keyframes for the list entry animation */}
      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Categories;