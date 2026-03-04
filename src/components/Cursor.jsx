'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const Cursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeElement, setActiveElement] = useState(null);

    // Motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Liquid spring config - high damping for smooth, heavy feel
    const springConfig = { damping: 35, stiffness: 200, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Magnetic effect state
    const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) return;

        const moveCursor = (e) => {
            if (activeElement) {
                const rect = activeElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Attract towards center of interactive element
                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;

                mouseX.set(centerX + distanceX * 0.35);
                mouseY.set(centerY + distanceY * 0.35);
            } else {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
            if (!isVisible) setIsVisible(true);
        };

        const checkHover = (e) => {
            const target = e.target.closest('a, button, [role="button"]');
            if (target) {
                setIsPointer(true);
                setActiveElement(target);
            } else {
                setIsPointer(false);
                setActiveElement(null);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", checkHover);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", checkHover);
        };
    }, [isVisible, mouseX, mouseY, activeElement]);

    if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) return null;

    return (
        <>
            {/* Core Hub */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-rot-red pointer-events-none z-[9999] rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />

            {/* Liquid Follower */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isPointer ? 1.4 : 1,
                    opacity: isVisible ? 1 : 0
                }}
            >
                <div className={`relative w-10 h-10 border transition-all duration-300 rounded-full flex items-center justify-center ${isPointer ? 'border-rot-red bg-rot-red/5' : 'border-white/20'
                    }`}>
                    {/* Minimal Mechanical Detail */}
                    <div className={`w-1 h-1 rounded-full ${isPointer ? 'bg-rot-red shadow-[0_0_10px_#dc2626]' : 'bg-white/40'}`} />

                    {/* Rotating Ring Motif */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className={`absolute inset-0 border-t border-transparent rounded-full ${isPointer ? 'border-rot-red/40' : 'border-white/10'}`}
                    />
                </div>
            </motion.div>
        </>
    );
};

export default Cursor;
