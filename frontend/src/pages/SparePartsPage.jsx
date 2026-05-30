import React, { useState } from 'react';
import { useSpareParts } from '../hooks/useSpareParts';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';

const SparePartsPage = ({ isDarkMode }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const { parts, loading, error } = useSpareParts(activeCategory);
    const { addToCart, isInCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [addedId, setAddedId] = useState(null);
    const [flyingImage, setFlyingImage] = useState(null);
    const cartIconRef = typeof document !== 'undefined' ? document.querySelector('[aria-label="View Cart"]') : null;

    const categories = ['All', 'Membranes', 'Filters', 'UV Lamps', 'Pumps', 'Housings'];

    const handleAddToCart = (part, e) => {
        addToCart(part);
        setAddedId(part.id);
        
        // Flying animation logic
        if (e && cartIconRef) {
            const rect = e.currentTarget.getBoundingClientRect();
            const targetRect = cartIconRef.getBoundingClientRect();
            
            setFlyingImage({
                url: part.image,
                startX: rect.left,
                startY: rect.top,
                endX: targetRect.left,
                endY: targetRect.top
            });
            
            setTimeout(() => setFlyingImage(null), 1000);
        }

        toast.success(`${part.name} added to cart!`);
        setTimeout(() => setAddedId(null), 2000);
    };

    return (
        <div className="pt-32 pb-20 bg-bg-light transition-colors duration-300 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl font-bold text-text-dark mb-6 font-poppins">Genuine Spare Parts</h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto font-nunito">
                        Maintain your RO system with 100% original filters, membranes, and technical components.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                                activeCategory === cat 
                                ? 'bg-primary text-white shadow-xl scale-105' 
                                : 'bg-card text-text-muted hover:bg-bg-light hover:text-primary border border-border'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20 text-primary font-bold text-xl animate-pulse">Filtering parts catalogue...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode='popLayout'>
                            {parts.map((part) => (
                                <motion.div
                                    key={part.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={() => navigate(`/spare-part/${part.id}`)}
                                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col hover:shadow-[0_40px_80px_-15px_rgba(14,165,233,0.15)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer h-full"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-6">
                                        <img src={part.image} alt={part.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" />
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2.5 rounded-full shadow-lg text-primary">
                                                <Eye size={18} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{part.category || 'Spare Part'}</span>
                                            <h3 className="font-black text-slate-900 dark:text-white font-poppins leading-tight group-hover:text-primary transition-colors text-sm">{part.name}</h3>
                                            <p className="text-[10px] text-slate-400 mt-2 italic font-nunito line-clamp-1">{part.compatibility}</p>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-black text-primary font-poppins tracking-tighter italic leading-none">₹{part.price}</span>
                                                <span className="text-[9px] text-slate-300 font-bold line-through mt-0.5">MRP ₹{Math.round(part.price * 1.3)}</span>
                                            </div>

                                            <div className="flex-grow max-w-[90px]">
                                                {isInCart(part.id) ? (
                                                    <motion.div 
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center justify-between bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl px-2 py-1 h-[32px] shadow-md shadow-primary/20 transition-all"
                                                    >
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const item = cartItems.find(i => i.id === part.id);
                                                                if (item.quantity > 1) updateQuantity(part.id, item.quantity - 1);
                                                                else removeFromCart(part.id);
                                                            }}
                                                            className="p-1 hover:scale-125 transition-transform"
                                                        >
                                                            <Minus size={10} strokeWidth={4} />
                                                        </button>
                                                        <span className="font-black text-xs">{cartItems.find(i => i.id === part.id)?.quantity || 0}</span>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateQuantity(part.id, (cartItems.find(i => i.id === part.id)?.quantity || 0) + 1);
                                                            }}
                                                            className="p-1 hover:scale-125 transition-transform"
                                                        >
                                                            <Plus size={10} strokeWidth={4} />
                                                        </button>
                                                    </motion.div>
                                                ) : (
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddToCart(part, e);
                                                        }}
                                                        className="w-full py-2.5 rounded-2xl font-black uppercase tracking-widest text-[8px] transition-all flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-md hover:shadow-primary/20 active:scale-95 duration-300"
                                                    >
                                                        <ShoppingCart size={10} />
                                                        Add
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {flyingImage && (
                    <motion.img
                        src={flyingImage.url}
                        initial={{ 
                            position: 'fixed', 
                            top: flyingImage.startY, 
                            left: flyingImage.startX, 
                            width: 100, 
                            height: 100, 
                            zIndex: 9999, 
                            opacity: 1,
                            borderRadius: '2rem',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                        }}
                        animate={{ 
                            top: flyingImage.endY, 
                            left: flyingImage.endX, 
                            width: 20, 
                            height: 20, 
                            opacity: 0,
                            rotate: 720,
                            scale: 0.1
                        }}
                        transition={{ duration: 0.8, ease: "backIn" }}
                        className="pointer-events-none border-2 border-primary bg-white object-contain p-2"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SparePartsPage;
