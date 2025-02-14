import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Import icons from Lucide
import { Link } from 'react-router-dom';
import Registerpt from '/public/images/pts.png'; // Background image

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [userName, setUserName] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    // Handle login logic here, like form validation or redirection
    console.log('Login attempt:', userName, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Login</h1>
          <form onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Username"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
              {/* Toggle Password Visibility */}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer mt-5"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Background Image */}
        <div
          className="w-1/2 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${Registerpt})` }}
        ></div>
      </div>
    </div>
  );
};

export default UserLogin;
