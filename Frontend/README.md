# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh





    <div className="flex min-h-screen bg-gray-100 font-walsheim">
      <ToastContainer />

      {/* Left Side: Vehicle Details */}
      <div className="w-1/2 h-screen bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">{vehicle.vehicleModel}</h1>
          <img src={vehicle.imageUrl || '/default-car.jpg'} alt="Vehicle" className="mb-4 w-80 h-48 rounded-lg shadow-lg" />
          <p className="text-gray-600 text-center">Experience a smooth ride with {vehicle.vehicleModel}.</p>

          {/* Vehicle Details Card */}
          <div className="bg-blue-900 text-white w-full mt-6 px-6 py-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <CarFront />
                <h1>{vehicle.vehicleNumber}</h1>
              </div>
              <div className="flex items-center gap-3">
                <img src={Person} alt="Driver" className="w-9 h-9 rounded-full border-4 border-green-400" />
                <h1>{vehicle.driverName}</h1>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <p><Snowflake /> Air-Conditioned</p>
              <p><CarFront /> Comfortable Seats</p>
              <p><Banknote /> Affordable Rates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Booking Form */}
      <div className="w-1/2 flex justify-center items-center bg-blue-900 p-8 text-white shadow-md">
        <div className="w-[40vw] bg-white text-blue-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Booking Form</h2>
          <form className="space-y-4" onSubmit={handleBooking}>
            <label>Start Location:</label>
            <select className="w-full p-2 border rounded" value={startLocation} onChange={(e) => setStartLocation(e.target.value)}>
              <option>Select</option>
              {Object.keys(locations).map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>

            <label>End Location:</label>
            <select className="w-full p-2 border rounded" value={endLocation} onChange={(e) => setEndLocation(e.target.value)}>
              <option>Select</option>
              {Object.keys(locations).map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>

            <button className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md">Book Now</button>
          </form>
        </div>
      </div>
    </div>








   AIzaSyCdDJ0cfdE_4FKmp1A0mj04HrIYKjv6z7M