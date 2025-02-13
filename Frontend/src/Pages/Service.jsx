import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Quote from '/public/images/icon-quote.png';
import Person1 from '/public/images/face.jpg';
import Person2 from '/public/images/face.jpg';
import Person3 from '/public/images/face.jpg';

const reviews = [
  {
    text: "It was an urgent request to drop my family to the Airport from our Ella hotel. Mega City Taxi And Cabs responded fast and sent us a car within half an hour. Driver was friendly and courteous too and took us to the Airport with ample time left. Really happy with the overall experience. Highly Recommended!",
    name: "Amy Rogers, San Francisco",
    image: Person1,
  },
  {
    text: "We took a ride from Ella to Tangalle. Our driver was a very good driver, explained things and sites on the way. The car was also nice, clean. Highly recommend this supplier for everyone!",
    name: "John Smith, Los Angeles",
    image: Person2,
  },
  {
    text: "I am very impressed with Mega City Taxi And Cabs and the quality of their service. They really care about the customer and it’s good to know they will be on time and you will have a safe driver who knows the area and the best routes to your location. We took a taxi from Galle for 5 people to visit Udawalawa National Park.",
    name: "Sarah Lee, New York",
    image: Person3,
  },
];

function Service() {
  const [currentReview, setCurrentReview] = useState(0);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const autoSlideTimer = useRef(null);

  const handleReviewChange = (index) => {
    if (index !== currentReview) {
      gsap.to([textRef.current, nameRef.current, imageRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.4,
        onComplete: () => {
          setCurrentReview(index); // Update the current review
          gsap.fromTo(
            [textRef.current, nameRef.current, imageRef.current],
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, delay: 0.1 }
          );
        },
      });
    }
  };

  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Animation for the review content to fade in when it scrolls into view
    gsap.fromTo(
      [textRef.current, nameRef.current, imageRef.current],
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );

    // Auto-carousel timer
    autoSlideTimer.current = setInterval(() => {
      handleReviewChange((currentReview + 1) % reviews.length);
    }, 5000);

    // Cleanup timer on unmount
    return () => clearInterval(autoSlideTimer.current);
  }, [currentReview]);

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col justify-center items-center gap-12 p-4">
      <h1 className="font-walsheim text-3xl sm:text-4xl text-white">Testimonials</h1>

      <div
        aria-live="polite"
        className="flex flex-col items-center gap-6"
      >
        {/* Review Text */}
        <p
          ref={textRef}
          className="max-w-4xl text-center font-walsheim text-base sm:text-lg lg:text-2xl text-white leading-relaxed"
        >
          {reviews[currentReview].text}
        </p>

        {/* Reviewer Image */}
        <img
          ref={imageRef}
          src={reviews[currentReview].image}
          alt={`Picture of ${reviews[currentReview].name}`}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg"
        />

        {/* Reviewer Name */}
        <h1
          ref={nameRef}
          className="font-simplon text-white text-sm sm:text-base"
        >
          {reviews[currentReview].name}
        </h1>
      </div>

      {/* Review Navigation (Avatars) */}
      <div className="flex gap-4 mt-6">
        {reviews.map((review, index) => (
          <button
            key={index}
            aria-label={`Show review ${index + 1}`}
            onClick={() => {
              clearInterval(autoSlideTimer.current); // Pause auto-slide on manual interaction
              handleReviewChange(index);
            }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden cursor-pointer border-4 ${
              currentReview === index
                ? 'border-white'
                : 'border-transparent hover:border-white'
            }`}
          >
            <img
              src={review.image}
              alt={`Customer ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Service;
