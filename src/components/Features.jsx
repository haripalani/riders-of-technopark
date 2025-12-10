import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Wrench, Award } from 'lucide-react';

const Features = () => {
    const values = [
        {
            title: "DISCIPLINE",
            desc: "No reckless riding. No showboating. We ride smart, ride safe, ride together.",
            icon: <Shield className="w-10 h-10" />
        },
        {
            title: "BROTHERHOOD",
            desc: "More than riders. We're family. We look out for each other on and off the road.",
            icon: <Users className="w-10 h-10" />
        },
        {
            title: "PASSION",
            desc: "It's not about the bike brand or engine size. It's about the love for the ride.",
            icon: <Wrench className="w-10 h-10" />
        },
        {
            title: "RESPECT",
            desc: "Respect the machine, the road, fellow riders, and the communities we ride through.",
            icon: <Award className="w-10 h-10" />
        }
    ];

    return (
        <section id="events" className="py-32 bg-zinc-950 relative">
            {/* Diagonal stripe pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.5) 35px, rgba(255,255,255,0.5) 38px)`
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '120px' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                        className="h-2 bg-rot-red mx-auto mb-6"
                    />
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 distressed">
                        OUR CODE OF THE ROAD
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        These aren't just words. They're the foundation of who we are.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                            whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                            className="bg-black border-2 border-zinc-800 border-l-4 p-8 relative group hover:border-rot-red hover:bg-rot-red/5 transition-all duration-500 ease-out"
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rot-red opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rot-red opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="mb-6 p-4 bg-rot-red/10 inline-block border-2 border-rot-red"
                            >
                                <div className="text-rot-red">
                                    {item.icon}
                                </div>
                            </motion.div>

                            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-wider group-hover:text-rot-red transition-colors duration-300 ease-out">
                                {item.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
