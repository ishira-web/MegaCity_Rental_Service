import React, { useState } from "react";
import GallFace from "/public/images/galleface.jpg";
import inde from '/public/images/independence.jpg'
import Ganga from '/public/images/gangaramaya.jpg'
import museum from '/public/images/musium.jpg'



function Blog() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    {
      title: "Exploring Galle Face Green: A Scenic Haven in the Heart of Colombo",
      description:
        "Galle Face Green, located in the heart of Colombo, Sri Lanka, is one of the most iconic landmarks in the city. Stretching over 12 acres along the coastline, this urban park offers a serene escape from the hustle and bustle of the city, making it a popular destination for both locals and tourists. Whether you're looking to relax by the sea, enjoy outdoor activities, or explore historical landmarks, Galle Face Green has something for everyone.",
      image: GallFace,
    },
    {
      title: "Discovering Gangaramaya Temple: A Cultural and Spiritual Gem in Colombo",
      description:
        "Located in the heart of Colombo, Sri Lanka, the Gangaramaya Temple is a must-see landmark for anyone interested in exploring the country’s rich Buddhist heritage. Known for its beautiful architecture, historical significance, and serene atmosphere, this temple is not just a place of worship but also a cultural hub that showcases Sri Lanka’s deep spiritual roots. Whether you're a devout follower, a curious traveler, or someone seeking to connect with Sri Lankan traditions, Gangaramaya Temple offers a memorable experience.",
      image: Ganga,
    },
    {
      title: "Independence Square",
      description:
        "A historic site commemorating Sri Lanka's independence, surrounded by peaceful gardens and iconic architecture.",
      image: inde,
    },
    {
      title: "National Museum of Colombo",
      description:
        "Sri Lanka's largest museum, showcasing a rich collection of artifacts, art, and historical exhibits.",
      image: museum,
    },
  ];

  const openModal = (place) => {
    setSelectedPlace(place);
  };

  const closeModal = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="min-h-screen bg-blue-950 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mt-28">
          Beautiful Places in Colombo
        </h1>
        <div className="flex flex-col gap-6 mt-20 justify-center items-center">
          {places.map((place, index) => (
            <div
              key={index}
              onClick={() => openModal(place)}
              className="bg-white rounded-lg w-[40vw] h-[15vw] flex flex-col  shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 mt-5">
                <h2 className="text-lg font-semibold text-gray-800 text-center">
                  {place.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <img
              src={selectedPlace.image}
              alt={selectedPlace.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedPlace.title}
            </h2>
            <p className="text-gray-600">{selectedPlace.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
