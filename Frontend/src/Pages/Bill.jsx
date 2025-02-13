import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '/public/images/Logo.svg';  // Update the logo path accordingly
import toast, { Toaster } from 'react-hot-toast';


function Bill() {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails || {};
  const [isLoading, setIsLoading] = useState(false);

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare booking data to send to the backend
    const bookingData = {
      driverName: bookingDetails.driverName || "Amantha",
      vehicleNumber: bookingDetails.vehicleNumber || "ACC - 3453",
      destination: bookingDetails.destination || "Colombo 5 (Havelock Town) to Colombo 1 (Fort)",
      date: bookingDetails.date || "01/04/2025",
      totalBill: bookingDetails.totalBill || "0.00",
    };

    try {
      // Send the booking data to the Spring Boot backend
      const response = await fetch('http://localhost:8080/createbooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Booking successful!', {
          position: 'top-center',
          duration: 3000,
        });
      } else {
        toast.error('Failed to process payment', {
          position: 'top-center',
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error('Error processing the payment', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-row font-walsheim">
        {/* Left Side - Ticket */}
        <div className="w-[50vw] flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="relative w-[30vw] h-auto bg-white px-6 py-6 rounded-2xl shadow-lg font-roboto border border-gray-300">
            {/* Ticket Cutouts */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full border border-gray-300"></div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full border border-gray-300"></div>

            {/* Header */}
            <div className="flex flex-row justify-between items-center mb-4">
              <img src={Logo} alt="Bill Logo" className="h-10" />
              <h1 className="text-xl font-bold text-blue-600">Mega City Cab</h1>
            </div>

            {/* Ticket Content */}
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-500">Driver Name:</span>
                <span className="font-medium">{bookingDetails.driverName || "Amantha"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle No:</span>
                <span className="font-medium">{bookingDetails.vehicleNumber || "ACC - 3453"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-medium">{bookingDetails.destination || "Colombo 5 (Havelock Town) to Colombo 1 (Fort)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">{bookingDetails.date || "01/04/2025"}</span>
              </div>
              <div className="border-2 border-dashed "></div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Bill:</span>
                <span className="font-bold text-blue-500 ">{bookingDetails.totalBill || "0.00"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Payment */}
        <div className="w-[50vw] flex items-center justify-center bg-gray-100">
          <div className="w-[30vw] bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Secure Payment</h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Enter your payment details to complete the booking.
            </p>
            <form onSubmit={handlePayment} className="space-y-8">
              {/* Card Holder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Card Holder Name</label>
                <input
                    type="text"
                    placeholder="Enter Card Holder Name"
                    className="w-full p-1 border rounded-lg bg-gray-100 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Card Number</label>
                <div className="relative">
                  <input
                      type="text"
                      placeholder="Enter Card Number"
                      className="w-full p-1  border rounded-lg bg-gray-100 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard ml-3"></i>
                    <i className="fab fa-cc-paypal ml-3"></i>
                  </div>
                </div>
              </div>

              {/* Expiry Date and CVV */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Expiry Date</label>
                  <input
                      type="month"
                      className="w-full p-4 border rounded-lg bg-gray-100 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-2">CVV</label>
                  <input
                      type="text"
                      placeholder="CVV"
                      className="w-full p-4 border rounded-lg bg-gray-100 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  />
                </div>
              </div>

              {/* Payment Button */}
              <div className="mt-6 flex justify-center">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                  {isLoading ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
  );
}

export default Bill;
