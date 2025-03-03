import React, { useState, useEffect } from "react";
import { Ban, Plus, Check, User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

function Dashboard() {
  const [carTypes, setCarTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState("");
  const [newCarType, setNewCarType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [seats, setSeats] = useState("");
  const [luggage, setLuggage] = useState("");
  const [price, setPrice] = useState("");
  const [drivers, setDrivers] = useState([]);


   // 👨‍✈️ Fetch pending drivers from API
   useEffect(() => {
    const fetchPendingDrivers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/drivers/pending`);
        if (!response.ok) throw new Error("Failed to fetch pending drivers");
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        toast.error("Failed to load pending drivers");
      }
    };
    fetchPendingDrivers();
  }, []); 

  // 🚗 Fetch car types from API
  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/getCarTypes");
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

  // 🔔 Show notification when a new driver is added
  const showDriverNotification = (driver) => {
    toast.custom(
      (t) => (
        <div
          className={`bg-white p-3 shadow-md border-l-4 border-blue-500 rounded-md flex items-center gap-3 ${
            t.visible ? "animate-slide-in-right" : "animate-slide-out-right"
          }`}
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-semibold">{driver.driverName}</h1>
            <p className="text-sm text-gray-600">
              You have a new driver! Check the pending list.
            </p>
          </div>
        </div>
      ),
      { position: "top-right", duration: 4000 }
    );
  };

  // 🆕 Simulate new driver appearing after 5 seconds
  useEffect(() => {
    const newDriver = {}

    const timeout = setTimeout(() => {
      setDrivers((prev) => [...prev, newDriver]);
      showDriverNotification(newDriver);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  // ➕ Add a new car type to the dropdown
  const addCarType = () => {
    if (newCarType && !carTypes.includes(newCarType)) {
      setCarTypes([...carTypes, newCarType]);
      setNewCarType("");
    }
  };

  // ✅ Add new vehicle category
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
      <Toaster />
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
      {/* 🚘 Driver Approval Section */}
      <div className="flex justify-between">
      <div className="w-[30vw] h-[32vw] bg-white p-5 overflow-y-auto">
        <h1 className="text-center font-semibold text-lg">Pending Drivers</h1>
        <div className="mt-6 space-y-4">
          {drivers.length > 0 ? (
            drivers.map((driver, index) => (
              <div key={index} className="border-t border-b h-14 flex justify-between items-center p-2">
                <img
                  src={driver.imageUrl}
                  alt={driver.driverName}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <h1 className="font-medium">{driver.driverName}</h1>
                <div className="border-2 rounded-3xl px-2 font-semibold bg-orange-100 border-orange-200">
                  <h1 className="text-sm">{driver.driverStatues}</h1>
                </div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md">View</button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No pending drivers</p>
          )}
        </div>
      </div>

        {/* 🚕 Manage Vehicle Categories */}
        <div className="border w-[30vw] h-[31vw] p-5 shadow-md bg-white">
          <h1 className="font-semibold text-lg mb-3 text-center">
            Manage Vehicle Categories
          </h1>

          {/* Car Type Dropdown */}
          <label className="block text-sm font-medium">Car Type</label>
          <select
            className="w-full border p-2 rounded-md mt-1"
            value={selectedCarType}
            onChange={(e) => setSelectedCarType(e.target.value)}
          >
            <option value="">Select Car Type</option>
            {carTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Add New Car Type */}
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              className="border p-2 rounded-md flex-1"
              placeholder="Add new car type"
              value={newCarType}
              onChange={(e) => setNewCarType(e.target.value)}
            />
            <button
              className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={addCarType}
            >
              <Plus />
            </button>
          </div>

          {/* 🚗 Vehicle Category Form */}
          {selectedCarType && (
            <div className="mt-4 space-y-3">
              <input type="text" className="w-full border p-2 rounded-md" placeholder="Vehicle Model" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
              <input type="number" className="w-full border p-2 rounded-md" placeholder="No. of Seats" value={seats} onChange={(e) => setSeats(e.target.value)} />
              <select className="w-full border p-2 rounded-md" value={luggage} onChange={(e) => setLuggage(e.target.value)}>
                <option value="">Select Luggage Type</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <button className="bg-blue-600 text-white p-2 rounded-md w-full mt-3 flex items-center justify-center gap-2" onClick={handleAddCategory} disabled={isSubmitting}>
                <Check size={18} /> Add Vehicle Category
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
