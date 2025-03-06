import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Ride() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  
  // Filter states
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');

  // Unique car types and models for filtering
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);

  // Fetch driver and vehicle data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/availableDrivers');
        const drivers = response.data;

        // Map drivers to vehicles 
        const vehicleData = drivers.map((driver) => ({
          vehicleId: driver.driverID,
          carImage: driver.carImageUrls?.[0] || '/default-car.jpg',
          carType: driver.catType,
          carModel: driver.catModel,
          seats: driver.noOfSeats,
          luggageType: driver.lagguageType,
          isAvailable: driver.driverStatues === 'Available',
          currentLocation: driver.currentLocation || 'Unknown' // Add current location
        }));

        setVehicles(vehicleData);
        setFilteredVehicles(vehicleData);

        // Extract unique car types and models
        const uniqueCarTypes = [...new Set(vehicleData.map(v => v.carType))];
        const uniqueCarModels = [...new Set(vehicleData.map(v => v.carModel))];
        
        setCarTypes(uniqueCarTypes);
        setCarModels(uniqueCarModels);
      } catch (error) {
        console.error('Error fetching driver and vehicle data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = vehicles;

    if (selectedCarType) {
      result = result.filter(vehicle => vehicle.carType === selectedCarType);
    }

    if (selectedCarModel) {
      result = result.filter(vehicle => vehicle.carModel === selectedCarModel);
    }

    if (availabilityStatus) {
      result = result.filter(vehicle => 
        availabilityStatus === 'Available' 
          ? vehicle.isAvailable 
          : !vehicle.isAvailable
      );
    }

    setFilteredVehicles(result);
  }, [selectedCarType, selectedCarModel, availabilityStatus, vehicles]);

  const handleVehicle = (vehicle) => {
    if (vehicle.isAvailable) {
      navigate(`/booking-form/${vehicle.vehicleId}`, { state: { vehicle } });
    }
  };

  const resetFilters = () => {
    setSelectedCarType('');
    setSelectedCarModel('');
    setAvailabilityStatus('');
  };

  return (
    <div className="min-h-screen flex flex-col font-walsheim items-center gap-8 p-2 mt-28">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Ride with Us</h1>
        <p className="text-gray-600 mt-2">
          Choose a ride that suits your comfort and style. Book your ride now!
        </p>
      </div>

      {/* Filtering Section */}
      <div className="w-full flex justify-center space-x-4 mb-6">
        {/* Car Type Filter */}
        <select 
          value={selectedCarType}
          onChange={(e) => setSelectedCarType(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Car Types</option>
          {carTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Car Model Filter */}
        <select 
          value={selectedCarModel}
          onChange={(e) => setSelectedCarModel(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Car Models</option>
          {carModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        {/* Availability Status Filter */}
        <select 
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        {/* Reset Filters Button */}
        <button 
          onClick={resetFilters}
          className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          Reset Filters
        </button>
      </div>

      {/* Vehicles Grid */}
      <div className="w-full flex justify-center overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No vehicles match your current filters.
            </div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <div 
                key={vehicle.vehicleId} 
                className="relative bg-white border-gray-500 border rounded-lg p-6 shadow-lg w-[20vw]"
              >
                {/* Availability Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
                    vehicle.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {vehicle.isAvailable ? 'Available' : 'Unavailable'}
                </div>

                {/* Car Image */}
                <img
                  src={vehicle.carImageUrl}
                  alt={vehicle.carModel}
                  className="w-full h-40 object-cover rounded-lg"
                />

                {/* Car Details */}
                <div className="flex flex-col items-center gap-2 mt-3">
                  <h2 className="text-xl font-semibold">{vehicle.carModel}</h2>
                  <p className="text-sm text-gray-600">Type: {vehicle.carType}</p>
                  <p className="text-sm text-gray-600">Seats: {vehicle.seats}</p>
                  <p className="text-sm text-gray-600">Location: {vehicle.currentLocation}</p>
                  <p className="text-sm text-gray-600">Luggage: {vehicle.luggageType}</p>

                  {/* Book Now Button */}
                  <button
                    onClick={() => handleVehicle(vehicle)}
                    disabled={!vehicle.isAvailable}
                    className={`mt-2 px-3 py-2 rounded-lg font-simplon font-semibold transition-all ${
                      vehicle.isAvailable
                        ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    }`}
                    title={!vehicle.isAvailable ? "This vehicle is currently unavailable" : ""}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Ride;