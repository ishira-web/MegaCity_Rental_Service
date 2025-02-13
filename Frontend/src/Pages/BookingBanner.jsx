import React from 'react';
import Photo from '../assets/Car/name 1.svg';
import BG from '../assets/bg.webp';
import { MoveRight } from 'lucide-react';

function BookingBanner() {
  return (
    <div
      className="bg-blue-950   min-h-screen flex flex-row gap-40  justify-between px-[15vw] py-10 items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className=" flex  flex-col gap-12 font-walsheim text-white rounded-md">
        <h1 className="text-2xl font-bold mb-4 uppercase">Get Started Now!</h1>
        <p className="text-lg">Click the "Book a Ride" button below to reserve your ride in seconds.
        Need assistance? Call us or email us.</p>
        <div className="flex  gap-5">
            <div className="border-2 w-8 h-8 flex justify-center items-center border-white rounded-full">
              <MoveRight className="w-5 h-5" />
            </div>
            <h1 className="font-walsheim text-white text-lg font-medium">
              Book a Ride
            </h1>
          </div>
      </div>
      <img src={Photo} alt="Logo" className="w-[35vw] ml-8" />
    </div>
  );
}

export default BookingBanner;
