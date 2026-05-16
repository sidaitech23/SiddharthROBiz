import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ShoppingCart, ChevronLeft, ChevronRight, Eye, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Products = () => {
    const { addToCart, isInCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const { products, loading, error } = useProducts();
    const scrollRef = useRef(null);
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

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth * 0.8; // Scroll 80% of view
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return <div className="text-center py-20 text-primary font-bold">Loading Pure Products...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error loading products: {error}</div>;

    return (
        <section id="products" className="pt-10 pb-4 bg-bg-light transition-colors duration-300 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-text-dark mb-4 font-poppins tracking-tight">Popular RO Purifiers</h2>
                    <p className="text-text-muted max-w-lg mx-auto font-nunito text-lg">Choose from our premium range of high-performance RO systems.</p>
                </div>

                {/* Products Row with Side Arrows */}
                <div className="relative group/slider">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-50 p-4 rounded-full bg-white dark:bg-slate-800 border border-border shadow-2xl text-primary opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-4 transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-50 p-4 rounded-full bg-white dark:bg-slate-800 border border-border shadow-2xl text-primary opacity-0 group-hover/slider:opacity-100 group-hover/slider:-translate-x-4 transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={28} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 no-scrollbar snap-x snap-mandatory touch-pan-x scroll-smooth items-stretch"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial="initial"
                                whileHover="hover"
                                className="min-w-[300px] md:min-w-[340px] snap-start bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(14,165,233,0.15)] hover:-translate-y-2 transition-all duration-500 group/card flex flex-col relative cursor-pointer"
                                onClick={() => navigate(`/purifier/${product.id}`)}
                            >
                                {/* Product Image Wrapper */}
                                <div className="relative overflow-hidden aspect-square p-8 bg-gradient-to-b from-primary/5 to-transparent">
                                    <motion.img
                                        variants={{
                                            initial: { scale: 1, rotate: 0 },
                                            hover: { scale: 1.1, rotate: 2 }
                                        }}
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                                        <div className="bg-white text-primary p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform">
                                            <Eye size={20} />
                                        </div>
                                    </div>

                                    {product.badge && (
                                        <div className="absolute top-6 right-6 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-20">
                                            {product.badge}
                                        </div>
                                    )}
                                </div>

                                {/* Product Content */}
                                <div className="p-8 flex flex-col flex-grow bg-white dark:bg-slate-900/50">
                                    <div className="mb-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">RO Purifier</span>
                                        <h3 className="text-xl font-bold text-text-dark font-poppins leading-tight group-hover/card:text-primary transition-colors">{product.name}</h3>
                                    </div>

                                    {/* Details removed as per request */}
                                    <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-border/50">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-primary font-poppins italic leading-none">₹{product.price.toLocaleString('en-IN')}</span>
                                            <span className="text-[10px] text-text-muted line-through opacity-50 mt-1">MRP ₹{(product.price * 1.2).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex-grow max-w-[140px]">
                                            {isInCart(product.id) ? (
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center justify-between bg-primary text-white rounded-full px-4 py-2 h-[48px] shadow-lg shadow-primary/30"
                                                >
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const item = cartItems.find(i => i.id === product.id);
                                                            if (item.quantity > 1) updateQuantity(product.id, item.quantity - 1);
                                                            else removeFromCart(product.id);
                                                        }}
                                                        className="p-1 hover:scale-125 active:scale-90 transition-transform"
                                                    >
                                                        <Minus size={16} strokeWidth={3} />
                                                    </button>
                                                    <span className="font-black text-lg font-poppins">{cartItems.find(i => i.id === product.id)?.quantity || 0}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateQuantity(product.id, (cartItems.find(i => i.id === product.id)?.quantity || 0) + 1);
                                                        }}
                                                        className="p-1 hover:scale-125 active:scale-90 transition-transform"
                                                    >
                                                        <Plus size={16} strokeWidth={3} />
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(product, e);
                                                    }}
                                                    className="w-full py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-dark hover:shadow-primary/40 active:scale-95 duration-300"
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
            </div>

            {/* Custom Styles for no-scrollbar */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

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
        </section>
    );
};

export default Products;
