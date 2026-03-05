'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bike, Phone, Briefcase, User, Calendar, Droplets, Heart, Instagram, Send, ChevronRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CustomSelect from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomInput from '../../components/CustomInput';

const JoinPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        bloodGroup: '',
        company: 'Technopark',
        designation: '',
        phone: '',
        emergencyContact: {
            name: '',
            phone: ''
        },
        motorcycle: '',
        experience: '',
        instagram: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit registration');
            }

            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (isSuccess) {
        return (
            <main className="bg-zinc-950 min-h-screen text-white pt-24">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="w-24 h-24 bg-rot-red/20 rounded-full flex items-center justify-center border-2 border-rot-red">
                            <CheckCircle2 className="w-12 h-12 text-rot-red" />
                        </div>
                    </motion.div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 distressed">Welcome to the Brotherhood</h1>
                    <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-medium">
                        Your registration has been received. Our council will review your profile and contact you shortly.
                        In the meantime, gear up and stay ready.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <a
                            href="https://chat.whatsapp.com/G5iEa3nLpGf5m7kGj8vL"
                            target="_blank"
                            className="bg-rot-red hover:bg-white hover:text-black text-white px-10 py-5 font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl border border-transparent hover:border-white"
                        >
                            Join Community Chat <ChevronRight size={20} />
                        </a>
                        <a
                            href="/"
                            className="bg-zinc-900 border border-zinc-800 hover:border-rot-red text-white px-10 py-5 font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center"
                        >
                            Back Home
                        </a>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="bg-zinc-950 min-h-screen text-white pt-24">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.3)_0%,transparent_50%)]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-rot-red font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                    >
                        Join The Inner Circle
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-7xl font-black uppercase tracking-tighter distressed mb-6"
                    >
                        Rider Registration
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg max-w-2xl mx-auto italic font-medium"
                    >
                        We plan like engineers, ride like warriors. If you're ready to embrace the R.O.T code, fill out the details below.
                    </motion.p>
                </div>
            </section>

            {/* Form Section */}
            <section className="max-w-4xl mx-auto px-6 pb-32">
                <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    onSubmit={handleSubmit}
                    className="space-y-12"
                >
                    {error && (
                        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 text-red-500 font-bold uppercase tracking-widest text-xs">
                            {error}
                        </div>
                    )}

                    {/* Personal Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 bg-rot-red/10 border border-rot-red/30 flex items-center justify-center text-rot-red">
                                <User size={20} />
                            </span>
                            <h2 className="text-2xl font-black uppercase tracking-widest">Personal Identification</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <CustomInput
                                    label="Full Name"
                                    icon={User}
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <CustomDatePicker
                                    label="Date of Birth"
                                    placeholder="Select DOB"
                                    value={formData.dob}
                                    onChange={(val) => setFormData(prev => ({ ...prev, dob: val }))}
                                />
                                <CustomSelect
                                    label="Blood Group"
                                    icon={Droplets}
                                    placeholder="Choose Group"
                                    options={bloodGroups}
                                    value={formData.bloodGroup}
                                    onChange={(val) => setFormData(prev => ({ ...prev, bloodGroup: val }))}
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Professional Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 bg-rot-red/10 border border-rot-red/30 flex items-center justify-center text-rot-red">
                                <Briefcase size={20} />
                            </span>
                            <h2 className="text-2xl font-black uppercase tracking-widest">Technopark Identity</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <CustomInput
                                    label="Company Name"
                                    icon={Briefcase}
                                    required
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="e.g. TCS, Infosys"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <CustomInput
                                    label="Designation"
                                    icon={User}
                                    required
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Software Engineer"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Contact & Emergency */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 bg-rot-red/10 border border-rot-red/30 flex items-center justify-center text-rot-red">
                                <Phone size={20} />
                            </span>
                            <h2 className="text-2xl font-black uppercase tracking-widest">Contact & Safety</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <CustomInput
                                    label="WhatsApp Number"
                                    icon={Phone}
                                    required
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <CustomInput
                                    label="Emergency Name"
                                    icon={Heart}
                                    required
                                    name="emergencyContact.name"
                                    value={formData.emergencyContact.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                />
                                <CustomInput
                                    label="Emergency Phone"
                                    icon={Phone}
                                    required
                                    name="emergencyContact.phone"
                                    value={formData.emergencyContact.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Riding Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 bg-rot-red/10 border border-rot-red/30 flex items-center justify-center text-rot-red">
                                <Bike size={24} />
                            </span>
                            <h2 className="text-2xl font-black uppercase tracking-widest">Riding Profile</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <CustomInput
                                    label="Motorcycle Model"
                                    icon={Bike}
                                    required
                                    name="motorcycle"
                                    value={formData.motorcycle}
                                    onChange={handleInputChange}
                                    placeholder="e.g. RE Himalayan"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <CustomInput
                                    label="Instagram Handle"
                                    icon={Instagram}
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleInputChange}
                                    placeholder="@username"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 h-4">
                                    <Send size={14} /> Riding Experience & Motivation
                                </label>
                                <textarea
                                    required
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about your years of riding or what you seek in a brotherhood..."
                                    className="w-full bg-zinc-900/50 border border-zinc-800 p-4 outline-none focus:border-rot-red transition-all font-medium h-32 italic text-sm text-white placeholder:text-zinc-500"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Submit */}
                    <motion.div variants={itemVariants} className="pt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-rot-red hover:bg-white hover:text-black text-white py-6 font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-2xl border border-transparent hover:border-white ${isSubmitting ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {isSubmitting ? 'Submitting Application...' : (
                                <>
                                    Join The Brotherhood <Send size={20} />
                                </>
                            )}
                        </button>
                    </motion.div>
                </motion.form>
            </section>

            <Footer />
        </main>
    );
};

export default JoinPage;
