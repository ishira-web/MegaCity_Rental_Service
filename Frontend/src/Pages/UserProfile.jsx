import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';


function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [bookingTab, setBookingTab] = useState('ongoing');

  const ongoingBookings = [
    { id: 'B001', destination: 'Colombo', driver: 'John Doe', vehicle: 'WP ABC-1234' },
    { id: 'B002', destination: 'Kandy', driver: 'Michael Smith', vehicle: 'WP XYZ-5678' }
  ];

  const previousBookings = [
    { id: 'B003', destination: 'Galle', driver: 'David Lee', vehicle: 'WP LMN-9101' },
    { id: 'B004', destination: 'Negombo', driver: 'Chris Martin', vehicle: 'WP OPQ-3141' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-4xl min-h-screen bg-gray-800 p-8 shadow-lg rounded-lg">
        
        {/* Main Tabs */}
        <div className="flex justify-center space-x-8 border-b pb-3">
          {['profile', 'bookings', 'notifications'].map((tab) => (
            <div 
              key={tab}
              className={`cursor-pointer px-6 py-2 text-lg font-semibold ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'profile' ? 'User Profile' : tab === 'bookings' ? 'Bookings' : 'Notifications'}
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <motion.div 
          className="mt-6"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' ? (
            <div className="flex flex-col items-center">
              <img 
                src="https://via.placeholder.com/120" 
                alt="Profile" 
                className="w-28 h-28 rounded-full border-4 border-gray-500"
              />
              <div className='flex items-center gap-4'><h3 className="text-2xl font-semibold mt-3">Ishira Pahasara</h3><BadgeCheck className='bg-blue-400 mt-4 w-4 h-4 text-lg text-white rounded-full ' /></div>
              <p className="text-gray-400">yourname@gmail.com</p>

              <div className="mt-6 w-full">
                <label className="block text-gray-300">Mobile Number</label>
                
              </div>

              <div className="mt-4 w-full">
                <label className="block text-gray-300">Email</label>
               
              </div>
              <div className="mt-4 w-full">
                <label className="block text-gray-300">Email</label>
               
              </div>
              <div className="mt-4 w-full">
                <label className="block text-gray-300">Email</label>
               
              </div>

              <button className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md text-white font-semibold transition">
                Save Changes
              </button>
            </div>
          ) : activeTab === 'bookings' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Bookings</h2>

              {/* Booking Sub-Tabs */}
              <div className="flex space-x-6 border-b pb-3">
                {['ongoing', 'previous'].map((tab) => (
                  <div
                    key={tab}
                    className={`cursor-pointer px-4 py-2 text-md font-semibold ${bookingTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                    onClick={() => setBookingTab(tab)}
                  >
                    {tab === 'ongoing' ? 'Ongoing Bookings' : 'Previous Bookings'}
                  </div>
                ))}
              </div>

              {/* Booking List */}
              <motion.div 
                key={bookingTab}
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {(bookingTab === 'ongoing' ? ongoingBookings : previousBookings).map((booking) => (
                  <div key={booking.id} className="bg-gray-700 p-4 rounded-md shadow-md mb-3">
                    <p className="text-lg font-semibold">Booking ID: <span className="text-blue-400">{booking.id}</span></p>
                    <p className="text-md">Destination: {booking.destination}</p>
                    <p className="text-md">Driver: {booking.driver}</p>
                    <p className="text-md">Vehicle: {booking.vehicle}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 text-blue-500 focus:ring-2 focus:ring-blue-400" />
                <span>Enable Notifications</span>
              </label>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
