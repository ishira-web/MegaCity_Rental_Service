import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gsap from 'gsap';

function DriverProfile() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem('userId');
  const tabContentRef = useRef(null);
  const profileRef = useRef(null);
  const bookingsRef = useRef(null);

  useEffect(() => {
    // GSAP animation for tab content
    gsap.fromTo(tabContentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
  }, [activeTab]);

  useEffect(() => {
    // Fetch driver profile
    axios
      .get(`http://localhost:8080/auth/driverByID/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      })
      .then((response) => setProfile(response.data))
      .catch((error) => console.error('Error fetching profile:', error));

    // Fetch driver bookings
    axios
      .get(`http://localhost:8080/auth/driver/booking/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      })
      .then((response) => setBookings(response.data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, [userId]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/auth/updatedriver/${userId}`, profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Profile update failed');
      console.error(err);
    }
  };

  const handleConfirmBooking = (bookingId) => {
    axios
      .post(
        `http://localhost:8080/auth/confirm/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        }
      )
      .then(() => {
        toast.success('Booking confirmed successfully!');
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: 'Confirmed' } : booking
          )
        );
      })
      .catch((error) => {
        toast.error('Failed to confirm booking');
        console.error(error);
      });
  };

  const handleRejectBooking = (bookingId) => {
    axios
      .post(
        `http://localhost:8080/auth/booking/delete/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        }
      )
      .then(() => {
        toast.success('Booking rejected successfully!');
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
      })
      .catch((error) => {
        toast.error('Failed to reject booking');
        console.error(error);
      });
  };

  const handleEndTrip = (bookingId) => {
    axios
      .post(
        `http://localhost:8080/auth/end/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        }
      )
      .then(() => {
        toast.success('Trip ended successfully!');
        setBookings(
          bookings.map((booking) =>
            booking.bookingId === bookingId ? { ...booking, status: 'Confirmed' } : booking
          )
        );
      })
      .catch((error) => {
        toast.error('Failed to end trip');
        console.error(error);
      });
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      gsap.fromTo(profileRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100 py-12">
      <ToastContainer />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex justify-center gap-8 border-b pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 text-lg font-semibold transition duration-300 rounded-lg ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2 text-lg font-semibold transition duration-300 rounded-lg ${
              activeTab === 'bookings' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            Bookings
          </button>
        </div>

        <div ref={tabContentRef} className="tab-content mt-6">
          {activeTab === 'profile' && profile && (
            <div ref={profileRef} className="flex flex-col items-center text-center">
              <img
                src={profile.imageUrl}
                alt="Driver"
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <h2 className="text-2xl font-bold mt-4 text-gray-800">{profile.driverName}</h2>
              <p className="text-gray-600">{profile.driverEmail}</p>
              <p className="mt-2 font-medium text-indigo-600">{profile.vehicle}</p>
              <p className="mt-2 text-gray-500">Address: {profile.driverAddress}</p>

              <button
                onClick={toggleEditing}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>

              {isEditing && (
                <form onSubmit={handleProfileUpdate} className="mt-4 flex flex-col gap-4">
                  <input
                    type="text"
                    value={profile.driverName}
                    onChange={(e) => setProfile({ ...profile, driverName: e.target.value })}
                    className="p-2 border rounded-lg"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={profile.driverEmail}
                    onChange={(e) => setProfile({ ...profile, driverEmail: e.target.value })}
                    className="p-2 border rounded-lg"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={profile.driverPhone}
                    onChange={(e) => setProfile({ ...profile, driverPhone: e.target.value })}
                    className="p-2 border rounded-lg"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={profile.driverAddress}
                    onChange={(e) => setProfile({ ...profile, driverAddress: e.target.value })}
                    className="p-2 border rounded-lg"
                    placeholder="Address"
                  />

                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Save
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div ref={bookingsRef} className="mt-4 bg-white">
              {bookings.length === 0 ? (
                <p className="text-center text-gray-500">No bookings found.</p>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="p-4 mb-4 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800">{booking.customerName}</h3>
                    <p className="text-sm text-gray-500">Pickup: {booking.pickupLocation}</p>
                    <p className="text-sm text-gray-500">Dropoff: {booking.dropLocation}</p>
                    <p className="text-sm text-gray-500">Date: {booking.bookingDate}</p>
                    <p
                      className={`text-sm font-semibold ${
                        booking.bookingStatus === 'Pending'
                          ? 'text-yellow-600'
                          : booking.bookingStatus === 'Confirmed'
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}
                    >
                      Status: {booking.bookingStatus}
                    </p>

                    {booking.bookingStatus === 'Pending' && (
                      <div className="mt-4 flex gap-4">
                        <button
                          onClick={() => handleConfirmBooking(booking.bookingId)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking.bookingId)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {booking.bookingStatus === 'Confirmed' && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleEndTrip(booking.bookingId)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                          End Trip
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;