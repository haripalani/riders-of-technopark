'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { loadContent } from '../data/content';

const Footer = ({ content: initialContent }) => {
    const [content, setContent] = useState(initialContent || loadContent());

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else {
            setContent(loadContent());
        }
    }, [initialContent]);

    if (!content) return null;

    const socialLinks = [
        { icon: <Instagram size={20} />, href: content?.footer?.socialLinks?.instagram || '#', label: 'Instagram' },
        { icon: <Mail size={20} />, href: content?.footer?.socialLinks?.email || '#', label: 'Email' },
        { icon: <MessageCircle size={20} />, href: content?.footer?.socialLinks?.whatsapp || '#', label: 'WhatsApp' },
    ];

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Rides', href: '/rides' },
        { name: 'Gallery', href: '/#gallery' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <footer className="bg-black border-t-4 border-rot-red">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 font-sans text-gray-400">
                    {/* Logo & Tagline */}
                    <div className="md:col-span-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <img
                                src="/assets/logo-white.svg"
                                alt="R.O.T Logo"
                                className="h-16 w-auto"
                            />
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight uppercase">RIDERS OF TECHNOPARK</h3>
                                <p className="text-gray-500 text-xs tracking-widest uppercase font-sans">{content.footer.tagline}</p>
                            </div>
                        </motion.div>
                        <p className="text-gray-400 leading-relaxed mb-6 max-w-md font-sans">
                            {content.footer.description}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((link, idx) => (
                                <motion.a
                                    key={idx}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, backgroundColor: '#dc2626' }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="w-10 h-10 bg-zinc-900 hover:bg-rot-red flex items-center justify-center text-white transition-colors duration-300 ease-out border border-zinc-800 hover:border-rot-red"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-wider mb-6 text-sm">Quick Links</h4>
                        <ul className="space-y-3 font-sans">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-rot-red transition-colors duration-300 ease-out text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-wider mb-6 text-sm">Ride With Us</h4>
                        <div className="space-y-3 font-sans text-sm">
                            <p>{content.footer.location}</p>
                            <p>{content.footer.city}</p>
                            <p className="text-rot-red font-bold">{content.footer.schedule}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-sans">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} <span className="text-white font-bold">R.O.T</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs">
                        <a href="#" className="text-gray-500 hover:text-rot-red transition-colors duration-300 ease-out uppercase tracking-widest">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-rot-red transition-colors duration-300 ease-out uppercase tracking-widest">
                            Terms of Use
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom stripe */}
            <div className="h-2 bg-gradient-to-r from-rot-red via-white to-rot-red" />
        </footer>
    );
};

export default Footer;
