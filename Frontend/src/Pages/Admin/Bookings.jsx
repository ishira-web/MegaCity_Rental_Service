import React, { useState } from 'react';

function Bookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      date: '2025-02-17',
      time: '10:00 AM',
      driverName: 'Mike Johnson',
      status: 'Pending',
      pickupLocation: 'Colombo',
      dropLocation: 'Kandy',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      date: '2025-02-18',
      time: '2:00 PM',
      driverName: 'Alex Brown',
      status: 'Accepted',
      pickupLocation: 'Galle',
      dropLocation: 'Colombo',
    },
    // Add more sample bookings here
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter bookings based on search query
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.dropLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
  };

  const handleDelete = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  return (
    <div className="min-h-[91vh] p-4">
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Customer, Driver, Pickup, or Drop Location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Booking ID</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Customer Name</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Date</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Time</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Driver Name</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Status</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Pickup Location</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Drop Location</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.id}</td>
                <td className="border px-4 py-2">{booking.customerName}</td>
                <td className="border px-4 py-2">{booking.date}</td>
                <td className="border px-4 py-2">{booking.time}</td>
                <td className="border px-4 py-2">{booking.driverName}</td>
                <td className="border px-4 py-2">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="border px-4 py-2">{booking.pickupLocation}</td>
                <td className="border px-4 py-2">{booking.dropLocation}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default Bookings;