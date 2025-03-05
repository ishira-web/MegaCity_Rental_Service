import React, { useState, useEffect } from 'react';

function DriversTable() {
  const [drivers, setDrivers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showBanConfirmation, setShowBanConfirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available drivers
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:8080/auth/availableDrivers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch drivers');
      }

      const data = await response.json();
      setDrivers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleBanDriver = async (driverID) => {
    try {
      const response = await fetch(`http://localhost:8080/banDriver/${driverID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to ban driver');
      }

      // Remove the banned driver from the list
      setDrivers(drivers.filter(driver => driver.driverID !== driverID));
      setShowBanConfirmation(null);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
  };

  const handleViewDetails = (driverID) => {
    // Placeholder for view details functionality
    alert(`Viewing details for driver ${driverID}`);
  };

  const filteredDrivers = drivers.filter(driver =>
    Object.values(driver).some(value => 
      value && value.toString().toLowerCase().includes(searchKeyword)
    )
  );

  if (loading) {
    return <div className="p-6 text-center">Loading drivers...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white">
      {/* Search Input */}
      <div className="mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by any keyword..."
          value={searchKeyword}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Drivers Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Profile</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Vehicle Number</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.length > 0 ? (
            filteredDrivers.map((driver) => (
              <tr key={driver.driverID} className="hover:bg-gray-50">
                <td className="p-2 border text-center">
                  <img 
                    src={driver.imageUrl || "/api/placeholder/50/50"} 
                    alt="Driver" 
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="p-2 border">{driver.driverName}</td>
                <td className="p-2 border">{driver.driverEmail}</td>
                <td className="p-2 border">{driver.driverPhone}</td>
                <td className="p-2 border">{driver.vehicalNumber}</td>
                <td className="p-2 border">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => setShowBanConfirmation(driver.driverID)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Ban
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No drivers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Ban Confirmation Modal */}
      {showBanConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Ban Driver</h2>
            <p className="mb-4">
              Are you sure you want to ban this driver? 
              This action will permanently remove the driver from the system.
            </p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowBanConfirmation(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleBanDriver(showBanConfirmation)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriversTable;