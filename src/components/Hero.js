'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { loadContent } from '../data/content';

const Hero = ({ content: initialContent }) => {
    const [content, setContent] = useState(initialContent || loadContent());

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else {
            setContent(loadContent());
        }
    }, [initialContent]);

    if (!content) return null;

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden grit-overlay">
            {/* Dark Overlay Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    src={content.hero.backgroundImage}
                    alt="Riders of Technopark - Kerala's Premier Tech Biking Brotherhood"
                    className="w-full h-full object-cover grayscale"
                    fetchPriority="high"
                />
            </div>

            {/* Tire Track Pattern */}
            <div className="absolute inset-0 z-10 opacity-5" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,0.5) 35px, rgba(255,255,255,0.5) 38px)`
            }} />

            {/* Content */}
            <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="text-white font-bold tracking-[0.3em] mb-6 text-sm md:text-base"
                    >
                        {content.hero.tagline}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-8 uppercase distressed"
                    >
                        {content.hero.title.toUpperCase().includes("RIDERS OF TECHNOPARK") ? (
                            <>
                                RIDERS OF<br />
                                <span>TECHNOPARK</span>
                            </>
                        ) : content.hero.title.includes('\n') ? (
                            <>
                                {content.hero.title.split('\n')[0]}
                                <br />
                                <span>{content.hero.title.split('\n')[1]}</span>
                            </>
                        ) : (
                            content.hero.title
                        )}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                        className="w-32 h-2 bg-rot-red mx-auto mb-8"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                        className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light tracking-wide"
                    >
                        {content.hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link href="#contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="bg-rot-red text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 ease-out border-2 border-rot-red hover:border-white w-full sm:w-auto cursor-pointer"
                            >
                                JOIN THE CLUB
                            </motion.button>
                        </Link>
                        <Link href="/#about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="border-2 border-white text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 ease-out w-full sm:w-auto cursor-pointer"
                            >
                                EXPLORE MORE
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-white text-xs tracking-widest font-bold">SCROLL</span>
                <ChevronDown className="text-white" size={24} />
            </motion.div>
        </section>
    );
};

export default Hero;
