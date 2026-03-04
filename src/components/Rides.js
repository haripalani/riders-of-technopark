'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { loadContent } from '../data/content';

const Rides = ({ content: initialContent }) => {
    const [content, setContent] = useState(initialContent || loadContent());

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else {
            setContent(loadContent());
        }
    }, [initialContent]);

    if (!content) return null;

    const rides = content?.rides || [];

    return (
        <section id="gallery" className="py-32 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-2 bg-rot-red" />
                            <span className="text-rot-red font-bold tracking-[0.2em] uppercase text-sm">Our Stories</span>
                        </div>
                        <h2 className="text-5xl font-black text-white uppercase distressed">
                            RECENT RIDES
                        </h2>
                    </motion.div>

                    <Link
                        href="/rides"
                        className="hidden md:flex items-center gap-2 text-white hover:text-rot-red transition-colors duration-300 ease-out font-bold uppercase text-sm tracking-widest border-b-2 border-white hover:border-rot-red pb-1"
                    >
                        ALL RIDES <ChevronRight size={18} />
                    </Link>
                </div>

                {/* Infinite Slider Container */}
                <div className="relative overflow-hidden mt-10 -mx-4 sm:-mx-6 lg:-mx-8 py-10 pause-on-hover">
                    <div className="flex gap-6 w-max animate-marquee">
                        {/* Duplicate sets for seamless loop */}
                        {[...rides, ...rides].map((ride, idx) => (
                            <div
                                key={`${ride.id}-${idx}`}
                                className="group relative w-[300px] md:w-[400px] h-[500px] flex-shrink-0 overflow-hidden cursor-pointer border-4 border-zinc-900 hover:border-rot-red hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-500 ease-out"
                            >
                                {/* Image Container (keeps grayscale-to-color logic) */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={ride.image}
                                        alt={`${ride.title} - ${ride.type} by Riders of Technopark`}
                                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                                    />
                                </div>

                                {/* Ride Number Tag */}
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="bg-rot-red text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider border border-white/20 shadow-lg">
                                        #Ride_{ride.id}
                                    </span>
                                </div>

                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 ease-out" />

                                {/* Red accent bar */}
                                <div className="absolute top-0 left-0 w-0 h-2 bg-rot-red group-hover:w-full transition-all duration-500 ease-out" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 transition-transform duration-300">
                                    <span className="inline-block bg-rot-red text-white text-xs font-bold px-3 py-1 mb-3 tracking-wider uppercase font-sans">
                                        {ride.type}
                                    </span>

                                    <h3 className="text-2xl font-black text-white uppercase mb-3 group-hover:text-rot-red transition-colors duration-300 ease-out">
                                        {ride.title}
                                    </h3>

                                    <div className="flex items-center justify-between text-gray-400 text-sm font-sans">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-rot-red" />
                                            <span>{ride.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-rot-red" />
                                            <span>{ride.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Left/Right Overlays for smooth edge fading */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                </div>
                {/* Mobile View All Button */}
                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/rides"
                        className="inline-flex items-center gap-2 text-white font-bold uppercase text-sm tracking-[0.2em] border-2 border-rot-red bg-rot-red/10 px-8 py-4 hover:bg-rot-red transition-all duration-300"
                    >
                        VIEW ALL RIDES <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Rides;
