import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Camera, Car, Upload, User } from "lucide-react";


const carTypes = ["Budget", "City", "SUV", "9-Seater", "14-Seater"];
const luggageTypes = ["Small", "Medium", "Large"];
const carModels = {
  Budget: ["Toyota Vitz", "Suzuki Alto", "Nissan March"],
  City: ["Toyota Prius", "Honda Civic", "Toyota Corolla"],
  SUV: ["Toyota RAV4", "Honda CR-V", "Nissan X-Trail"],
  "9-Seater": ["Toyota Hiace", "Nissan Urvan", "Mercedes Sprinter"],
  "14-Seater": ["Toyota Coaster", "Nissan Civilian", "Mitsubishi Rosa"],
};

 const DriverRegister = () => {
  const [step, setStep] = useState(1);
  const [selectedCarType, setSelectedCarType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., send data to API or backend)
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 md:p-8">
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              {["fullName", "address", "phone", "username", "password"].map(
                (field, idx) => (
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
                      type={field === "phone" ? "tel" : field === "password" ? "password" : "text"}
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
                )
              )}
            </div>
          )}

          {/* Step 2: Vehicle Info */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Type</label>
                <select
                  {...register("carType", { required: true })}
                  onChange={(e) => setSelectedCarType(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select car type</option>
                  {carTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.carType && (
                  <p className="text-red-500 text-xs mt-1">Car type is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Model</label>
                <select
                  {...register("carModel", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={!selectedCarType}
                >
                  <option value="">Select car model</option>
                  {selectedCarType &&
                    carModels[selectedCarType].map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
                {errors.carModel && (
                  <p className="text-red-500 text-xs mt-1">Car model is required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Luggage Type</label>
                <select
                  {...register("luggageType", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select luggage type</option>
                  {luggageTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.luggageType && (
                  <p className="text-red-500 text-xs mt-1">Luggage type is required</p>
                )}
              </div>
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
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload photos</span>
                        <input
                          type="file"
                          multiple
                          className="sr-only"
                          {...register("carPhotos", { required: true })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errors.carPhotos && (
                  <p className="text-red-500 text-xs mt-1">Car photos are required</p>
                )}
              </div>
              {/* Driver Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Driver Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload photo</span>
                        <input
                          type="file"
                          className="sr-only"
                          {...register("driverPhoto", { required: true })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errors.driverPhoto && (
                  <p className="text-red-500 text-xs mt-1">Driver photo is required</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-auto"
              >
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};


export default DriverRegister;