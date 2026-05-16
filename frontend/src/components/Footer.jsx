import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-20 pb-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-4 mb-8 group">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 overflow-hidden">
                                    <Droplet className="text-white fill-white/20" size={32} />
                                </div>

                            </div>
                            <div className="flex flex-col">
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
                        <p className="text-gray-400 mb-6 font-nunito">
                            Dedicated to providing pure and healthy water solutions for Indian homes since 2008.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Youtube size={24} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><MessageCircle size={24} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-poppins">Quick Links</h4>
                        <ul className="space-y-4 text-gray-400 font-nunito">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors">New RO Models</Link></li>
                            <li><Link to="/spare-parts" className="hover:text-primary transition-colors">Spare Parts</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">Why Choose Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Book a Demo</Link></li>
                        </ul>
                    </div>

                    {/* Industrial Solutions */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-poppins">Our Products</h4>
                        <ul className="space-y-4 text-gray-400 font-nunito">
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors">Essential Series</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors">Smart WiFi Series</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors">Under Sink Models</Link></li>
                            <li><Link to="/purifiers" className="hover:text-primary transition-colors">Alkaline + Copper</Link></li>
                            <li><Link to="/spare-parts" className="hover:text-primary transition-colors">Membranes & Filters</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-poppins">Contact Info</h4>
                        <ul className="space-y-4 text-gray-400 font-nunito">
                            <li>Moti Bazar, Gondal, Gujarat - 360311</li>
                            <li>+91 9925852850</li>
                            <li>support@siddharthro.in</li>
                            <li className="text-primary font-bold mt-2">Mon - Sat : 9:00 AM - 08:00 PM</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm font-nunito">
                    <p>© 2026 Siddharth RO Systems. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
