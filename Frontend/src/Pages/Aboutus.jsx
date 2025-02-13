import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Banner from '/public/images/gurrrl.webp';

function Aboutus() {
  const missionTextRef = useRef(null);
  const missionDetailsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    timeline
      .fromTo(
        missionTextRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0 }
      )
      .fromTo(
        missionDetailsRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0 },
        '-=0.5' // Overlap the animation slightly
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 },
        '-=0.5'
      );
  }, []);

  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-row justify-center items-center min-h-[25vw] mt-18 font-walsheim text-black">
        <div
          className="w-[30vw] text-4xl font-extralight"
          ref={missionTextRef}
        >
          <p>Our Mission: Driving Colombo Forward with Excellence</p>
        </div>
        <div className="w-[30vw]" ref={missionDetailsRef}>
          To provide safe, reliable, and affordable transportation solutions across Colombo, ensuring exceptional customer satisfaction through modern technology, professional drivers, and a commitment to sustainability and community connectivity.
        </div>
      </div>
      <div className="w-full min-h-[vw]">
        <img
          src={Banner}
          alt=""
          className="h-[22vw] object-cover w-full"
          ref={imageRef}
        />
      </div>
    </div>
  );
}

export default Aboutus;
