import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BlurryCursor() {
    const mouse = useRef({ x: 0, y: 0 });
    const circle = useRef();
    const [isActive, setIsActive] = useState(false); // Initialize isActive

    const size = 30;

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouse.current = { x: clientX, y: clientY };
        moveCircle(mouse.current.x, mouse.current.y);

        // Example of toggling isActive based on mouse movement
        setIsActive(true); // Customize the logic as needed
    };

    const moveCircle = (x, y) => {
        gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
    };

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove);
        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, []); // No dependency on isActive here

    return (
        <div className="relative h-screen">
            <div
                ref={circle}
                style={{
                    backgroundColor: '#BCE4F2',
                    width: size,
                    height: size,
                    transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`,
                }}
                className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none"
            />
        </div>
    );
}
