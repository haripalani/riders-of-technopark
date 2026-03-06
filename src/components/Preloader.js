'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';

const Preloader = ({ onComplete }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, 100, {
            duration: 2.5, // Smooth, purposeful count-up
            ease: "easeInOut",
            onComplete: () => {
                // Ensure small pause at 100 before finishing
                setTimeout(() => {
                    onComplete();
                }, 500);
            }
        });

        return controls.stop;
    }, [count, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="flex flex-col items-center gap-8">
                {/* Logo with entry animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Image
                        src="/assets/logo-white.svg"
                        alt="R.O.T Logo"
                        width={240}
                        height={240}
                        className="h-24 md:h-32 w-auto mb-4"
                        priority
                    />
                </motion.div>

                <div className="relative">
                    <motion.div
                        className="text-9xl md:text-[12rem] font-black text-white mix-blend-difference tabular-nums"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <motion.span>{rounded}</motion.span>%
                    </motion.div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900 mt-2">
                        <motion.div
                            className="h-full bg-rot-red"
                            style={{ width: useTransform(count, (v) => `${v}%`) }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
