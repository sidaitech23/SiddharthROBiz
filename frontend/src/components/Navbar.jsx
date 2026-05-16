import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Menu, X, Sun, Moon, ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const { getCartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2'
                : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 overflow-hidden">
                            <Droplet className="text-white fill-white/20" size={28} />
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-black font-poppins text-text-dark tracking-tighter leading-none">
                                SIDDHARTH
                            </span>
                            <span className="text-2xl font-black font-poppins text-primary italic leading-none">
                                RO
                            </span>
                        </div>
                        <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase leading-none mt-2 border-t border-primary/20 pt-1.5 opacity-80">
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

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-dark">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[100vh] py-8' : 'max-h-0'}`}>
                <div className="flex flex-col px-6 gap-6">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            {link.isDropdown ? (
                                <div className="space-y-4">
                                    <span className="text-text-muted text-xs font-bold uppercase tracking-widest">{link.name}</span>
                                    {link.subLinks.map(sub => (
                                        <Link
                                            key={sub.name}
                                            to={sub.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-text-dark hover:text-primary font-bold font-poppins text-lg"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link
                                    to={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-text-dark hover:text-primary font-bold font-poppins text-lg uppercase tracking-wider"
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <Link
                        to="/cart"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between font-bold text-text-dark py-4 border-t border-border group"
                    >
                        <div className="flex items-center gap-3">
                            <ShoppingCart size={20} className="text-primary" />
                            <span>Shopping Cart</span>
                        </div>
                        {getCartCount() > 0 && (
                            <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded-full">
                                {getCartCount()} Items
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                        className="flex items-center gap-3 font-bold text-text-dark py-4 border-t border-border w-full text-left"
                    >
                        {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
