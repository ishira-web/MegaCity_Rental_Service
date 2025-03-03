import React, { useState, useEffect } from "react";
import { Edit, Trash2, XCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories from backend when component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/getAllCategories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Open Delete Confirmation Modal
  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  // Delete category
  const handleDelete = async () => {
    if (!categoryToDelete) return;
  
    try {
      const response = await fetch(`http://localhost:8080/auth/${categoryToDelete.catID}`, { // ✅ FIXED URL
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
  
      setCategories(categories.filter((category) => category.catID !== categoryToDelete.catID));
      toast.success("Category deleted successfully!");
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };
  

  return (
    <div className="min-h-[91vh] p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Categories</h1>

      <div className="overflow-x-auto bg-white p-4 shadow-md rounded-md">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Car Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Model</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Seats</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Luggage</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price/Km</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category.catID} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.catType}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.catModel}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.noOfSeats}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.lagguageType}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.pricePerKm}</td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                      <Edit size={16} />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      onClick={() => openDeleteModal(category)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border border-gray-300 px-4 py-2 text-center">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[300px] text-center">
            <XCircle className="text-red-500 mx-auto mb-2" size={40} />
            <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
            <p>Are you sure you want to delete <strong>{categoryToDelete?.catModel}</strong>?</p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Category;
