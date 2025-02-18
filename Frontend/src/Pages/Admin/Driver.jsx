import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DriversAndCategories() {
  const [drivers, setDrivers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchDrivers();
    fetchCategories();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('/auth/getAllDriver');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/auth/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCategoryDetails = (catID) => {
    return categories.find(category => category.catID === catID) || {};
  };

  const handleOpenForm = (driver) => {
    setSelectedDriver(driver);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedDriver(null);
  };

  return (
    <div className="min-h-[91vh] bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Drivers and Categories List</h2>

      {/* Drivers Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2">Driver ID</th>
              <th className="p-2">Driver Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Email</th>
              <th className="p-2">Username</th>
              <th className="p-2">Status</th>
              <th className="p-2">Current Location</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => {
              const category = getCategoryDetails(driver.catID);
              return (
                <tr
                  key={driver.driverID}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-2 text-center">{driver.driverID}</td>
                  <td className="p-2 text-center">{driver.driverName}</td>
                  <td className="p-2 text-center">{driver.driverPhone}</td>
                  <td className="p-2 text-center">{driver.driverEmail}</td>
                  <td className="p-2 text-center">{driver.userName}</td>
                  <td className="p-2 text-center">{driver.driverStatues}</td>
                  <td className="p-2 text-center">{driver.currentLocation}</td>
                  <td className="p-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleOpenForm(driver)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Form to display driver and category details */}
      {isFormOpen && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Driver Details</h2>

            {/* Driver Details */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Driver Information</h3>
              <p><strong>Driver ID:</strong> {selectedDriver.driverID}</p>
              <p><strong>Name:</strong> {selectedDriver.driverName}</p>
              <p><strong>Phone:</strong> {selectedDriver.driverPhone}</p>
              <p><strong>Email:</strong> {selectedDriver.driverEmail}</p>
              <p><strong>Username:</strong> {selectedDriver.userName}</p>
              <p><strong>Status:</strong> {selectedDriver.driverStatues}</p>
              <p><strong>Current Location:</strong> {selectedDriver.currentLocation}</p>
            </div>

            {/* Category Details */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Category Information</h3>
              {selectedDriver.catID && (
                <>
                  <p><strong>Type:</strong> {getCategoryDetails(selectedDriver.catID).catType}</p>
                  <p><strong>Model:</strong> {getCategoryDetails(selectedDriver.catID).catModel}</p>
                  <p><strong>Seats:</strong> {getCategoryDetails(selectedDriver.catID).noOfSeats}</p>
                  <p><strong>Luggage Type:</strong> {getCategoryDetails(selectedDriver.catID).lagguageType}</p>
                </>
              )}
            </div>

            {/* Close Button */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
              onClick={handleCloseForm}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriversAndCategories;