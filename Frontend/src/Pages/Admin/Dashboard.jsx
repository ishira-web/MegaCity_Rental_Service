import React, { useState, useEffect } from "react";
import { Ban, Plus, Check } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [carTypes, setCarTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState("");
  const [newCarType, setNewCarType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [seats, setSeats] = useState("");
  const [luggage, setLuggage] = useState("");
  const [price, setPrice] = useState("");

  const drivers = [
    { name: "Ishira Pahasara", status: "Pending" },
    { name: "John Doe", status: "Pending" },
    { name: "Jane Smith", status: "Pending" },
    { name: "Robert Brown", status: "Pending" },
    { name: "Emily White", status: "Pending" },
    { name: "Michael Johnson", status: "Pending" },
    { name: "Sarah Williams", status: "Pending" },
  ];

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/getCarTypes`);
        if (!response.ok) {
          throw new Error("Failed to fetch car types");
        }
        const data = await response.json();
        setCarTypes(data);
      } catch (error) {
        toast.error("Failed to load car types");
      }
    };
    fetchCarTypes();
  }, []);

  const addCarType = () => {
    if (newCarType && !carTypes.includes(newCarType)) {
      setCarTypes([...carTypes, newCarType]);
      setNewCarType("");
    }
  };

  const handleAddCategory = async () => {
    if (!vehicleModel || !seats || !luggage || !price || !selectedCarType) {
      toast.error("Please fill in all the fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const categoryData = {
        catType: selectedCarType,
        catModel: vehicleModel,
        noOfSeats: seats,
        pricePerKm: price,
        lagguageType: luggage,
      };

      const response = await fetch("http://localhost:8080/auth/createcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      toast.success("Vehicle category added successfully!");

      setVehicleModel("");
      setSeats("");
      setLuggage("");
      setPrice("");
      setSelectedCarType("");
    } catch (error) {
      toast.error("Failed to add vehicle category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-gradient-to-r from-amber-50 to-red-50 min-h-[91vh] p-6">
      
      {/* 🚗 Upper Dashboard Cards */}
      <div className="flex justify-center gap-10">
        <div className="w-[20vw] h-[6vw] flex justify-center items-center border bg-white hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md">
          <div className="justify-center flex flex-col items-center gap-5">
            <h1 className="font-semibold">Booking Trips</h1>
            <h1 className="text-2xl font-bold text-purple-400">120</h1>
          </div>
        </div>
        <div className="w-[20vw] h-[6vw] flex justify-center items-center border bg-white hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md">
          <div className="justify-center flex flex-col items-center gap-5">
            <h1 className="font-semibold">Total Revenue</h1>
            <h1 className="text-2xl font-bold text-green-400">$25,000</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        {/* 🚘 Driver Approval Section */}
        <div className="w-[30vw] h-[32vw] bg-white p-5 overflow-y-auto">
          <h1 className="text-center font-semibold text-lg">Pending Drivers</h1>
          <div className="mt-6 space-y-4">
            {drivers.map((driver, index) => (
              <div key={index} className="border-t border-b h-14 flex justify-between items-center">
                <div className="bg-black w-10 h-10 rounded-full"></div>
                <h1>{driver.name}</h1>
                <div className={`border-2 rounded-3xl px-2 font-semibold ${
                  driver.status === "Pending" ? "bg-orange-100 border-orange-200" : "bg-green-100 border-green-200"
                }`}>
                  <h1 className="text-sm">{driver.status}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🚕 Manage Vehicle Categories */}
        <div className="border w-[30vw] h-[31vw] p-5 shadow-md bg-white">
          <h1 className="font-semibold text-lg mb-3 text-center">Manage Vehicle Categories</h1>

          {/* Car Type Dropdown */}
          <label className="block text-sm font-medium">Car Type</label>
          <select className="w-full border p-2 rounded-md mt-1" value={selectedCarType} onChange={(e) => setSelectedCarType(e.target.value)}>
            <option value="">Select Car Type</option>
            {carTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          {/* Add New Car Type */}
          <div className="flex mt-2 gap-2">
            <input type="text" className="border p-2 rounded-md flex-1" placeholder="Add new car type" value={newCarType} onChange={(e) => setNewCarType(e.target.value)} />
            <button className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors" onClick={addCarType}>
              <Plus />
            </button>
          </div>

         {/* 🚗 Vehicle Category Form */}
{selectedCarType && (
  <div className="mt-4 space-y-3">
    
    {/* Vehicle Model */}
    <label className="block text-sm font-medium">Vehicle Model</label>
    <input
      type="text"
      className="w-full border p-2 rounded-md"
      placeholder="Enter Model"
      value={vehicleModel}
      onChange={(e) => setVehicleModel(e.target.value)}
    />

    {/* Number of Seats */}
    <label className="block text-sm font-medium">No. of Seats</label>
    <input
      type="number"
      className="w-full border p-2 rounded-md"
      placeholder="Enter Seats"
      value={seats}
      onChange={(e) => setSeats(e.target.value)}
      min="1"
    />

    {/* Luggage Type */}
    <label className="block text-sm font-medium">Luggage Type</label>
    <select
      className="w-full border p-2 rounded-md"
      value={luggage}
      onChange={(e) => setLuggage(e.target.value)}
    >
      <option value="">Select Luggage Type</option>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
    </select>

    {/* Price Per Km */}
    <label className="block text-sm font-medium">Price Per Km ($)</label>
    <input
      type="number"
      className="w-full border p-2 rounded-md"
      placeholder="Enter Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      min="0"
    />

    {/* Submit Button */}
    <button
      className="bg-blue-600 text-white p-2 rounded-md w-full mt-3 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      onClick={handleAddCategory}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="animate-pulse">Creating...</span>
      ) : (
        <>
          <Check size={18} /> Add Vehicle Category
        </>
      )}
    </button>

  </div>
)}

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Dashboard;
