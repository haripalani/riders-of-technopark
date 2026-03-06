'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ options, value, onChange, placeholder, label, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt === value) || value;

    return (
        <div className="space-y-2 relative w-full" ref={containerRef}>
            {label && (
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 h-4">
                    {Icon && <Icon size={14} />} {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-zinc-900/50 border ${isOpen ? 'border-rot-red' : 'border-zinc-800'} p-4 flex items-center justify-between transition-all duration-300 group h-[60px] cursor-pointer`}
            >
                <span className={`font-medium ${!value ? 'text-zinc-500' : 'text-white'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown
                    size={18}
                    className={`text-zinc-500 group-hover:text-rot-red transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-[60] left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        <div className="py-2">
                            {options.map((option, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all hover:bg-zinc-800 font-medium cursor-pointer ${value === option ? 'text-rot-red bg-rot-red/5' : 'text-zinc-400'
                                        }`}
                                >
                                    <span>{option}</span>
                                    {value === option && <Check size={14} className="text-rot-red" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;
