import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Phone, Calendar, X, Camera } from "lucide-react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    nicnumber: "",
    driverAddress: "",
    imageUrl: "",
  });
  const [bookings, setBookings] = useState([]);
  const [profilePic, setProfilePic] = useState(
    "https://randomuser.me/api/portraits/men/75.jpg"
  );

  const userId = localStorage.getItem("userId"); // Get user ID from local storage
  const { id } = useParams(); // Get dynamic user ID from URL (if needed)

  // Fetch Profile and Bookings
  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        setLoading(true);
        const profileResponse = await axios.get(
          `http://localhost:8080/auth/getCustomerByID/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setProfile({
          name: profileResponse.data.name,
          email: profileResponse.data.email,
          phone: profileResponse.data.phone,
          nicnumber: profileResponse.data.nicNumber,
          driverAddress: profileResponse.data.driverAddress,
          imageUrl: profileResponse.data.customerProfile,
        });

        if (profileResponse.data.customerProfile) {
          setProfilePic(profileResponse.data.customerProfile);
        }

        // Fetch bookings
        const bookingsResponse = await axios.get(
          `http://localhost:8080/auth/customer/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        setBookings(bookingsResponse.data);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndBookings();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/auth/updateCustomer/${userId}`,
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          nicNumber: profile.nicnumber,
          driverAddress: profile.driverAddress,
          customerProfile: profile.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FCEED8] p-10">
      <div className="flex gap-16">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl p-10 w-[550px] h-[500px] profile-card">
          <div className="flex items-center gap-6 relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 left-16 bg-gray-200 p-1 rounded-full cursor-pointer">
              <Camera size={18} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <div>
              <h2 className="text-xl font-semibold">{profile.name || "User Name"}</h2>
              <p className="text-gray-500 text-md">{profile.email || "user@example.com"}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-6 py-3 bg-green-100 text-green-800 rounded-lg shadow"
          >
            Edit
          </button>
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-3 text-gray-700 text-lg">
              <Mail size={24} /> {profile.email || "user@example.com"}
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-lg">
              <Phone size={24} /> {profile.phone || "000-000-0000"}
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-lg">
              <Calendar size={24} /> 2002/01/01
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white shadow-lg rounded-2xl p-10 w-[750px] h-[500px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-6">Your Bookings</h3>
          {loading && <p className="text-center text-lg">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && bookings.length === 0 && (
            <p className="text-center text-lg text-gray-500">No bookings found.</p>
          )}
          {!loading && bookings.length > 0 && (
            <div>
              <ul className="space-y-4">
                {bookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="p-6 border rounded-lg flex justify-between items-center shadow-sm"
                  >
                    <div>
                      <p className="text-md font-semibold">Booking ID: {booking.bookingId}</p>
                      <p className="text-gray-600 text-sm">Total Price: {booking.fare}</p>
                    </div>
                    <span
                      className={`px-4  py-1 text-md font-medium rounded-full ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Popup */}
      {isEditing && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-2 border rounded-lg"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg mt-2"
                onClick={() => {
                  handleUpdate();
                  setIsEditing(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;