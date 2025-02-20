import React, { useEffect, useState } from 'react';
import { Search, Info } from 'lucide-react'; // Import necessary icons
import axios from 'axios';

function Driver() {

  const [drivers, setDrivers] = useState([]);
 
   useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/getAllDriver');
        setDrivers(response.data);
       }catch (error){
        console.error('Error fetching Driver details:', error);
        toast.error('Error fetching Driver details.'); // Show err
       } // setDrivers
      
    }
    fetchDrivers();
   } , []);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
  };

  const filteredDrivers = drivers.filter(driver =>
    Object.values(driver).some(value => value.toString().toLowerCase().includes(searchKeyword))
  );

  return (
    <div className="bg-white min-h-[91vh] p-6">
      {/* Search Input */}
      <div className="mb-6 flex items-center space-x-2">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by any keyword..."
          value={searchKeyword}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto">
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map((driver, index) => (
            <div key={index} className="relative bg-gray-100 rounded-lg shadow-lg p-4">
              {/* Status Badge */}
              <div className={`absolute top-3 right-3 px-3 py-1 text-white text-sm rounded-full ${driver.status === "Available" ? "bg-green-500" : "bg-red-500"}`}>
                {driver.status}
              </div>

              {/* Driver Image */}
              <div className="w-full flex justify-center mt-4">
                <img src={driver.imageUrl} alt="Driver" className="w-32 h-32 object-cover rounded-full border-4 border-gray-300" />
              </div>

              {/* Driver Info */}
              <div className="mt-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{driver.driverName}</h2>
                <p className="text-gray-600 mt-2">{driver.driverAddress}</p>
                <p className="text-gray-600 mt-2">Phone: {driver.driverPhone}</p>
                <p className="text-gray-600 mt-2">Email: {driver.driverEmail}</p>
                <p className="text-gray-600 mt-2">Current Location: {driver.driverAddress}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-6">
            No data found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default Driver;
