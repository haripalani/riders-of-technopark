import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const Rides = () => {
    const rides = [
        {
            title: "Munnar Highlands",
            location: "Kerala",
            date: "Jan 2025",
            image: "https://images.unsplash.com/photo-1596423736531-48d6849488db?q=80&w=800&auto=format&fit=crop",
            type: "Weekend Ride"
        },
        {
            title: "Coastal Thunder",
            location: "Varkala",
            date: "Feb 2025",
            image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop",
            type: "Day Trip"
        },
        {
            title: "Ghat Explorer",
            location: "Wayanad",
            date: "Mar 2025",
            image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?q=80&w=800&auto=format&fit=crop",
            type: "3 Days"
        },
        {
            title: "Hill Station Run",
            location: "Kodaikanal",
            date: "Apr 2025",
            image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
            type: "Long Ride"
        }
    ];

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
                            <div className="w-16 h-1 bg-rot-red" />
                            <span className="text-rot-red font-bold tracking-[0.2em] uppercase text-sm">Our Stories</span>
                        </div>
                        <h2 className="text-5xl font-black text-white uppercase distressed">
                            RECENT RIDES
                        </h2>
                    </motion.div>

                    <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="hidden md:flex items-center gap-2 text-white hover:text-rot-red transition-colors font-bold uppercase text-sm tracking-widest border-b-2 border-white hover:border-rot-red pb-1"
                    >
                        ALL RIDES <ChevronRight size={18} />
                    </motion.a>
                </div>

                {/* Rides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rides.map((ride, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative h-[500px] overflow-hidden cursor-pointer border-4 border-zinc-900 hover:border-rot-red transition-all duration-300"
                        >
                            {/* Image */}
                            <motion.img
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                src={ride.image}
                                alt={ride.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Red accent bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="absolute top-0 left-0 h-2 bg-rot-red"
                            />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 transition-transform duration-300">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                >
                                    <span className="inline-block bg-rot-red text-white text-xs font-bold px-3 py-1 mb-3 tracking-wider uppercase">
                                        {ride.type}
                                    </span>

                                    <h3 className="text-2xl font-black text-white uppercase mb-3 group-hover:text-rot-red transition-colors">
                                        {ride.title}
                                    </h3>

                                    <div className="flex items-center justify-between text-gray-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-rot-red" />
                                            <span>{ride.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-rot-red" />
                                            <span>{ride.date}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rides;
