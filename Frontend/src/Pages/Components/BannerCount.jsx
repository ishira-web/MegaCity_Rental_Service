import React, { useEffect, useRef } from "react";
import { Car, Users, Calendar, Gauge } from "lucide-react";
import gsap from "gsap";

const stats = [
  { id: 1, icon: <Car size={30} />, value: 540, label: "Cars" },
  { id: 2, icon: <Users size={30} />, value: 20000, label: "Customers" },
  { id: 3, icon: <Calendar size={30} />, value: 25, label: "Years" },
  { id: 4, icon: <Gauge size={30} />, value: 20000000, label: "Miles" },
];

const BannerCount = () => {
  const countersRef = useRef([]);

  useEffect(() => {
    countersRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: stats[index].value,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
        }
      );
    });
  }, []);

  return (
    <div className="bg-white text-black font-roboto py-12 px-6 rounded-2xl text-center">
      <h2 className="text-3xl font-bold mb-4">Facts In Numbers</h2>
      <p className="text-black mb-6 font-walsheim">
        Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in. Diam tincidunt tincidunt erat at semper fermentum.
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <div className="bg-yellow-400 p-4 rounded-lg text-black">{stat.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900" ref={(el) => (countersRef.current[index] = el)}>
                0
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCount;