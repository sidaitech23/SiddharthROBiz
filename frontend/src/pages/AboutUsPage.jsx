import React from 'react';
import { ShieldCheck, Award, Users, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUsPage = () => {
    const stats = [
        { label: 'Happy Customers', value: '15,000+' },
        { label: 'Service Centers', value: '25+' },
        { label: 'Years Experience', value: '18+' },
        { label: 'Expert Technicians', value: '100+' },
    ];

    return (
        <div className="pt-32 pb-20 bg-bg-light transition-colors duration-300 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6 font-poppins">Purity in Every Drop</h1>
                    <p className="text-xl text-text-muted max-w-3xl mx-auto font-nunito italic">
                        "At Siddharth RO, our mission is to ensure every Indian household has access to 100% pure, mineral-rich drinking water through advanced technology and unmatched service."
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
                        <h2 className="text-3xl font-bold mb-6 font-poppins text-primary">Our Journey</h2>
                        <p className="text-lg text-text-muted font-nunito leading-relaxed mb-6">
                            Founded in 2008 in Gondal, Gujarat, Siddharth RO Systems began with a simple vision: to combat water-borne diseases by providing affordable and reliable RO solutions. Over nearly two decades, we have evolved into a market leader known for technical excellence and local trust.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map(stat => (
                                <div key={stat.label} className="bg-card p-6 rounded-2xl border border-border shadow-md">
                                    <h4 className="text-3xl font-bold text-primary font-poppins">{stat.value}</h4>
                                    <p className="text-sm text-text-muted font-nunito">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group">
                        <img src="/images/about-image.jpg" alt="Water Purity technology" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <ShieldCheck size={40} />, title: "Quality First", desc: "Every component is ISI certified and tested for durability." },
                        { icon: <Award size={40} />, title: "Best Technology", desc: "Advanced 5-stage purification with mineral modulation." },
                        { icon: <Users size={40} />, title: "Community Driven", desc: "Local support and fast response for every neighborhood." }
                    ].map((feature, i) => (
                        <div key={i} className="bg-card p-10 rounded-3xl border border-border hover:border-primary transition-all text-center group">
                            <div className="text-primary mb-6 flex justify-center group-hover:scale-125 transition-transform">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 font-poppins text-text-dark">{feature.title}</h3>
                            <p className="text-text-muted font-nunito">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
