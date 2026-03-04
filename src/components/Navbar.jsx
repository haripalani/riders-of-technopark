'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { loadContent } from '../data/content';

const Navbar = ({ content: initialContent }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [content, setContent] = useState(initialContent || loadContent());

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else {
            setContent(loadContent());
        }
    }, [initialContent]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '/#home' },
        { name: 'ABOUT CLUB', href: '/#about' },
        { name: 'EVENTS', href: '/#events' },
        { name: 'RIDES', href: '/rides' },
    ];

    const navLinksRight = [
        { name: 'GALLERY', href: '/#gallery' },
        { name: 'FAQ', href: '/#faq' },
        { name: 'CONTACT', href: '/#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? 'bg-black/95 backdrop-blur-sm py-3' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Left Navigation */}
                    <div className="hidden lg:flex items-center gap-8 font-oswald">
                        {navLinks.map((link, idx) => (
                            <motion.div key={idx}
                                whileHover={{ scale: 1.05, color: '#dc2626' }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-white text-sm font-bold tracking-widest hover:text-rot-red transition-colors duration-300 ease-out"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center justify-center"
                    >
                        <Link href="/">
                            <img
                                src="/assets/logo-white.svg"
                                alt="R.O.T Logo"
                                className="h-16 md:h-20 w-auto cursor-pointer"
                            />
                        </Link>
                    </motion.div>

                    {/* Right Navigation */}
                    <div className="hidden lg:flex items-center gap-8 font-oswald">
                        {navLinksRight.map((link, idx) => (
                            <motion.div key={idx}
                                whileHover={{ scale: 1.05, color: '#dc2626' }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-white text-sm font-bold tracking-widest hover:text-rot-red transition-colors duration-300 ease-out"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden mt-4 pb-4 font-oswald"
                        >
                            {[...navLinks, ...navLinksRight].map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="block py-2 text-white text-sm font-bold tracking-widest hover:text-rot-red transition-colors duration-300 ease-out"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
