import React, { useState, useEffect, useRef } from 'react';
import Logo from '/public/images/Logo.svg';
import { User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

function NavbarUser() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.out' });
    }
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between bg-white text-black items-center py-6 px-8 border-b-2 fixed top-0 left-0 w-full z-50">
      <a href="#Home">
        <img src={Logo} alt="logo" className="w-[9rem]" />
      </a>

      <ul className="hidden xl:flex items-center gap-12 font-walsheim text-base">
        <li className="cursor-pointer p-3 hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer p-3 hover:underline">
          <Link to="/ride">Ride</Link>
        </li>
        <li className="cursor-pointer p-3 hover:underline">
          <Link to="/about">About Us</Link>
        </li>
        <li className="cursor-pointer p-3 hover:underline">Blog</li>
      </ul>

      <div className="relative hidden xl:flex items-center">
        <button
          className="bg-yellow-200 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <User />
        </button>
        {userMenuOpen && (
          <div ref={userMenuRef} className="absolute right-0 mt-32 w-56 bg-white shadow-2xl rounded-lg p-2">
            <Link to="/user-profile" className="block  rounded-md px-4 text-center py-2 hover:bg-blue-500 text-black hover:text-white">View My Profile</Link>
            <button className="w-full text-center rounded-md px-4 py-2 hover:bg-red-600 text-black  hover:text-white ">Logout</button>
          </div>
        )}
      </div>

      <div className="xl:hidden cursor-pointer z-50" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      <div
        ref={menuRef}
        className="fixed top-0 left-0 bg-white h-screen w-[70vw] shadow-lg z-40 flex flex-col items-start justify-center px-10 transform -translate-x-full"
      >
        <ul className="flex flex-col gap-8 font-walsheim text-lg">
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>
            <Link to="/ride">Ride</Link>
          </li>
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>
            <Link to="/about">About Us</Link>
          </li>
          <li className="cursor-pointer" onClick={() => setMenuOpen(false)}>Safety</li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarUser;
