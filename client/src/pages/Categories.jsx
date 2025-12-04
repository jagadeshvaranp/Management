import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, X, Edit2, Trash2, Plus, Loader } from "lucide-react";

// Use relative path - will be proxied by IIS web.config in production
// or Vite proxy in development
const API_BASE = "/api/categories";

// --- Toast Component using lucide-react icons ---
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  const baseClasses =
    "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 z-50 flex items-center";
  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
  }[type] || "bg-gray-700";

  const icon =
    type === "success" ? (
      <CheckCircle className="w-5 h-5 mr-3" />
    ) : (
      <XCircle className="w-5 h-5 mr-3" />
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
      <button
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
// --- End Toast Component ---

const Categories = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "" });
  const showToast = (message, type = "success") => setToast({ message, type });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast("Please enter category name", "error");
      return false;
    }
    if (!formData.description.trim()) {
      showToast("Please enter description", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const action = editId ? "Updated" : "Created";

    try {
      const payload = { ...formData };
      if (editId) {
        const res = await fetch(`${API_BASE}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const updatedCategory = await res.json();
        setCategories((prev) =>
          prev.map((c) => (c._id === editId ? updatedCategory : c))
        );
        setEditId(null);
      } else {
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const newCategory = await res.json();
        setCategories((prev) => [...prev, newCategory]);
      }
      showToast(`Category successfully ${action}.`, "success");
      setFormData({ name: "", description: "" });
    } catch (err) {
      console.error("Submit error", err);
      showToast(`Unable to ${action.toLowerCase()} category.`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id || null);
    setFormData({ name: category.name, description: category.description });
  };

  const handleDelete = async (id) => {
    if (!id || !confirm("Delete this category?")) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c._id !== id));
      showToast("Category successfully deleted.", "success");
    } catch (err) {
      console.error("Delete error", err);
      showToast("Unable to delete category.", "error");
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
            <div className="bg-white rounded-lg shadow-sm p-6">
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
                    categories.map((category) => (
                      <tr
                        key={category._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition duration-300 ease-in-out"
                      >
                        <td className="py-4 px-4 font-semibold text-gray-900">
                          {category.name}
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">
                          {category.description}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          {category.productCount || 0}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleEdit(category)}
                              className="text-cyan-600 hover:text-cyan-700 transition-colors transform hover:scale-110"
                              title="Edit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(category._id)}
                              className="text-red-600 hover:text-red-700 transition-colors transform hover:scale-110"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
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

          {/* Add/Edit Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
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
                    className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white py-2.5 rounded-lg font-medium hover:bg-cyan-700 transition-all duration-300 ease-in-out disabled:bg-cyan-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                    {isSubmitting ? "Saving..." : editId ? "Update" : "Create"}
                  </button>

                  {editId && (
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 bg-gray-200 text-gray-800 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
};

export default Categories;
