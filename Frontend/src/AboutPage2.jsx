import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Banner2 from '/public/images/spotal.webp';

function AboutPage2() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    timeline
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 }
      )
      .fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0 },
        '-=0.5'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 },
        '-=0.5'
      );
  }, []);

  return (
    <div className="min-h-[20vw] relative">
      <div
        className="absolute flex flex-col justify-center items-start text-white ml-[30vw] mt-[10vw] gap-10 leading-loose z-10"
      >
        <div className="font-walsheim text-6xl" ref={titleRef}>
          <h1>Starting at mile one</h1>
        </div>
        <div className="w-[20vw] text-xl" ref={textRef}>
          <p>
            We started on this journey over a decade ago. Every mile we’ve driven on every road we’ve
            traveled has led us to where we are today. And we’re in it for the long haul — we’ve only just begun.
          </p>
        </div>
      </div>
      <img
        src={Banner2}
        alt=""
        className="object-cover w-full h-[35vw] z-0"
        ref={imageRef}
      />
    </div>
  );
}

export default AboutPage2;
