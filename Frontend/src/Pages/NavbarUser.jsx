import React, { useState, useEffect, useRef } from 'react';
import Logo from '/public/images/Logo.svg';
import { CarFront, Menu, X, User, Settings, LogOut } from 'lucide-react'; // Icons
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../../src/Pages/Login/AuthContext';

function NavbarUser() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup menu
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const profileIconRef = useRef(null); // Ref for the profile icon
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role'); // Get role from localStorage

  // GSAP animation for mobile menu
  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.out' });
    }
  }, [menuOpen]);

  // Handle clicks outside the profile menu to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(e.target)
      ) {
        setIsPopupOpen(false); // Close the popup menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsPopupOpen(false); // Close the popup menu after logout
  };

  // Handle profile icon click
  const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsPopupOpen(!isPopupOpen); // Toggle popup menu
  };

  return (
    <div className="flex justify-between bg-white text-black items-center py-6 px-8 border-b-2 fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link to="/">
        <img src={Logo} alt="logo" className="w-[9rem]" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden xl:flex items-center gap-12 font-walsheim text-base">
        <li className="cursor-pointer p-3 hover:underline"><Link to="/">Home</Link></li>
        <li className="cursor-pointer p-3 hover:underline"><Link to="/ride">Ride</Link></li>
        <li className="cursor-pointer p-3 hover:underline"><Link to="/about">About Us</Link></li>
        <li className="cursor-pointer p-3 hover:underline"><Link to="/blog">Blog</Link></li>
      </ul>

      {/* Show User Profile if User is Logged In, Otherwise Show Login Button */}
      {user ? (
        <div className="hidden xl:flex items-center gap-4 relative">
          <div
            ref={profileIconRef} // Ref for the profile icon
            className="w-10 h-10 flex items-center justify-center bg-yellow-200 text-black font-bold rounded-full cursor-pointer"
            onClick={handleProfileClick}
          >
            {user.username?.charAt(0).toUpperCase() ?? 'U'}
          </div>

         {/* Profile Popup Menu */}
{isPopupOpen && (
  <div
    ref={profileMenuRef}
    className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-48 py-2 z-50 border border-gray-200"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Dropdown Arrow */}
    <div className="absolute -top-2 right-5 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>

    <ul className="space-y-1">
      {role === 'ROLE_DRIVER' ? (
        <li>
          <Link
            to={`/driver-profile/${userId}`}
            className="flex items-center px-4 py-2 text-gray-700 font-medium hover:bg-blue-50 rounded-md transition-all"
          >
            <User className="w-5 h-5 mr-2 text-blue-600" /> Driver Profile
          </Link>
        </li>
      ) : (
        <li>
          <Link
            to={`/user-profile/${userId}`}
            className="flex items-center px-4 py-2 text-gray-700 font-medium hover:bg-blue-50 rounded-md transition-all"
          >
            <User className="w-5 h-5 mr-2 text-blue-600" /> Customer Profile
          </Link>
        </li>
      )}
      <li>
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md transition-all"
        >
          <LogOut className="w-5 h-5 mr-2" /> Log out
        </button>
      </li>
    </ul>
  </div>
)}

        </div>
      ) : (
        <Link to="/login">
          <div className="hidden xl:flex items-center bg-yellow-200 px-3 py-2 gap-5 rounded-lg font-walsheim text-base cursor-pointer">
            <CarFront />
            <h1>Login</h1>
          </div>
        </Link>
      )}

      {/* Hamburger Menu for Mobile */}
      <div className="xl:hidden cursor-pointer z-50" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Mobile Navigation */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 bg-white h-screen w-[70vw] shadow-lg z-40 flex flex-col items-start justify-center px-10 transform -translate-x-full"
      >
        <ul className="flex flex-col gap-8 font-walsheim text-lg">
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}><Link to="/">Home</Link></li>
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}><Link to="/ride">Ride</Link></li>
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}><Link to="/about">About Us</Link></li>
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}><Link to="/blog">Blog</Link></li>
        </ul>

        {/* Show Profile Icon or Login */}
        {user ? (
          <div className="mt-10 flex items-center gap-5">
            <div
              className="w-12 h-12 flex items-center justify-center bg-yellow-200 text-black font-bold rounded-full text-xl cursor-pointer"
              onClick={handleProfileClick}
            >
              {user.username?.charAt(0).toUpperCase() ?? 'U'}
            </div>
          </div>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <div className="mt-10 flex items-center bg-yellow-200 px-3 py-2 gap-5 rounded-lg font-walsheim text-base cursor-pointer">
              <CarFront />
              <h1>Login</h1>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavbarUser;