import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, Sun, Moon, ChevronDown, ShoppingCart, Home, Wrench, Info, PhoneCall, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const { getCartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const location = useLocation();

    const bottomNavLinks = [
        { name: 'Home', href: '/', icon: <Home size={20} /> },
        { name: 'Purifiers', href: '/purifiers', icon: <Droplet size={20} /> },
        { name: 'Spares', href: '/spare-parts', icon: <Wrench size={20} /> },
        { name: 'Cart', href: '/cart', icon: <ShoppingCart size={20} /> },
        { name: 'Menu', href: '#', isMenuToggle: true, icon: isMenuOpen ? <X size={20} /> : <Menu size={20} /> }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        {
            name: 'Products',
            isDropdown: true,
            subLinks: [
                { name: 'RO Purifiers', href: '/purifiers' },
                { name: 'RO Spare Parts', href: '/spare-parts' }
            ]
        },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2'
                : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 md:gap-4 cursor-pointer group">
                    <div className="relative">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 overflow-hidden">
                            <Droplet className="text-white fill-white/20" size={24} />
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="text-xl md:text-2xl font-black font-poppins text-text-dark tracking-tighter leading-none">
                                SIDDHARTH
                            </span>
                            <span className="text-xl md:text-2xl font-black font-poppins text-primary italic leading-none">
                                RO
                            </span>
                        </div>
                        <span className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.4em] uppercase leading-none mt-1.5 border-t border-primary/20 pt-1.5 opacity-80">
                            Premium Purification
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => link.isDropdown && setIsProductDropdownOpen(true)}
                            onMouseLeave={() => link.isDropdown && setIsProductDropdownOpen(false)}
                        >
                            {link.isDropdown ? (
                                <button className="flex items-center gap-1 text-text-dark hover:text-primary font-bold transition-all duration-300 font-poppins text-sm uppercase tracking-wider py-1">
                                    {link.name} <ChevronDown size={14} className={`transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <Link
                                    to={link.href}
                                    className="relative text-text-dark hover:text-primary font-bold transition-all duration-300 group font-poppins text-sm uppercase tracking-wider py-1"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {link.isDropdown && (
                                <div className={`absolute top-full left-0 w-48 bg-white dark:bg-slate-900 shadow-2xl rounded-xl border border-border py-4 transition-all duration-300 ${isProductDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                                    {link.subLinks.map(sub => (
                                        <Link
                                            key={sub.name}
                                            to={sub.href}
                                            className="block px-6 py-2 text-sm font-bold text-text-dark hover:text-primary hover:bg-bg-light dark:hover:bg-slate-800 transition-all font-poppins"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <motion.div
                        key={getCartCount()}
                        initial={{ scale: 1 }}
                        animate={getCartCount() > 0 ? {
                            scale: [1, 1.4, 1],
                            rotate: [0, -10, 10, -10, 10, 0]
                        } : {}}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <Link
                            to="/cart"
                            className="relative p-2 ml-4 text-text-dark hover:text-primary transition-all duration-300 group flex items-center"
                            aria-label="View Cart"
                        >
                            <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </motion.div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 ml-2 rounded-full bg-slate-100 dark:bg-slate-800 text-text-dark hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
                    </button>
                </div>

                {/* Mobile Actions & Menu Toggle */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-text-dark hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700 dark:text-slate-400" />}
                    </button>

                    <Link
                        to="/cart"
                        className="relative p-2 text-text-dark hover:text-primary transition-all duration-300 flex items-center"
                        aria-label="View Cart"
                    >
                        <ShoppingCart size={20} />
                        {getCartCount() > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white dark:border-slate-900 shadow-md">
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="p-2 rounded-xl text-text-dark hover:text-primary transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer (Premium Bottom Sheet) */}
            <div className={`md:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-350 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
                <div 
                    className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-[2.5rem] border-t border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-6 transition-transform duration-500 overflow-y-auto ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
                    style={{ maxHeight: '85vh' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Drawer Handle */}
                    <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700/60 rounded-full mx-auto mb-6"></div>

                    {/* Logo & Close */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md">
                                <Droplet className="text-white fill-white/20" size={18} />
                            </div>
                            <span className="text-lg font-black font-poppins text-text-dark">
                                SIDDHARTH <span className="text-primary italic">RO</span>
                            </span>
                        </div>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-text-dark hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-3 mb-8">
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1 pl-1">Navigation</span>
                        
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                            <Home size={18} className={location.pathname === '/' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">Home</span>
                        </Link>

                        <div className="border-t border-slate-100 dark:border-slate-800/50 my-2"></div>
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1 pl-1">Our Products</span>

                        <Link
                            to="/purifiers"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/purifiers' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                            <Droplet size={18} className={location.pathname === '/purifiers' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">RO Purifiers</span>
                        </Link>

                        <Link
                            to="/spare-parts"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/spare-parts' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                            <Wrench size={18} className={location.pathname === '/spare-parts' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">RO Spare Parts</span>
                        </Link>

                        <div className="border-t border-slate-100 dark:border-slate-800/50 my-2"></div>
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-1 pl-1">Company</span>

                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/about' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                            <Info size={18} className={location.pathname === '/about' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">About Us</span>
                        </Link>

                        <Link
                            to="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${location.pathname === '/contact' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                        >
                            <PhoneCall size={18} className={location.pathname === '/contact' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">Contact Us</span>
                        </Link>
                    </div>

                    {/* Support & Quick Contact Card */}
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/20 dark:from-slate-800/30 dark:to-slate-900/10 p-5 rounded-[2rem] border border-slate-150 dark:border-slate-800/80 mb-4">
                        <h4 className="font-poppins text-xs font-black text-text-dark tracking-wider mb-3">Quick Support & Sales</h4>
                        <div className="space-y-3 font-nunito text-xs text-text-muted">
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-primary" />
                                <a href="tel:+919925852850" className="hover:text-primary transition-colors font-bold text-text-dark">+91 9925852850</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-primary" />
                                <a href="mailto:support@siddharthro.in" className="hover:text-primary transition-colors font-bold text-text-dark">support@siddharthro.in</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-primary" />
                                <span className="font-bold text-text-dark">Moti Bazar, Gondal, Gujarat</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <a
                                href="tel:+919925852850"
                                className="bg-primary hover:bg-primary-dark text-white font-poppins text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                            >
                                <Phone size={14} /> Call Now
                            </a>
                            <a
                                href="https://wa.me/919925852850"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-poppins text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                            >
                                <MessageSquare size={14} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* Mobile Floating Bottom Navigation Dock */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl py-2 px-3 flex justify-around items-center">
                {bottomNavLinks.map((link) => {
                    const isActive = link.isMenuToggle
                        ? isMenuOpen
                        : link.href === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(link.href);
                    
                    const content = (
                        <div className="flex flex-col items-center gap-1">
                            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary scale-110 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}>
                                <div className="relative">
                                    {link.icon}
                                    {link.name === 'Cart' && getCartCount() > 0 && (
                                        <span className="absolute -top-2.5 -right-3 bg-primary text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white dark:border-slate-950 shadow-md">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-wider font-poppins transition-colors duration-300 ${isActive ? 'text-primary font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                                {link.name}
                            </span>
                        </div>
                    );

                    if (link.isMenuToggle) {
                        return (
                            <button
                                key={link.name}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="focus:outline-none"
                            >
                                    {content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="focus:outline-none"
                        >
                            {content}
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Navbar;
