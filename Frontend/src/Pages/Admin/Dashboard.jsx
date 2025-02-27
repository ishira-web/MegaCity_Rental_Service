import React, { useState } from 'react';
import { Ban, Plus, Car, Luggage, Check, X } from 'lucide-react';

function Dashboard() {
  const [carTypes, setCarTypes] = useState(['Budget', 'Sedan', '9 Seater']);
  const [selectedCarType, setSelectedCarType] = useState('');
  const [newCarType, setNewCarType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [seats, setSeats] = useState('');
  const [luggage, setLuggage] = useState('');
  const [ac, setAc] = useState('');
  const [price, setPrice] = useState('');

  const addCarType = () => {
    if (newCarType && !carTypes.includes(newCarType)) {
      setCarTypes([...carTypes, newCarType]);
      setNewCarType('');
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-gradient-to-r from-amber-50 to-red-50 min-h-[91vh] p-6">
      {/* Upper Cards */}
      <div className='flex justify-center gap-10'>
        <div className='w-[20vw] h-[6vw] flex justify-center items-center border bg-white hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
          <div className='justify-center flex flex-col items-center gap-5'>
            <h1 className='font-semibold'>Booking Trips</h1>
            <h1 className='text-2xl font-bold text-purple-400'>120</h1>
          </div>
        </div>
        <div className='w-[20vw] h-[6vw] flex justify-center items-center border bg-white hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
          <div className='justify-center flex flex-col items-center gap-5'>
            <div className='flex flex-row gap-5'><Ban className='text-red-500' /><h1 className='font-semibold'>Cancel Bookings</h1></div>
            <h1 className='text-2xl font-bold text-red-400'>120</h1>
          </div>
        </div>  
        <div className='w-[20vw] h-[6vw] flex justify-center items-center border bg-white hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
          <div className='justify-center flex flex-col items-center gap-5'>
            <h1 className='font-semibold'>New Users</h1>
            <h1 className='text-2xl font-bold text-yellow-600'>120</h1>
          </div>
        </div>  
        <div className='w-[20vw] h-[6vw] flex justify-center items-center border bg-white hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
          <div className='justify-center flex flex-col items-center gap-5'>
            <h1 className='font-semibold'>New Drivers</h1>
            <h1 className='text-2xl font-bold text-rose-700'>120</h1>
          </div>
        </div>
      </div>
      {/* New Drivers Section */}
      <div className='flex flex-row justify-between'>
        <div className='border w-[25vw] h-[30vw] ml-3 shadow-md bg-white'>
          <div className='flex justify-center p-2'>
            <h1 className='font-semibold'>New Drivers</h1>
          </div>
          <div className='flex flex-row justify-between gap-5 px-3 py-3 border-t hover:bg-black hover:text-yellow-50 border-b transition'>
            <img src={Ban} alt="pic" className='w-6 h-6 rounded-full object-cover' />
            <h1>Ishira Pahasara</h1>
            <div className='flex flex-row gap-2'>
              <button className='bg-green-600 text-white px-1 py-1 rounded-md'>Accept</button>
              <button className='bg-red-600 text-white px-1 py-1 rounded-md'>Reject</button>
            </div>
          </div>
        </div>
      {/* Manage Vehicle Categories */}
      <div className='border w-[30vw] h-[35vw] p-5 shadow-md bg-white'>
          <h1 className='font-semibold text-lg mb-3 text-center'>Manage Vehicle Categories</h1>
          <label className='block text-sm font-medium'>Car Type</label>
          <select 
            className='w-full border p-2 rounded-md mt-1' 
            value={selectedCarType} 
            onChange={(e) => setSelectedCarType(e.target.value)}
          >
            <option value="">Select Car Type</option>
            {carTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <div className='flex mt-2 gap-2'>
            <input 
              type='text' 
              className='border p-2 rounded-md flex-1' 
              placeholder='Add new car type' 
              value={newCarType} 
              onChange={(e) => setNewCarType(e.target.value)}
            />
            <button className='bg-green-600 text-white p-2 rounded-md' onClick={addCarType}><Plus /></button>
          </div>
          
          {selectedCarType && (
            <div className='mt-4 space-y-3'>
              <label className='block text-sm font-medium'>Vehicle Model</label>
              <input type='text' className='w-full border p-2 rounded-md' placeholder='Enter Model' value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
              
              <label className='block text-sm font-medium'>No. of Seats</label>
              <input type='number' className='w-full border p-2 rounded-md' placeholder='Enter Seats' value={seats} onChange={(e) => setSeats(e.target.value)} />
              
              <label className='block text-sm font-medium'>Luggage Type</label>
              <select className='w-full border p-2 rounded-md' value={luggage} onChange={(e) => setLuggage(e.target.value)}>
                <option value="">Select Luggage Type</option>
                <option value="No Luggage">No Luggage</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              
              <label className='block text-sm font-medium'>AC</label>
              <select className='w-full border p-2 rounded-md' value={ac} onChange={(e) => setAc(e.target.value)}>
                <option value="">Select AC Option</option>
                <option value="With AC">With AC</option>
                <option value="Without AC">Without AC</option>
              </select>
              
              <label className='block text-sm font-medium'>Price per Kilometer</label>
              <input type='number' className='w-full border p-2 rounded-md' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
              
              <button className='bg-blue-600 text-white p-2 rounded-md w-full mt-3 flex items-center justify-center gap-2'><Check /> Add Vehicle Category</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
