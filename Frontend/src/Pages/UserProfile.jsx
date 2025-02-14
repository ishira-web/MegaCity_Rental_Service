import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Mail, Smartphone, Edit } from 'lucide-react';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Ishira Pahasara');
  const [email, setEmail] = useState('ishira.pahasara@gmail.com');
  const [phone, setPhone] = useState('0743631212');
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/120');
  const [bookingTab, setBookingTab] = useState('confirmed'); // Added bookingTab state
  const [bookings, setBookings] = useState({
    confirmed: [
      { id: 1, vehicle: 'Car', driver: 'John Doe', time: '10:00 AM', date: '2025-02-14', pickup: 'Location A', drop: 'Location B' },
      // Add more confirmed bookings here
    ],
    pending: [
      { id: 2, vehicle: 'Van', driver: 'Jane Doe', time: '12:00 PM', date: '2025-02-14', pickup: 'Location C', drop: 'Location D' },
      // Add more pending bookings here
    ],
    canceled: [],
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-[40vw] h-[30vw] bg-gray-800 p-8 shadow-lg rounded-xl text-center">
        {/* Tabs */}
        <div className="flex justify-center space-x-8 border-b pb-3">
          {['profile', 'bookings', 'notifications'].map((tab) => (
            <div 
              key={tab}
              className={`cursor-pointer px-6 py-2 text-lg font-semibold ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'profile' ? 'Profile' : tab === 'bookings' ? 'Bookings' : 'Notifications'}
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <motion.div 
          className="mt-6"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' ? (
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <img 
                  src={profilePic} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                />
                {isEditing && (
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange} 
                  />
                )}
              </div>
              <div className='flex items-center gap-2 mt-4'>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="text-xl font-semibold text-black p-2 rounded-lg w-48 text-center"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <h3 className="text-2xl font-semibold text-white">{name}</h3>
                )}
                <BadgeCheck className='w-6 h-6 text-blue-400' />
                <Edit 
                  className="w-6 h-6 text-gray-400 cursor-pointer hover:text-blue-400"
                  onClick={() => setIsEditing(!isEditing)}
                />
              </div>
              <div className="mt-3 w-full flex flex-col gap-2">
                {isEditing ? (
                  <input 
                    type="email" 
                    className="text-gray-400 text-sm p-2 rounded-lg text-black w-full text-center"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-400 text-sm">{email}</p>
                )}
              </div>
              <div className="mt-4 w-full flex justify-center gap-4 items-center">
                <Smartphone className='w-5 text-blue-400' />
                {isEditing ? (
                  <input 
                    type="text" 
                    className="text-gray-300 text-sm p-2 rounded-lg text-black w-32 text-center"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <h1 className='text-gray-300 font-roboto text-sm'>{phone}</h1>
                )}
              </div>
              <div className="mt-4 w-full flex justify-center gap-4 items-center">
                <Mail className='w-5 text-blue-400'/>
                <h1 className='text-gray-300 font-roboto text-sm'>{email}</h1>
              </div>
              {isEditing && (
                <button 
                  className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold transition duration-300"
                  onClick={() => setIsEditing(false)}
                >
                  Save Changes
                </button>
              )}
              <div>
                <button className='bg-red-500 px-5 py-2 rounded-md mt-6'>Logout</button>
              </div>
            </div>
          ) : activeTab === 'bookings' ? (
            // Booking Section
            <div className="text-center text-gray-300">
              <h2 className="text-xl font-semibold">Your Bookings</h2>
              <div className="flex justify-center space-x-4 border-b pb-3">
                {['confirmed', 'pending', 'canceled'].map((status) => (
                  <div 
                    key={status}
                    className={`cursor-pointer px-4 py-2 text-lg font-semibold ${bookingTab === status ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                    onClick={() => setBookingTab(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {bookings[bookingTab].length > 0 ? (
                  bookings[bookingTab].map((booking) => (
                    <div key={booking.id} className="border p-3 rounded-lg bg-gray-700 mb-2">
                      <p><strong>Booking ID:</strong> {booking.id}</p>
                      <p><strong>Vehicle:</strong> {booking.vehicle}</p>
                      <p><strong>Driver:</strong> {booking.driver}</p>
                      <p><strong>Time:</strong> {booking.time}</p>
                      <p><strong>Date:</strong> {booking.date}</p>
                      <p><strong>Pickup:</strong> {booking.pickup}</p>
                      <p><strong>Drop:</strong> {booking.drop}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No {bookingTab} bookings available.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-300">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="mt-2">No new notifications.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
