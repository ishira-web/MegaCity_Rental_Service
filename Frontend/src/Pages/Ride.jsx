import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Ride() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  // Fetch driver and vehicle data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/availableDrivers');
        const drivers = response.data;

        // Map drivers to vehicles (assuming each driver has a vehicle)
        const vehicleData = drivers.map((driver) => ({
          vehicleId: driver.driverID,
          carImage: driver.carImageUrls?.[0] || '/default-car.jpg', // Use the first car image
          carType: driver.catType,
          carModel: driver.catModel,
          seats: driver.noOfSeats,
          luggageType: driver.lagguageType,
          isAvailable: driver.driverStatues === 'Available',
        }));

        setVehicles(vehicleData);
      } catch (error) {
        console.error('Error fetching driver and vehicle data:', error);
      }
    };

    fetchData();
  }, []);

  const handleVehicle = (vehicle) => {
    if (vehicle.isAvailable) {
      navigate(`/booking-form/${vehicle.vehicleId}`, { state: { vehicle } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-walsheim items-center gap-8 p-2 mt-28">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Ride with Us</h1>
        <p className="text-gray-600 mt-2">
          Choose a ride that suits your comfort and style. Book your ride now!
        </p>
      </div>

      <div className="w-full flex justify-center overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.vehicleId} className="relative bg-white border-gray-500 border rounded-lg p-6 shadow-lg w-[20vw]">
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
                src={vehicle.carImage}
                alt={vehicle.carModel}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* Car Details */}
              <div className="flex flex-col items-center gap-2 mt-3">
                <h2 className="text-xl font-semibold">{vehicle.carModel}</h2>
                <p className="text-sm text-gray-600">Type: {vehicle.carType}</p>
                <p className="text-sm text-gray-600">Seats: {vehicle.seats}</p>
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
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ride;