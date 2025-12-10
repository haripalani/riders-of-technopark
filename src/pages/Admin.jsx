import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image, X, Plus } from 'lucide-react';
import { loadContent, saveContent, siteContent } from '../data/content';

const Admin = () => {
    const [content, setContent] = useState(loadContent());
    const [activeTab, setActiveTab] = useState('hero');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        saveContent(content);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        // Reload page to show changes
        window.location.reload();
    };

    const handleReset = () => {
        if (window.confirm('Reset all content to defaults?')) {
            setContent(siteContent);
            localStorage.removeItem('rotContent');
        }
    };

    const updateHero = (field, value) => {
        setContent(prev => ({
            ...prev,
            hero: { ...prev.hero, [field]: value }
        }));
    };

    const updateAbout = (field, value) => {
        setContent(prev => ({
            ...prev,
            about: { ...prev.about, [field]: value }
        }));
    };

    const updateRide = (id, field, value) => {
        setContent(prev => ({
            ...prev,
            rides: prev.rides.map(ride =>
                ride.id === id ? { ...ride, [field]: value } : ride
            )
        }));
    };

    const addRide = () => {
        const newId = Math.max(...content.rides.map(r => r.id)) + 1;
        setContent(prev => ({
            ...prev,
            rides: [...prev.rides, {
                id: newId,
                title: "New Ride",
                location: "Location",
                date: "Date",
                image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=800&auto=format&fit=crop",
                type: "Weekend Ride"
            }]
        }));
    };

    const deleteRide = (id) => {
        if (window.confirm('Delete this ride?')) {
            setContent(prev => ({
                ...prev,
                rides: prev.rides.filter(ride => ride.id !== id)
            }));
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase mb-2">R.O.T Admin Panel</h1>
                        <p className="text-gray-400">Manage your site content</p>
                    </div>
                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReset}
                            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors font-bold uppercase tracking-wider text-sm"
                        >
                            Reset to Defaults
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="px-6 py-3 bg-rot-red hover:bg-red-800 transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-2"
                        >
                            <Save size={18} />
                            {saved ? 'Saved!' : 'Save Changes'}
                        </motion.button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-zinc-800">
                    {['hero', 'about', 'rides'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === tab
                                    ? 'border-b-2 border-rot-red text-white'
                                    : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Hero Section */}
                {activeTab === 'hero' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Background Image URL
                            </label>
                            <input
                                type="text"
                                value={content.hero.backgroundImage}
                                onChange={(e) => updateHero('backgroundImage', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                placeholder="Enter image URL"
                            />
                            {content.hero.backgroundImage && (
                                <img
                                    src={content.hero.backgroundImage}
                                    alt="Preview"
                                    className="mt-4 w-full h-48 object-cover border-2 border-zinc-800"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={content.hero.tagline}
                                onChange={(e) => updateHero('tagline', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={content.hero.subtitle}
                                onChange={(e) => updateHero('subtitle', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>
                    </div>
                )}

                {/* About Section */}
                {activeTab === 'about' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Riders Group Image URL
                            </label>
                            <input
                                type="text"
                                value={content.about.ridersImage}
                                onChange={(e) => updateAbout('ridersImage', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                placeholder="Enter image URL"
                            />
                            {content.about.ridersImage && (
                                <img
                                    src={content.about.ridersImage}
                                    alt="Preview"
                                    className="mt-4 w-full h-64 object-cover border-2 border-zinc-800"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Rides Section */}
                {activeTab === 'rides' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold uppercase">Recent Rides</h3>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={addRide}
                                className="px-4 py-2 bg-rot-red hover:bg-red-800 transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-2"
                            >
                                <Plus size={18} /> Add Ride
                            </motion.button>
                        </div>

                        <div className="grid gap-6">
                            {content.rides.map(ride => (
                                <div key={ride.id} className="bg-zinc-900 p-6 border border-zinc-800 relative">
                                    <button
                                        onClick={() => deleteRide(ride.id)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={ride.title}
                                                onChange={(e) => updateRide(ride.id, 'title', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                value={ride.location}
                                                onChange={(e) => updateRide(ride.id, 'location', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Date
                                            </label>
                                            <input
                                                type="text"
                                                value={ride.date}
                                                onChange={(e) => updateRide(ride.id, 'date', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Type
                                            </label>
                                            <input
                                                type="text"
                                                value={ride.type}
                                                onChange={(e) => updateRide(ride.id, 'type', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Image URL
                                            </label>
                                            <input
                                                type="text"
                                                value={ride.image}
                                                onChange={(e) => updateRide(ride.id, 'image', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                            />
                                            {ride.image && (
                                                <img
                                                    src={ride.image}
                                                    alt="Preview"
                                                    className="mt-2 w-full h-32 object-cover border border-zinc-800"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
