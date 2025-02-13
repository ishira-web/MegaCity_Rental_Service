import { useState, useEffect, useRef } from "react";
import { MapPin, User, Mail, Phone, Car, DollarSign } from "lucide-react";

const BookingForm = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tripDetails, setTripDetails] = useState({
    distance: "",
    driver: "",
    car: "",
    driverEmail: "",
    price: "",
  });

  const autoCompleteRef = useRef(null);

  // Simulating the process of calculating the trip details
  const fetchTripDetails = (pickup, drop) => {
    // Example: mock trip details based on the pickup and drop locations
    if (pickup && drop) {
      setTripDetails({
        distance: "15km",
        driver: "John Doe",
        car: "AB-1234",
        driverEmail: "john@example.com",
        price: "$25.00",
      });
    }
  };

  useEffect(() => {
    // Function to load the Google Maps API script if it isn't already loaded
    const loadScript = (url) => {
      if (!document.querySelector(`script[src="${url}"]`)) {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          initializeAutocomplete(); // Initialize after the script is loaded
        };
      }
    };

    loadScript(`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`);
  }, []);

  const initializeAutocomplete = () => {
    if (window.google) {
      const options = { types: ["geocode"] };

      // Pickup location autocomplete
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(document.getElementById("pickup"), options);
      autoCompleteRef.current.addListener("place_changed", () => {
        const place = autoCompleteRef.current.getPlace();
        setPickup(place.formatted_address);
        fetchTripDetails(place.formatted_address, drop); // Update trip details on pickup change
      });

      // Drop location autocomplete
      const dropRef = new window.google.maps.places.Autocomplete(document.getElementById("drop"), options);
      dropRef.addListener("place_changed", () => {
        const place = dropRef.getPlace();
        setDrop(place.formatted_address);
        fetchTripDetails(pickup, place.formatted_address); // Update trip details on drop change
      });
    }
  };

  return (
    <div className="flex max-w-4xl mx-auto mt-10 gap-6 p-6 shadow-lg rounded-lg border border-gray-200 bg-white">
      {/* Left Side - Booking Form */}
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-semibold">Book a Ride</h2>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            id="pickup"
            type="text"
            placeholder="Pickup Location"
            className="pl-10 w-full p-2 border rounded-lg"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            id="drop"
            type="text"
            placeholder="Drop Location"
            className="pl-10 w-full p-2 border rounded-lg"
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Full Name"
            className="pl-10 w-full p-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="pl-10 w-full p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="tel"
            placeholder="Phone Number"
            className="pl-10 w-full p-2 border rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Right Side - Trip Details */}
      <div className="flex-1 space-y-4 p-4 border-l">
        <h2 className="text-xl font-semibold">Trip Details</h2>
        <p className="flex items-center gap-2"><Car size={20} /> Distance: {tripDetails.distance}</p>
        <p className="flex items-center gap-2"><User size={20} /> Driver: {tripDetails.driver}</p>
        <p className="flex items-center gap-2"><Car size={20} /> Car Number: {tripDetails.car}</p>
        <p className="flex items-center gap-2"><Mail size={20} /> Driver Email: {tripDetails.driverEmail}</p>
        <p className="flex items-center gap-2 text-lg font-bold"><DollarSign size={20} /> Total Price: {tripDetails.price}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default BookingForm;
