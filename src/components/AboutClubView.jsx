'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadContent, fetchLiveContent } from '../data/content';
import Cursor from './Cursor';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';

const AboutClubView = () => {
    const [content, setContent] = useState(loadContent());
    const [isLoading, setIsLoading] = useState(true);

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

        const hasSeenLoader = sessionStorage.getItem('rot_seen_loader');
        if (hasSeenLoader) {
            setIsLoading(false);
        }
    }, []);

    const handlePreloaderComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem('rot_seen_loader', 'true');
    };

    const stats = content?.about?.stats || [];
    const story = content?.about?.story || [];

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
                    <Cursor />
                    <Navbar content={content} />

                    <main className="pt-32 pb-20">
                        {/* Hero Header */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-center"
                            >
                                <div className="flex items-center justify-center gap-6 mb-8 group">
                                    <div className="w-16 h-1 bg-rot-red shadow-[0_0_15px_#dc2626]"></div>
                                    <span className="text-rot-red font-black tracking-[0.6em] uppercase text-base drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">Our Legacy</span>
                                    <div className="w-16 h-1 bg-rot-red shadow-[0_0_15px_#dc2626]"></div>
                                </div>
                                <h1 className="text-5xl md:text-8xl font-black text-white uppercase distressed mb-8">
                                    THE BROTHERHOOD STORY
                                </h1>
                                <p className="text-gray-400 max-w-3xl mx-auto text-xl font-sans leading-relaxed">
                                    {content.about.description1} {content.about.description2}
                                </p>
                            </motion.div>
                        </div>

                        {/* Story Sections */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-64 pb-40">
                            {story.map((block, idx) => {
                                const isImageRight = block.imageSide === 'right';
                                const chapterNum = (idx + 1).toString().padStart(2, '0');

                                return (
                                    <div key={block.id || idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center relative">
                                        {/* Background Large Number */}
                                        <div className={`absolute -top-24 hidden lg:block select-none pointer-events-none opacity-[0.03] transition-all duration-1000 ${isImageRight ? 'left-0' : 'right-0'}`}>
                                            <span className="text-[25rem] font-black text-white leading-none">
                                                {chapterNum}
                                            </span>
                                        </div>

                                        {/* Image Part */}
                                        <motion.div
                                            initial={{ opacity: 0, x: isImageRight ? 100 : -100 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: false, amount: 0.3, margin: "-100px" }}
                                            transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
                                            className={`relative ${isImageRight ? 'lg:order-2' : 'lg:order-1'} group`}
                                        >
                                            {/* Decorative Elements */}
                                            <div className="absolute -inset-4 bg-rot-red/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                                            <div className="relative vintage-border z-10">
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                                    className="relative overflow-hidden"
                                                >
                                                    <img
                                                        src={block.image}
                                                        alt={`Riders of Technopark Story Chapter ${chapterNum} - ${block.title}`}
                                                        className="w-full h-[400px] md:h-[500px] object-cover border-4 border-white/5 shadow-2xl"
                                                    />

                                                    {/* Overlays */}
                                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-rot-red shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-rot-red shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>

                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                                        <span className="text-white font-black text-4xl opacity-20 uppercase distressed pointer-events-none tracking-tighter">
                                                            RIDERS OF TECHNOPARK
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Content Part */}
                                        <motion.div
                                            initial={{ opacity: 0, x: isImageRight ? -100 : 100 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: false, amount: 0.3, margin: "-100px" }}
                                            transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
                                            className={`${isImageRight ? 'lg:order-1' : 'lg:order-2'} relative z-10`}
                                        >
                                            <div className="flex items-center gap-6 mb-8 group pl-4 border-l-2 border-rot-red/30">
                                                <motion.span
                                                    whileInView={{ width: '40px' }}
                                                    initial={{ width: '0px' }}
                                                    className="h-1 bg-rot-red shadow-[0_0_10px_#dc2626]"
                                                ></motion.span>
                                                <span className="text-rot-red font-black text-2xl tracking-[0.3em] drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                                                    CHAPTER {chapterNum}
                                                </span>
                                            </div>

                                            <h2 className="text-4xl md:text-7xl font-black text-white uppercase mb-8 distressed leading-[0.9] tracking-tighter">
                                                {block.title}
                                            </h2>

                                            <div className="relative group">
                                                {/* Fancy Quote Container */}
                                                <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-rot-red via-rot-red/50 to-transparent"></div>
                                                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                                                    {/* Background Accent */}
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-rot-red/5 blur-3xl rounded-full"></div>

                                                    <p className="text-gray-300 text-xl md:text-2xl leading-relaxed italic font-sans relative z-10">
                                                        "{block.content}"
                                                    </p>

                                                    {/* Subtle Marker */}
                                                    <div className="mt-8 flex items-center gap-2">
                                                        <div className="w-8 h-[1px] bg-zinc-800"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Inspirational Closer */}
                        {content.about?.storyCloser && (
                            <div className="mt-20 py-40 bg-zinc-950 relative overflow-hidden border-y border-white/5">
                                {/* Background Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rot-red/5 blur-[120px] rounded-full"></div>

                                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="flex items-center justify-center gap-6 mb-12">
                                            <div className="w-12 h-[1px] bg-zinc-800"></div>
                                            <span className="text-rot-red font-black tracking-[0.6em] uppercase text-xs">
                                                {content.about.storyCloser.subtitle}
                                            </span>
                                            <div className="w-12 h-[1px] bg-zinc-800"></div>
                                        </div>

                                        <h2 className="text-4xl md:text-7xl font-black text-white uppercase distressed leading-tight tracking-tighter mb-8 shadow-none">
                                            "{content.about.storyCloser.title}"
                                        </h2>

                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-[1px] h-20 bg-gradient-to-b from-rot-red to-transparent"></div>
                                            <span className="text-gray-600 font-bold tracking-widest uppercase text-[10px]">
                                                {content.about.storyCloser.footer}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </main>

                    <Footer content={content} />
                </motion.div>
            )}
        </div>
    );
};

export default AboutClubView;
