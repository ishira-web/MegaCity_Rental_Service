import React, { useState, useEffect } from 'react';
import Hero from '../Pages/Hero';
import Navbar from '../Pages/Navbar';
import HeroSub from '../Pages/HeroSub';
import Service from '../Pages/Service';
import Safety from '../Pages/Safety';
import Footer from '../Pages/Footer';
import { Outlet } from 'react-router-dom';
import Faq from '../Pages/Faq';
import Loader from './Components/Loader';
 // Import the Loader component

function Layout() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 5000); // Matches the loader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isLoaded && <Loader />}
      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Your landing page content */}
        <Navbar />
        <Hero />
        <HeroSub />
        <Service />
        <Safety />
        <Faq />
        <Footer />
        <Outlet/>
      </div>
    </>
  );
}

export default Layout;