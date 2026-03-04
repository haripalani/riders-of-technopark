'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const Cursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Motion values for smooth physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the follower
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Calculate velocity to make the "wheel" spin based on movement speed
    const velocityX = useVelocity(springX);
    const velocityY = useVelocity(springY);
    const velocityRotation = useTransform([velocityX, velocityY], ([vx, vy]) => {
        return (vx + vy) * 0.5; // Simple approximate rotation based on movement
    });

    useEffect(() => {
        // Only run on devices that support hover (i.e., not mobile)
        if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) return;

        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const checkHover = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isClickable);
        };

        const handleMouseDown = () => setIsPointer(true);
        const handleMouseUp = () => setIsPointer(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", checkHover);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", checkHover);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isVisible, mouseX, mouseY]);

    if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) {
        return null;
    }

    return (
        <>
            {/* Main Pointer (The "Hub") */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-rot-red pointer-events-none z-[9999]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            >
                {/* Mechanical Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-black"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-black"></div>
            </motion.div>

            {/* Follower (The "Sprocket/Tire") */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: velocityRotation
                }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0
                }}
            >
                {/* Sprocket Ring */}
                <motion.div
                    className={`relative w-8 h-8 border-[1.5px] rounded-full flex items-center justify-center transition-colors duration-200 ${isPointer ? 'border-rot-red bg-rot-red/10' : 'border-white/80'}`}
                >
                    {/* Teeth/Tread Pattern */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1 h-1 ${isPointer ? 'bg-rot-red' : 'bg-white'} rounded-full`}
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-16px)`
                            }}
                        />
                    ))}

                    {/* Inner Rim */}
                    <div className={`w-5 h-5 border-[1px] ${isPointer ? 'border-rot-red' : 'border-white/30'} rounded-full`} />
                </motion.div>
            </motion.div>
        </>
    );
};

export default Cursor;
