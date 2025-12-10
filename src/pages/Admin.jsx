import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image, X, Plus } from 'lucide-react';
import { loadContent, saveContent, siteContent } from '../data/content';
import ImageUploader from '../components/ImageUploader';

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

    // Safety check - ensure content is fully loaded
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
                <div className="flex gap-4 mb-8 border-b border-zinc-800 overflow-x-auto">
                    {['hero', 'about', 'features', 'rides', 'faq', 'cta', 'footer'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors whitespace-nowrap ${activeTab === tab
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
                        <ImageUploader
                            label="Background Image"
                            value={content.hero.backgroundImage}
                            onChange={(value) => updateHero('backgroundImage', value)}
                            previewHeight="h-48"
                        />

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
                        <ImageUploader
                            label="Riders Group Image"
                            value={content.about.ridersImage}
                            onChange={(value) => updateAbout('ridersImage', value)}
                            previewHeight="h-64"
                        />
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
                                            <ImageUploader
                                                label="Ride Image"
                                                value={ride.image}
                                                onChange={(value) => updateRide(ride.id, 'image', value)}
                                                previewHeight="h-32"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Features Section */}
                {activeTab === 'features' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Section Title
                            </label>
                            <input
                                type="text"
                                value={content.features.title}
                                onChange={(e) => updateFeatures('title', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={content.features.subtitle}
                                onChange={(e) => updateFeatures('subtitle', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold uppercase">Values</h3>
                            {content.features.values.map((value, idx) => (
                                <div key={idx} className="bg-zinc-900 p-6 border border-zinc-800">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={value.title}
                                                onChange={(e) => updateFeatureValue(idx, 'title', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Description
                                            </label>
                                            <textarea
                                                value={value.desc}
                                                onChange={(e) => updateFeatureValue(idx, 'desc', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                {activeTab === 'faq' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Section Title
                            </label>
                            <input
                                type="text"
                                value={content.faq.title}
                                onChange={(e) => updateFAQ('title', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={content.faq.subtitle}
                                onChange={(e) => updateFAQ('subtitle', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold uppercase">Questions</h3>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={addQuestion}
                                className="px-4 py-2 bg-rot-red hover:bg-red-800 transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-2"
                            >
                                <Plus size={18} /> Add Question
                            </motion.button>
                        </div>

                        <div className="grid gap-6">
                            {content.faq.questions.map(question => (
                                <div key={question.id} className="bg-zinc-900 p-6 border border-zinc-800 relative">
                                    <button
                                        onClick={() => deleteQuestion(question.id)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="grid gap-4 pr-8">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Question
                                            </label>
                                            <input
                                                type="text"
                                                value={question.question}
                                                onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                                Answer
                                            </label>
                                            <textarea
                                                value={question.answer}
                                                onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                {activeTab === 'cta' && (
                    <div className="space-y-6">
                        <ImageUploader
                            label="Background Image"
                            value={content.cta.backgroundImage}
                            onChange={(value) => updateCTA('backgroundImage', value)}
                            previewHeight="h-48"
                            aspectRatio={16 / 9}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                    Title (First Line)
                                </label>
                                <input
                                    type="text"
                                    value={content.cta.title}
                                    onChange={(e) => updateCTA('title', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                    Title Accent (Second Line)
                                </label>
                                <input
                                    type="text"
                                    value={content.cta.titleAccent}
                                    onChange={(e) => updateCTA('titleAccent', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={content.cta.subtitle}
                                onChange={(e) => updateCTA('subtitle', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Description
                            </label>
                            <textarea
                                value={content.cta.description}
                                onChange={(e) => updateCTA('description', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Button Text
                            </label>
                            <input
                                type="text"
                                value={content.cta.buttonText}
                                onChange={(e) => updateCTA('buttonText', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Footer Text
                            </label>
                            <input
                                type="text"
                                value={content.cta.footerText}
                                onChange={(e) => updateCTA('footerText', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>
                    </div>
                )}

                {/* Footer Section */}
                {activeTab === 'footer' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={content.footer.tagline}
                                onChange={(e) => updateFooter('tagline', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                Description
                            </label>
                            <textarea
                                value={content.footer.description}
                                onChange={(e) => updateFooter('description', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={content.footer.location}
                                    onChange={(e) => updateFooter('location', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={content.footer.city}
                                    onChange={(e) => updateFooter('city', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-400">
                                    Schedule
                                </label>
                                <input
                                    type="text"
                                    value={content.footer.schedule}
                                    onChange={(e) => updateFooter('schedule', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-white focus:border-rot-red outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold uppercase mb-4">Social Links</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                        Instagram URL
                                    </label>
                                    <input
                                        type="text"
                                        value={content.footer.socialLinks.instagram}
                                        onChange={(e) => updateSocialLink('instagram', e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                        Facebook URL
                                    </label>
                                    <input
                                        type="text"
                                        value={content.footer.socialLinks.facebook}
                                        onChange={(e) => updateSocialLink('facebook', e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        value={content.footer.socialLinks.email}
                                        onChange={(e) => updateSocialLink('email', e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                        placeholder="mailto:info@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={content.footer.socialLinks.phone}
                                        onChange={(e) => updateSocialLink('phone', e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-white focus:border-rot-red outline-none text-sm"
                                        placeholder="tel:+91xxxxxxxxxx"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
