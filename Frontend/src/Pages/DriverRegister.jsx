import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Camera, Car, Upload, User } from "lucide-react";
import axios from "axios";

const DriverRegister = () => {
  const [step, setStep] = useState(1); // Step for multi-step form
  const [selectedCarType, setSelectedCarType] = useState(""); // Selected car type
  const [seats, setSeats] = useState(0); // Number of seats
  const [luggage, setLuggage] = useState(""); // Luggage type
  const [categories, setCategories] = useState([]); // List of car categories
  const [carModels, setCarModels] = useState([]); // List of car models based on selected type
  const [error, setError] = useState(null); // Error message

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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
        setCategories(response.data); // Save categories data
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

    // Find the selected car type details
    const carTypeInfo = categories.find((car) => car.catType === selectedType);
    if (carTypeInfo) {
      setSeats(carTypeInfo.noOfSeats); // Set number of seats
      setLuggage(carTypeInfo.lagguageType); // Set luggage type
      setValue("seats", carTypeInfo.noOfSeats); // Update form value
      setValue("luggageType", carTypeInfo.lagguageType); // Update form value

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
    } else {
      setCarModels([]); // Reset car models if no car type is selected
      setError(null); // Clear any previous errors
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); // Log form data
    // Handle form submission (e.g., send data to API or backend)
  };

  // Handle next step in the multi-step form
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen w-full font-simplon bg-gray-50 p-4 sm:p-6 md:p-8">
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
              {["fullName", "address", "phone", "username", "password"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field === "fullName"
                      ? "Full Name"
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
                        : field === "password"
                        ? "password"
                        : "text"
                    }
                    {...register(field, { required: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1")}`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">
                      {field === "fullName"
                        ? "Full name is required"
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

              {/* Error Message */}
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-4">
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
                <div className="mt-1 flex items-center space-x-4">
                  <button
                    type="button"
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-white"
                  >
                    <Upload size={24} />
                  </button>
                  <span className="text-gray-500 text-sm">Upload photos of your vehicle</span>
                </div>
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