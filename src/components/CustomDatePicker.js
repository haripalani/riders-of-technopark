'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';

const CustomDatePicker = ({ value, onChange, label, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
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

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 80; i--) {
        years.push(i);
    }

    const handleDateSelect = (day) => {
        const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        onChange(selectedDate.toISOString().split('T')[0]);
        setIsOpen(false);
    };

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const changeYear = (year) => {
        setViewDate(new Date(parseInt(year), viewDate.getMonth(), 1));
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
        const startDay = startDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

        // Fill empty slots
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isSelected = value && new Date(value).getDate() === day &&
                new Date(value).getMonth() === viewDate.getMonth() &&
                new Date(value).getFullYear() === viewDate.getFullYear();

            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 w-10 h-10 flex items-center justify-center text-sm font-bold transition-all rounded-sm hover:bg-rot-red/20 hover:text-rot-red cursor-pointer ${isSelected ? 'bg-rot-red text-white' : 'text-zinc-400'
                        }`}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="space-y-2 relative w-full" ref={containerRef}>
            {label && (
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 h-4">
                    <CalendarIcon size={14} /> {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-zinc-900/50 border ${isOpen ? 'border-rot-red' : 'border-zinc-800'} p-4 flex items-center justify-between transition-all duration-300 h-[60px] text-zinc-100 cursor-pointer`}
            >
                <span className={`${!value ? 'text-zinc-500 font-medium' : 'text-white font-bold'}`}>
                    {value ? new Date(value).toLocaleDateString() : placeholder}
                </span>
                <CalendarIcon size={16} className={`transition-colors ${isOpen ? 'text-rot-red' : 'text-zinc-500'}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-[70] left-0 mt-2 bg-zinc-900 border border-zinc-800 shadow-2xl p-4 w-72"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <button type="button" onClick={() => changeMonth(-1)} className="p-1 hover:text-rot-red text-zinc-500 cursor-pointer">
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-2">
                                <select
                                    value={viewDate.getMonth()}
                                    onChange={(e) => setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value), 1))}
                                    className="bg-transparent text-sm font-black uppercase tracking-tight outline-none cursor-pointer hover:text-rot-red"
                                >
                                    {months.map((m, idx) => <option key={m} value={idx} className="bg-zinc-900">{m}</option>)}
                                </select>
                                <select
                                    value={viewDate.getFullYear()}
                                    onChange={(e) => changeYear(e.target.value)}
                                    className="bg-transparent text-sm font-black uppercase tracking-tight outline-none cursor-pointer hover:text-rot-red"
                                >
                                    {years.map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
                                </select>
                            </div>
                            <button type="button" onClick={() => changeMonth(1)} className="p-1 hover:text-rot-red text-zinc-500 cursor-pointer">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                                <div key={`${d}-${idx}`} className="text-[10px] font-black text-zinc-600">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {renderCalendar()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomDatePicker;
