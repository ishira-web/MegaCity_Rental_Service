import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import Driver from '/public/images/Driver.png';

function DriverRegister() {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const vehicleOptions = {
    Budget: { models: ['Toyota Vitz', 'Suzuki Alto', 'Hyundai Eon'], seats: 4, luggage: 'Small' },
    City: { models: ['Honda Fit', 'Toyota Axio', 'Mazda Demio'], seats: 4, luggage: 'Medium' },
    Semi: { models: ['Toyota Prius', 'Honda Grace', 'Nissan Bluebird'], seats: 4, luggage: 'Medium' },
    '9 Seater': { models: ['Toyota HiAce', 'Nissan Caravan'], seats: 9, luggage: 'Large' },
    '14 Seater': { models: ['Toyota Coaster', 'Mitsubishi Rosa'], seats: 14, luggage: 'Extra Large' },
  };

  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [availableLaggauge, setAvailableLaggauge] = useState('');
  const [driverName, setDriverName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleVehicleTypeChange = (e) => {
    const type = e.target.value;
    setVehicleType(type);
    setVehicleModel('');
    if (type && vehicleOptions[type]) {
      setAvailableSeats(vehicleOptions[type].seats);
      setAvailableLaggauge(vehicleOptions[type].luggage);
    } else {
      setAvailableSeats('');
      setAvailableLaggauge('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      driverName,
      userName,
      password,
      vehicleNumber,
      vehicleType,
      vehicleModel,
      availableSeats,
      availableLaggauge,
      currentLocation,
      imageURL: 'cabphoto',
      licenImage: 'lisanphoto',
      availableStatus: 'Available',
    };

    try {
      const response = await fetch('http://localhost:8080/auth/createvehical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Driver registered successfully!');
        setTimeout(() => navigate('/driver-profile'), 2000); // ✅ Redirect after 2 seconds
      } else {
        toast.error('Driver registration failed!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred during registration.');
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='flex flex-row w-full min-h-screen bg-gray-100'>
        <div className='w-1/2 relative flex justify-center items-center bg-gradient-to-r from-black via-gray-900 to-black text-white px-10'>
          <img src={Driver} alt='' className='w-full h-screen object-cover opacity-40 absolute' />
          <div className='relative text-center'>
            <h1 className='text-4xl font-bold mb-4'>Drive with Us</h1>
            <p className='text-lg mb-6'>Join our network of professional drivers and enjoy flexible working hours, competitive earnings, and exclusive benefits.</p>
            <ul className='text-left space-y-2'>
              <li className='flex items-center'><span className='text-green-400 mr-2'>✔</span> Flexible Working Hours</li>
              <li className='flex items-center'><span className='text-green-400 mr-2'>✔</span> High Earnings Potential</li>
              <li className='flex items-center'><span className='text-green-400 mr-2'>✔</span> 24/7 Driver Support</li>
              <li className='flex items-center'><span className='text-green-400 mr-2'>✔</span> Easy Registration Process</li>
            </ul>
          </div>
        </div>

        <div className='w-1/2 flex justify-center items-center'>
          <form className='bg-white p-10 rounded-lg shadow-lg w-3/4' onSubmit={handleSubmit}>
            <h2 className='text-3xl font-semibold mb-6 text-center text-gray-700'>Driver Registration</h2>

            <div className='mb-4'>
              <label className='block mb-2 text-gray-600'>Driver Name</label>
              <input type='text' className='w-full p-2 border rounded' placeholder='Enter driver name' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
            </div>

            <div className='mb-4'>
              <label className='block mb-2 text-gray-600'>Driver Email</label>
              <input type='email' className='w-full p-2 border rounded' placeholder='Enter driver name' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
            </div>

            <div className='mb-4'>
              <label className='block mb-2 text-gray-600'>Set Username</label>
              <input type='text' className='w-full p-2 border rounded' placeholder='Enter Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className='mb-4'>
              <label className='block mb-2 text-gray-600'>Set Password</label>
              <input type='password' className='w-full p-2 border rounded' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-gray-600'>Vehicle Number</label>
                <input type='text' className='w-full p-2 border rounded' placeholder='Enter vehicle number' value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
              </div>
              <div>
                <label className='block mb-2 text-gray-600'>Vehicle Type</label>
                <select className='w-full p-2 border rounded' value={vehicleType} onChange={handleVehicleTypeChange}>
                  <option value=''>Select vehicle type</option>
                  {Object.keys(vehicleOptions).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='mt-4'>
              <label className='block mb-2 text-gray-600'>Vehicle Model</label>
              <select className='w-full p-2 border rounded' value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} disabled={!vehicleType}>
                <option value=''>Select vehicle model</option>
                {vehicleType && vehicleOptions[vehicleType].models.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div className='mt-4 grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-gray-600'>Available Seats</label>
                <input type='text' className='w-full p-2 border rounded' value={availableSeats} readOnly />
              </div>
              <div>
                <label className='block mb-2 text-gray-600'>Available Luggage</label>
                <input type='text' className='w-full p-2 border rounded' value={availableLaggauge} readOnly />
              </div>
            </div>

            <div className='mt-4'>
              <label className='block mb-2 text-gray-600'>Current Location</label>
              <input type='text' className='w-full p-2 border rounded' placeholder='Enter current location' value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} />
            </div>

            <button type='submit' className='mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition'>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DriverRegister;
