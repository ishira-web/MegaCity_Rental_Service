import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DriverRegister = () => {
  const [categories, setCategories] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState("");
  const [seats, setSeats] = useState(0);
  const [luggage, setLuggage] = useState("");
  const [carPhotos, setCarPhotos] = useState([]);
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const selectedCarModel = watch("carModel");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8080/auth/getAllCategories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const uniqueCategories = response.data.filter(
          (category, index, self) =>
            index === self.findIndex((c) => c.catType === category.catType)
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCarTypeChange = async (e) => {
    const selectedType = e.target.value;
    setSelectedCarType(selectedType);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:8080/auth/catModels/${selectedType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarModels(response.data);
    } catch (error) {
      console.error("Error fetching car models:", error);
      setCarModels([]);
    }
  };

  useEffect(() => {
    if (selectedCarModel) {
      const selectedModel = carModels.find((model) => model.catModel === selectedCarModel);
      if (selectedModel) {
        setSeats(selectedModel.noOfSeats);
        setLuggage(selectedModel.lagguageType);
        setValue("seats", selectedModel.noOfSeats);
        setValue("lagguageType", selectedModel.lagguageType);
      }
    }
  }, [selectedCarModel, carModels, setValue]);

  const handleCarPhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    setCarPhotos(files);
  };

  const handleDriverPhotoUpload = (e) => {
    const file = e.target.files[0];
    setDriverPhoto(file);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();

      // Append driver details
      formData.append("driverName", data.fullName);
      formData.append("driverEmail", data.email);
      formData.append("userName", data.username);
      formData.append("password", data.password); // Plain-text password
      formData.append("driverAddress", data.address);
      formData.append("driverPhone", data.phone);
      formData.append("driverStatues", "Pending");
      formData.append("currentLocation", "Unknown");
      formData.append("catID", selectedCarType);
      formData.append("catType", selectedCarType);
      formData.append("catModel", data.carModel);
      formData.append("noOfSeats", seats);
      formData.append("lagguageType", luggage);
      formData.append("acType", data.acOption);
      formData.append("driverNic", data.driverNic);
      formData.append("driverLicenseNumber", data.driverLicenseNumber);
      formData.append("vehicalNumber", data.vehicleNumber);

      // Append driver photo
      if (driverPhoto) {
        formData.append("imageUrl", driverPhoto);
      }

      // Append car photos
      carPhotos.forEach((file) => {
        formData.append("carImageUrls", file);
      });

      const response = await axios.post("http://localhost:8080/auth/createDriver", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Driver created successfully:", response.data);
      toast.success("Driver Registration is pending. Check your email.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to Home Page
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to register driver. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Mega City Cab Driver Registration
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["fullName", "email", "address", "phone", "username", "password", "driverNic", "driverLicenseNumber", "vehicleNumber"].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field === "fullName"
                        ? "Full Name"
                        : field === "email"
                        ? "Email Address"
                        : field === "address"
                        ? "Address"
                        : field === "phone"
                        ? "Telephone Number"
                        : field === "username"
                        ? "Username"
                        : field === "password"
                        ? "Password"
                        : field === "driverNic"
                        ? "Driver NIC"
                        : field === "driverLicenseNumber"
                        ? "Driver License Number"
                        : "Vehicle Number"}
                    </label>
                    <input
                      type={
                        field === "phone"
                          ? "tel"
                          : field === "email"
                          ? "email"
                          : field === "password"
                          ? "password"
                          : "text"
                      }
                      {...register(field, {
                        required: true,
                        pattern: field === "email"
                          ? /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
                          : field === "phone"
                          ? /^[0-9]{10}$/
                          : undefined,
                        minLength: field === "password" ? 6 : undefined,
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1")}`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-xs mt-1">
                        {field === "fullName"
                          ? "Full name is required"
                          : field === "email"
                          ? "Enter a valid email address"
                          : field === "address"
                          ? "Address is required"
                          : field === "phone"
                          ? "Invalid phone number (10 digits required)"
                          : field === "username"
                          ? "Username is required"
                          : field === "driverNic"
                          ? "Driver NIC is required"
                          : field === "driverLicenseNumber"
                          ? "Driver License Number is required"
                          : "Vehicle Number is required"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Info Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Vehicle Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                  <select
                    {...register("carType", { required: true })}
                    onChange={handleCarTypeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select car type</option>
                    {categories.map((car) => (
                      <option key={car.catID} value={car.catType}>
                        {car.catType}
                      </option>
                    ))}
                  </select>
                  {errors.carType && (
                    <p className="text-red-500 text-xs mt-1">Car type is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                  <select
                    {...register("carModel", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!selectedCarType}
                  >
                    <option value="">Select car model</option>
                    {carModels.map((model) => (
                      <option key={model.catModel} value={model.catModel}>
                        {model.catModel}
                      </option>
                    ))}
                  </select>
                  {errors.carModel && (
                    <p className="text-red-500 text-xs mt-1">Car model is required</p>
                  )}
                </div>

                {selectedCarModel && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Seats
                      </label>
                      <input
                        type="text"
                        value={seats}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Luggage Type</label>
                      <input
                        type="text"
                        value={luggage}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">AC Option</label>
                      <select
                        {...register("acOption", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select AC option</option>
                        <option value="With AC">With AC</option>
                        <option value="Without AC">Without AC</option>
                      </select>
                      {errors.acType && (
                        <p className="text-red-500 text-xs mt-1">AC option is required</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Documents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Photos</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleCarPhotosUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {carPhotos.length > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      {carPhotos.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverRegister;