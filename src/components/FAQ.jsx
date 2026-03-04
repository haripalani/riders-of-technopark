'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { loadContent } from '../data/content';

const FAQ = ({ content: initialContent }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [content, setContent] = useState(initialContent || loadContent());

    useEffect(() => {
        if (initialContent) {
            setContent(initialContent);
        } else {
            setContent(loadContent());
        }
    }, [initialContent]);

    if (!content) return null;

    return (
        <section id="faq" className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.5) 35px, rgba(255,255,255,0.5) 38px)`
            }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <HelpCircle className="text-rot-red" size={32} />
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '80px' }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                            className="h-2 bg-rot-red"
                        />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 distressed">
                        {content.faq.title}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {content.faq.subtitle}
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {(content?.faq?.questions || []).map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
                            className="border-2 border-zinc-800 border-l-4 border-l-rot-red bg-black overflow-hidden hover:border-rot-red transition-all duration-300 ease-out"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-rot-red/5 transition-all duration-300 ease-out"
                            >
                                <span className="text-white font-bold text-lg pr-4 group-hover:text-rot-red transition-colors duration-300 ease-out">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown
                                        className={`${openIndex === idx ? 'text-rot-red' : 'text-gray-500'} transition-colors duration-300 ease-out`}
                                        size={24}
                                    />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 pt-2 border-t-4 border-rot-red">
                                            <p className="text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6">
                        Still have questions? We'd love to hear from you.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-block bg-rot-red text-white px-8 py-3 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 ease-out border-2 border-rot-red"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
