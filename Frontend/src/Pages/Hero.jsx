import React, { useEffect, useRef } from 'react';
import { MoveRight } from 'lucide-react';
import { gsap } from 'gsap';
import TaxiVideo from '../assets/Video/videobg.mp4';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const textElements = textRef.current.querySelectorAll('h1, div');
    const videoElement = videoRef.current;

    // Landing animation for text
    gsap.fromTo(
      textElements,
      { opacity: 0, y: 50 }, // Start hidden and slightly shifted down
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.3, // Stagger effect for a sequential animation
      }
    );

    // Landing animation for the video
    gsap.fromTo(
      videoElement,
      { scale: 1.2, opacity: 0 }, // Start zoomed in and hidden
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1, // Start after the text animations
      }
    );
  }, []);

  return (
    <div
      ref={heroRef}
      className="w-full h-screen flex flex-col mt-20"
    >
      {/* Text Section */}
      <div
        ref={textRef}
        className="w-full h-[40vh] flex flex-col lg:flex-row justify-center items-center bg-white lg:gap-[10rem] px-5 lg:px-0 text-center lg:text-left"
      >
        <h1 className="font-walsheim text-[#23233C] text-4xl lg:text-5xl font-medium leading-tight">
          Ride with Confidence,
          <br /> Comfort,
          <br /> and Convenience
        </h1>
        <div className="flex flex-col gap-5 mt-5 lg:mt-0">
          <h1 className="font-walsheim text-[#23233C] text-base lg:text-lg font-medium">
            From quick errands to long journeys, experience comfort,
            <br className="hidden lg:block" /> affordability, and top-notch service every time you ride
            with us
          </h1>
          <div className="flex gap-3 lg:gap-5 justify-center lg:justify-start">
            <div className="border-2 w-8 h-8 flex justify-center items-center border-[#23233C] rounded-full">
              <MoveRight className="w-5 h-5" />
            </div>
            <h1 className="font-walsheim text-[#23233C] text-base lg:text-lg font-medium">
              Book a Ride
            </h1>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div
        ref={videoRef}
        className="bg-black w-full h-[60vh] relative overflow-hidden  "
      >
        <div className="w-full h-full  overflow-hidden">
          <video
            className="w-full h-full object-cover  "
            src={TaxiVideo}
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
