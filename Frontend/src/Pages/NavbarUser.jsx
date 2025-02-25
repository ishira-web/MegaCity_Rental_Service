import React, { useState, useEffect, useRef } from 'react';
import Logo from '/public/images/Logo.svg';
import { CarFront, Menu, X } from 'lucide-react'; // Icons
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

function NavbarUser() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.name) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.out' });
    }
  }, [menuOpen]);

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

      {/* Show Book Button if No User, Otherwise Show User Profile */}
      {user ? (
        <div className="hidden xl:flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-200 text-black font-bold rounded-full">
            {user.name.charAt(0).toUpperCase()}
          </div>
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
            <div className="w-12 h-12 flex items-center justify-center bg-yellow-200 text-black font-bold rounded-full text-xl">
              {user.name.charAt(0).toUpperCase()}
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
