import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Ride() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([
    {
      vehicleId: 1,
      vehicleModel: 'Toyota Prius',
      vehicleType: 'Sedan',
      availableSeats: 4,
      availableLaggauge: 2,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      vehicleId: 2,
      vehicleModel: 'Honda Civic',
      vehicleType: 'Sedan',
      availableSeats: 4,
      availableLaggauge: 2,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      vehicleId: 3,
      vehicleModel: 'Ford Explorer',
      vehicleType: 'SUV',
      availableSeats: 6,
      availableLaggauge: 4,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      vehicleId: 4,
      vehicleModel: 'Tesla Model S',
      vehicleType: 'Electric',
      availableSeats: 5,
      availableLaggauge: 3,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ]);

  const handleVehicle = (vehicle) => {
    navigate(`/booking-form/${vehicle.vehicleId}`, { state: { vehicle } });
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
        <div className="grid grid-cols-4 gap-6 w-max justify-center">
          {vehicles.map((vehicle) => (
            <div key={vehicle.vehicleId} className="bg-white border-gray-500 border rounded-lg p-6 shadow-lg w-[20vw]">
              <img
                src={vehicle.imageUrl || '/default-car.jpg'}
                alt={vehicle.vehicleModel}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="flex flex-col items-center gap-2 mt-3">
                <h2 className="text-xl font-semibold">{vehicle.vehicleModel}</h2>
                <p className="text-sm text-gray-600">Type: {vehicle.vehicleType}</p>
                <p className="text-sm text-gray-600">Seats: {vehicle.availableSeats}</p>
                <p className="text-sm text-gray-600">Luggage: {vehicle.availableLaggauge}</p>
                <Link to="/booking-form/:id"><button
                  className="mt-2 bg-yellow-400 px-3 py-2 rounded-lg font-simplon text-black font-semibold hover:bg-yellow-500 transition-all">
                  Book Now
                </button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ride;
