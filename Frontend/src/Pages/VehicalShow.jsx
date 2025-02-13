import React, { useEffect, useState } from 'react';
import Alto from '../assets/Car/Alto.jpg';
import { UsersRound, Banknote, Snowflake, Briefcase, MapPin, Clock  } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VehicalShow() {
  const [vehicals, setVehicals] = useState(null);
  const [selectedVehical, setSelectedVehical] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getAllVehical")
      .then((response) => {
        setVehicals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCardClick = (vehical) => {
    setSelectedVehical(vehical); // Open modal with selected car details
  };

  const handleCloseModal = () => {
    setSelectedVehical(null); // Close modal
  };

  return (
    <div className="min-h-screen flex flex-col font-walsheim justify-center items-center bg-gray-100  gap-10 py-8 border-b-2">
      <div className="text-2xl font-bold text-blue-600 mt-24">Hurry up & Book Your Ride</div> <br/><br/>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Car Start From Here */}
        {vehicals &&
          vehicals.map((vehical) => {
            const availabilityColor =
              vehical.availableStatus === "Available" ? "bg-green-700" : "bg-red-700";
            const borderColor =
              vehical.availableStatus === "Available" ? "border-green-400" : "border-red-400";
            const textColor =
              vehical.availableStatus === "Available" ? "text-green-400" : "text-red-400";

            return (
              <div
                key={vehical.id}
                className="w-[22vw] h-[25vw] bg-white rounded-lg shadow-lg px-3 py-4 cursor-pointer"
                onClick={() => handleCardClick(vehical)} // Handle card click
              > 
              <div className='flex flex-row justify-between '>
                <div className={ `border-2 flex-row justify-center items-center ${availabilityColor} ${borderColor} rounded-3xl text-center w-24`}>
                  <h1 className={`text-sm ${textColor}`}>{vehical.availableStatus}</h1>
                </div>
                <div className= 'flex flex-row justify-between   w-24 text-center'>
                 <MapPin className='w-4 text-blue-500 '/><h1 className='text-sm mt-[0.12rem] text-blue-500 '>{vehical.currentLocation}</h1>
                </div>
                </div> 
                <img
                  src={Alto}
                  alt="Suzuki Alto K10"
                  className="w-full h-2/3 object-cover"
                />
                
                <div className="p-4">
                  <h1 className="text-center text-xl font-semibold text-gray-800">
                    {vehical.vehicleModel}
                  </h1>
                  <div className="flex flex-col justify-center items-center mt-5 space-y-4">
                    <div className="flex flex-row justify-between items-center w-full px-2">
                      <div className="flex flex-row items-center space-x-2 text-sm text-gray-500">
                        <UsersRound className="w-5 text-blue-500" />
                        <span>{vehical.availableSeats} Passenger</span>
                      </div>

                      <div className="flex flex-row items-center space-x-2 text-sm text-gray-500">
                        <Banknote className="w-5 text-green-500" />
                        <span>Flexible Payment</span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full px-2">
                      <div className="flex flex-row items-center space-x-2 text-sm text-gray-500">
                        <Snowflake className="w-5 text-cyan-500" />
                        <span>A/C Enabled</span>
                      </div>
                      <div className="flex flex-row items-start space-x-2 text-sm text-gray-500">
                        <Briefcase className="w-5 text-yellow-500" />
                        <span>Limited Bags</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {/* Car End to Here */}
      </div>

      {/* Modal */}
      {selectedVehical && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-[40vw] shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            {/* Modal Content */}
            <img
              src={Alto}
              alt="Vehicle"
              className="w-full h-[20vw] object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedVehical.vehicleModel}
            </h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
             <strong>Vehical No :</strong> {selectedVehical.vehicleNumber}
            </h2>
            <p className="text-gray-600 mb-4 flex gap-10">
              <h1>Statues :</h1> {selectedVehical.availableStatus}
            </p>
            <p className="text-gray-600 mb-4 flex gap-10">
              <h1>Seats :</h1>{selectedVehical.availableSeats}
            </p>
            <p className="text-gray-600 mb-4 flex gap-5">
             <h1>Additional Features:</h1><h1>A/C Enabled, Limited Bags, Flexible Payment</h1> 
            </p>
            <p className="text-gray-600 mb-4 flex gap-5">
            <h1>Waiting charges LKR 0 per hour</h1> 
            </p>
           <Link to={"/booking-form"} ><button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Book Now  »
            </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicalShow;
