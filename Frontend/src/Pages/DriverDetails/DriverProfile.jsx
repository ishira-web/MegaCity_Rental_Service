import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DriverProfile() {
  const navigate = useNavigate();
  const { driverID } = useParams();
  const [activeTab, setActiveTab] = useState('bookings');
  const [driverDetails, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login page if no token is found
          return;
        }

        const response = await axios.get(`http://localhost:8080/auth/driver/${driverID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDriverDetails(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setError('Unauthorized: Please log in to view driver details.');
          } else if (error.response.status === 404) {
            setError('Driver not found.');
          } else {
            setError('Failed to fetch driver details.');
          }
        } else {
          setError('Network error: Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [driverID, navigate]);

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
          {activeTab === 'profile' && driverDetails ? (
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
                    <p className="font-medium text-gray-800">{driverDetails.driverStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Select a tab to view details</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DriverProfile;