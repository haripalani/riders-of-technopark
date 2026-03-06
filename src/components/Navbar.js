'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { loadContent } from '../data/content';

const Navbar = ({ content }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!content) return null;

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
        { name: 'RIDES', href: '/rides' },
        { name: 'EVENTS', href: '/events' },
    ];

    const navLinksRight = [
        { name: 'GALLERY', href: '/#gallery' },
        { name: 'FAQ', href: '/#faq' },
        { name: 'CONTACT', href: '/#contact' },
        { name: 'REGISTER', href: '/join', isButton: true },
    ];

    const handleNavigation = (e, href) => {
        const isHashLink = href.startsWith('/#');

        if (isHashLink) {
            const targetId = href.split('#')[1];

            if (pathname === '/') {
                // If we're already on the home page, just scroll smoothly
                e.preventDefault();
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMobileMenuOpen(false);
            } else {
                // If we are coming from another page, use native browser navigation 
                // to ensure the browser cleanly scrolls to the hash unconditionally.
                e.preventDefault();
                window.location.href = href;
                setIsMobileMenuOpen(false);
            }
        } else {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? 'bg-black/95 backdrop-blur-sm py-3' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center">
                    {/* Left Navigation - Equal Width */}
                    <div className="hidden lg:flex flex-1 items-center gap-8 font-oswald text-white justify-start">
                        {navLinks.map((link, idx) => (
                            <motion.div key={idx}
                                whileHover={{ scale: 1.05, color: '#dc2626' }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleNavigation(e, link.href)}
                                    className="text-white text-sm font-bold tracking-widest hover:text-rot-red transition-colors duration-300 ease-out cursor-pointer"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Logo - Fixed/Intrinsic Width */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center justify-center px-8"
                    >
                        <Link href="/">
                            <img
                                src="/assets/logo-white.svg"
                                alt="R.O.T Logo"
                                className="h-16 md:h-20 w-auto cursor-pointer"
                            />
                        </Link>
                    </motion.div>

                    {/* Right Navigation - Equal Width */}
                    <div className="hidden lg:flex flex-1 items-center gap-8 font-oswald text-white justify-end">
                        {navLinksRight.map((link, idx) => (
                            <motion.div key={idx}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleNavigation(e, link.href)}
                                    className={`${link.isButton
                                        ? "bg-rot-red text-white px-6 py-2 border-2 border-rot-red hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                                        : "text-white hover:text-rot-red transition-colors duration-300"
                                        } text-sm font-bold tracking-widest whitespace-nowrap cursor-pointer`}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex-1 flex justify-end">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white cursor-pointer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
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
                                    onClick={(e) => handleNavigation(e, link.href)}
                                    className={`${link.isButton
                                        ? "bg-rot-red text-white px-6 py-3 my-4 inline-block text-center w-full"
                                        : "block py-2 text-white hover:text-rot-red transition-colors duration-300"
                                        } text-sm font-bold tracking-widest cursor-pointer`}
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
