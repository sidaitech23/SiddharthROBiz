import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, Clock, Droplets } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <Droplets className="text-primary" size={32} />,
            title: "Advanced 5-Stage Purification",
            desc: "Removes bacteria, viruses, and dissolved chemicals for 100% pure water."
        },
        {
            icon: <Wrench className="text-primary" size={32} />,
            title: "Free Installation & Demo",
            desc: "Expert installation and comprehensive product demo at your doorstep."
        },
        {
            icon: <ShieldCheck className="text-primary" size={32} />,
            title: "Complete Protection",
            desc: "Full peace of mind with 1-year coverage on all electrical parts."
        },
        {
            icon: <Clock className="text-primary" size={32} />,
            title: "24/7 Customer Support",
            desc: "Quick service response and technical support whenever you need it."
        }
    ];

    return (
        <section id="about" className="pt-4 pb-4 bg-card transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 font-nunito">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-text-dark mb-4 font-poppins">Why Choose Siddharth RO?</h2>
                    <p className="text-text-muted max-w-2xl mx-auto">We combine cutting-edge technology with best-in-class service to deliver purity in every drop.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-bg-light dark:bg-slate-800/50 hover:bg-card border border-transparent hover:border-primary transition-all group shadow-sm hover:shadow-xl"
                        >
                            <div className="bg-card w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text-dark mb-3 font-poppins">{f.title}</h3>
                            <p className="text-text-muted leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
