import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DriverProfile() {
  const [driverPhoto, setDriverPhoto] = useState(null); // State for driver photo

  // Handle driver photo upload
  const handleDriverPhotoUpload = (e) => {
    const file = e.target.files[0];
    setDriverPhoto(file);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a successful upload
    console.log('Driver photo selected:', driverPhoto);
    toast.success('Driver photo selected successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Driver Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Upload Profile Photo</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Photo</label>
                <input
                  type="file"
                  onChange={handleDriverPhotoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {driverPhoto && (
                  <p className="text-sm text-gray-500 mt-1">1 file selected</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;