import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';

function DriverProfile({ driverID }) { // Accept driverID as a prop
  const [activeTab, setActiveTab] = useState('pending');
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookings, setBookings] = useState({
    pending: [],
    ongoing: [],
    declined: []
  });

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/auth/driver/${driverID}", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth setup
          }
        });
        
        // Map backend driver data to frontend state
        setProfile({
          name: response.data.driverName,
          email: response.data.driverEmail,
          phone: response.data.driverPhone,
          vehicle: `${response.data.catModel} (${response.data.vehicalNumber})`,
          license: response.data.driverNic,
          rating: 4.5, // This isn't in your backend model, so keeping it static
          driverAddress: response.data.driverAddress,
          currentLocation: response.data.currentLocation,
          status: response.data.driverStatues,
          imageUrl: response.data.imageUrl,
          carImageUrls: response.data.carImageUrls
        });

        // Assuming bookings aren't part of this endpoint, you'd need a separate endpoint
        // For now, keeping static bookings - replace with actual API call if available
        setBookings({
          pending: [
            { id: 1, customer: 'Jane Smith', pickup: 'Downtown', dropoff: 'Airport', date: '2025-03-01', time: '14:30' },
            { id: 2, customer: 'Mike Johnson', pickup: 'Station', dropoff: 'Mall', date: '2025-03-02', time: '09:15' }
          ],
          ongoing: [],
          declined: []
        });
      } catch (err) {
        setError('Failed to fetch driver profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverProfile();

    // GSAP animations
    gsap.from('.profile-card', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.tab-content', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    });

    gsap.from('.booking-item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }, [driverID, activeTab]);

  const handleAccept = (bookingId) => {
    const booking = bookings.pending.find(b => b.id === bookingId);
    setBookings({
      ...bookings,
      pending: bookings.pending.filter(b => b.id !== bookingId),
      ongoing: [...bookings.ongoing, booking]
    });
    // TODO: Add API call to update booking status
  };

  const handleDecline = (bookingId) => {
    const booking = bookings.pending.find(b => b.id === bookingId);
    setBookings({
      ...bookings,
      pending: bookings.pending.filter(b => b.id !== bookingId),
      declined: [...bookings.declined, booking]
    });
    // TODO: Add API call to update booking status
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedDriver = {
        driverName: profile.name,
        driverEmail: profile.email,
        driverPhone: profile.phone,
        driverAddress: profile.driverAddress,
        currentLocation: profile.currentLocation,
        // Add other fields as needed, matching your backend Driver model
      };
      
      await axios.put(`http://localhost:8080/updateDriver/${driverID}`, updatedDriver, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center py-10 text-gray-600">No driver data found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12">
      <div className="container mx-auto px-4">
        {/* Profile Card */}
        <div className="profile-card bg-white rounded-2xl shadow-xl p-8 mb-10 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
          {!isEditing ? (
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src={profile.imageUrl} 
                  alt="Driver" 
                  className="w-28 h-28 rounded-full object-cover mb-6 shadow-lg"
                />
                <div className={`absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full ${
                  profile.status === 'Available' ? 'bg-green-500' : 
                  profile.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {profile.status}
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {profile.name}
              </h2>
              <p className="text-gray-600 mb-4">{profile.email}</p>
              <div className="grid grid-cols-2 gap-6 mt-4 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-indigo-600">{profile.phone}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-semibold text-indigo-600">{profile.vehicle}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">License</p>
                  <p className="font-semibold text-indigo-600">{profile.license}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-semibold text-yellow-500">{profile.rating} ★</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold text-indigo-600">{profile.driverAddress}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                  placeholder="Name"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                  placeholder="Email"
                />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                  placeholder="Phone"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={profile.driverAddress}
                  onChange={(e) => setProfile({...profile, driverAddress: e.target.value})}
                  className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-all duration-300"
                  placeholder="Address"
                />
              </div>
              <div className="flex space-x-4">
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Save
                </button>
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Tabs */}
        <div className="tab-content bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="flex border-b-2 border-gray-200 mb-8">
            {['pending', 'ongoing', 'declined', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium ${
                  activeTab === tab 
                    ? 'border-b-4 border-indigo-600 text-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-500'
                } transition-all duration-300`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab !== 'reviews' && 'Bookings'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'pending' && (
            <div className="space-y-6">
              {bookings.pending.map(booking => (
                <div key={booking.id} className="booking-item flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{booking.customer}</p>
                    <p className="text-sm text-gray-600">{booking.pickup} → {booking.dropoff}</p>
                    <p className="text-sm text-indigo-600 font-medium mt-1">
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                  <div className="space-x-3">
                    <button 
                      onClick={() => handleAccept(booking.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleDecline(booking.id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ongoing' && (
            <div className="space-y-6">
              {bookings.ongoing.map(booking => (
                <div key={booking.id} className="booking-item p-5 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl shadow-md">
                  <p className="font-semibold text-lg text-gray-800">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.pickup} → {booking.dropoff}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {booking.date} at {booking.time}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'declined' && (
            <div className="space-y-6">
              {bookings.declined.map(booking => (
                <div key={booking.id} className="booking-item p-5 bg-gradient-to-r from-gray-50 to-red-50 rounded-xl shadow-md">
                  <p className="font-semibold text-lg text-gray-800">{booking.customer}</p>
                  <p className="text-sm text-gray-600">{booking.pickup} → {booking.dropoff}</p>
                  <p className="text-sm text-red-600 font-medium mt-1">
                    {booking.date} at {booking.time}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="p-5 bg-gradient-to-r from-gray-50 to-yellow-50 rounded-xl shadow-md">
                <p className="font-semibold text-lg text-gray-800">Recent Reviews</p>
                <p className="text-sm text-gray-600">Coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;