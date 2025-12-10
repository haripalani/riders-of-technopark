import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section id="contact" className="py-40 relative overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop")',
                }}
            />

            {/* Dark overlay with pattern */}
            <div className="absolute inset-0 bg-black/85" />
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)`
            }} />

            <div className="relative z-10 container max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Red accent line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '150px' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="h-1 bg-rot-red mx-auto mb-10"
                    />

                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-8 leading-tight distressed">
                        READY TO RIDE
                        <br />
                        <span className="text-rot-red">WITH US?</span>
                    </h2>

                    <p className="text-gray-300 text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed">
                        The road is calling. The brotherhood is waiting.
                    </p>

                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        Based in Technopark, Trivandrum. We ride every weekend, explore every month,
                        and build memories that last a lifetime.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group bg-rot-red text-white px-12 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 border-4 border-rot-red inline-flex items-center gap-4"
                    >
                        JOIN THE BROTHERHOOD
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ArrowRight className="group-hover:text-rot-red" size={20} />
                        </motion.div>
                    </motion.button>

                    <p className="text-gray-500 text-sm mt-8 tracking-wider">
                        NO BIKE? NO PROBLEM. PASSION IS ALL YOU NEED.
                    </p>
                </motion.div>
            </div>

            {/* Bottom red stripe */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-rot-red" />
        </section>
    );
};

export default CTA;
