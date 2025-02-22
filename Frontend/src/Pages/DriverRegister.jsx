import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Camera, Car, Upload, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DriverRegister = () => {
  const [step, setStep] = useState(1); // Step for multi-step form
  const [selectedCarType, setSelectedCarType] = useState(""); // Selected car type
  const [seats, setSeats] = useState(0); // Number of seats
  const [luggage, setLuggage] = useState(""); // Luggage type
  const [categories, setCategories] = useState([]); // List of car categories
  const [carModels, setCarModels] = useState([]); // List of car models based on selected type
  const [error, setError] = useState(null); // Error message
  const [showDetails, setShowDetails] = useState(false); // Show seats and luggage after selecting car model
  const [carPhotos, setCarPhotos] = useState([]); // Car photos
  const [driverPhoto, setDriverPhoto] = useState(null); // Driver photo
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Watch the selected car model
  const selectedCarModel = watch("carModel");

  // useNavigate hook for redirection
  const navigate = useNavigate();

  // Fetch categories from backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8080/auth/getAllCategories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter out duplicate car types
        const uniqueCategories = response.data.filter(
          (category, index, self) =>
            index === self.findIndex((c) => c.catType === category.catType)
        );

        setCategories(uniqueCategories); // Save unique categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle car type selection
  const handleCarTypeChange = async (e) => {
    const selectedType = e.target.value;
    setSelectedCarType(selectedType);
    setShowDetails(false); // Hide details when car type changes

    // Fetch car models based on selected car type
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:8080/auth/catModels/${selectedType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarModels(response.data); // Set car models from the response
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching car models:", error);
      setCarModels([]); // Reset car models in case of an error
      setError("Failed to fetch car models. Please try again."); // Set error message
    }
  };

  // Handle car model selection
  useEffect(() => {
    if (selectedCarModel) {
      const selectedModel = carModels.find((model) => model.catModel === selectedCarModel);
      if (selectedModel) {
        setSeats(selectedModel.noOfSeats); // Update seats
        setLuggage(selectedModel.lagguageType); // Update luggage type
        setValue("seats", selectedModel.noOfSeats); // Update form value
        setValue("luggageType", selectedModel.lagguageType); // Update form value
        setShowDetails(true); // Show details after selecting car model
      }
    } else {
      setShowDetails(false); // Hide details if no car model is selected
    }
  }, [selectedCarModel, carModels, setValue]);

  // Handle car photos upload
  const handleCarPhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    setCarPhotos(files);
  };

  // Handle driver photo upload
  const handleDriverPhotoUpload = (e) => {
    const file = e.target.files[0];
    setDriverPhoto(file);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true); // Show loading overlay
    try {
      const token = localStorage.getItem("authToken");

      // Create FormData object to send files and form data
      const formData = new FormData();

      // Append driver details to FormData
      formData.append("driverName", data.fullName);
      formData.append("driverEmail", data.email);
      formData.append("userName", data.username);
      formData.append("driverEmail", data.email);
      formData.append("password", data.password );
      formData.append("driverAddress", data.address);
      formData.append("driverPhone", data.phone);
      formData.append("driverStatues", "Pending"); // Default status
      formData.append("currentLocation", "Unknown"); // Default location
      formData.append("catID", selectedCarType); // Selected car type ID
      formData.append("catType", selectedCarType); // Selected car type
      formData.append("catModel", data.carModel); // Selected car model
      formData.append("noOfSeats", seats); // Number of seats
      formData.append("lagguageType", luggage); // Luggage type

      // Append driver photo
      if (driverPhoto) {
        formData.append("driverPhoto", driverPhoto);
      }

      // Append car photos
      carPhotos.forEach((file, index) => {
        formData.append("carPhotos", file);
      });

      // Send form data to the backend
      const response = await axios.post("http://localhost:8080/auth/createDriver", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Driver created successfully:", response.data);
      alert("Driver registration successful!");

      // Redirect to Home Page after successful registration
      navigate("/"); // Replace with the correct route for your home page
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to register driver. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading overlay
    }
  };

  // Handle next step in the multi-step form
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen w-full font-simplon bg-gray-50 p-4 sm:p-6 md:p-8 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              <p className="text-gray-700 font-semibold">Registering driver...😎</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Mega City Cab Driver Registration
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[
            { icon: User, label: "Personal Info" },
            { icon: Car, label: "Vehicle Info" },
            { icon: Camera, label: "Documents" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step > index + 1
                    ? "bg-green-500"
                    : step === index + 1
                    ? "bg-blue-500"
                    : "bg-gray-200"
                } text-white`}
              >
                <item.icon size={20} />
              </div>
              <span className="text-sm mt-2">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
  <div className="space-y-4">
    {["fullName", "email", "address", "phone", "username", "password"].map((field, idx) => (
      <div key={idx}>
        <label className="block text-sm font-medium text-gray-700">
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
            : "Password"}
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
            pattern: field === "email" ? /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ : undefined
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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
              ? "Phone number is required"
              : field === "username"
              ? "Username is required"
              : "Password is required"}
          </p>
        )}
      </div>
    ))}
  </div>
)}

          {/* Step 2: Vehicle Info */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Car Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Type</label>
                <select
                  {...register("carType", { required: true })}
                  onChange={handleCarTypeChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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

              {/* Car Model Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Model</label>
                <select
                  {...register("carModel", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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

              {/* Show seats and luggage only after selecting a car model */}
              {showDetails && (
                <>
                  {/* Number of Seats */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Seats
                    </label>
                    <input
                      type="text"
                      value={seats}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100"
                    />
                  </div>

                  {/* Luggage Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Luggage Type</label>
                    <input
                      type="text"
                      value={luggage}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100"
                    />
                  </div>
                </>
              )}

              {/* Error Message */}
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-4">
              {/* License Number and Driver ID */}
              {["licenseNumber", "driverId"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field === "licenseNumber" ? "Vehicle License Number" : "Driver ID Number"}
                  </label>
                  <input
                    type="text"
                    {...register(field, { required: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={field === "licenseNumber" ? "ABC-1234" : "DRV123456"}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">
                      {field === "licenseNumber"
                        ? "License number is required"
                        : "Driver ID number is required"}
                    </p>
                  )}
                </div>
              ))}

              {/* Car Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Photos</label>
                <input
                  type="file"
                  multiple
                  onChange={handleCarPhotosUpload}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {carPhotos.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    {carPhotos.length} file(s) selected
                  </p>
                )}
              </div>

              {/* Driver Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Driver Photo</label>
                <input
                  type="file"
                  onChange={handleDriverPhotoUpload}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {driverPhoto && (
                  <p className="text-sm text-gray-500 mt-2">1 file selected</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="py-2 px-4 bg-gray-200 rounded-md"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverRegister;