import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the bar chart
const customerGrowthData = [
  { month: 'Jan', customers: 100 },
  { month: 'Feb', customers: 150 },
  { month: 'Mar', customers: 200 },
  { month: 'Apr', customers: 300 },
  { month: 'May', customers: 400 },
  { month: 'Jun', customers: 500 },
];

function Dashboard() {
  // Sample data for the cards
  const numberOfDrivers = 25;
  const numberOfBookings = 120;
  const numberOfCustomers = 300;

  return (
    <div className="bg-white min-h-[91vh] rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Drivers Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-2">Number of Drivers</h2>
          <p className="text-3xl font-bold text-blue-600">{numberOfDrivers}</p>
        </div>

        {/* Bookings Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-2">Number of Bookings</h2>
          <p className="text-3xl font-bold text-green-600">{numberOfBookings}</p>
        </div>

        {/* Customers Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-2">Number of Customers</h2>
          <p className="text-3xl font-bold text-purple-600">{numberOfCustomers}</p>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Growth of Customers</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={customerGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="customers" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='mt-10 text-center'><h1><span className='font-bold'>-</span> Maked Ishira with ❤️ -</h1></div>
    </div>
  );
}

export default Dashboard;