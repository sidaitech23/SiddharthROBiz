import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Headset, UserCheck, Wrench, Heart } from 'lucide-react';

const Hero = ({ isDarkMode }) => {
    const navigate = useNavigate();
    return (
        <section className={`relative min-h-[70vh] flex items-center overflow-hidden transition-colors duration-700 ${isDarkMode
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-bg-primary'
            : 'bg-gradient-to-b from-blue-50/50 via-white to-bg-primary'
            } pt-20 lg:pt-28 pb-8 lg:pb-16`}>
            {/* Background Bubbles */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="bubble"
                    style={{
                        '--left': `${Math.random() * 100}%`,
                        '--size': `${20 + Math.random() * 40}px`,
                        '--duration': `${5 + Math.random() * 10}s`,
                        '--delay': `${Math.random() * 5}s`
                    }}
                />
            ))}

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10 text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                    {/* Premium Floating Tag for Mobile/Tablet */}
                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 dark:bg-primary/20 dark:border-primary/30 text-primary dark:text-blue-400 rounded-full text-xs font-black font-poppins uppercase tracking-wider select-none shadow-sm active:scale-95 transition-transform duration-300">
                        <span className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full animate-ping"></span>
                        ✨ India's Most Trusted RO Brand
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-text-dark leading-tight mb-4 lg:mb-6 font-poppins">
                        Pure Water. <br className="hidden sm:inline lg:inline" />
                        <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Healthy Life.</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-text-muted mb-6 lg:mb-8 max-w-lg font-nunito">
                        India's Most Trusted RO Purifiers for Every Home. Get 100% pure water with our advanced 5-stage purification technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center lg:justify-start">
                        <button
                            onClick={() => navigate('/purifiers')}
                            className="bg-gradient-to-r from-primary to-blue-600 text-white px-8 lg:px-10 py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg hover:shadow-[0_15px_30px_rgba(2,132,199,0.4)] active:scale-[0.96] active:translate-y-0.5 transition-all duration-200 shadow-md text-center flex items-center justify-center gap-2 group"
                        >
                            <span>Shop Models</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                        <button
                            onClick={() => navigate('/spare-parts')}
                            className="bg-white dark:bg-slate-800/80 text-primary dark:text-white border border-slate-200 dark:border-slate-700/60 px-8 lg:px-10 py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-100/10 transition-all duration-200 active:scale-[0.96] active:translate-y-0.5 text-center flex items-center justify-center"
                        >
                            Shop Spare Parts
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative mt-4 lg:mt-0 w-full flex justify-center"
                >
                    <div className="relative z-10 p-2 sm:p-4 max-w-[280px] sm:max-w-md mx-auto lg:max-w-none w-full">
                        {/* Modern Capsule Arch Mask */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative rounded-[8rem] sm:rounded-[10rem] lg:rounded-[16rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.18)] border-4 lg:border-8 border-white dark:border-slate-800 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 aspect-[4/5] sm:aspect-auto"
                        >
                            <img
                                src="/images/hero-family-purifier-final.png"
                                alt="Family with Siddharth RO Purifier"
                                className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
                        </motion.div>
                    </div>
                    {/* Glowing effect behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/20 dark:bg-primary/10 rounded-full -z-10 blur-[120px] animate-pulse"></div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full -z-10 blur-[80px]"></div>
                </motion.div>

                {/* Service Badges Row at the bottom - Premium responsive grid layout */}
                <div className="lg:col-span-2 w-full mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                    {[
                        { icon: <ShieldCheck className="text-primary" />, title: "ISI Certified", sub: "Safety Guaranteed" },
                        { icon: <UserCheck className="text-primary" />, title: "Expert Techs", sub: "Professional Care" },
                        { icon: <Wrench className="text-primary" />, title: "Free Install", sub: "Zero Extra Cost" },
                        { icon: <Headset className="text-primary" />, title: "24/7 Support", sub: "Always Here" },
                        { icon: <Heart className="text-primary" />, title: "Full Warranty", sub: "Peace of Mind" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className={`flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-3.5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer select-none ${
                                i === 4 ? 'col-span-2 md:col-span-1' : ''
                            }`}
                        >
                            <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                {React.cloneElement(item.icon, { size: 20 })}
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-text-dark font-poppins">{item.title}</h4>
                                <p className="text-[10px] text-text-muted font-nunito">{item.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
