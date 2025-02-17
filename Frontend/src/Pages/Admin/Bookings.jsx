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
      dropLocation: 'Kandy'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      date: '2025-02-18',
      time: '2:00 PM',
      driverName: 'Alex Brown',
      status: 'Accepted',
      pickupLocation: 'Galle',
      dropLocation: 'Colombo'
    }
    // You can add more sample bookings here
  ]);

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
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Booking ID</th>
              <th className="border px-4 py-2 text-left">Customer Name</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Time</th>
              <th className="border px-4 py-2 text-left">Driver Name</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Pickup Location</th>
              <th className="border px-4 py-2 text-left">Drop Location</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
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
