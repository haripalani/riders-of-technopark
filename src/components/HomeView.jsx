'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Rides from './Rides';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';
import Preloader from './Preloader';
import { fetchLiveContent, loadContent } from '../data/content.js';

const HomeView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState(loadContent()); // Start with local fallback

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Background fetch to update if necessary
                const data = await fetchLiveContent();
                if (data) setContent(data);
            } catch (error) {
                console.error("Failed to load content:", error);
            }
        };

        loadInitialData();

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
        <div className="bg-black min-h-screen selection:bg-rot-red selection:text-white overflow-x-hidden">
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
                    <Navbar content={content} />
                    <Hero content={content} />
                    <About content={content} />
                    <Features content={content} />
                    <Rides content={content} />
                    <FAQ content={content} />
                    <CTA content={content} />
                    <Footer content={content} />
                </motion.div>
            )}
        </div>
    );
};

export default HomeView;
