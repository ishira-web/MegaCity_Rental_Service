import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch customers from backend API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/getAllCustomers');
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);  // Empty dependency array means this runs once when the component mounts

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.nic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete customer by ID
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/auth/deleteCustomer/${id}`);
      if (response.status === 200) {
        setCustomers(customers.filter((customer) => customer.customerId !== id)); // Remove deleted customer from state
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="min-h-[91vh] p-6">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, Phone, City, or NIC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2">Customer Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone Number</th>
              <th className="p-2">NIC No</th>
              <th className="p-2">Customer Photo</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.customerId} className="border-b hover:bg-gray-100">
                <td className="p-2 text-center">{customer.name}</td>
                <td className="p-2 text-center">{customer.email}</td>
                <td className="p-2 text-center">{customer.phone}</td>
                <td className="p-2 text-center">{customer.nicNumber}</td>
                <td className="p-2 text-center">
                  <img
                    src={customer.customerProfile}
                    alt="User Photo"
                    className="w-10 h-10 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className=" flex  gap-5 p-2 text-center">
                  <button className="bg-red-500 text-white px-4 py-1 rounded  hover:bg-red-700" onClick={() => handleDelete(customer.customerId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;
