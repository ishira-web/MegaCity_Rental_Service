import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DriverProfile({ driverID }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const [bookings, setBookings] = useState({
    pending: [],
    ongoing: [],
    declined: []
  });
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/auth/driverByID/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        
        setProfile({
          name: response.data.driverName,
          email: response.data.driverEmail,
          phone: response.data.driverPhone,
          vehicle: `${response.data.catModel} (${response.data.vehicalNumber})`,
          license: response.data.driverNic,
          rating: 4.5,
          driverAddress: response.data.driverAddress,
          currentLocation: response.data.currentLocation,
          status: response.data.driverStatues,
          imageUrl: response.data.imageUrl,
          carImageUrls: response.data.carImageUrls
        });
      } catch (err) {
        setError('Failed to fetch driver profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverProfile();
  }, [userId]); // Add userId as a dependency

  const handleAccept = (bookingId) => {
    const booking = bookings.pending.find(b => b.id === bookingId);
    setBookings({
      ...bookings,
      pending: bookings.pending.filter(b => b.id !== bookingId),
      ongoing: [...bookings.ongoing, booking]
    });
  };

  const handleDecline = (bookingId) => {
    const booking = bookings.pending.find(b => b.id === bookingId);
    setBookings({
      ...bookings,
      pending: bookings.pending.filter(b => b.id !== bookingId),
      declined: [...bookings.declined, booking]
    });
  };

  // Update Function
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedDriver = {
        driverName: profile.name,
        driverEmail: profile.email,
        driverPhone: profile.phone,
        driverAddress: profile.driverAddress,
        currentLocation: profile.currentLocation,
      };
      
      await axios.put(`http://localhost:8080/driver/${userId}`, updatedDriver, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json'
        }
      });

      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  // Fetching Booking Details By Driver ID
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/booking/driver/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [userId]); // Add userId as a dependency

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center py-10 text-gray-600">No driver data found</div>;

  return (
    <div className="min-h-screen font-simplon bg-black py-12">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Left Side: Profile Card */}
        <div className="lg:w-1/2">
          <div className="profile-card bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
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
        </div>

        {/* Right Side Bookings */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-full ${
                  activeTab === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setActiveTab('ongoing')}
                className={`px-4 py-2 rounded-full ${
                  activeTab === 'ongoing' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Ongoing
              </button>
              <button 
                onClick={() => setActiveTab('declined')}
                className={`px-4 py-2 rounded-full ${
                  activeTab === 'declined' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Declined
              </button>
            </div>
            <div className="space-y-4">
            {bookings[activeTab].map(booking => (
  <div key={booking.bookingId} className="bg-gray-50 p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-700 font-semibold">{booking.customerName}</p>
        <p className="text-gray-500 text-sm">{booking.pickupLocation} to {booking.dropLocation}</p>
        <p className="text-gray-500 text-sm">{new Date(booking.bookingTime).toLocaleString()}</p>
        <p className="text-gray-500 text-sm">Fare: {booking.fare}</p>
      </div>
      {activeTab === 'pending' && (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleAccept(booking.bookingId)}
            className="bg-green-500 text-white px-3 py-1 rounded-full text-sm"
          >
            Approve
          </button>
          <button 
            onClick={() => handleDecline(booking.bookingId)}
            className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  </div>
))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;