import React, { useState } from 'react';

function Customer() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St, Colombo',
      email: 'john@example.com',
      phone: '0771234567',
      city: 'Colombo',
      nic: '987654321V',
      photo: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Side Rd, Kandy',
      email: 'jane@example.com',
      phone: '0777654321',
      city: 'Kandy',
      nic: '123456789V',
      photo: 'https://via.placeholder.com/50',
    },
    // Add more sample customers here
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.nic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
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
              <th className="p-2">Customer ID</th>
              <th className="p-2">Customer Name</th>
              <th className="p-2">Address</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone Number</th>
              <th className="p-2">Current City</th>
              <th className="p-2">NIC No</th>
              <th className="p-2">Customer Photo</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-100">
                <td className="p-2 text-center">{customer.id}</td>
                <td className="p-2 text-center">{customer.name}</td>
                <td className="p-2 text-center">{customer.address}</td>
                <td className="p-2 text-center">{customer.email}</td>
                <td className="p-2 text-center">{customer.phone}</td>
                <td className="p-2 text-center">{customer.city}</td>
                <td className="p-2 text-center">{customer.nic}</td>
                <td className="p-2 text-center">
                  <img
                    src={customer.photo}
                    alt="User Photo"
                    className="w-10 h-10 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 text-center">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
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