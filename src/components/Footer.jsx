import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import logo from '../assets/R.O.T_Svg_white.svg';

const Footer = () => {
    const socialLinks = [
        { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
        { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
        { icon: <Mail size={20} />, href: 'mailto:info@rot.com', label: 'Email' },
        { icon: <Phone size={20} />, href: 'tel:+91', label: 'Phone' },
    ];

    const quickLinks = [
        { name: 'About Us', href: '#about' },
        { name: 'Events', href: '#events' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-black border-t-4 border-rot-red">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Tagline */}
                    <div className="md:col-span-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <img
                                src={logo}
                                alt="R.O.T Logo"
                                className="h-16 w-auto"
                            />
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight">RIDERS OF TECHNOPARK</h3>
                                <p className="text-gray-500 text-xs tracking-widest uppercase">Kerala's Premier Tech Riders</p>
                            </div>
                        </motion.div>
                        <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                            More than a riding club. We're a brotherhood of IT professionals who found freedom beyond the screen.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((link, idx) => (
                                <motion.a
                                    key={idx}
                                    href={link.href}
                                    whileHover={{ scale: 1.1, backgroundColor: '#dc2626' }}
                                    className="w-10 h-10 bg-zinc-900 hover:bg-rot-red flex items-center justify-center text-white transition-colors border border-zinc-800 hover:border-rot-red"
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
                        <ul className="space-y-3">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 5, color: '#dc2626' }}
                                        className="text-gray-400 hover:text-rot-red transition-colors text-sm"
                                    >
                                        {link.name}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-wider mb-6 text-sm">Ride With Us</h4>
                        <div className="space-y-3 text-gray-400 text-sm">
                            <p>Technopark Campus</p>
                            <p>Trivandrum, Kerala</p>
                            <p className="text-rot-red font-bold">Every Weekend</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} <span className="text-white font-bold">R.O.T</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs">
                        <a href="#" className="text-gray-500 hover:text-rot-red transition-colors uppercase tracking-widest">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-rot-red transition-colors uppercase tracking-widest">
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
