import React, { useEffect, useRef } from 'react';
import { Plane, CarFront, Milestone, Earth } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Safety() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featureRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    featureRefs.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: feature,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-white flex flex-col justify-center items-center gap-36"
    >
      <h1
        ref={headingRef}
        className="text-3xl font-walsheim font-semibold"
      >
        Why Would You Choose Us?
      </h1>
      <div className="flex flex-row gap-52">
        <div className="flex flex-col gap-36">
          {/* Feature 1 */}
          <div
            className="flex flex-row justify-center items-center gap-10"
            ref={(el) => (featureRefs.current[0] = el)}
          >
            <div className="border-2 border-blue-500 p-7 rounded-lg">
              <Plane className="text-blue-500" />
            </div>
            <div className="flex flex-col w-[20vw] font-walsheim gap-3">
              <h1 className="text-lg text-blue-500">Airport Transfers</h1>
              <p className="text-base">
                Need to come to Galle from the Airport or heading from Galle to
                the Airport. No worries, we offer the best rates with a
                professional service. Give us a call.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div
            className="flex flex-row justify-center items-center gap-10"
            ref={(el) => (featureRefs.current[1] = el)}
          >
            <div className="border-2 border-blue-500 p-7 rounded-lg">
              <CarFront className="text-blue-500" />
            </div>
            <div className="flex flex-col w-[20vw] font-walsheim gap-3">
              <h1 className="text-lg text-blue-500">
                Pick Ups/Drop Offs to Anywhere
              </h1>
              <p className="text-base">
                Your next destination is Galle and you want a ride here, Or
                looking for a taxi to get to your next destination from Galle.
                Great, we got you covered.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-36">
          {/* Feature 3 */}
          <div
            className="flex flex-row justify-center items-center gap-10"
            ref={(el) => (featureRefs.current[2] = el)}
          >
            <div className="border-2 border-blue-500 p-7 rounded-lg">
              <Milestone className="text-blue-500" />
            </div>
            <div className="flex flex-col w-[20vw] font-walsheim gap-3">
              <h1 className="text-lg text-blue-500">
                Taxi Service within Sri Lanka
              </h1>
              <p className="text-base">
                If you’re thinking about how to sort out your transport while
                you are at Galle, you can give us a call. We will take you
                anywhere in Galle.
              </p>
            </div>
          </div>

          <div
            className="flex flex-row justify-center items-center gap-10"
            ref={(el) => (featureRefs.current[3] = el)}
          >
            <div className="border-2 border-blue-500 p-7 rounded-lg">
              <Earth className="text-blue-500" />
            </div>
            <div className="flex flex-col w-[20vw] font-walsheim gap-3">
              <h1 className="text-lg text-blue-500">Day Tours</h1>
              <p className="text-base">
                We offer a range of day tours, so you won’t miss anything on
                your trip. Our professional and experienced guides will make
                your trip an awesome one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Safety;
