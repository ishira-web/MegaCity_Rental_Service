import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { House, ShoppingBag, Users, User, Car } from 'lucide-react';
import Dashboard from './Dashboard';
import Driver from './Driver';
import Customer from './Customer';
import Admins from './Admins';
import Bookings from './Bookings';
import Category from './Category';
import PendingDriver from './PendingDriver';

function AdminHome() {
  const [selected, setSelected] = useState('');
  const [pageTitle, setPageTitle] = useState('Dashboard');

  const handleSelect = (link, title) => {
    setSelected(link);
    setPageTitle(title); // Update the page title based on the link selected
  };

  return (
    <div className="w-full min-h-screen bg-white font-simplon flex">
      {/* Left Sidebar */}
      <div className="w-[250px] h-auto bg-[#344955] rounded-l-[16px] flex flex-col items-center py-6 text-white shadow-lg">
        <h1 className="text-[26px] mb-8 text-center">Admin Dashboard</h1>
        <div className="w-full flex flex-col items-center gap-12">
          <Link
            to="/admin/dashboard"
            className={`sidebar-link ${selected === 'dashboard' ? 'bg-[#2C3E50] py-4 px-6' : 'hover:bg-[#2C3E50]  py-4 px-6 rounded-md'}`}
            onClick={() => handleSelect('dashboard', 'Dashboard')}
          >
            <div className="flex items-center gap-6">
              <House size={24} />
              <span className="text-lg">Home</span>
            </div>
          </Link>
          <Link
            to="/admin/bookings"
            className={`sidebar-link ${selected === 'orders' ? 'bg-[#2C3E50] py-4 px-6' : 'hover:bg-[#2C3E50] py-4 px-6 rounded-md'}`}
            onClick={() => handleSelect('orders', 'Bookings')}
          >
            <div className="flex items-center gap-6">
              <ShoppingBag size={24} />
              <span className="text-lg">Bookings</span>
            </div>
          </Link>
          <Link
            to="/admin/customers"
            className={`sidebar-link ${selected === 'customers' ? 'bg-[#2C3E50] py-4 px-6' : 'hover:bg-[#2C3E50] py-4 px-6 rounded-md'}`}
            onClick={() => handleSelect('customers', 'Customers')}
          >
            <div className="flex items-center gap-6">
              <Users size={24} />
              <span className="text-lg">Customers</span>
            </div>
          </Link>
          <Link
            to="/admin/driver"
            className={`sidebar-link ${selected === 'driver' ? 'bg-[#2C3E50] py-4 px-6' : 'hover:bg-[#2C3E50] py-4 px-6 rounded-md'}`}
            onClick={() => handleSelect('driver', 'Drivers')}
          >
            <div className="flex items-center gap-6">
              <Car size={24} />
              <span className="text-lg">Drivers</span>
            </div>
          </Link>
          <Link
            to="/admin/admins"
            className={`sidebar-link ${selected === 'admins' ? 'bg-[#2C3E50] py-4 px-6' : 'hover:bg-[#2C3E50] py-4 px-6 rounded-md'}`}
            onClick={() => handleSelect('admins', 'Admins')}
          >
            <div className="flex items-center gap-6">
              <User size={24} />
              <span className="text-lg">Admins</span>
            </div>
          </Link>

          <Link
            to="/admin/category"
            className={`sidebar-link ${selected === 'category' ? 'bg-[#2C3E50] py-4 px-6' : 'hover:bg-[#2C3E50] py-4 px-6 rounded-md'}`}
            onClick={() => handleSelect('category', 'Category')}
          >
            <div className="flex items-center gap-6">
              <User size={24} />
              <span className="text-lg">Category</span>
            </div>
          </Link>
          

          <div>
            <button className='bg-red-500 text-white px-5 rounded-md py-3'>Logout</button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full  flex flex-col">
        {/* Top Bar */}
        <div className="w-full h-[70px] bg-[#344955] flex items-center justify-between px-8 text-white shadow-lg">
          <h1 className="text-white text-[20px]">{pageTitle}</h1>
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">Admin</span>
            <div className="w-[40px] h-[40px] bg-[#2C3E50] rounded-full flex items-center justify-center text-white">
              {/* Placeholder for Admin Profile Image */}
              <span>A</span>
            </div>
          </div>
        </div>

        {/* Content Display */}
        <div className="w-full h-[calc(100vh-150px)] bg-[#FBFCFC] shadow-lg mt-4 rounded-[16px]">
          <Routes path="/*">
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings/>} />
            <Route path="/customers" element={<Customer/>} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/admins" element={<Admins/>} />
            <Route path='/category' element = {<Category/>}/>
            <Route path='/pending/:driverID' element = {<PendingDriver/>}/>
            <Route path="/*" element={<Dashboard/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
