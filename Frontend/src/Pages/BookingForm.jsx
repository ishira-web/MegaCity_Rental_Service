import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
import { MapPinCheck, Clock, HandCoins } from 'lucide-react';
import gsap from "gsap";

const mapContainerStyle = {
  width: "100%",
  height: "60%",
};

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const options = {
  componentRestrictions: { country: "LK" },
};

const BookingForm = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [fare, setFare] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(".booking-form", { opacity: 0, y: 50, duration: 1 });
    gsap.from(".trip-details", { opacity: 0, y: 20, duration: 1, delay: 0.5 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff || !name || !email || !phone) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResponse(null);
    setDistance("");
    setDuration("");
    setFare("");
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCdDJ0cfdE_4FKmp1A0mj04HrIYKjv6z7M" libraries={["places"]}>
      <div className="flex flex-col font-walsheim md:flex-row w-full h-screen p-4 bg-gray-100">
        <div ref={formRef} className="booking-form w-full flex flex-col justify-center items-center gap-10 md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-simplon font-bold mb-4 text-center">Cab Booking Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
            <input type="tel" placeholder="Mobile Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" />
            <Autocomplete onLoad={(autocomplete) => (pickupRef.current = autocomplete)} options={options} onPlaceChanged={() => {
              if (pickupRef.current && pickupRef.current.getPlace()) {
                setPickup(pickupRef.current.getPlace().formatted_address);
              }
            }}>
              <input type="text" placeholder="Enter Pickup Location" value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full p-2 border rounded" />
            </Autocomplete>
            <Autocomplete onLoad={(autocomplete) => (dropoffRef.current = autocomplete)} options={options} onPlaceChanged={() => {
              if (dropoffRef.current && dropoffRef.current.getPlace()) {
                setDropoff(dropoffRef.current.getPlace().formatted_address);
              }
            }}>
              <input type="text" placeholder="Enter Drop-off Location" value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="w-full p-2 border rounded" />
            </Autocomplete>
            <div className="flex gap-4">
              <label>
                <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} /> Cash
              </label>
              <label>
                <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /> Card
              </label>
            </div>
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Expiry Date" className="w-full p-2 border rounded" />
                <input type="text" placeholder="CVV" className="w-full p-2 border rounded" />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Get Directions</button>
          </form>
        </div>
        <div className="w-full md:w-2/3 h-full p-4">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
            {pickup && dropoff && (
              <DirectionsService options={{ destination: dropoff, origin: pickup, travelMode: "DRIVING" }} callback={(result, status) => {
                if (status === "OK") {
                  setResponse(result);
                  const route = result.routes[0].legs[0];
                  setDistance(route.distance.text);
                  setDuration(route.duration.text);
                  setFare((parseFloat(route.distance.value) / 1000) * 100);
                  setLoading(false);
                }
              }} />
            )}
            {response && <DirectionsRenderer directions={response} />}
          </GoogleMap>
          {distance && duration && (
            <div className="trip-details mt-4 p-4 bg-blue-500 text-white rounded shadow">
              <h3 className="text-lg font-semibold">Trip Details</h3>
              <p><MapPinCheck /> Distance: {distance}</p>
              <p><Clock /> Estimated Time: {duration}</p>
              <p><HandCoins /> Estimated Fare: Rs.{fare.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default BookingForm;