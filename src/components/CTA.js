'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { loadContent } from '../data/content';

const CTA = ({ content: initialContent }) => {
    const [content, setContent] = useState(initialContent || loadContent());

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else {
            setContent(loadContent());
        }
    }, [initialContent]);

    if (!content || !content.cta) return null;

    return (
        <section id="contact" className="py-40 relative overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url("${content.cta.backgroundImage}")`,
                }}
            />

            {/* Dark overlay with pattern */}
            <div className="absolute inset-0 bg-black/85" />
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)`
            }} />

            <div className="relative z-10 container max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Red accent line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '150px' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                        className="h-2 bg-rot-red mx-auto mb-10"
                    />

                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-8 leading-tight distressed">
                        {content.cta.title}
                        <br />
                        <span className="text-rot-red">{content.cta.titleAccent}</span>
                    </h2>

                    <p className="text-gray-300 text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed font-sans">
                        {content.cta.subtitle}
                    </p>

                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-sans">
                        {content.cta.description}
                    </p>

                    <motion.a
                        href={content.cta.buttonUrl || '/#contact'}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="group bg-rot-red text-white px-12 py-5 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 ease-out border-4 border-rot-red inline-flex items-center gap-4"
                    >
                        {content.cta.buttonText}
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ArrowRight className="group-hover:text-rot-red" size={20} />
                        </motion.div>
                    </motion.a>

                    <p className="text-gray-500 text-sm mt-8 tracking-wider font-sans">
                        {content.cta.footerText}
                    </p>
                </motion.div>
            </div>

            {/* Bottom red stripe */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-rot-red" />
        </section>
    );
};

export default CTA;
