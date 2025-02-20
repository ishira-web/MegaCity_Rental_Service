import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner'; // Import Sonner's toast function

function Admins() {
  const [admins, setAdmins] = useState([]); // State to store admin data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [newAdmin, setNewAdmin] = useState({
    userName: '',
    password: '',
  }); // State for new admin form
  const [showPassword, setShowPassword] = useState({}); // State to toggle password visibility

  // Fetch all admins from the database
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/getAllAdmins');
        setAdmins(response.data); // Set the fetched admin data to state
      } catch (error) {
        console.error('Error fetching admin details:', error);
        toast.error('Error fetching admin details.'); // Show error toast on failure
      }
    };
    fetchAdmins();
  }, []);

  // Handle input change for the new admin form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  // Handle adding a new admin
  const handleAddAdmin = async () => {
    if (!newAdmin.userName || !newAdmin.password) {
      toast.error('Username and Password are required!'); // Show error toast
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/admincreate', newAdmin);
      setAdmins([...admins, response.data]); // Add the new admin to the list
      setIsModalOpen(false); // Close the modal
      setNewAdmin({ userName: '', password: '' }); // Reset the form
      toast.success('Admin added successfully!'); // Show success toast
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error('Error adding admin.'); // Show error toast
    }
  };

  // Handle deleting an admin
  const handleDelete = async (adminID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this admin?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/auth/deleteAdmin/${adminID}`); // Fixed URL
        setAdmins(admins.filter((admin) => admin.adminID !== adminID)); // Remove the admin from the list
        toast.success('Admin deleted successfully!'); // Show success toast
      } catch (error) {
        console.error('Error deleting admin:', error);
        toast.error('Error deleting admin.'); // Show error toast
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (adminID) => {
    setShowPassword((prev) => ({ ...prev, [adminID]: !prev[adminID] }));
  };

  return (
    <div className="min-h-[91vh] bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Admin List</h2>

      {/* Add Admin Button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={24} />
      </button>

      {/* Admin Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2">Admin ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Password</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.adminID}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-2 text-center">{admin.adminID}</td>
                <td className="p-2 text-center">{admin.userName}</td>
                <td className="p-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span>{showPassword[admin.adminID] ? admin.password : '*****'}</span>
                    <button
                      onClick={() => togglePasswordVisibility(admin.adminID)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {showPassword[admin.adminID] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </td>
                <td className="p-2 text-center">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 flex items-center justify-center gap-2"
                    onClick={() => handleDelete(admin.adminID)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Admin</h2>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={newAdmin.userName}
              onChange={handleInputChange}
              className="w-full p-2 border mb-2 rounded"
            />
            <div className="relative">
              <input
                type={showPassword['new'] ? 'text' : 'password'} // Toggle password visibility for the new admin
                name="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={handleInputChange}
                className="w-full p-2 border mb-2 rounded"
              />
              <button
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword['new'] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
              onClick={handleAddAdmin}
            >
              Add Admin
            </button>
            <button
              className="mt-2 text-white bg-red-500 p-2 rounded w-full hover:bg-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admins;
