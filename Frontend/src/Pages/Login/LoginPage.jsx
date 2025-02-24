import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";


const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        userName: userName,
        password: password,
      });

      // Assuming the backend returns a JWT token in response
      const { token, role, userId } = response.data;
      
      // Save the token to localStorage or sessionStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);


      login(token);
      toast.success("Login successful!", { position: "top-center" });
      // Redirect to the desired page, e.g., dashboard
      if (role === "ROLE_CUSTOMER") {
        window.location.href = "/"; // Redirect to customer home page
      } else if (role === "ROLE_DRIVER") {
        window.location.href = "/driver-profile"; // Redirect to driver dashboard
      }  else if (role === "ROLE_ADMIN") {
        window.location.href = "/admin/*"; // Redirect to ADMIN dashboard

      }else {
        toast.success("this part under development", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-800"
              >
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
         <Link to="/signup"> <h1 className="text-blue-500 hover:underline">
            Sign up
          </h1></Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;