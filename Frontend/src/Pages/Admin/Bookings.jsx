import React, { useEffect, useState } from "react";

function Bookings() {
  const [bookings, setBookings] = useState([]); // ✅ Initialize as an empty array
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  // ✅ Ensure bookings is always an array before filtering
  const filteredBookings = bookings?.filter(
    (booking) =>
      booking?.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking?.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking?.pickupLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking?.dropLocation?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Customer Email</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Date</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Time</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Total Price</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Status</th>
              <th className="border px-4 py-2 text-left bg-gray-700 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={booking.id ?? `booking-${index}`}> {/* ✅ Fix unique key warning */}
                  <td className="border px-4 py-2">{booking.customerEmail}</td>
                  <td className="border px-4 py-2">{booking.bookingDate}</td>
                  <td className="border px-4 py-2">{booking.bookingTime}</td>
                  <td className="border px-4 py-2">{booking.fare}</td>
                  <td className="border px-4 py-2">{booking.bookingStatus}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border px-4 py-2 text-center">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
