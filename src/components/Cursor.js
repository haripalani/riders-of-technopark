'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const Cursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeElement, setActiveElement] = useState(null);

    // Motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Higher damping and stiffness for a more "expensive", smoother feel
    const springConfig = { damping: 40, stiffness: 250, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (typeof window === 'undefined' || window.matchMedia("(hover: none)").matches) return;

        const moveCursor = (e) => {
            // Magnetic attraction logic
            if (activeElement) {
                const rect = activeElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // 25% pull towards center - subtle but distinct "magnetic" feel
                const x = centerX + (e.clientX - centerX) * 0.25;
                const y = centerY + (e.clientY - centerY) * 0.25;

                mouseX.set(x);
                mouseY.set(y);
            } else {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
            if (!isVisible) setIsVisible(true);
        };

        const checkHover = (e) => {
            const target = e.target.closest('a, button, [role="button"], input, .magnetic-target');
            if (target) {
                setIsPointer(true);
                setActiveElement(target);
            } else {
                setIsPointer(false);
                setActiveElement(null);
            }
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", checkHover, { passive: true });

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
