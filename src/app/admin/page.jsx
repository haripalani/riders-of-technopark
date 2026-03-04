'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image, X, Plus, Lock, LogIn } from 'lucide-react';
import { loadContent, saveContent, siteContent, fetchLiveContent, saveLiveContent } from '../../data/content';
import ImageUploader from '../../components/ImageUploader';

const Admin = () => {
    const [content, setContent] = useState(null);
    const [activeTab, setActiveTab] = useState('hero');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        // Fetch live content
        const load = async () => {
            const data = await fetchLiveContent();
            setContent(data);
        };
        load();

        // Check local storage for auth state to persist login
        const auth = sessionStorage.getItem('rotAdminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials for now
        if (username === 'admin' && password === 'rotadmin2026') {
            setIsAuthenticated(true);
            setLoginError('');
            sessionStorage.setItem('rotAdminAuth', 'true');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
        sessionStorage.removeItem('rotAdminAuth');
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveLiveContent(content);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
            // Opt-out of reload to preserve state if possible, or reload only on demand
            // window.location.reload(); 
        } catch (error) {
            alert('Failed to save content: ' + error.message);
        } finally {
            setIsSaving(false);
        }
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

    const updateStoryBlock = (id, field, value) => {
        setContent(prev => ({
            ...prev,
            about: {
                ...prev.about,
                story: prev.about.story.map(s =>
                    s.id === id ? { ...s, [field]: value } : s
                )
            }
        }));
    };

    const addStoryBlock = () => {
        const newId = content.about.story.length > 0
            ? Math.max(...content.about.story.map(s => s.id)) + 1
            : 1;
        setContent(prev => ({
            ...prev,
            about: {
                ...prev.about,
                story: [...(prev.about.story || []), {
                    id: newId,
                    title: "New Story Chapter",
                    content: "Story content goes here...",
                    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=800&auto=format&fit=crop",
                    imageSide: "right"
                }]
            }
        }));
    };

    const deleteStoryBlock = (id) => {
        if (window.confirm('Delete this story section?')) {
            setContent(prev => ({
                ...prev,
                about: {
                    ...prev.about,
                    story: prev.about.story.filter(s => s.id !== id)
                }
            }));
        }
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

    const updateFeatures = (field, value) => {
        setContent(prev => ({
            ...prev,
            features: { ...prev.features, [field]: value }
        }));
    };

    const updateFeatureValue = (idx, field, value) => {
        setContent(prev => ({
            ...prev,
            features: {
                ...prev.features,
                values: prev.features.values.map((val, i) =>
                    i === idx ? { ...val, [field]: value } : val
                )
            }
        }));
    };

    const updateFAQ = (field, value) => {
        setContent(prev => ({
            ...prev,
            faq: { ...prev.faq, [field]: value }
        }));
    };

    const updateQuestion = (id, field, value) => {
        setContent(prev => ({
            ...prev,
            faq: {
                ...prev.faq,
                questions: prev.faq.questions.map(q =>
                    q.id === id ? { ...q, [field]: value } : q
                )
            }
        }));
    };

    const addQuestion = () => {
        const newId = Math.max(...content.faq.questions.map(q => q.id)) + 1;
        setContent(prev => ({
            ...prev,
            faq: {
                ...prev.faq,
                questions: [...prev.faq.questions, {
                    id: newId,
                    question: "New Question?",
                    answer: "Answer here..."
                }]
            }
        }));
    };

    const deleteQuestion = (id) => {
        if (window.confirm('Delete this question?')) {
            setContent(prev => ({
                ...prev,
                faq: {
                    ...prev.faq,
                    questions: prev.faq.questions.filter(q => q.id !== id)
                }
            }));
        }
    };

    const updateCTA = (field, value) => {
        setContent(prev => ({
            ...prev,
            cta: { ...prev.cta, [field]: value }
        }));
    };

    const updateFooter = (field, value) => {
        setContent(prev => ({
            ...prev,
            footer: { ...prev.footer, [field]: value }
        }));
    };

    const updateSocialLink = (platform, value) => {
        setContent(prev => ({
            ...prev,
            footer: {
                ...prev.footer,
                socialLinks: { ...prev.footer.socialLinks, [platform]: value }
            }
        }));
    };

    if (!content || !content.features || !content.faq || !content.cta || !content.footer) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rot-red mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading Admin Panel...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="bg-zinc-900 border-2 border-rot-red p-8 shadow-2xl relative">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rot-red/50" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rot-red/50" />

                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rot-red/10 border-2 border-rot-red rounded-full mb-4">
                                <Lock className="w-8 h-8 text-rot-red" />
                            </div>
                            <h1 className="text-3xl font-black uppercase text-white mb-2 tracking-tighter distressed">Admin Login</h1>
                            <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">R.O.T Content Management System</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {loginError && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-3 text-xs uppercase font-bold tracking-wider"
                                >
                                    {loginError}
                                </motion.div>
                            )}

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">
                                    Admin User
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 placeholder:text-zinc-700"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 placeholder:text-zinc-700"
                                    required
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: '#b91c1c' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-rot-red text-white px-6 py-4 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-rot-red/20"
                            >
                                <LogIn size={18} />
                                Login to Admin Panel
                            </motion.button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                            <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">
                                Riders of Technopark
                            </p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-gray-600 text-xs tracking-wider">
                            🔒 Unauthorized access is prohibited
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter distressed">R.O.T Admin Panel</h1>
                        <p className="text-gray-400 text-xs uppercase tracking-widest">Manage your brotherhood's digital presence</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-rot-red transition-all duration-300 font-bold uppercase tracking-wider text-sm"
                        >
                            Logout
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReset}
                            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 font-bold uppercase tracking-wider text-sm"
                        >
                            Reset Defaults
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#b91c1c' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-6 py-3 bg-rot-red transition-all duration-300 font-black uppercase tracking-widest text-sm flex items-center gap-2 shadow-lg shadow-rot-red/20 ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            <Save size={18} />
                            {isSaving ? 'Saving...' : (saved ? 'Changes Saved!' : 'Save Changes')}
                        </motion.button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex gap-2 mb-8 border-b border-zinc-900 overflow-x-auto pb-px scrollbar-hide">
                    {['hero', 'about', 'features', 'rides', 'faq', 'cta', 'footer'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 font-black uppercase tracking-widest text-xs transition-all duration-300 relative ${activeTab === tab
                                ? 'text-rot-red'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-rot-red"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Area - Table Based */}
                <div className="bg-zinc-900/50 border border-zinc-900 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-900 border-b border-zinc-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500 w-1/4">Field / Property</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500">Value / Content</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {activeTab === 'hero' && (
                                <>
                                    <tr>
                                        <td className="px-6 py-8 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Hero Image</span>
                                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">Main background</p>
                                        </td>
                                        <td className="px-6 py-6 transition-all duration-500">
                                            <ImageUploader
                                                value={content.hero.backgroundImage}
                                                onChange={(value) => updateHero('backgroundImage', value)}
                                                previewHeight="h-48"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Tagline</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <input
                                                type="text"
                                                value={content.hero.tagline}
                                                onChange={(e) => updateHero('tagline', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Main Title</span>
                                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">Use multiline if needed</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <textarea
                                                value={content.hero.title}
                                                onChange={(e) => updateHero('title', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 min-h-[100px]"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Subtitle</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <input
                                                type="text"
                                                value={content.hero.subtitle}
                                                onChange={(e) => updateHero('subtitle', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300"
                                            />
                                        </td>
                                    </tr>
                                </>
                            )}

                            {activeTab === 'about' && (
                                <>
                                    <tr>
                                        <td className="px-6 py-8 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Group Photo</span>
                                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">About section image</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <ImageUploader
                                                value={content.about.ridersImage}
                                                onChange={(value) => updateAbout('ridersImage', value)}
                                                previewHeight="h-64"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Section Title</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <input
                                                type="text"
                                                value={content.about.title}
                                                onChange={(e) => updateAbout('title', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Story Para 1</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <textarea
                                                value={content.about.description1}
                                                onChange={(e) => updateAbout('description1', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 min-h-[120px]"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Story Para 2</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <textarea
                                                value={content.about.description2}
                                                onChange={(e) => updateAbout('description2', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 min-h-[120px]"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="px-6 py-10 bg-zinc-900/30">
                                            <div className="flex justify-between items-center mb-6">
                                                <div>
                                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-rot-red">Storytelling Journey (Dedicated About Page)</h3>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Manage the sections for the full /about page</p>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={addStoryBlock}
                                                    className="px-4 py-2 bg-rot-red hover:bg-red-800 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                                                >
                                                    <Plus size={14} /> Add Story Chapter
                                                </motion.button>
                                            </div>

                                            <div className="space-y-8">
                                                {(content.about.story || []).map((block, idx) => (
                                                    <div key={block.id || idx} className="bg-zinc-950 border border-zinc-800 p-6 relative group">
                                                        <div className="absolute top-4 right-4 z-10">
                                                            <button
                                                                onClick={() => deleteStoryBlock(block.id)}
                                                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                                            <div className="space-y-4">
                                                                <div className="flex items-center gap-4 mb-2">
                                                                    <span className="text-xs font-black text-rot-red tracking-widest">CHAPTER 0{idx + 1}</span>
                                                                    <div className="h-px flex-1 bg-zinc-900"></div>
                                                                </div>

                                                                <div className="space-y-1">
                                                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Chapter Title</label>
                                                                    <input
                                                                        type="text"
                                                                        value={block.title}
                                                                        onChange={(e) => updateStoryBlock(block.id, 'title', e.target.value)}
                                                                        className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-sm transition-all duration-300 font-black uppercase tracking-tighter"
                                                                    />
                                                                </div>

                                                                <div className="space-y-1">
                                                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Content Text</label>
                                                                    <textarea
                                                                        value={block.content}
                                                                        onChange={(e) => updateStoryBlock(block.id, 'content', e.target.value)}
                                                                        className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2 text-gray-400 focus:border-rot-red outline-none text-xs leading-relaxed transition-all duration-300 h-32 italic"
                                                                    />
                                                                </div>

                                                                <div className="flex gap-4">
                                                                    <div className="flex-1 space-y-1">
                                                                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Image Side</label>
                                                                        <select
                                                                            value={block.imageSide}
                                                                            onChange={(e) => updateStoryBlock(block.id, 'imageSide', e.target.value)}
                                                                            className="w-full bg-zinc-900 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-xs transition-all duration-300"
                                                                        >
                                                                            <option value="left">Left</option>
                                                                            <option value="right">Right (Default)</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Caricature / Image</label>
                                                                <ImageUploader
                                                                    value={block.image}
                                                                    onChange={(value) => updateStoryBlock(block.id, 'image', value)}
                                                                    previewHeight="h-full min-h-[200px]"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="px-6 py-10 bg-zinc-900/10 border-t border-zinc-800">
                                            <div>
                                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-rot-red mb-1">Story Closer (Inspirational Quote)</h3>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">The cinematic finale of your About page story</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Subtitle</label>
                                                    <input
                                                        type="text"
                                                        value={content.about.storyCloser?.subtitle || ""}
                                                        onChange={(e) => setContent({
                                                            ...content,
                                                            about: {
                                                                ...content.about,
                                                                storyCloser: { ...content.about.storyCloser, subtitle: e.target.value }
                                                            }
                                                        })}
                                                        className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 text-sm font-bold uppercase tracking-widest"
                                                        placeholder="The Journey Continues"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Footer Text</label>
                                                    <input
                                                        type="text"
                                                        value={content.about.storyCloser?.footer || ""}
                                                        onChange={(e) => setContent({
                                                            ...content,
                                                            about: {
                                                                ...content.about,
                                                                storyCloser: { ...content.about.storyCloser, footer: e.target.value }
                                                            }
                                                        })}
                                                        className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 text-sm font-bold uppercase tracking-widest"
                                                        placeholder="RIDERS OF TECHNOPARK"
                                                    />
                                                </div>
                                                <div className="space-y-1 md:col-span-2">
                                                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Main Quote / Title</label>
                                                    <textarea
                                                        value={content.about.storyCloser?.title || ""}
                                                        onChange={(e) => setContent({
                                                            ...content,
                                                            about: {
                                                                ...content.about,
                                                                storyCloser: { ...content.about.storyCloser, title: e.target.value }
                                                            }
                                                        })}
                                                        className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300 min-h-[100px] text-lg font-black uppercase tracking-tighter"
                                                        placeholder="Enter the inspirational quote here..."
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )}

                            {activeTab === 'features' && (
                                <>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Header Content</span>
                                        </td>
                                        <td className="px-6 py-6 space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Main Title</label>
                                                <input
                                                    type="text"
                                                    value={content.features.title}
                                                    onChange={(e) => updateFeatures('title', e.target.value)}
                                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Subtitle</label>
                                                <input
                                                    type="text"
                                                    value={content.features.subtitle}
                                                    onChange={(e) => updateFeatures('subtitle', e.target.value)}
                                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Core Values</span>
                                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">Iconic pillars</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="space-y-4">
                                                {content.features.values.map((value, idx) => (
                                                    <div key={idx} className="bg-zinc-950/50 p-4 border border-zinc-900 group hover:border-rot-red/30 transition-all duration-300">
                                                        <div className="flex gap-4">
                                                            <div className="flex-1 space-y-3">
                                                                <input
                                                                    type="text"
                                                                    value={value.title}
                                                                    onChange={(e) => updateFeatureValue(idx, 'title', e.target.value)}
                                                                    className="w-full bg-transparent border-b border-zinc-800 px-2 py-1 text-white font-bold uppercase tracking-wider focus:border-rot-red outline-none text-sm transition-all duration-300"
                                                                />
                                                                <textarea
                                                                    value={value.desc}
                                                                    onChange={(e) => updateFeatureValue(idx, 'desc', e.target.value)}
                                                                    className="w-full bg-transparent border border-zinc-800 px-3 py-2 text-gray-400 focus:border-rot-red outline-none text-xs leading-relaxed transition-all duration-300 h-20"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )}

                            {activeTab === 'rides' && (
                                <>
                                    <tr>
                                        <td colSpan="2" className="px-6 py-4 bg-zinc-900/30">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-black uppercase tracking-[0.2em] text-rot-red">Total Rides: {content.rides.length}</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={addRide}
                                                    className="px-4 py-2 bg-rot-red hover:bg-red-800 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                                                >
                                                    <Plus size={14} /> Add New Ride
                                                </motion.button>
                                            </div>
                                        </td>
                                    </tr>
                                    {content.rides.map((ride, idx) => (
                                        <tr key={ride.id} className="group hover:bg-zinc-900/30 transition-all duration-300">
                                            <td className="px-6 py-6 align-top">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-lg font-black text-zinc-800">#{(idx + 1).toString().padStart(2, '0')}</span>
                                                    <div>
                                                        <span className="text-sm font-bold uppercase tracking-wider text-white block truncate max-w-[150px]">{ride.title}</span>
                                                        <span className="text-[10px] text-gray-600 uppercase tracking-widest">{ride.type}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ride Name</label>
                                                                <input type="text" value={ride.title} onChange={(e) => updateRide(ride.id, 'title', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-xs transition-all duration-300" />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Category</label>
                                                                <input type="text" value={ride.type} onChange={(e) => updateRide(ride.id, 'type', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-xs transition-all duration-300" />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Location</label>
                                                                <input type="text" value={ride.location} onChange={(e) => updateRide(ride.id, 'location', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-xs transition-all duration-300" />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Date</label>
                                                                <input type="text" value={ride.date} onChange={(e) => updateRide(ride.id, 'date', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-xs transition-all duration-300" />
                                                            </div>
                                                        </div>
                                                        <div className="pt-2">
                                                            <button
                                                                onClick={() => deleteRide(ride.id)}
                                                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-red-500 transition-all duration-300"
                                                            >
                                                                <X size={12} /> Remove Ride Entry
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="relative group/img">
                                                        <ImageUploader
                                                            value={ride.image}
                                                            onChange={(value) => updateRide(ride.id, 'image', value)}
                                                            previewHeight="h-32"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}

                            {activeTab === 'faq' && (
                                <>
                                    <tr>
                                        <td className="px-6 py-6 align-top">
                                            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Section Headers</span>
                                        </td>
                                        <td className="px-6 py-6 space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Title</label>
                                                <input
                                                    type="text"
                                                    value={content.faq.title}
                                                    onChange={(e) => updateFAQ('title', e.target.value)}
                                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Subtitle</label>
                                                <input
                                                    type="text"
                                                    value={content.faq.subtitle}
                                                    onChange={(e) => updateFAQ('subtitle', e.target.value)}
                                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none transition-all duration-300"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="px-6 py-4 bg-zinc-900/30">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-black uppercase tracking-[0.2em] text-rot-red">Q&A Management</span>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={addQuestion}
                                                    className="px-4 py-2 bg-rot-red hover:bg-red-800 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                                                >
                                                    <Plus size={14} /> Add FAQ Item
                                                </motion.button>
                                            </div>
                                        </td>
                                    </tr>
                                    {content.faq.questions.map(question => (
                                        <tr key={question.id} className="hover:bg-zinc-900/30 transition-all duration-300">
                                            <td className="px-6 py-6 align-top">
                                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">Question ID: {question.id}</span>
                                                <button
                                                    onClick={() => deleteQuestion(question.id)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:text-red-500 transition-all duration-300 flex items-center gap-1"
                                                >
                                                    <X size={10} /> Delete
                                                </button>
                                            </td>
                                            <td className="px-6 py-6 space-y-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-gray-600 uppercase tracking-widest font-black">Question</label>
                                                    <input
                                                        type="text"
                                                        value={question.question}
                                                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                                        className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-sm transition-all duration-300"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-gray-600 uppercase tracking-widest font-black">Answer</label>
                                                    <textarea
                                                        value={question.answer}
                                                        onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                                                        className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-gray-400 focus:border-rot-red outline-none text-xs transition-all duration-300 h-24"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}

                            {(activeTab === 'cta' || activeTab === 'footer') && (
                                <>
                                    {activeTab === 'cta' && (
                                        <>
                                            <tr>
                                                <td className="px-6 py-6 align-top"><span className="text-sm font-bold uppercase tracking-wider text-gray-400">Background</span></td>
                                                <td className="px-6 py-6"><ImageUploader value={content.cta.backgroundImage} onChange={(value) => updateCTA('backgroundImage', value)} previewHeight="h-48" /></td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-6 align-top"><span className="text-sm font-bold uppercase tracking-wider text-gray-400">Call to Action</span></td>
                                                <td className="px-6 py-6 space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Main Heading</label>
                                                            <input type="text" value={content.cta.title} onChange={(e) => updateCTA('title', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-sm" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Accent Word</label>
                                                            <input type="text" value={content.cta.titleAccent} onChange={(e) => updateCTA('titleAccent', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white font-black text-rot-red focus:border-rot-red outline-none text-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Subtitle</label>
                                                        <input type="text" value={content.cta.subtitle} onChange={(e) => updateCTA('subtitle', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-sm" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Action Button & Meta</label>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <input type="text" value={content.cta.buttonText} onChange={(e) => updateCTA('buttonText', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-xs" placeholder="Button Text" />
                                                            <input type="text" value={content.cta.footerText} onChange={(e) => updateCTA('footerText', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-xs" placeholder="Botton Link/Text" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )}

                                    {activeTab === 'footer' && (
                                        <>
                                            <tr>
                                                <td className="px-6 py-6 align-top"><span className="text-sm font-bold uppercase tracking-wider text-gray-400">Footer Tagline</span></td>
                                                <td className="px-6 py-6"><input type="text" value={content.footer.tagline} onChange={(e) => updateFooter('tagline', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none text-sm" /></td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-6 align-top"><span className="text-sm font-bold uppercase tracking-wider text-gray-400">About Brief</span></td>
                                                <td className="px-6 py-6"><textarea value={content.footer.description} onChange={(e) => updateFooter('description', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-gray-400 focus:border-rot-red outline-none text-xs h-24" /></td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-6 align-top"><span className="text-sm font-bold uppercase tracking-wider text-gray-400">Location Details</span></td>
                                                <td className="px-6 py-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Venue</label>
                                                            <input type="text" value={content.footer.location} onChange={(e) => updateFooter('location', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-xs" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">City</label>
                                                            <input type="text" value={content.footer.city} onChange={(e) => updateFooter('city', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:border-rot-red outline-none text-xs" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Schedule</label>
                                                            <input type="text" value={content.footer.schedule} onChange={(e) => updateFooter('schedule', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-rot-red font-black focus:border-rot-red outline-none text-xs" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-6 align-top"><span className="text-sm font-bold uppercase tracking-wider text-gray-400">Connectivity</span></td>
                                                <td className="px-6 py-6">
                                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                                        {Object.entries(content.footer.socialLinks).map(([platform, url]) => (
                                                            <div key={platform} className="space-y-1">
                                                                <label className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">{platform}</label>
                                                                <input
                                                                    type="text"
                                                                    value={url}
                                                                    onChange={(e) => updateSocialLink(platform, e.target.value)}
                                                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white/70 focus:border-rot-red outline-none text-[11px] transition-all duration-300"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Status Bar */}
                <div className="mt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-700">
                    <span>System Online // V1.2.0</span>
                    <span className="text-rot-red">Authorized Entry Only</span>
                </div>
            </div>
        </div >
    );

};

export default Admin;
