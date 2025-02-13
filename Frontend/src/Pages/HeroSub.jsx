import React, { useEffect, useRef } from 'react';
import BackCar from '/public/images/car2.svg';
import { MoveRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSub = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const textElements = textRef.current.querySelectorAll('h1, div');
    const imageElement = imageRef.current;

    // Animate text elements when scrolling into view
    gsap.fromTo(
      textElements,
      { opacity: 0, y: 50 }, // Start hidden and below
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // Start animation when 80% of the section is visible
        },
      }
    );

    // Animate image when scrolling into view
    gsap.fromTo(
      imageElement,
      { opacity: 0, x: 100 }, // Start hidden and to the right
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // Start animation when 80% of the section is visible
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-white flex flex-col justify-center items-center px-5 lg:px-20"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Text Section */}
        <div ref={textRef} className="flex flex-col gap-8 lg:gap-16 text-center lg:text-left">
          <h1 className="font-walsheim text-gray-400 text-3xl lg:text-4xl font-semibold uppercase">
            Mega <span className="font-walsheim text-black">City</span>
          </h1>
          <h1 className="font-walsheim font-semibold text-4xl lg:text-5xl bg-gradient-to-l from-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Meet with Our Professional Drivers
          </h1>
          <h1 className="font-walsheim font-medium text-lg lg:text-2xl">
            From quick errands to long journeys, experience comfort,
            <br className="hidden lg:block" /> affordability, and top-notch service
            <br className="hidden lg:block" />
            every time you ride with us.
          </h1>
          <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-5">
            <div className="border-2 w-8 h-8 flex justify-center items-center border-[#23233C] rounded-full">
              <MoveRight className="w-5 h-5" />
            </div>
            <h1 className="font-walsheim text-[#23233C] text-base lg:text-lg font-medium">
              Book a Ride
            </h1>
          </div>
        </div>

        {/* Image Section */}
        <div ref={imageRef} className="w-full lg:w-auto">
          <img src={BackCar} alt="Car Background" className="w-full max-w-sm lg:max-w-none" />
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-b-2 w-full lg:w-[80vw] mt-10"></div>
    </div>
  );
};

export default HeroSub;
