import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function DriverProfile() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [driverDetails, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch driver data from the backend
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const driverID = '123'; // Replace with the actual driver ID (e.g., from props or context)
        const token = localStorage.getItem('authToken'); // Get the token from localStorage

        if (!token) {
          // Redirect to login if no token is found
          window.location.href = '/login';
          return;
        }

        const response = await axios.get(`http://localhost:8080/auth/driver/${driverID}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        setDriverDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching driver data:', error);
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired, redirect to login
          localStorage.removeItem('authToken'); // Clear the invalid token
          window.location.href = '/login';
        } else {
          setError('Failed to fetch driver data. Please try again.');
        }
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen font-walsheim bg-black overflow-hidden">
      {/* Tabs Section */}
      <div className="min-h-screen bg-white p-4">
        <div className="relative flex space-x-4 border-b pb-2 items-center justify-center">
          {['bookings', 'reviews', 'profile'].map((tab) => (
            <div
              key={tab}
              className={`cursor-pointer px-4 py-2 text-gray-500 relative ${
                activeTab === tab ? 'text-blue-500' : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'bookings'
                ? 'View Bookings'
                : tab === 'reviews'
                ? 'View Reviews'
                : 'View Driver Profile'}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </div>
          ))}
        </div>

        <motion.div
          className="p-4"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'bookings' ? (
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 gap-2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Booking ID: #12345</h3>
                <h1 className="text-gray-600 mb-2">
                  Customer Name<span className="font-medium text-gray-800">Araliya Mala</span>
                </h1>
                <h1 className="text-gray-600 mb-2">
                  Customer Mobile Number<span className="font-medium text-gray-800">0743631212</span>
                </h1>
                <p className="text-gray-600 mb-2">
                  Pickup Location: <span className="font-medium text-gray-800">Colombo, Sri Lanka</span>
                </p>
                <p className="text-gray-600 mb-2">
                  Drop-off Location: <span className="font-medium text-gray-800">Kandy, Sri Lanka</span>
                </p>
                <p className="text-gray-600 mb-2">
                  Date: <span className="font-medium text-gray-800">February 5, 2025</span>
                </p>
                <p className="text-gray-600 mb-4">
                  Time: <span className="font-medium text-gray-800">10:30 AM</span>
                </p>

                <div className="flex justify-between space-x-4">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300 transform hover:scale-105"
                    onClick={() => handleAccept(12345)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300 transform hover:scale-105"
                    onClick={() => handleDecline(12345)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'reviews' ? (
            <div>
              <h2 className="text-lg font-semibold">Driver Reviews</h2>
              <p>List of reviews will be displayed here.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Driver Profile Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={driverDetails.imageUrl || '/default-driver.jpg'}
                    alt="Driver"
                    className="w-20 h-20 rounded-full border-4 border-white"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">{driverDetails.driverName}</h1>
                    <p className="text-sm">Professional Driver</p>
                  </div>
                </div>
              </div>

              {/* Driver Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Driver Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium text-gray-800">{driverDetails.driverEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <p className="font-medium text-gray-800">{driverDetails.driverPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Address:</p>
                    <p className="font-medium text-gray-800">{driverDetails.driverAddress}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status:</p>
                    <p className="font-medium text-gray-800">{driverDetails.driverStatues}</p>
                  </div>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-6 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Car Information</h2>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={driverDetails.carImageUrls?.[0] || '/default-car.jpg'}
                    alt="Car"
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Car Model:</p>
                      <p className="font-medium text-gray-800">{driverDetails.catModel}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Car Type:</p>
                      <p className="font-medium text-gray-800">{driverDetails.catType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Seats:</p>
                      <p className="font-medium text-gray-800">{driverDetails.noOfSeats}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Luggage Type:</p>
                      <p className="font-medium text-gray-800">{driverDetails.lagguageType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DriverProfile;