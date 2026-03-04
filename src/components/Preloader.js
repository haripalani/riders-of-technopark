'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 1500; // Slightly longer for a smoother feel
        const interval = 16;   // ~60fps target
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (count === 100) {
            // Add a small delay at 100% before finishing
            const timeout = setTimeout(() => {
                onComplete();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [count, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="relative">
                <motion.div
                    className="text-9xl md:text-[12rem] font-black text-white mix-blend-difference"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {Math.round(count)}%
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900 mt-2">
                    <motion.div
                        className="h-full bg-rot-red"
                        style={{ width: `${count}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
