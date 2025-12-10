import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Rides from '../components/Rides';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="bg-black min-h-screen font-sans antialiased selection:bg-rot-red selection:text-white overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Rides />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    );
};

export default HomePage;
