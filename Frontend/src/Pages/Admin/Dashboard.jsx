import React, { useState, useEffect } from "react";
import { Ban, Plus, Check, User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Dashboard() {
  const [carTypes, setCarTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState("");
  const [newCarType, setNewCarType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [seats, setSeats] = useState("");
  const [luggage, setLuggage] = useState("");
  const [price, setPrice] = useState("");
  const [drivers, setDrivers] = useState([""]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  // Validation messages
  const [vehicleModelError, setVehicleModelError] = useState("");
  const [seatsError, setSeatsError] = useState("");
  const [luggageError, setLuggageError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [carTypeError, setCarTypeError] = useState("");

  // Fetch pending drivers
  useEffect(() => {
    const fetchPendingDrivers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/drivers/pending`);
        if (!response.ok) throw new Error("Failed to fetch pending drivers");
        const data = await response.json();

        // Check if new drivers are added compared to the previous state
        if (data.length > drivers.length) {
          const newDrivers = data.slice(drivers.length);
          newDrivers.forEach((driver) => showDriverNotification(driver));
        }

        setDrivers(data);
      } catch (error) {
        toast.error("Failed to load pending drivers");
        console.error("Error fetching pending drivers:", error);
      }
    };

    fetchPendingDrivers();

    // Poll for new pending drivers every 10 seconds
    const interval = setInterval(fetchPendingDrivers, 10000);

    return () => clearInterval(interval);
  }, [drivers]);
 
   //Fetch Revenue
  useEffect(() => {
    const fetchTotalFare = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/booking/totalFare");
        if (!response.ok) throw new Error("Failed to fetch total fare");
        const data = await response.json();
        setTotalRevenue(data.totalFare); // Adjust based on API response structure
      } catch (error) {
        toast.error("Failed to load total revenue");
        console.error("Error fetching total fare:", error);
      }
    };

    fetchTotalFare();

    // Poll for total revenue updates every 30 seconds
    const interval = setInterval(fetchTotalFare, 30000);

    return () => clearInterval(interval);
  }, []);






  // Fetch car types from API
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

  // Show notification when a new driver is added
  const showDriverNotification = (driver) => {
    toast.custom(
      (t) => (
        <div
          className={`bg-white p-3 shadow-md border-l-8 border-blue-800 rounded-md flex items-center gap-3 ${
            t.visible ? "animate-slide-in-right" : "animate-slide-out-right"
          }`}
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-semibold">{driver.driverName}</h1>
            <p className="text-sm text-gray-600 font-roboto font-semibold tracking-wide">
              You have a new driver! Check the pending list.
            </p>
          </div>
        </div>
      ),
      { position: "top-right", duration: 4000 }
    );
  };

  // Simulate new driver appearing after 5 seconds
  useEffect(() => {
    const newDriver = {};

    const timeout = setTimeout(() => {
      setDrivers((prev) => [...prev, newDriver]);
      showDriverNotification(newDriver);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  // Add a new car type to the dropdown
  const addCarType = () => {
    if (newCarType && !carTypes.includes(newCarType)) {
      setCarTypes([...carTypes, newCarType]);
      setNewCarType("");
    }
  };

  // Add new vehicle category
  const handleAddCategory = async () => {
    let isValid = true;

    // Validate selected car type
    if (!selectedCarType) {
      setCarTypeError("Please select a car type.");
      isValid = false;
    } else {
      setCarTypeError("");
    }

    // Validate vehicle model
    if (!vehicleModel) {
      setVehicleModelError("Please enter a vehicle model.");
      isValid = false;
    } else {
      setVehicleModelError("");
    }

    // Validate seats
    if (!seats) {
      setSeatsError("Please enter the number of seats.");
      isValid = false;
    } else if (seats < 1) {
      setSeatsError("Number of seats must be at least 1.");
      isValid = false;
    } else {
      setSeatsError("");
    }

    // Validate luggage type
    if (!luggage) {
      setLuggageError("Please select a luggage type.");
      isValid = false;
    } else {
      setLuggageError("");
    }

    // Validate price
    if (!price) {
      setPriceError("Please enter the price per KM.");
      isValid = false;
    } else if (price < 0) {
      setPriceError("Price per KM must be a positive number.");
      isValid = false;
    } else {
      setPriceError("");
    }

    // If any validation fails, stop submission
    if (!isValid) {
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
                <Link 
                  to={`/admin/pending/${driver.driverID}`} 
                  className="block"
                >
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                    View
                  </button>
                </Link>
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
          {carTypeError && <p className="text-red-500 text-sm">{carTypeError}</p>}

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
              <input
                type="text"
                className="w-full border p-2 rounded-md"
                placeholder="Vehicle Model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
              />
              {vehicleModelError && <p className="text-red-500 text-sm">{vehicleModelError}</p>}

              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="No. of Seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
              {seatsError && <p className="text-red-500 text-sm">{seatsError}</p>}

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
              {luggageError && <p className="text-red-500 text-sm">{luggageError}</p>}

              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="Price for KM"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {priceError && <p className="text-red-500 text-sm">{priceError}</p>}

              <button
                className="bg-blue-600 text-white p-2 rounded-md w-full mt-3 flex items-center justify-center gap-2"
                onClick={handleAddCategory}
                disabled={isSubmitting}
              >
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