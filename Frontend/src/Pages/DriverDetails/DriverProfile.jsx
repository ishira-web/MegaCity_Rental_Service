import React, { useState } from 'react';
import { motion } from 'framer-motion';

function DriverProfile() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className='min-h-screen  font-walsheim  bg-black overflow-hidden'>
      
      {/* Tabs Section */}
      <div className=' min-h-screen  bg-white p-4'>
        <div className='relative flex space-x-4 border-b pb-2 items-center justify-center'>
          {['bookings', 'reviews', 'profile'].map((tab) => (
            <div 
              key={tab}
              className={`cursor-pointer px-4 py-2 text-gray-500 relative ${activeTab === tab ? 'text-blue-500' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'bookings' ? 'View Bookings' : tab === 'reviews' ? 'View Reviews' : 'View Driver Profile'}
              {activeTab === tab && (
                <motion.div 
                  layoutId="underline"
                  className='absolute bottom-0 left-0 w-full h-1 bg-blue-500'
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </div>
          ))}
        </div>

        <motion.div 
          className='p-4'
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'bookings' ? (
           <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
           <div className="p-6 gap-2">
             <h3 className="text-2xl font-semibold text-gray-800 mb-3">Booking ID: #12345</h3>
             <h1  className="text-gray-600 mb-2">Customer Name<span className="font-medium text-gray-800">Araliya Mala</span></h1>
             <h1  className="text-gray-600 mb-2">Customer Mobile Number<span className="font-medium text-gray-800">0743631212</span></h1>
             <p className="text-gray-600 mb-2">Pickup Location: <span className="font-medium text-gray-800">Colombo, Sri Lanka</span></p>
             <p className="text-gray-600 mb-2">Drop-off Location: <span className="font-medium text-gray-800">Kandy, Sri Lanka</span></p>
             <p className="text-gray-600 mb-2">Date: <span className="font-medium text-gray-800">February 5, 2025</span></p>
             <p className="text-gray-600 mb-4">Time: <span className="font-medium text-gray-800">10:30 AM</span></p>
         
             <div className="flex justify-between space-x-4">
               <button
                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300 transform hover:scale-105"
                 onClick={() => handleAccept(12345)}
               >
                 Accept
               </button>
               <button
                 className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition ease-in-out duration-300 transform hover:scale-105"
                 onClick={() => handleDecline(12345)}
               >
                 Decline
               </button>
             </div>
           </div>
         </div>
         
          ) : activeTab === 'reviews' ? (
            <div>
              <h2 className='text-lg font-semibold'>Driver Reviews</h2>
              <p>List of reviews will be displayed here.</p>
            </div>
          ) : (
            <div>
              <h2 className='text-lg font-semibold'>Driver Profile</h2>
              <p>Driver details go here.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DriverProfile;