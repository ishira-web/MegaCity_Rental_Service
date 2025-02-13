import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/public/images/Logo.svg';
import { User } from 'lucide-react';
// import { useAuth } from '../Pages/Login/AuthContext';

function NavbarUser() {
  // const { user, logout } = useAuth();
  // const [menuOpen, setMenuOpen] = useState(false);
  // const navigate = useNavigate();

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  // const handleLogout = () => {
  //   logout();
  //   setMenuOpen(false);
  // };

  // const handleProfileNavigation = () => {
  //   if (user) {
  //     if (user.role === 'vehical') {
  //       navigate('/driver-profile');
  //     } else {
  //       navigate('/user-profile');
  //     }
  //   }
  //   setMenuOpen(false);
  // };

  return (
    <div className='flex justify-between bg-white text-black items-center py-6 px-8 md:scroll-px-32 border-b-2 fixed top-0 left-0 w-full z-50'>
      <a href="#Home">
        <img src={Logo} alt="logo" className='w-[9rem]' />
      </a>
      <ul className='hidden xl:flex items-center gap-12 font-walsheim text-base'>
        <li className='cursor-pointer p-3 hover:underline'><Link to="/">Home</Link></li>
        <li className='cursor-pointer p-3 hover:underline'><Link to="/ride">Ride</Link></li>
        <li className='cursor-pointer p-3 hover:underline'><Link to="/about">About Us</Link></li>
        <li className='cursor-pointer p-3 hover:underline'>Safety</li>
      </ul>
      <div className='relative'>
        {user ? (
          <div className='flex items-center cursor-pointer' onClick={toggleMenu}>
            <div className='flex items-center bg-gray-400 px-3 py-2 w-12 h-12 rounded-full justify-center text-white text-lg font-semibold'>
              {user.username[0].toUpperCase()}
            </div>
          </div>
        ) : (
          <Link to='/login'>
            <div className='flex items-center bg-gray-400 px-3 py-2 w-12 h-12 gap-5 rounded-full cursor-pointer'>
              <User className='text-white' size={24} />
            </div>
          </Link>
        )}
        {menuOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50'>
            <button onClick={handleProfileNavigation} className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200'>View My Profile</button>
            <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200'>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarUser;
