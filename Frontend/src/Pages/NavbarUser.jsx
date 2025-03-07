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

          {/* Popup Menu */}
          {isPopupOpen && (
            <div
              ref={profileMenuRef}
              className="absolute top-14 right-0 bg-white shadow-md rounded-md w-48 p-1 z-50"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
            >
              <ul>
                {userId.role === 'ROLE_DRIVER' ? (
                  <li>
                    <Link
                      to="/driver-profile/:id"
                      className="block px-4 py-2 text-black font-semibold hover:bg-slate-200"
                    >
                      Driver
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/user-profile/:id"
                      className="block px-4 py-2 text-black font-semibold hover:bg-slate-200"
                    >
                      Profile
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout} // Call the handleLogout function
                    className="block w-full text-left text-black font-semibold px-4 py-2 hover:bg-slate-200"
                  >
                    Log out
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





