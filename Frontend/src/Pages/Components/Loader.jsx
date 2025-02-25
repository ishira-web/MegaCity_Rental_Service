import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Lottie from "lottie-react";
import carAnimation from "/src/assets/Video/loader.json"; // Import your Lottie animation

export default function Loader() {
  const [loading, setLoading] = useState(0);
  const carRef = useRef(null);

  useEffect(() => {
    let loadInterval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(loadInterval);
  }, []);

  useEffect(() => {
    gsap.to(carRef.current, {
      x: "-120vw", // Move car from right to left
      duration: 10, // Adjust this to match loading time
      ease: "linear",
    });

    if (loading === 100) {
      gsap.to("#loader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.getElementById("loader").style.display = "none";
        },
      });
    }
  }, [loading]);

  return (
    <div id="loader" className="fixed font-simplon inset-0 flex flex-col items-center justify-center bg-yellow-600 text-white">
      <div className="relative w-full h-32 overflow-hidden">
        <div ref={carRef} className="absolute right-0">
          <Lottie animationData={carAnimation} className="w-44 h-44" />
        </div>
      </div>
      
      <p className="text-4xl font-bold mt-4"><span>Loading</span> {loading}%</p>
    </div>
  );
}
