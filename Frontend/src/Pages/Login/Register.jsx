import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Registerpt from '/public/images/pts.png'; // Ensure this path is correct
import axios from 'axios';

function Register() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    fullName: '',
    mobileNumber: '',
    nicNo: '',
    nicFront: null,
    nicBack: null,
    profilePicture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('userName', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('dob', formData.dob);
    data.append('name', formData.fullName);
    data.append('phone', formData.mobileNumber);
    data.append('nicNumber', formData.nicNo);
    data.append('nicFront', formData.nicFront);
    data.append('nicBack', formData.nicBack);
    data.append('customerProfile', formData.profilePicture);

    try {
      const response = await axios.post('http://localhost:8080/auth/createCustomer', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Registration Successful! 🎉', {
          style: {
            borderRadius: '25px',
            backgroundColor: 'black',
            color: 'white',
          },
        });

        // Reset form after successful registration
        setFormData({
          username: '',
          email: '',
          password: '',
          dob: '',
          fullName: '',
          mobileNumber: '',
          nicNo: '',
          nicFront: null,
          nicBack: null,
          profilePicture: null,
        });
        setCurrentStep(1); // Reset to step 1

        // Navigate to the "/ride" page
        navigate('/ride');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration Failed! 😢', {
        style: {
          borderRadius: '25px',
          backgroundColor: 'black',
          color: 'white',
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-950">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-500">Step 1: Basic Details</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: NIC Details */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-500">Step 2: NIC Details</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">NIC No</label>
                  <input
                    type="text"
                    name="nicNo"
                    value={formData.nicNo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">NIC Front Image</label>
                  <input
                    type="file"
                    name="nicFront"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">NIC Back Image</label>
                  <input
                    type="file"
                    name="nicBack"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Profile Picture */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-500">Step 3: Profile Picture</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Upload Profile Picture</label>
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-3 shadow-sm"
                    required
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Back
                </button>
              )}
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Register
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Side - Background Image */}
        <div
          className="w-[30vw] bg-cover object-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${Registerpt})` }}
        ></div>
      </div>
    </div>
  );
}

export default Register;