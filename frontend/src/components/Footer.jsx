import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Facebook, Instagram, Youtube, MessageCircle, ChevronDown } from 'lucide-react';

const Footer = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        if (window.innerWidth < 1024) { // Only toggle on mobile/tablet viewports
            setOpenSection(openSection === section ? null : section);
        }
    };

    return (
        <footer className="bg-slate-950 text-white pt-16 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-4 lg:mb-0">
                        <div className="flex items-center gap-4 mb-6 group justify-center lg:justify-start">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 overflow-hidden">
                                    <Droplet className="text-white fill-white/20" size={32} />
                                </div>
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex items-center gap-1">
                                    <span className="text-2xl font-black font-poppins text-white tracking-tighter leading-none">
                                        SIDDHARTH
                                    </span>
                                    <span className="text-2xl font-black font-poppins text-primary italic leading-none">
                                        RO
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase leading-none mt-2 border-t border-slate-800 pt-1">
                                    Premium Purification
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 font-nunito max-w-sm">
                            Dedicated to providing pure and healthy water solutions for Indian homes since 2008.
                        </p>
                        <div className="flex gap-4 mb-6 lg:mb-0 justify-center lg:justify-start">
                            {[
                                { icon: <Facebook size={20} />, href: "#" },
                                { icon: <Instagram size={20} />, href: "#" },
                                { icon: <Youtube size={20} />, href: "#" },
                                { icon: <MessageCircle size={20} />, href: "#" }
                            ].map((social, idx) => (
                                <a 
                                    key={idx} 
                                    href={social.href} 
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary active:scale-95 transition-all duration-300 shadow-inner"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="border-b border-slate-900 lg:border-none py-4 lg:py-0">
                        <button 
                            onClick={() => toggleSection('links')} 
                            className="w-full flex justify-between items-center text-left focus:outline-none lg:pointer-events-none group"
                        >
                            <h4 className="text-base lg:text-lg font-bold font-poppins tracking-wider text-white lg:mb-6 uppercase text-left">Quick Links</h4>
                            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 lg:hidden ${openSection === 'links' ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`space-y-3 mt-4 lg:mt-0 text-gray-400 font-nunito transition-all duration-300 overflow-hidden text-left ${
                            openSection === 'links' ? 'max-h-60 opacity-100 py-2' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto'
                        }`}>
                            <li><Link to="/" className="hover:text-primary transition-colors block py-1">Home</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors block py-1">New RO Models</Link></li>
                            <li><Link to="/spare-parts" className="hover:text-primary transition-colors block py-1">Spare Parts</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors block py-1">Why Choose Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors block py-1">Book a Demo</Link></li>
                        </ul>
                    </div>

                    {/* Our Products Section */}
                    <div className="border-b border-slate-900 lg:border-none py-4 lg:py-0">
                        <button 
                            onClick={() => toggleSection('products')} 
                            className="w-full flex justify-between items-center text-left focus:outline-none lg:pointer-events-none group"
                        >
                            <h4 className="text-base lg:text-lg font-bold font-poppins tracking-wider text-white lg:mb-6 uppercase text-left">Our Products</h4>
                            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 lg:hidden ${openSection === 'products' ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`space-y-3 mt-4 lg:mt-0 text-gray-400 font-nunito transition-all duration-300 overflow-hidden text-left ${
                            openSection === 'products' ? 'max-h-60 opacity-100 py-2' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto'
                        }`}>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors block py-1">Essential Series</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors block py-1">Smart WiFi Series</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors block py-1">Under Sink Models</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors block py-1">Alkaline + Copper</Link></li>
                            <li><Link to="/spare-parts" className="hover:text-primary transition-colors block py-1">Membranes & Filters</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div className="py-4 lg:py-0">
                        <button 
                            onClick={() => toggleSection('contact')} 
                            className="w-full flex justify-between items-center text-left focus:outline-none lg:pointer-events-none group"
                        >
                            <h4 className="text-base lg:text-lg font-bold font-poppins tracking-wider text-white lg:mb-6 uppercase text-left">Contact Info</h4>
                            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 lg:hidden ${openSection === 'contact' ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`space-y-3.5 mt-4 lg:mt-0 text-gray-400 font-nunito transition-all duration-300 overflow-hidden text-left ${
                            openSection === 'contact' ? 'max-h-60 opacity-100 py-2' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto'
                        }`}>
                            <li className="flex items-start gap-2.5">
                                <span className="text-slate-500 font-bold block pt-0.5">📍</span>
                                <span>Moti Bazar, Gondal, Gujarat - 360311</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="text-slate-500 font-bold block">📞</span>
                                <a href="tel:+919925852850" className="hover:text-primary transition-colors">+91 9925852850</a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="text-slate-500 font-bold block">✉️</span>
                                <a href="mailto:support@siddharthro.in" className="hover:text-primary transition-colors text-xs">support@siddharthro.in</a>
                            </li>
                            <li className="text-primary font-bold mt-2 pl-6 text-xs uppercase tracking-wider">Mon - Sat : 9:00 AM - 08:00 PM</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 text-center text-gray-500 text-xs font-nunito">
                    <p>© 2026 Siddharth RO Systems. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
