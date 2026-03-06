'use client';

import { useState, useEffect, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import { fetchLiveContent, loadContent } from '../data/content';

const MemoNavbar = memo(Navbar);
const MemoFooter = memo(Footer);

const RidesView = () => {
    const [content, setContent] = useState(loadContent()); // Start with local fallback
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchLiveContent();
                if (data) setContent(data);
            } catch (error) {
                console.error("Failed to load content:", error);
            }
        };
        load();

        // Skip loader if seen in this session
        const hasSeenLoader = sessionStorage.getItem('rot_seen_loader');
        if (hasSeenLoader) {
            setIsLoading(false);
        }
    }, []);

    const handlePreloaderComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem('rot_seen_loader', 'true');
    };

    return (
        <div className="bg-black min-h-screen font-sans antialiased selection:bg-rot-red selection:text-white overflow-x-hidden">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <Preloader key="preloader" onComplete={handlePreloaderComplete} />
                )}
            </AnimatePresence>

            {(!isLoading && content) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <MemoNavbar content={content} />

                    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        {/* Back Button */}
                        <div className="flex items-center gap-4 mb-12">
                            <Link
                                href="/"
                                className="group flex items-center gap-2 text-gray-400 hover:text-rot-red transition-colors duration-300 uppercase text-xs font-bold tracking-widest"
                            >
                                <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" size={16} />
                                Back to Home
                            </Link>
                        </div>

                        {/* Header Section */}
                        <div className="mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-2 bg-rot-red"></div>
                                    <span className="text-rot-red font-bold tracking-[0.2em] uppercase text-sm">Our Journey</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase distressed mb-6">
                                    ALL RIDES ARCHIVE
                                </h1>
                                <p className="text-gray-400 max-w-2xl text-lg font-sans">
                                    Every mile tells a story. Here's the complete collection of our adventures, from weekend sprints to cross-country expeditions.
                                </p>
                            </motion.div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 mb-12">
                            {['ALL', ...new Set((content?.rides || []).map(r => r.type.toUpperCase()))].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-6 py-2 text-xs font-black tracking-widest uppercase transition-all duration-300 border-2 cursor-pointer ${filter === type
                                        ? 'bg-rot-red border-rot-red text-white'
                                        : 'bg-transparent border-zinc-900 text-gray-500 hover:border-rot-red hover:text-white'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Rides Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...(content?.rides || [])]
                                .reverse()
                                .filter(ride => filter === 'ALL' || ride.type.toUpperCase() === filter)
                                .map((ride, idx) => (
                                    <motion.div
                                        key={ride.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                                        className={`group relative aspect-square overflow-hidden cursor-pointer border-4 transition-all duration-500 ease-out bg-zinc-900 ${ride.featured
                                            ? 'border-yellow-500 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]'
                                            : 'border-zinc-900 hover:border-rot-red hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]'
                                            }`}
                                    >
                                        {/* Image Container */}
                                        <div className="absolute inset-0 overflow-hidden">
                                            <Image
                                                src={ride.image}
                                                alt={ride.title}
                                                fill
                                                className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${ride.imagePosition || 'object-center'}`}
                                            />
                                        </div>

                                        {/* Ride Number Tag */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className={`${ride.featured ? 'bg-yellow-500 text-black' : 'bg-rot-red text-white'} text-[10px] font-black px-2 py-0.5 uppercase tracking-wider border border-white/20 shadow-lg`}>
                                                {ride.featured ? `#Ride_${ride.id} ★ ANNIVERSARY` : `#Ride_${ride.id}`}
                                            </span>
                                        </div>

                                        {/* Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

                                        {/* Top Accent Bar Animate-on-hover */}
                                        <div className={`absolute top-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 ease-out ${ride.featured ? 'bg-yellow-500' : 'bg-rot-red'}`}></div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className={`inline-block text-[10px] font-bold px-2 py-1 mb-3 tracking-wider uppercase font-sans ${ride.featured ? 'bg-yellow-500 text-black' : 'bg-rot-red text-white'}`}>
                                                {ride.type}
                                            </span>

                                            <h3 className={`text-xl font-black text-white uppercase mb-3 leading-tight transition-colors duration-300 ${ride.featured ? 'group-hover:text-yellow-400' : 'group-hover:text-rot-red'}`}>
                                                {ride.title}
                                            </h3>

                                            <div className="flex flex-col gap-2 border-t border-white/10 pt-3 mt-2 font-sans">
                                                <div className="flex items-center text-gray-400 text-xs tracking-wide">
                                                    <MapPin className={`${ride.featured ? 'text-yellow-500' : 'text-rot-red'} mr-2`} size={12} />
                                                    <span>{ride.location}</span>
                                                </div>
                                                <div className="flex items-center text-gray-400 text-xs tracking-wide">
                                                    <Calendar className={`${ride.featured ? 'text-yellow-500' : 'text-rot-red'} mr-2`} size={12} />
                                                    <span>{ride.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </main>

                    <MemoFooter content={content} />
                </motion.div>
            )}
        </div>
    );
};

export default RidesView;
