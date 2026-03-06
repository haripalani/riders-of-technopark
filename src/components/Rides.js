'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Rides = ({ content }) => {
    const [dragConstraint, setDragConstraint] = useState(0);
    const containerRef = useRef(null);
    const carouselRef = useRef(null);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    if (!content) return null;

    useEffect(() => {
        const updateConstraints = () => {
            if (carouselRef.current && containerRef.current) {
                // For infinite scroll, we duplicate the items. 
                // We'll calculate constraint based on single set width
                const singleSetWidth = carouselRef.current.scrollWidth / 2;
                setDragConstraint(-singleSetWidth);
            }
        };

        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        return () => window.removeEventListener('resize', updateConstraints);
    }, [content]);

    // Auto-scroll animation logic with useAnimationFrame
    useAnimationFrame((time, delta) => {
        if (!isHovered && carouselRef.current && dragConstraint < 0) {
            let currentX = x.get();
            currentX -= (delta / 16); // Normalizing speed to ~60fps (1px per 16ms approx)

            // Reset to beginning if we scrolled past the first set
            if (currentX <= dragConstraint) {
                currentX = 0;
            }

            x.set(currentX);
        }
    });



    const rides = content?.rides || [];

    const handleScroll = (direction) => {
        if (!carouselRef.current) return;
        const scrollAmount = 400 + 24; // Card width + gap
        let currentX = x.get();

        if (direction === 'left') {
            currentX += scrollAmount;
            if (currentX > 0) currentX = dragConstraint + currentX;
        } else {
            currentX -= scrollAmount;
            if (currentX < dragConstraint) currentX = currentX - dragConstraint;
        }

        x.set(currentX);
    };

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

                {/* Draggable Slider Container */}
                <div className="relative mt-10 -mx-4 sm:-mx-6 lg:-mx-8 py-4 group">
                    {/* Controls */}
                    <button
                        onClick={() => handleScroll('left')}
                        className="absolute left-8 sm:left-12 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/80 border-2 border-zinc-800 text-white hover:border-rot-red hover:bg-rot-red transition-all duration-300 z-30 cursor-pointer opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={() => handleScroll('right')}
                        className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/80 border-2 border-zinc-800 text-white hover:border-rot-red hover:bg-rot-red transition-all duration-300 z-30 cursor-pointer opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div
                        className="relative overflow-hidden"
                        ref={containerRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onTouchStart={() => setIsHovered(true)}
                        onTouchEnd={() => setIsHovered(false)}
                    >
                        <motion.div
                            ref={carouselRef}
                            className="flex gap-6 w-max px-4 sm:px-6 lg:px-8 cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ right: 0, left: dragConstraint * 2 }} // Allow dragging past end to loop
                            style={{ x }}
                            onDrag={(e, info) => {
                                // Manual infinite loop handling during drag
                                let currentX = x.get();
                                if (currentX > 0) x.set(dragConstraint + currentX);
                                else if (currentX < dragConstraint) x.set(currentX - dragConstraint);
                            }}
                        >
                            {/* We render 3 sets to ensure smooth infinite looping in both directions */}
                            {[...rides, ...rides, ...rides].map((ride, idx) => (
                                <motion.div
                                    key={`${ride.id}-${idx}`}
                                    className={`group relative w-[300px] md:w-[400px] h-[500px] flex-shrink-0 overflow-hidden border-4 transition-all duration-500 ease-out bg-zinc-900 ${ride.featured
                                        ? 'border-yellow-500 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]'
                                        : 'border-zinc-900 hover:border-rot-red hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]'
                                        }`}
                                >
                                    {/* Image Container (keeps grayscale-to-color logic) */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <Image
                                            src={ride.image}
                                            alt={`${ride.title} - ${ride.type} by Riders of Technopark`}
                                            fill
                                            className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${ride.imagePosition || 'object-center'}`}
                                        />
                                    </div>

                                    {/* Anniversary / Ride Number Tag */}
                                    <div className="absolute top-4 right-4 z-20 pointer-events-none">
                                        <span className={`${ride.featured ? 'bg-yellow-500 text-black' : 'bg-rot-red text-white'} text-[10px] font-black px-2 py-0.5 uppercase tracking-wider border border-white/20 shadow-lg`}>
                                            {ride.featured ? `#Ride_${ride.id} ★ ANNIVERSARY` : `#Ride_${ride.id}`}
                                        </span>
                                    </div>

                                    {/* Dark Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 ease-out pointer-events-none" />

                                    {/* Top Accent bar */}
                                    <div className={`absolute top-0 left-0 w-0 h-2 group-hover:w-full transition-all duration-500 ease-out pointer-events-none ${ride.featured ? 'bg-yellow-500' : 'bg-rot-red'}`} />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 transition-transform duration-300 pointer-events-none">
                                        <span className={`inline-block text-xs font-bold px-3 py-1 mb-3 tracking-wider uppercase font-sans ${ride.featured ? 'bg-yellow-500 text-black' : 'bg-rot-red text-white'}`}>
                                            {ride.type}
                                        </span>

                                        <h3 className={`text-2xl font-black text-white uppercase mb-3 transition-colors duration-300 ease-out ${ride.featured ? 'group-hover:text-yellow-400' : 'group-hover:text-rot-red'}`}>
                                            {ride.title}
                                        </h3>

                                        <div className="flex items-center justify-between text-gray-400 text-sm font-sans">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className={ride.featured ? 'text-yellow-500' : 'text-rot-red'} />
                                                <span>{ride.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className={ride.featured ? 'text-yellow-500' : 'text-rot-red'} />
                                                <span>{ride.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        {/* Left/Right Overlays for smooth edge fading */}
                        <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    </div>
                </div>

                {/* Mobile View All Button */}
                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/rides"
                        className="inline-flex items-center gap-2 text-white font-bold uppercase text-sm tracking-[0.2em] border-2 border-rot-red bg-rot-red/10 px-8 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                        VIEW ALL RIDES <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Rides;
