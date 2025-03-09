import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const BookingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [pricePerKm, setPricePerKm] = useState(0);
  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [driver, setDriver] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [customerId, setCustomerId] = useState("");
  const userId = localStorage.getItem("userId");

  const GEOAPIFY_API_KEY = '460ea466ca2e404db2e0eb72820f109b'; // Replace with your Geoapify API key
  const sriLankaBounds = {
    lon1: 79.5,
    lat1: 5.9,
    lon2: 81.9,
    lat2: 9.9
  };



  // Fetch driver details
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/auth/driverByID/${id}`);
        if (response.status === 200 && response.data) {
          setDriver(response.data);
        } else {
          setError("No driver data found.");
        }
      } catch (error) {
        console.error('Error fetching driver:', error);
        if (error.code === 'ERR_NETWORK') {
          setError("Cannot connect to the server. Please check if the server is running.");
        } else {
          setError("Failed to fetch driver details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDriver();
  }, [id]);

  // Fetch price per km based on driver’s car model
  useEffect(() => {
    const fetchPricePerKm = async () => {
      if (!driver?.catModel) return;

      try {
        const response = await axios.get(`http://localhost:8080/auth/pricePerKm/${driver.catModel}`);
        setPricePerKm(parseFloat(response.data) || 0);
      } catch (error) {
        console.error('Error fetching price per km:', error);
        setError("Failed to fetch price per km. Please try again.");
      }
    };

    if (driver) fetchPricePerKm();
  }, [driver]);

  // Calculate fare based on distance and price per km
  useEffect(() => {
    if (distance && pricePerKm) {
      const numericDistance = parseFloat(distance) || 0;
      const numericPricePerKm = parseFloat(pricePerKm) || 0;
      const totalFare = (numericDistance * numericPricePerKm).toFixed(2);
      setFare(totalFare);
    } else {
      setFare("0.00");
    }
  }, [distance, pricePerKm]);

  // Fetch location suggestions
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
      setError("Failed to fetch location suggestions. Please try again.");
    }
  };

  const handleLocationSelect = (suggestion, type) => {
    const selectedLocation = suggestion.properties;
    if (type === 'pickup') {
      setPickup(selectedLocation.formatted);
      setPickupCoords([selectedLocation.lat, selectedLocation.lon]);
      setPickupSuggestions([]);
    } else {
      setDropoff(selectedLocation.formatted);
      setDropoffCoords([selectedLocation.lat, selectedLocation.lon]);
      setDropoffSuggestions([]);
    }
  };

  // Calculate route between pickup and dropoff
  const calculateRoute = useCallback(async () => {
    if (!pickupCoords || !dropoffCoords) return;

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${pickupCoords[0]},${pickupCoords[1]}|${dropoffCoords[0]},${dropoffCoords[1]}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const route = data.features[0];
        const distanceKm = route.properties.distance / 1000;
        const durationMinutes = route.properties.time / 60;
        const routeCoords = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);

        setDistance(`${distanceKm.toFixed(2)} km`);
        setDuration(`${Math.round(durationMinutes)} mins`);
        setRouteCoordinates(routeCoords);
      }
    } catch (err) {
      console.error("Error calculating route:", err);
      setError("Could not calculate route. Please try again.");
    }
  }, [pickupCoords, dropoffCoords]);

  useEffect(() => {
    calculateRoute();
  }, [calculateRoute]);

  // Debounced suggestion fetching for pickup and dropoff
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting with customerId:', userId);

    const now = new Date();
    const selectedDateTime = new Date(`${bookingDate}T${bookingTime}`);

    if (selectedDateTime < now) {
      setError("Cannot book for past date and time.");
      return;
    }

    if (!userId) {
      setError("Customer ID is missing. Please log in again.");
      return;
    }

    if (!name.trim() || !phone.trim() || !email.trim() || !pickup || !dropoff || !bookingDate || !bookingTime) {
      setError("Please fill in all required fields.");
      return;
    }

    if (paymentMethod === "card" && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
      setError("Please fill in all card details.");
      return;
    }

    const bookingData = {
      pickupLocation: pickup,
      dropLocation: dropoff,
      bookingDate,
      bookingTime,
      driverID: id,
      driverName: driver?.driverName,
      driverEmail: driver?.driverEmail,
      catType: driver?.catType,
      catModel: driver?.catModel,
      pricePerKm,
      fare,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      customerId: userId
    };

    console.log('Booking Data:', bookingData);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/auth/booking/create', bookingData);
      if (response.status == 200) {
        navigate('/reciept', { state: { bookingDetails: response.data } });
      } else {
       ""
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Error creating booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pinIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Ride</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Select Locations</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pickup Location</label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter pickup location"
            />
            {pickupSuggestions.length > 0 && (
              <ul className="mt-2 border rounded">
                {pickupSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleLocationSelect(suggestion, 'pickup')}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Dropoff Location</label>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter dropoff location"
            />
            {dropoffSuggestions.length > 0 && (
              <ul className="mt-2 border rounded">
                {dropoffSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleLocationSelect(suggestion, 'dropoff')}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="h-64">
            <MapContainer
              key={pickupCoords && dropoffCoords ? `${pickupCoords.join(',')}-${dropoffCoords.join(',')}` : 'default'}
              center={[7.8731, 80.7718]}
              zoom={8}
              className="h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {pickupCoords && (
                <Marker position={pickupCoords} icon={pinIcon}>
                  <Popup>Pickup Location</Popup>
                </Marker>
              )}
              {dropoffCoords && (
                <Marker position={dropoffCoords} icon={pinIcon}>
                  <Popup>Dropoff Location</Popup>
                </Marker>
              )}
              {routeCoordinates && (
                <Polyline positions={routeCoordinates} color="blue" />
              )}
            </MapContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Booking Details</h2>
          {driver && (
            <div className="mb-4">
              <p><strong>Driver Name:</strong> {driver.driverName}</p>
              <p><strong>Driver Email:</strong> {driver.driverEmail}</p>
              <p><strong>Car Type:</strong> {driver.catType}</p>
              <p><strong>Car Model:</strong> {driver.catModel}</p>
              <p><strong>Customer ID :</strong>{userId}</p>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Booking Date</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Booking Time</label>
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>
          {paymentMethod === "card" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Enter card number"
              />
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                value={cardDetails.expiryDate}
                onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="MM/YY"
              />
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="CVV"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Distance</label>
            <p>{distance || "Calculating..."}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration</label>
            <p>{duration || "Calculating..."}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fare</label>
            <p className='font-semibold'>Rs <span>: </span>{fare}</p>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;