import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";

function DriverRegister() {
  const [formData, setFormData] = useState({
    driverName: "",
    driverEmail: "",
    userName: "",
    password: "",
    driverAddress: "",
    driverPhone: "",
    currentLocation: "",
    catID: "",
    catType: "",
    catModel: "",
    noOfSeats: "",
    driverNic: "",
    acType: "",
    lagguageType: "",
    vehicalNumber: "",
  });

  const [imageUrl, setImageUrl] = useState(null);
  const [carImageUrl, setCarImageUrl] = useState(null); // Single car image state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [catTypes, setCatTypes] = useState([]);
  const [catModels, setCatModels] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [carImagePreview, setCarImagePreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch("http://localhost:8080/auth/getAllCategories");
        const data = await response.json();

        // Filter unique catTypes
        const uniqueCatTypes = Array.from(
          new Set(data.map(category => category.catType))
        ).map(catType => {
          // Return the first occurrence of each catType with its catID
          return data.find(category => category.catType === catType);
        });

        setCatTypes(uniqueCatTypes); // Set only unique category types
      } catch (err) {
        setError("Failed to load vehicle categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchCatModels = async (catType) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/catModels/${catType}`);
      const data = await response.json();
      setCatModels(data);
    } catch (err) {
      setError("Failed to load vehicle models");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCatTypeChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      catType: value,
      catModel: "",
      noOfSeats: "",
      lagguageType: ""
    }));
    setCatModels([]);
    if (value) {
      fetchCatModels(value);
    }
  };

  const handleCatModelChange = (e) => {
    const { value } = e.target;
    const selectedModel = catModels.find(model => model.catModel === value);

    setFormData(prev => ({
      ...prev,
      catModel: value,
      noOfSeats: selectedModel?.noOfSeats || "",
      lagguageType: selectedModel?.lagguageType || "",
      catID: selectedModel?.catID || ""
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      if (name === "imageUrl") {
        setImageUrl(file);
        setImagePreview(imageUrl);
      } else if (name === "frontView") {
        setCarImageUrl(file); // Set single car image
        setCarImagePreview(imageUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!imageUrl || !carImageUrl) { // Check for single car image
      setError("Please upload all required images");
      setLoading(false);
      return;
    }

    if (!formData.catType || !formData.catModel) {
      setError("Please select both car type and model");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("imageUrl", imageUrl);
      data.append("carImageUrl", carImageUrl); // Append single car image
      data.append("driverName", formData.driverName);
      data.append("driverEmail", formData.driverEmail);
      data.append("userName", formData.userName);
      data.append("password", formData.password);
      data.append("driverAddress", formData.driverAddress);
      data.append("driverPhone", formData.driverPhone);
      data.append("currentLocation", formData.currentLocation || "Not specified");
      data.append("catID", formData.catID);
      data.append("catType", formData.catType);
      data.append("catModel", formData.catModel);
      data.append("noOfSeats", formData.noOfSeats);
      data.append("driverNic", formData.driverNic);
      data.append("acType", formData.acType);
      data.append("lagguageType", formData.lagguageType);
      data.append("vehicalNumber", formData.vehicalNumber);

      const response = await fetch("http://localhost:8080/auth/createDriver", {
        method: "POST",
        body: data,
      });

      const result = await response.text();
      if (!response.ok) {
        throw new Error(result || "Failed to create driver");
      }

      alert("Driver account created successfully! Please Be wait for Admin Approval");
      setFormData({
        driverName: "",
        driverEmail: "",
        userName: "",
        password: "",
        driverAddress: "",
        driverPhone: "",
        currentLocation: "",
        catID: "",
        catType: "",
        catModel: "",
        noOfSeats: "",
        driverNic: "",
        acType: "",
        lagguageType: "",
        vehicalNumber: "",
      });
      setImageUrl(null);
      setCarImageUrl(null); // Reset single car image
      setCatModels([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-walsheim">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-center">Driver Registration</h1>
          <p className="text-gray-600 mt-1 text-center">
            Please fill in all required information to complete your registration.
          </p>
        </div>
        {error && (
          <div className="p-4 mx-8 mt-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="driverName" value={formData.driverName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea name="driverAddress" value={formData.driverAddress} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" rows={3} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="driverPhone" value={formData.driverPhone} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="driverEmail" value={formData.driverEmail} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile Preview" className="h-24 w-24 object-cover rounded-full mx-auto" />
                    ) : (
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input type="file" name="imageUrl" onChange={handleFileChange} className="sr-only" accept="image/*" required />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Updated Vehicle Selection Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Vehicle Selection</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                  <select 
                    name="catType" 
                    value={formData.catType} 
                    onChange={handleCatTypeChange} 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    required
                    disabled={loadingCategories}
                  >
                    <option value="">{loadingCategories ? "Loading..." : "Select car type"}</option>
                    {catTypes.map(category => (
                      <option key={category.catID} value={category.catType}>
                        {category.catType}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                  <select 
                    name="catModel" 
                    value={formData.catModel} 
                    onChange={handleCatModelChange} 
                    className="w-full p-2 border border-gray-300 rounded-lg" 
                    required
                    disabled={!formData.catType || catModels.length === 0}
                  >
                    <option value="">Select car model</option>
                    {catModels.map(category => (
                      <option key={category.catID} value={category.catModel}>
                        {category.catModel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
                  <input
                    type="text"
                    name="noOfSeats"
                    value={formData.noOfSeats}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Luggage Type</label>
                  <input
                    type="text"
                    name="lagguageType"
                    value={formData.lagguageType}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Additional Features</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AC Type</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="with-ac" name="acType" value="with-ac" onChange={handleInputChange} className="h-4 w-4 text-blue-600" required />
                    <label htmlFor="with-ac" className="ml-2">With AC</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="without-ac" name="acType" value="without-ac" onChange={handleInputChange} className="h-4 w-4 text-blue-600" />
                    <label htmlFor="without-ac" className="ml-2">Without AC</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-center ">
                {/* Vehicle Front View Upload */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Vehicle Front View</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {carImagePreview ? (
                        <img src={carImagePreview} alt="Car Front View Preview" className="h-24 w-24 object-cover rounded-lg mx-auto" />
                      ) : (
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input type="file" name="frontView" onChange={handleFileChange} className="sr-only" accept="image/*" required />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Final Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver NIC Number</label>
                  <input type="text" name="driverNic" value={formData.driverNic} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                  <input type="text" name="vehicalNumber" value={formData.vehicalNumber} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Before submitting, please ensure:</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  <li>All personal information is accurate</li>
                  <li>Vehicle details are correctly entered</li>
                  <li>All required images have been uploaded</li>
                  <li>NIC and vehicle numbers are valid</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-lg text-white ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DriverRegister;