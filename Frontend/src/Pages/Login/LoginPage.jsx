import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!userName.trim()) newErrors.userName = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        userName,
        password,
      });

      const { token, role, userId } = response.data;

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      login(token);

      toast.success("Login successful!", { duration: 3000 });

      // Delay navigation to allow toast to display
      setTimeout(() => {
        switch (role) {
          case "ROLE_CUSTOMER":
            navigate("/");
            break;
          case "ROLE_DRIVER":
            navigate("/driver-profile/:id");
            break;
          case "ROLE_ADMIN":
            navigate("/admin/*");
            break;
          default:
            toast.info("This part is under development");
        }
      }, 1000);
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center font-walsheim justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-8 transform transition-all">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome Back!
        </h2>

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
              className={`mt-1 block w-full border ${
                errors.userName ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <Link
              to="/password-reset"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          If you ae a Customer Login{" "}
          <Link to="/signup" className="text-blue-500 font-bold hover:underline">
           Here
          </Link>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;