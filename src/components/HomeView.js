'use client';

import { useState, useEffect, memo } from 'react';
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

// Memoize components to prevent unnecessary re-renders
const MemoNavbar = memo(Navbar);
const MemoHero = memo(Hero);
const MemoAbout = memo(About);
const MemoFeatures = memo(Features);
const MemoRides = memo(Rides);
const MemoFAQ = memo(FAQ);
const MemoCTA = memo(CTA);
const MemoFooter = memo(Footer);

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
    }, []);

    const handlePreloaderComplete = () => {
        setIsLoading(false);
    };

    // Handle hash scrolling after content is loaded
    useEffect(() => {
        if (!isLoading && typeof window !== 'undefined' && window.location.hash) {
            // Slight delay to ensure Framer Motion and React have finished rendering
            // the DOM elements before we attempt to scroll
            const timer = setTimeout(() => {
                const id = window.location.hash.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

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
                    <MemoNavbar content={content} />
                    <MemoHero content={content} />
                    <MemoAbout content={content} />
                    <MemoFeatures content={content} />
                    <MemoRides content={content} />
                    <MemoFAQ content={content} />
                    <MemoCTA content={content} />
                    <MemoFooter content={content} />
                </motion.div>
            )}
        </div>
    );
};

export default HomeView;
