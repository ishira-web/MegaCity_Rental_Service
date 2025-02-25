import { useEffect, useState } from "react";
import { gsap } from "gsap";

 function Loader() {
  const [loading, setLoading] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadInterval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(loadInterval);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      gsap.to("#loader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.getElementById("loader").style.display = "none";
        },
      });
    }
  }, [isLoaded]);

  return (
    <div id="loader" className="fixed inset-0 flex items-center justify-center bg-black text-white text-4xl font-bold">
      {loading}%
    </div>
  );
}
export default Loader;