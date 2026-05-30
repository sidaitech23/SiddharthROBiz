import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ShoppingCart, Eye, Check, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Purifiers = ({ isDarkMode }) => {
    const { products, loading, error } = useProducts();
    const { addToCart, isInCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [addedId, setAddedId] = useState(null);
    const [flyingImage, setFlyingImage] = useState(null);
    const cartIconRef = typeof document !== 'undefined' ? document.querySelector('[aria-label="View Cart"]') : null;

    const handleAddToCart = (product, e) => {
        addToCart(product);
        setAddedId(product.id);
        
        // Flying animation logic
        if (e && cartIconRef) {
            const rect = e.currentTarget.getBoundingClientRect();
            const targetRect = cartIconRef.getBoundingClientRect();
            
            setFlyingImage({
                url: product.image,
                startX: rect.left,
                startY: rect.top,
                endX: targetRect.left,
                endY: targetRect.top
            });
            
            setTimeout(() => setFlyingImage(null), 1000);
        }

        toast.success(`${product.name} added to cart!`);
        setTimeout(() => setAddedId(null), 2000);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-bg-light">
            <div className="text-2xl font-bold text-primary animate-pulse font-poppins">Loading Our Purest models...</div>
        </div>
    );

    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error loading purifiers: {error}</div>;

    return (
        <div className="pt-32 pb-20 bg-bg-light transition-colors duration-300 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl font-bold text-text-dark mb-6 font-poppins">RO Purifiers Catalog</h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto font-nunito">
                        Explore our complete range of advanced RO systems designed for maximum purity and health.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => navigate(`/purifier/${product.id}`)}
                            className="group/card bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(14,165,233,0.15)] hover:-translate-y-2 transition-all duration-500 h-full flex flex-col cursor-pointer"
                        >
                            <div className="relative aspect-square overflow-hidden p-10 bg-slate-50 dark:bg-slate-800/50">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover/card:scale-110 drop-shadow-2xl" />
                                <div className="absolute top-6 right-6 flex flex-col gap-3">
                                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:text-primary transition-colors">
                                        <Eye size={20} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="mb-4 text-left">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 block">RO Purifier</span>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-poppins leading-tight group-hover/card:text-primary transition-colors">{product.name}</h3>
                                </div>

                                <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-primary font-poppins tracking-tighter italic leading-none">₹{product.price.toLocaleString('en-IN')}</span>
                                        <span className="text-[10px] text-slate-400 font-bold line-through mt-1">MRP ₹{(product.price + 3000).toLocaleString('en-IN')}</span>
                                    </div>

                                    <div className="flex-grow max-w-[120px]">
                                        {isInCart(product.id) ? (
                                            <motion.div 
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center justify-between bg-primary text-white rounded-full px-3 py-2 h-[44px] shadow-lg shadow-primary/30"
                                            >
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const item = cartItems.find(i => i.id === product.id);
                                                        if (item.quantity > 1) updateQuantity(product.id, item.quantity - 1);
                                                        else removeFromCart(product.id);
                                                    }}
                                                    className="p-1 hover:scale-125 transition-transform"
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>
                                                <span className="font-black text-lg">{cartItems.find(i => i.id === product.id)?.quantity || 0}</span>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(product.id, (cartItems.find(i => i.id === product.id)?.quantity || 0) + 1);
                                                    }}
                                                    className="p-1 hover:scale-125 transition-transform"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(product, e);
                                                }}
                                                className="w-full py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-md hover:shadow-primary/20 active:scale-95 duration-300"
                                            >
                                                <ShoppingCart size={14} />
                                                Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
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

export default Purifiers;
