import React, { useEffect } from 'react';
import { UserPlus, Car, Clock, CheckCircle } from 'lucide-react'; // Import Lucid Icons
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Ride2() {
  useEffect(() => {
    gsap.fromTo('.step', 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.step', start: 'top 80%', end: 'bottom 30%', scrub: true } });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center font-walsheim items-center px-5 py-10">
      <h1 className="text-4xl text-center font-bold mb-12">Your Booking Journey</h1>
      
      <div className='flex flex-col gap-10'>
      <div className='flex-row flex gap-20'>
              {/* Step 1 - Create an Account */}
      <div className="step mb-12 flex flex-col items-center gap-6">
        <UserPlus className="text-blue-500" size={60} />
        <h2 className="text-2xl font-semibold">Step 1: Create an Account</h2>
        <p className="text-start text-lg max-w-xl">
          To get started, you'll need to create an account. Simply provide your name, email, and phone number, and we'll send you a verification link to your email. Once verified, you’ll be able to log in and book your ride.
        </p>
      </div>

      {/* Step 2 - Book Your Vehicle */}
      <div className="step mb-12 flex flex-col items-center gap-6">
        <Car className="text-green-500" size={60} />
        <h2 className="text-2xl font-semibold">Step 2: Book a Vehicle</h2>
        <p className="text-start text-lg max-w-xl">
          After logging in, browse through our available vehicles and select the one that best suits your needs. You can filter by type, size, and comfort level. Select your pick-up location and desired time.
        </p>
      </div>

      </div>
      
     <div className='flex-row flex gap-20'>
                 {/* Step 3 - Wait for Confirmation */}
      <div className="step mb-12 flex flex-col items-center gap-6">
        <Clock className="text-yellow-500" size={60} />
        <h2 className="text-2xl font-semibold">Step 3: Wait for Confirmation</h2>
        <p className="text-start text-lg max-w-xl">
          Once you've made your selection, click on "Confirm Booking" and wait for a brief moment while we process your request. You’ll receive a booking confirmation with details about your ride and driver.
        </p>
      </div>

      {/* Step 4 - Ride Confirmation */}
      <div className="step mb-12 flex flex-col items-center gap-6">
        <CheckCircle className="text-teal-500" size={60} />
        <h2 className="text-2xl font-semibold">Step 4: Ride Confirmed!</h2>
        <p className="text-start text-lg max-w-xl">
          Congratulations! Your ride is now confirmed. You will receive a notification with the driver's details and your pick-up time. Sit back, relax, and enjoy the journey!
        </p>
      </div>
     </div>

      </div>



    </div>
  );
}

export default Ride2;
