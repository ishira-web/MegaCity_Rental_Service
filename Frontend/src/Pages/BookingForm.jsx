import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPinCheck, Clock, HandCoins, CreditCard, Calendar, Car, User, MapPin, Phone, Mail, Info } from 'lucide-react';
import L from 'leaflet';

const BookingForm = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [fare, setFare] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [showCardPayment, setShowCardPayment] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [bookingDetails, setBookingDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  
  // New state for booking date and time
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  
  // Min date for the date picker (today's date in YYYY-MM-DD format)
  const today = new Date().toISOString().split('T')[0];

  const pricePerKm = 100;
  const GEOAPIFY_API_KEY = '460ea466ca2e404db2e0eb72820f109b';
  const sriLankaBounds = {
    lon1: 79.5,
    lat1: 5.9,
    lon2: 81.9,
    lat2: 9.9
  };

  // Random car details to show automatically
  const carTypes = ["Toyota Prius", "Honda Civic", "Toyota Corolla", "Suzuki Alto"];
  const carColors = ["White", "Black", "Silver", "Blue"];
  const drivers = ["Sanath", "Kumar", "Pradeep", "Nihal", "Jagath"];
  const carNumbers = ["CAB-1234", "WP-KE-2345", "SP-KF-9876", "CP-CAB-5432"];

  // Function to fetch available drivers
  const fetchAvailableDrivers = async () => {
    try {
      // Mock API call - in production, replace with actual endpoint
      // const response = await fetch('/api/drivers/available');
      // const data = await response.json();
      
      // For now, generate a random driver with details matching Driver.java model
      const mockDrivers = [
        {
          driverID: "DRV001",
          driverName: "Sanath Jayasuriya",
          driverAddress: "123 Galle Road, Colombo",
          driverPhone: "+94712345678",
          driverEmail: "sanath@cabservice.lk",
          driverStatues: "Available",
          currentLocation: "Colombo 7",
          catID: "CAT001",
          catType: "Sedan",
          driverNic: "821456789V",
          vehicalNumber: "WP-CAB-1234",
          catModel: "Toyota Prius 2022",
          noOfSeats: "4",
          acType: "Full AC",
          lagguageType: "Medium",
          carImageUrl: "https://example.com/car.jpg",
          imageUrl: "https://example.com/driver.jpg"
        },
        {
          driverID: "DRV002",
          driverName: "Kumar Sangakkara",
          driverAddress: "456 Kandy Road, Kandy",
          driverPhone: "+94723456789",
          driverEmail: "kumar@cabservice.lk",
          driverStatues: "Available",
          currentLocation: "Kandy",
          catID: "CAT002",
          catType: "SUV",
          driverNic: "791456789V",
          vehicalNumber: "CP-CAB-5678",
          catModel: "Honda CR-V 2021",
          noOfSeats: "6",
          acType: "Full AC",
          lagguageType: "Large",
          carImageUrl: "https://example.com/car2.jpg",
          imageUrl: "https://example.com/driver2.jpg"
        }
      ];
      
      // Return a random driver from the mock data
      return mockDrivers[Math.floor(Math.random() * mockDrivers.length)];
    } catch (err) {
      console.error("Error fetching drivers:", err);
      return null;
    }
  };

  const fetchSuggestions = async (input, type) => {
    if (input.length < 3) return;

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&filter=rect:${sriLankaBounds.lon1},${sriLankaBounds.lat1},${sriLankaBounds.lon2},${sriLankaBounds.lat2}&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();
      
      if (type === 'pickup') {
        setPickupSuggestions(data.features || []);
      } else {
        setDropoffSuggestions(data.features || []);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const calculateDistance = async (pickup, dropoff) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${pickup.lat},${pickup.lon}|${dropoff.lat},${dropoff.lon}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const route = data.features[0];
        const distanceKm = route.properties.distance / 1000;
        const durationMinutes = route.properties.time / 60;
        const routeCoords = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        
        setDistance(`${distanceKm.toFixed(2)} km`);
        setDuration(`${Math.round(durationMinutes)} mins`);
        const fareValue = (distanceKm * pricePerKm).toFixed(2);
        setFare(fareValue);
        setPickupCoords([pickup.lat, pickup.lon]);
        setDropoffCoords([dropoff.lat, dropoff.lon]);
        setRouteCoordinates(routeCoords);
        
        // Get driver details and generate booking details
        const driver = await fetchAvailableDrivers();
        setDriverDetails(driver);
        
        // Generate automatic booking details when route is calculated
        generateBookingDetails(fareValue, distanceKm, durationMinutes, driver);
      }
    } catch (err) {
      console.error("Error calculating distance:", err);
      setError("Could not calculate route");
    }
  };

  const generateBookingDetails = (fareValue, distanceKm, durationMinutes, driver) => {
    // Get scheduled booking time or use current time
    const scheduleTime = bookingDate && bookingTime ? 
      new Date(`${bookingDate}T${bookingTime}`) : 
      new Date();
    
    const details = {
      carType: driver ? driver.catModel : carTypes[Math.floor(Math.random() * carTypes.length)],
      carColor: driver ? (driver.catType === "Sedan" ? "White" : "Silver") : carColors[Math.floor(Math.random() * carColors.length)],
      carNumber: driver ? driver.vehicalNumber : carNumbers[Math.floor(Math.random() * carNumbers.length)],
      driverName: driver ? driver.driverName : drivers[Math.floor(Math.random() * drivers.length)],
      eta: `${Math.floor(Math.random() * 10) + 5} mins`,
      bookingDate: scheduleTime.toLocaleDateString(),
      bookingTime: scheduleTime.toLocaleTimeString(),
      status: "Confirmed",
      driverStatus: driver ? driver.driverStatues : "Available",
      estimatedArrival: new Date(scheduleTime.getTime() + 10 * 60000).toLocaleTimeString(),
      estimatedCompletion: new Date(scheduleTime.getTime() + (10 + durationMinutes) * 60000).toLocaleTimeString(),
      fare: fareValue,
      distance: distanceKm.toFixed(2),
      duration: Math.round(durationMinutes),
      acType: driver ? driver.acType : "Full AC",
      seats: driver ? driver.noOfSeats : "4",
      luggageType: driver ? driver.lagguageType : "Medium"
    };
    
    setBookingDetails(details);
  };

  const handlePickupSelect = (suggestion) => {
    const selectedLocation = suggestion.properties;
    setPickup(selectedLocation.formatted);
    setPickupCoords([selectedLocation.lat, selectedLocation.lon]);
    setPickupSuggestions([]);
  };

  const handleDropoffSelect = (suggestion) => {
    const selectedLocation = suggestion.properties;
    setDropoff(selectedLocation.formatted);
    setDropoffCoords([selectedLocation.lat, selectedLocation.lon]);
    setDropoffSuggestions([]);
  };

  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      calculateDistance(
        { lat: pickupCoords[0], lon: pickupCoords[1] },
        { lat: dropoffCoords[0], lon: dropoffCoords[1] }
      );
    }
  }, [pickupCoords, dropoffCoords]);

  useEffect(() => {
    // Update current date and time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickup || !dropoff || !name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!bookingDate || !bookingTime) {
      setError("Please select booking date and time.");
      return;
    }

    if (!bookingDetails) {
      setError("Please select valid locations to calculate trip details first.");
      return;
    }

    // Check if selected date/time is in the past
    const selectedDateTime = new Date(`${bookingDate}T${bookingTime}`);
    if (selectedDateTime < new Date()) {
      setError("Cannot book for past date and time. Please select a future time.");
      return;
    }

    const bookingData = {
      pickupLocation: pickup,
      dropLocation: dropoff,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      bookingDate: bookingDate,
      bookingTime: bookingTime,
      customerID: "123", // Replace with actual customer ID
      driverID: driverDetails ? driverDetails.driverID : "456",
      driverName: driverDetails ? driverDetails.driverName : bookingDetails.driverName,
      driverPhone: driverDetails ? driverDetails.driverPhone : "+94712345678",
      driverEmail: driverDetails ? driverDetails.driverEmail : "driver@example.com",
      driverNic: driverDetails ? driverDetails.driverNic : "123456789V",
      driverAddress: driverDetails ? driverDetails.driverAddress : "123 Main St, Colombo",
      carType: driverDetails ? driverDetails.catModel : bookingDetails.carType,
      carColor: bookingDetails.carColor,
      carNumber: driverDetails ? driverDetails.vehicalNumber : bookingDetails.carNumber,
      acType: driverDetails ? driverDetails.acType : bookingDetails.acType,
      noOfSeats: driverDetails ? driverDetails.noOfSeats : bookingDetails.seats,
      luggageType: driverDetails ? driverDetails.lagguageType : bookingDetails.luggageType,
      bookingStatus: bookingDetails.status,
      driverStatus: driverDetails ? driverDetails.driverStatues : bookingDetails.driverStatus,
      distance,
      duration,
      fare,
      paymentMethod,
      estimatedArrival: bookingDetails.estimatedArrival,
      estimatedCompletion: bookingDetails.estimatedCompletion
    };

    setLoading(true);
    try {
      // In a real application, this would be your API endpoint
      const response = await fetch('/auth/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const createdBooking = await response.json();
        navigate('/receipt', { state: { bookingDetails: createdBooking } });
      } else {
        setError("Booking creation failed");
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      // For demo purposes, simulate a successful booking
      setTimeout(() => {
        setLoading(false);
        alert("Booking created successfully! Redirecting to receipt page...");
        navigate('/receipt', { state: { bookingDetails: bookingData } });
      }, 2000);
    }
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
      setError("Please fill in all card details.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Payment successful! Thank you for booking with us.");
    }, 2000);
  };

  useEffect(() => {
    const pickupTimer = setTimeout(() => {
      if (pickup) fetchSuggestions(pickup, 'pickup');
    }, 300);

    return () => clearTimeout(pickupTimer);
  }, [pickup]);

  useEffect(() => {
    const dropoffTimer = setTimeout(() => {
      if (dropoff) fetchSuggestions(dropoff, 'dropoff');
    }, 300);

    return () => clearTimeout(dropoffTimer);
  }, [dropoff]);

  useEffect(() => {
    setShowCardPayment(paymentMethod === "card");
  }, [paymentMethod]);

  // Recalculate details when booking date/time changes
  useEffect(() => {
    if (bookingDetails && (bookingDate || bookingTime)) {
      const updatedDetails = {...bookingDetails};
      
      if (bookingDate && bookingTime) {
        const selectedDateTime = new Date(`${bookingDate}T${bookingTime}`);
        updatedDetails.bookingDate = selectedDateTime.toLocaleDateString();
        updatedDetails.bookingTime = selectedDateTime.toLocaleTimeString();
        updatedDetails.estimatedArrival = new Date(selectedDateTime.getTime() + 10 * 60000).toLocaleTimeString();
        updatedDetails.estimatedCompletion = new Date(selectedDateTime.getTime() + (10 + updatedDetails.duration) * 60000).toLocaleTimeString();
      }
      
      setBookingDetails(updatedDetails);
    }
  }, [bookingDate, bookingTime]);

  // Define the pin icon
  const pinIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  return (
    <div className="flex flex-col md:flex-row w-full h-screen p-4 bg-gray-100">
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg relative overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Cab Booking Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <input 
              type="text" 
              placeholder="Full Name *" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 border rounded mb-2" 
              required
            />
            <input 
              type="email" 
              placeholder="Email Address *" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2 border rounded mb-2" 
              required
            />
            <input 
              type="tel" 
              placeholder="Mobile Phone *" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full p-2 border rounded" 
              required
            />
          </div>
          
          {/* Location Information */}
          <div className="bg-green-50 p-3 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Trip Information</h3>
            <div className="relative mb-2">
              <input 
                type="text" 
                placeholder="Pickup Location *" 
                value={pickup} 
                onChange={(e) => setPickup(e.target.value)} 
                className="w-full p-2 border rounded" 
                required
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-y-auto">
                  {pickupSuggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      onClick={() => handlePickupSelect(suggestion)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {suggestion.properties.formatted}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative mb-2">
              <input 
                type="text" 
                placeholder="Drop-off Location *" 
                value={dropoff} 
                onChange={(e) => setDropoff(e.target.value)} 
                className="w-full p-2 border rounded" 
                required
              />
              {dropoffSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-y-auto">
                  {dropoffSuggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      onClick={() => handleDropoffSelect(suggestion)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {suggestion.properties.formatted}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Date and Time Selection */}
            <div className="flex space-x-2 mb-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Booking Date *</label>
                <input 
                  type="date" 
                  min={today}
                  value={bookingDate} 
                  onChange={(e) => setBookingDate(e.target.value)} 
                  className="w-full p-2 border rounded" 
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Booking Time *</label>
                <input 
                  type="time" 
                  value={bookingTime} 
                  onChange={(e) => setBookingTime(e.target.value)} 
                  className="w-full p-2 border rounded" 
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="bg-yellow-50 p-3 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Payment Method</h3>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  value="cash" 
                  checked={paymentMethod === "cash"} 
                  onChange={() => setPaymentMethod("cash")} 
                  className="mr-2"
                /> Cash
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === "card"} 
                  onChange={() => setPaymentMethod("card")} 
                  className="mr-2"
                /> Card
              </label>
            </div>

            {showCardPayment && (
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  value={cardDetails.cardNumber} 
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} 
                  className="w-full p-2 border rounded" 
                />
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Expiry Date (MM/YY)" 
                    value={cardDetails.expiryDate} 
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })} 
                    className="w-1/2 p-2 border rounded" 
                  />
                  <input 
                    type="text" 
                    placeholder="CVV" 
                    value={cardDetails.cvv} 
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} 
                    className="w-1/2 p-2 border rounded" 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleCardPayment} 
                  className="bg-green-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
                >
                  <CreditCard className="mr-2" />
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 font-medium">{error}</p>}
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Processing..." : (bookingDetails ? "Confirm Booking" : "Get Ride Details")}
          </button>
        </form>
      </div>
      
      <div className="w-full md:w-2/3 h-full p-4 flex flex-col">
        <MapContainer 
          center={[6.9271, 79.8612]} 
          zoom={8} 
          style={{ height: "400px", width: "100%" }}
          className="rounded-lg shadow-md"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {pickupCoords && (
            <Marker 
              position={pickupCoords} 
              icon={pinIcon}
            >
              <Popup>Pickup Location</Popup>
            </Marker>
          )}
          
          {dropoffCoords && (
            <Marker 
              position={dropoffCoords} 
              icon={pinIcon}
            >
              <Popup>Drop-off Location</Popup>
            </Marker>
          )}

          {routeCoordinates && (
            <Polyline 
              positions={routeCoordinates} 
              color="blue" 
              weight={5} 
              opacity={0.7}
            />
          )}
        </MapContainer>

        {/* Current Date and Time Display */}
        <div className="bg-gray-800 text-white p-3 rounded my-4 text-center flex items-center justify-center">
          <Calendar className="mr-2" />
          <span className="text-lg font-semibold">
            {currentDateTime.toLocaleDateString()} - {currentDateTime.toLocaleTimeString()}
          </span>
        </div>

        {/* Trip Details & Booking Information */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          {distance && duration && (
            <div className="p-4 bg-blue-600 text-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Trip Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <p className="flex items-center"><MapPinCheck className="mr-2" /> Distance: {distance}</p>
                <p className="flex items-center"><Clock className="mr-2" /> Estimated Time: {duration}</p>
                <p className="flex items-center"><HandCoins className="mr-2" /> Estimated Fare: Rs.{fare}</p>
                <p className="flex items-center"><CreditCard className="mr-2" /> Payment: {paymentMethod.toUpperCase()}</p>
              </div>
            </div>
          )}
          
          {bookingDetails && (
            <div className="p-4 bg-green-600 text-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <p className="flex items-center"><Car className="mr-2" /> Car: {bookingDetails.carColor} {bookingDetails.carType}</p>
                <p className="flex items-center"><User className="mr-2" /> Driver: {bookingDetails.driverName}</p>
                <p>Car Number: {bookingDetails.carNumber}</p>
                <p>Status: {bookingDetails.status}</p>
                <p>Booking Date: {bookingDetails.bookingDate}</p>
                <p>Booking Time: {bookingDetails.bookingTime}</p>
                <p>Estimated Arrival: {bookingDetails.estimatedArrival}</p>
                <p>Estimated Completion: {bookingDetails.estimatedCompletion}</p>
                <p>AC Type: {bookingDetails.acType}</p>
                <p>Seats: {bookingDetails.seats}</p>
              </div>
            </div>
          )}
          
          {driverDetails && (
            <div className="p-4 bg-indigo-600 text-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Driver Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <p className="flex items-center"><User className="mr-2" /> Name: {driverDetails.driverName}</p>
                <p className="flex items-center"><Phone className="mr-2" /> Phone: {driverDetails.driverPhone}</p>
                <p className="flex items-center"><Mail className="mr-2" /> Email: {driverDetails.driverEmail}</p>
                <p className="flex items-center"><MapPin className="mr-2" /> Address: {driverDetails.driverAddress}</p>
                <p className="flex items-center"><Info className="mr-2" /> NIC: {driverDetails.driverNic}</p>
                <p className="flex items-center"><MapPinCheck className="mr-2" /> Current Location: {driverDetails.currentLocation}</p>
                <p className="flex items-center"><Car className="mr-2" /> Car Model: {driverDetails.catModel}</p>
                <p>Vehicle Number: {driverDetails.vehicalNumber}</p>
                <p>Number of Seats: {driverDetails.noOfSeats}</p>
                <p>AC Type: {driverDetails.acType}</p>
                <p>Luggage Type: {driverDetails.lagguageType}</p>
                <p>Status: {driverDetails.driverStatues}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;