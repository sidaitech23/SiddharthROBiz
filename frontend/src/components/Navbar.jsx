import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, Sun, Moon, ChevronDown, ShoppingCart, Home, Wrench, Info, PhoneCall, Mail, MapPin, MessageSquare, Phone, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useSpareParts } from '../hooks/useSpareParts';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const { getCartCount } = useCart();
    const { products } = useProducts();
    const { parts } = useSpareParts('All');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const location = useLocation();

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    
    // Keyboard open detection state
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const handleFocus = (e) => {
            const tagName = e.target.tagName.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea') {
                setIsKeyboardOpen(true);
            }
        };
        const handleBlur = (e) => {
            const tagName = e.target.tagName.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea') {
                setIsKeyboardOpen(false);
            }
        };
        
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);
        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const query = searchQuery.toLowerCase();
        const filteredProducts = (products || []).filter(p => p.name.toLowerCase().includes(query)).map(p => ({ ...p, type: 'purifier' }));
        const filteredParts = (parts || []).filter(p => p.name.toLowerCase().includes(query)).map(p => ({ ...p, type: 'spare-part' }));
        setSearchResults([...filteredProducts, ...filteredParts]);
    }, [searchQuery, products, parts]);

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
                : 'bg-transparent py-3 lg:py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative h-12 lg:h-16">
                
                {/* Takeover Search Bar for Mobile/Tablet */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute inset-x-4 inset-y-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl flex items-center gap-3 z-50 lg:hidden"
                        >
                            <div className="relative flex-grow flex items-center">
                                <Search className="absolute left-3.5 text-slate-400 dark:text-slate-500" size={16} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search purifiers, spare parts..."
                                    className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-primary/30 rounded-full pl-9 pr-8 py-2 text-xs text-text-dark placeholder-slate-400 focus:ring-2 focus:ring-primary/10 outline-none transition-all font-nunito"
                                    autoFocus
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-3.5 text-slate-400 hover:text-primary">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <button 
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                }} 
                                className="text-xs font-bold text-primary font-poppins uppercase tracking-wider px-2"
                            >
                                Cancel
                            </button>

                            {/* Search Results list directly underneath the active takeover bar */}
                            {searchQuery.trim() && (
                                <div className="absolute top-[100%] left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-3 max-h-80 overflow-y-auto no-scrollbar z-50">
                                    <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">Search Results ({searchResults.length})</div>
                                    <div className="space-y-1">
                                        {searchResults.length > 0 ? (
                                            searchResults.map((result) => (
                                                <Link
                                                    key={`${result.type}-${result.id}`}
                                                    to={result.type === 'purifier' ? `/purifier/${result.id}` : `/spare-part/${result.id}`}
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setIsSearchOpen(false);
                                                    }}
                                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                                                >
                                                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-1 flex items-center justify-center border border-border">
                                                        <img src={result.image} alt={result.name} className="max-w-full max-h-full object-contain" />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <div className="text-xs font-bold text-text-dark truncate font-poppins">{result.name}</div>
                                                        <div className="text-[10px] text-slate-400 capitalize">{result.type === 'purifier' ? 'RO Purifier' : 'Spare Part'}</div>
                                                    </div>
                                                    <div className="text-xs font-black text-primary font-poppins italic">₹{result.price.toLocaleString('en-IN')}</div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-slate-400 text-xs font-bold">No results found for "{searchQuery}"</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Header Container (Logo and Actions) */}
                <div className={`flex justify-between items-center w-full transition-all duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : ''}`}>
                    <Link to="/" className="flex items-center gap-2 md:gap-4 cursor-pointer group">
                        <div className="relative">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 overflow-hidden">
                                <Droplet className="text-white fill-white/20 w-5 h-5 lg:w-6 lg:h-6" />
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="text-lg sm:text-xl lg:text-2xl font-black font-poppins text-text-dark tracking-tighter leading-none">
                                    SIDDHARTH
                                </span>
                                <span className="text-lg sm:text-xl lg:text-2xl font-black font-poppins text-primary italic leading-none">
                                    RO
                                </span>
                            </div>
                            <span className="text-[7px] sm:text-[8px] lg:text-[10px] font-black text-primary tracking-[0.4em] uppercase leading-none mt-1.5 border-t border-primary/20 pt-1.5 opacity-80">
                                Premium Purification
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
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

                        {/* Desktop Search Bar */}
                        <div className="relative flex items-center">
                            <Search className="absolute left-3.5 text-slate-400 dark:text-slate-500" size={16} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search purifiers, spare parts..."
                                className="w-48 xl:w-60 bg-slate-150/80 dark:bg-slate-800/80 border border-transparent focus:border-primary/25 rounded-full pl-9 pr-4 py-1.5 text-xs text-text-dark placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/10 outline-none transition-all font-nunito"
                            />
                            {/* Results Dropdown */}
                            {searchQuery.trim() && (
                                <div className="absolute top-full right-0 mt-3 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-3 z-[100] max-h-80 overflow-y-auto no-scrollbar">
                                    <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">Search Results ({searchResults.length})</div>
                                    <div className="space-y-1">
                                        {searchResults.length > 0 ? (
                                            searchResults.map((result) => (
                                                <Link
                                                    key={`${result.type}-${result.id}`}
                                                    to={result.type === 'purifier' ? `/purifier/${result.id}` : `/spare-part/${result.id}`}
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                    }}
                                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                                                >
                                                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-1 flex items-center justify-center border border-border">
                                                        <img src={result.image} alt={result.name} className="max-w-full max-h-full object-contain" />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <div className="text-xs font-bold text-text-dark truncate font-poppins">{result.name}</div>
                                                        <div className="text-[10px] text-slate-400 capitalize">{result.type === 'purifier' ? 'RO Purifier' : 'Spare Part'}</div>
                                                    </div>
                                                    <div className="text-xs font-black text-primary font-poppins italic">₹{result.price.toLocaleString('en-IN')}</div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-xs text-slate-400 font-bold">No results found for "{searchQuery}"</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

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

                    {/* Mobile Actions (No menu toggle required!) */}
                    <div className="lg:hidden flex items-center gap-1.5">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-text-dark hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                            aria-label="Toggle Search"
                        >
                            <Search size={16} className="text-slate-700 dark:text-slate-400" />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-text-dark hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-slate-700 dark:text-slate-400" />}
                        </button>

                        <Link
                            to="/cart"
                            className="relative p-2 text-text-dark hover:text-primary transition-all duration-300 flex items-center"
                            aria-label="View Cart"
                        >
                            <ShoppingCart size={18} />
                            {getCartCount() > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-slate-900 shadow-md">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer (Premium Bottom Sheet) */}
            <div className={`lg:hidden fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-350 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
                <div 
                    className={`absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl rounded-t-[3rem] border-t border-white/20 dark:border-slate-800/50 shadow-[0_-15px_40px_rgba(0,0,0,0.15)] p-6 transition-transform duration-500 overflow-y-auto ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
                    style={{ maxHeight: '80vh' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Drawer Handle */}
                    <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-6"></div>

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
                            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-text-dark hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-90 transition-all duration-200"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-2 mb-8">
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2 pl-1">Navigation</span>
                        
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl active:scale-[0.98] transition-all duration-200 ${location.pathname === '/' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-900/40'}`}
                        >
                            <Home size={18} className={location.pathname === '/' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">Home</span>
                        </Link>

                        <div className="border-t border-slate-100 dark:border-slate-900 my-3"></div>
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2 pl-1">Our Products</span>

                        <Link
                            to="/purifiers"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl active:scale-[0.98] transition-all duration-200 ${location.pathname === '/purifiers' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-900/40'}`}
                        >
                            <Droplet size={18} className={location.pathname === '/purifiers' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">RO Purifiers</span>
                        </Link>

                        <Link
                            to="/spare-parts"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl active:scale-[0.98] transition-all duration-200 ${location.pathname === '/spare-parts' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-900/40'}`}
                        >
                            <Wrench size={18} className={location.pathname === '/spare-parts' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">RO Spare Parts</span>
                        </Link>

                        <div className="border-t border-slate-100 dark:border-slate-900 my-3"></div>
                        <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2 pl-1">Company</span>

                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl active:scale-[0.98] transition-all duration-200 ${location.pathname === '/about' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-900/40'}`}
                        >
                            <Info size={18} className={location.pathname === '/about' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">About Us</span>
                        </Link>

                        <Link
                            to="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-2xl active:scale-[0.98] transition-all duration-200 ${location.pathname === '/contact' ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-text-dark hover:bg-slate-50 dark:hover:bg-slate-900/40'}`}
                        >
                            <PhoneCall size={18} className={location.pathname === '/contact' ? 'text-primary' : 'text-slate-400'} />
                            <span className="font-poppins text-xs font-bold uppercase tracking-wider">Contact Us</span>
                        </Link>
                    </div>

                    {/* Support & Quick Contact Card */}
                    <div className="bg-gradient-to-br from-blue-50/50 to-sky-50/10 dark:from-slate-900/40 dark:to-slate-950/20 p-5 rounded-[2.25rem] border border-blue-100/40 dark:border-slate-800/80 mb-6 shadow-sm">
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

                        <div className="grid grid-cols-2 gap-3 mt-5">
                            <a
                                href="tel:+919925852850"
                                className="bg-gradient-to-r from-primary to-blue-600 text-white font-poppins text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 active:translate-y-0.5 transition-all duration-200"
                            >
                                <Phone size={14} /> Call Now
                            </a>
                            <a
                                href="https://wa.me/919925852850"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-poppins text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 active:translate-y-0.5 transition-all duration-200"
                            >
                                <MessageSquare size={14} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* Mobile & Tablet Bottom Navigation Bar (Premium Floating Dock) */}
        {!isKeyboardOpen && (
            <div className="lg:hidden fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/60 shadow-[0_15px_40px_rgba(0,0,0,0.12)] rounded-3xl py-2 px-3 flex justify-around items-center h-[68px] transition-all duration-300">
                {bottomNavLinks.map((link) => {
                    const isActive = link.isMenuToggle
                        ? isMenuOpen
                        : link.href === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(link.href);
                    
                    const isMenuLink = link.isMenuToggle;
                    const iconElement = isMenuLink ? (
                        <motion.div
                            key={isMenuOpen ? "open" : "closed"}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.div>
                    ) : (
                        link.icon
                    );

                    const content = (
                        <motion.div 
                            className="flex flex-col items-center gap-0.5 cursor-pointer select-none"
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <div className="relative">
                                <div className={`px-5 py-1.5 rounded-2xl transition-all duration-300 relative flex items-center justify-center ${
                                    isActive 
                                        ? 'text-primary' 
                                        : 'text-slate-400 dark:text-slate-500 hover:text-primary'
                                }`}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="bottomNavActive"
                                            className="absolute inset-0 bg-primary/10 dark:bg-primary/25 rounded-2xl -z-10"
                                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                        />
                                    )}
                                    <div className="relative">
                                        {iconElement}
                                        {link.name === 'Cart' && getCartCount() > 0 && (
                                            <span className="absolute -top-2 -right-3.5 bg-primary text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white dark:border-slate-900 shadow-md">
                                                {getCartCount()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest font-poppins transition-colors duration-300 ${
                                isActive ? 'text-primary font-black scale-105' : 'text-slate-400 dark:text-slate-500'
                            }`}>
                                {link.name}
                            </span>
                        </motion.div>
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
        )}
        </>
    );
};

export default Navbar;
