'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { loadContent } from '../data/content';

const About = ({ content: initialContent }) => {
    const [content, setContent] = useState(initialContent || loadContent());

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else {
            setContent(loadContent());
        }
    }, [initialContent]);

    if (!content) return null;

    const stats = content?.about?.stats || [];

    return (
        <section id="about" className="py-32 bg-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '80px' }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                            className="h-2 bg-rot-red mb-8"
                        />

                        <h2 className="text-5xl md:text-6xl font-black uppercase text-white leading-tight mb-8 distressed">
                            {content.about.title.split(' ')[0]}
                            {content.about.title.split(' ').length > 1 && (
                                <><br className="md:hidden" /> <span className="text-rot-red">{content.about.title.split(' ')[1]}</span></>
                            )}
                            {content.about.title.split(' ').length > 2 && (
                                <>
                                    <br />{content.about.title.split(' ').slice(2).join(' ')}
                                </>
                            )}
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            {content.about.description1}
                        </p>

                        <p className="text-gray-400 text-lg leading-relaxed mb-10">
                            {content.about.description2}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mb-12"
                        >
                            <Link href="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: '#dc2626' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border-2 border-rot-red text-white font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 group transition-colors"
                                >
                                    Read Our Full Story
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            {stats.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.6, ease: "easeOut" }}
                                    className="text-center border-t-4 border-rot-red pt-4"
                                >
                                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase leading-none">{item.value}</h3>
                                    <p className="text-gray-500 uppercase tracking-wider text-xs font-bold">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative vintage-border">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative overflow-hidden"
                            >
                                <img
                                    src={content.about.ridersImage}
                                    alt="Riders of Technopark - Motorcycling Brotherhood Group"
                                    className="w-full h-[600px] object-cover transition-all duration-700 ease-out border-4 border-white/10"
                                />
                                {/* Red overlay corners */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-rot-red"></div>
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-rot-red"></div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
