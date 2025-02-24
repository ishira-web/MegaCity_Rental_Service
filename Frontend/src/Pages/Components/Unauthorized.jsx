import React, { useRef, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animation404 from '/public/images/404unauth.lottie';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

function Unauthorized() {
  const underlineRef = useRef(null); // Ref for the underline element
  const textRef = useRef(null); // Ref for the text container

  useEffect(() => {
    // GSAP animation for the underline
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, transformOrigin: 'left' }, // Start with no width
      { scaleX: 1, duration: 0.5, ease: 'power2.out' } // Animate to full width
    );

    // Optional: Add hover effect to restart the animation
    const textElement = textRef.current;
    const underlineElement = underlineRef.current;

    textElement.addEventListener('mouseenter', () => {
      gsap.to(underlineElement, { scaleX: 1, duration: 0.5, ease: 'power2.out' });
    });

    textElement.addEventListener('mouseleave', () => {
      gsap.to(underlineElement, { scaleX: 0, duration: 0.5, ease: 'power2.out' });
    });

    // Cleanup event listeners
    return () => {
      textElement.removeEventListener('mouseenter', () => {});
      textElement.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <div className='flex justify-center items-center min-h-screen bg-yellow-600'>
      <div className='w-1/2'>
        <DotLottieReact src={animation404} loop autoplay />
      </div>
      <div className='w-1/2 flex flex-col gap-44'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-white text-5xl font-simplon leading-relaxed'>
            Oh no! Looks like Unauthorized access !!!
          </h1>
          <h1 className='text-white text-2xl font-simplon leading-relaxed'>
            Sorry, but this page has no access for you
          </h1>
        </div>
        {/* start */}
       <Link to="/"> <div
          ref={textRef}
          className='flex flex-row items-center gap-10 p-1 w-60 cursor-pointer relative'
        >
          <h1 className='text-white font-walsheim'>Go to your home page</h1>
          <div className='w-7 h-7 border rounded-md flex justify-center items-center'>
            <ArrowUpRight className='text-white w-5 h-5' />
          </div>
          {/* Underline element */}
          <div
            ref={underlineRef}
            className='absolute -bottom-2 left-0 w-full h-0.5 bg-white transform scale-x-0'
          />
  
        </div>
        </Link>
        {/* end */}
      </div>
    </div>
  );
}

export default Unauthorized;