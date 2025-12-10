import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Do I need to own a motorcycle to join R.O.T?",
            answer: "Not at all! While most of us ride, we welcome anyone passionate about motorcycles and the riding culture. You can join as an enthusiast, ride pillion with members, or work towards getting your own bike. Passion is the only requirement."
        },
        {
            question: "What kind of rides do you organize?",
            answer: "We organize a variety of rides - from short weekend breakfast runs to multi-day interstate adventures. Our calendar includes coastal rides, hill station trips, heritage tours, and charity rides. Every ride is planned meticulously with safety as the top priority."
        },
        {
            question: "Is there a specific bike brand or engine size requirement?",
            answer: "Absolutely not. Whether you ride a 100cc commuter or a 1000cc superbike, you're welcome. R.O.T is brand-agnostic. We believe in the spirit of riding, not the badge on your tank. Respect the machine, whatever it is."
        },
        {
            question: "How do I join the club?",
            answer: "Start by attending one of our weekend rides or meet-ups at Technopark. Get to know the members, understand our code, and if you vibe with the brotherhood, you can officially join. We value quality over quantity, so we take time to build real connections."
        },
        {
            question: "What safety measures do you follow?",
            answer: "Safety is non-negotiable. All riders must wear proper gear (helmet, gloves, jacket). We follow strict group riding protocols, conduct pre-ride briefings, have designated road captains and sweepers, and maintain emergency contacts. We ride smart, not reckless."
        },
        {
            question: "Are family members and partners welcome?",
            answer: "Definitely! We're a family-friendly community. We organize special rides where partners and families can join. Many of our events include non-riding activities where everyone can participate and bond beyond the bikes."
        },
        {
            question: "What's the age requirement?",
            answer: "You must be 18+ with a valid driving license to ride with us. For pillion riders or enthusiasts, we welcome anyone mature enough to understand and respect our code of conduct."
        },
        {
            question: "How much does membership cost?",
            answer: "R.O.T is not about making money. We have minimal membership fees that cover club merchandise, ride planning costs, and community events. The real investment is your time, passion, and commitment to the brotherhood."
        }
    ];

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
                        Got Questions?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Everything you need to know about joining the R.O.T brotherhood
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
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
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="inline-block bg-rot-red text-white px-8 py-3 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 ease-out border-2 border-rot-red"
                    >
                        Get in Touch
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
