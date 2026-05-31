import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, User, MessageSquare, Droplet, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        city: '',
        productInterest: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const products = [
        "AquaPure Essential", "AquaPure Plus", "AquaPure Smart",
        "AquaPure Grand", "AquaPure Mini", "AquaPure Pro Max", "Spare Parts"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!/^\d{10}$/.test(formData.mobile)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post('/api/contact', formData);
            toast.success("Enquiry sent successfully! We will contact you soon.");
            setFormData({ name: '', mobile: '', city: '', productInterest: '', message: '' });
        } catch (err) {
            toast.error("Failed to send enquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="pt-4 pb-12 lg:pb-20 bg-bg-light transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-text-dark mb-4 lg:mb-6 font-poppins">Get in Touch</h2>
                        <p className="text-text-muted mb-6 lg:mb-8 font-nunito text-sm lg:text-base">Have questions? Our team is here to help you choose the best purification system for your home.</p>

                        <div className="space-y-6 mb-6 lg:mb-8">
                            <div className="flex gap-4 group">
                                <div className="bg-primary text-white p-3 rounded-lg group-hover:scale-110 transition-transform"><MapPin size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-text-dark font-poppins text-base lg:text-lg">Our Address</h4>
                                    <p className="text-text-muted font-nunito italic text-sm lg:text-base">Siddharth RO Systems, Moti Bazar, Gondal, Gujarat - 360311</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="bg-primary text-white p-3 rounded-lg group-hover:scale-110 transition-transform"><Phone size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-text-dark font-poppins text-base lg:text-lg">Phone Number</h4>
                                    <p className="text-text-muted font-nunito text-sm lg:text-base">+91 9925852850</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="bg-primary text-white p-3 rounded-lg group-hover:scale-110 transition-transform"><Mail size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-text-dark font-poppins text-base lg:text-lg">Email Support</h4>
                                    <p className="text-text-muted font-nunito lowercase text-sm lg:text-base">support@siddharthro.in</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 lg:mt-8 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-xl lg:shadow-2xl h-48 w-full max-w-full lg:max-w-md border border-border group/map relative">
                            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover/map:opacity-0 transition-opacity"></div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.272102142277!2d70.79589997593122!3d21.96196425501865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395819779361ad21%3A0xe542617f69275bd6!2sGondal%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/75 dark:bg-slate-900/75 backdrop-blur-xl p-5 sm:p-8 lg:p-12 rounded-[2.25rem] lg:rounded-3xl shadow-2xl h-fit border border-white/20 dark:border-slate-800/80 relative overflow-hidden"
                    >
                        {/* Soft background glows on mobile */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

                        <h3 className="text-xl lg:text-2xl font-bold text-text-dark mb-5 lg:mb-6 font-poppins text-left">Send Enquiry</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 font-nunito">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="relative flex items-center">
                                    <User className="absolute left-4 text-slate-400 dark:text-slate-500" size={18} />
                                    <input
                                        type="text" placeholder="Full Name" required
                                        className="w-full pl-12 pr-4 py-3.5 lg:p-4 bg-bg-light/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 focus:border-primary rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-dark placeholder-slate-400 transition-all font-nunito"
                                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="relative flex items-center">
                                    <Phone className="absolute left-4 text-slate-400 dark:text-slate-500" size={18} />
                                    <input
                                        type="tel" placeholder="Mobile Number" required
                                        className="w-full pl-12 pr-4 py-3.5 lg:p-4 bg-bg-light/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 focus:border-primary rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-dark placeholder-slate-400 transition-all font-nunito"
                                        value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="relative flex items-center">
                                    <MapPin className="absolute left-4 text-slate-400 dark:text-slate-500" size={18} />
                                    <input
                                        type="text" placeholder="City" required
                                        className="w-full pl-12 pr-4 py-3.5 lg:p-4 bg-bg-light/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 focus:border-primary rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-dark placeholder-slate-400 transition-all font-nunito"
                                        value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                                <div className="relative flex items-center">
                                    <Droplet className="absolute left-4 text-slate-400 dark:text-slate-500" size={18} />
                                    <select
                                        className="w-full pl-12 pr-10 py-3.5 lg:p-4 bg-bg-light/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 focus:border-primary rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 appearance-none text-text-dark font-nunito"
                                        value={formData.productInterest} onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                                        required
                                    >
                                        <option value="" className="text-slate-400">Interested in...</option>
                                        {products.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 text-slate-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <MessageSquare className="absolute left-4 top-4 text-slate-400 dark:text-slate-500" size={18} />
                                <textarea
                                    placeholder="How can we help you?" rows="4" required
                                    className="w-full pl-12 pr-4 py-3.5 lg:p-4 bg-bg-light/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 focus:border-primary rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none text-text-dark placeholder-slate-400 transition-all font-nunito"
                                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white py-4 rounded-xl lg:rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] active:translate-y-0.5 transition-all duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2 select-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <span>Send Enquiry</span>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
