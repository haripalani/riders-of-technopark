'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import Rides from './Rides';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';
import Preloader from './Preloader';
import { fetchLiveContent } from '../data/content.js';

const HomeView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            const data = await fetchLiveContent();
            setContent(data);

            // Still check for loader session
            const hasLoaded = localStorage.getItem('rot_has_loaded');
            if (hasLoaded) {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const handlePreloaderComplete = () => {
        setIsLoading(false);
        localStorage.setItem('rot_has_loaded', 'true');
    };

    if (!content) return <div className="bg-black min-h-screen" />;

    return (
        <div className="bg-black min-h-screen selection:bg-rot-red selection:text-white overflow-x-hidden">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <Preloader key="preloader" onComplete={handlePreloaderComplete} />
                )}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <Navbar content={content} />
                    <Hero content={content} />
                    <About content={content} />
                    <Features content={content} />
                    <Rides content={content} />
                    <FAQ content={content} />
                    <CTA content={content} />
                    <Footer content={content} />
                </>
            )}
        </div>
    );
};

export default HomeView;
