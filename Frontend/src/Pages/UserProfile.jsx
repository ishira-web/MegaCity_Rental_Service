import React, { useState } from "react";
import { Mail, Phone, Calendar, X, Camera } from "lucide-react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("https://randomuser.me/api/portraits/men/75.jpg");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FCEED8] p-10 relative">
      <div className="flex gap-16">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl p-10 w-[550px] h-[500px]">
          <div className="flex items-center gap-6 relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 left-16 bg-gray-200 p-1 rounded-full cursor-pointer">
              <Camera size={18} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
            <div>
              <h2 className="text-xl font-semibold">Ishira Pahasara Jayarathna Silva</h2>
              <p className="text-gray-500 text-md">ishirapahasara8@gmail.com</p>
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
              <Mail size={24} /> ishirapahasara8@gmail.com
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-lg">
              <Phone size={24} /> 0743631212
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-lg">
              <Calendar size={24} /> 2002/01/01
            </div>
          </div>
          <p className="mt-6 text-sm text-red-500">*Please Check Your Location</p>
        </div>

        {/* Bookings Section */}
        <div className="bg-white shadow-lg rounded-2xl p-10 w-[550px] h-[500px]">
          <h3 className="text-xl font-semibold mb-6">Bookings</h3>
          <div className="space-y-6">
            {[
              { id: "64651264621752451246521642", status: "Pending", color: "bg-yellow-100 text-yellow-800" },
              { id: "6465126462172345671246512642", status: "Ongoing", color: "bg-green-100 text-green-800" },
              { id: "21345678234563456345634567", status: "End", color: "bg-red-100 text-red-800" },
            ].map((booking, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg flex justify-between items-center shadow-sm"
              >
                <div>
                  <p className="text-md font-semibold">Booking ID</p>
                  <p className="text-gray-600 text-sm">{booking.id}</p>
                </div>
                <span className={`px-5 py-3 text-md font-medium rounded-full ${booking.color}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Logout Button */}
      <button className="absolute top-8 right-8 px-6 py-3 bg-red-300 text-red-800 rounded-lg shadow text-lg">
        Logout
      </button>

      {/* Edit Popup */}
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
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-lg" />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Phone" className="w-full p-2 border rounded-lg" />
              <input type="date" className="w-full p-2 border rounded-lg" />
              <button 
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg mt-2"
                onClick={() => setIsEditing(false)}
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
