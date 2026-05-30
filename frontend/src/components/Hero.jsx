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
            } pt-28 pb-16`}>
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

            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-text-dark leading-tight mb-6 font-poppins">
                        Pure Water. <br />
                        <span className="text-primary">Healthy Life.</span>
                    </h1>
                    <p className="text-xl text-text-muted mb-8 max-w-lg font-nunito">
                        India's Most Trusted RO Purifiers for Every Home. Get 100% pure water with our advanced 5-stage purification technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate('/purifiers')}
                            className="bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_15px_30px_rgba(2,132,199,0.4)] active:scale-[0.98] transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2 group"
                        >
                            <span>Shop Models</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                        <button
                            onClick={() => navigate('/spare-parts')}
                            className="bg-white dark:bg-slate-800/80 text-primary dark:text-white border border-slate-200 dark:border-slate-700/60 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-100/10 transition-all duration-300 active:scale-[0.98] text-center flex items-center justify-center"
                        >
                            Shop Spare Parts
                        </button>
                    </div>

                    <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <ShieldCheck className="text-primary" />, title: "ISI Certified", sub: "Safety Guaranteed" },
                            { icon: <UserCheck className="text-primary" />, title: "Expert Techs", sub: "Professional Care" },
                            { icon: <Wrench className="text-primary" />, title: "Free Install", sub: "Zero Extra Cost" },
                            { icon: <Headset className="text-primary" />, title: "24/7 Support", sub: "Always Here" },
                            { icon: <Heart className="text-primary" />, title: "Full Warranty", sub: "Peace of Mind" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="flex items-center gap-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-3 rounded-2xl border border-white/20 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all group"
                            >
                                <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                    {React.cloneElement(item.icon, { size: 20 })}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-text-dark font-poppins">{item.title}</h4>
                                    <p className="text-[10px] text-text-muted font-nunito">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 p-4">
                        {/* Modern Organic Mask for seamless integration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative rounded-[4rem] md:rounded-[8rem] lg:rounded-[12rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-8 border-white/20 backdrop-blur-sm"
                        >
                            <img
                                src="/images/hero-family-purifier-final.png"
                                alt="Family with Siddharth RO Purifier"
                                className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
                            />
                            {/* Subtle overlay to enhance blending */}
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        </motion.div>
                    </div>
                    {/* Glowing effect behind image - more organic and layered */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 dark:bg-primary/10 rounded-full -z-10 blur-[150px] animate-pulse"></div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full -z-10 blur-[80px]"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
