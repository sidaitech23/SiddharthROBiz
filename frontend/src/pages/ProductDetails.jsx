import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useSpareParts } from '../hooks/useSpareParts';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, ShieldCheck, CheckCircle, Truck, Zap, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetails = ({ isDarkMode, type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, loading: pLoading } = useProducts();
    const { parts, loading: sLoading } = useSpareParts('All');
    const { addToCart, isInCart, cartItems, updateQuantity, removeFromCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [flyingImage, setFlyingImage] = useState(null);
    const cartIconRef = typeof document !== 'undefined' ? document.querySelector('[aria-label="View Cart"]') : null;

    useEffect(() => {
        if (type === 'purifier' && !pLoading) {
            const found = products.find(item => item.id.toString() === id);
            setProduct(found);
        } else if (type === 'spare-part' && !sLoading) {
            const found = parts.find(item => item.id.toString() === id);
            setProduct(found);
        }
    }, [id, type, products, parts, pLoading, sLoading]);

    const handleAddToCart = (e) => {
        if (!product) return;
        addToCart(product);
        
        // Flying animation
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
    };

    if (pLoading || sLoading) return <div className="min-h-screen flex items-center justify-center text-primary font-bold animate-pulse">Gathering details...</div>;
    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-4xl font-bold text-text-dark mb-4">Product Not Found</h2>
            <button onClick={() => navigate('/')} className="text-primary font-bold underline">Back to Shop</button>
        </div>
    );

    const itemInCart = isInCart(product.id);
    const cartItem = cartItems.find(i => i.id === product.id);

    return (
        <div className="pt-32 pb-20 bg-bg-light min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-text-muted hover:text-primary mb-10 transition-colors font-bold group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Product Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative bg-card rounded-[3rem] p-12 border border-border shadow-2xl overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-700"
                        />
                        {product.badge && (
                            <div className="absolute top-8 right-8 bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg z-20">
                                {product.badge}
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col h-full"
                    >
                        <span className="text-primary font-bold tracking-widest uppercase mb-2 text-sm">{product.category || (product.compatibility ? "Genuine Spare Part" : "Premium RO System")}</span>
                        <h1 className="text-5xl font-black text-text-dark mb-4 font-poppins tracking-tight">{product.name}</h1>
                        
                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-primary font-poppins italic">₹{product.price.toLocaleString('en-IN')}</span>
                                <span className="text-sm text-text-muted line-through opacity-50">MRP ₹{(product.price * 1.2).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="h-10 w-[1px] bg-border"></div>
                            <div className="flex flex-col">
                                <span className="text-success font-bold flex items-center gap-1">
                                    <CheckCircle size={16} /> In Stock
                                </span>
                                <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Ready for Delivery</span>
                            </div>
                        </div>

                        <p className="text-lg text-text-muted mb-10 leading-relaxed font-nunito">
                            Experience the pinnacle of water purification. The {product.name} features advanced multi-stage technology designed for the modern household, ensuring every drop is as pure as nature intended.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {[
                                { icon: <ShieldCheck size={20} />, text: "1 Year Warranty" },
                                { icon: <Truck size={20} />, text: "Free Installation" },
                                { icon: <Zap size={20} />, text: "Fast Delivery" },
                                { icon: <CheckCircle size={20} />, text: "Genuine Parts" }
                            ].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl shadow-sm">
                                    <div className="text-primary">{feat.icon}</div>
                                    <span className="text-sm font-bold text-text-dark font-poppins">{feat.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Specifications / Compatibility */}
                        {(product.features || product.compatibility) && (
                            <div className="mb-10">
                                <h3 className="text-xl font-bold text-text-dark mb-4 font-poppins">
                                    {product.compatibility ? "Technical Compatibility" : "Key Specifications"}
                                </h3>
                                {product.compatibility ? (
                                    <div className="bg-bg-light p-5 rounded-2xl border border-border">
                                        <p className="text-text-muted font-nunito leading-relaxed">
                                            <span className="font-black text-primary mr-2">Compatible With:</span>
                                            {product.compatibility}
                                        </p>
                                    </div>
                                ) : (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {product.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3 text-text-muted text-sm font-nunito bg-bg-light p-3 rounded-xl border border-border">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Action Area */}
                        <div className="mt-auto flex flex-col md:flex-row items-center gap-6 pt-10 border-t border-border">
                            <div className="w-full md:w-auto">
                                {itemInCart ? (
                                    <div className="flex items-center justify-between bg-primary text-white rounded-full px-6 py-3 h-[64px] min-w-[180px] shadow-xl shadow-primary/30">
                                        <button 
                                            onClick={() => {
                                                if (cartItem.quantity > 1) updateQuantity(product.id, cartItem.quantity - 1);
                                                else removeFromCart(product.id);
                                            }}
                                            className="p-1 hover:scale-125 transition-transform"
                                        >
                                            <Minus size={20} strokeWidth={3} />
                                        </button>
                                        <span className="font-black text-2xl font-poppins">{cartItem.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                                            className="p-1 hover:scale-125 transition-transform"
                                        >
                                            <Plus size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={handleAddToCart}
                                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-primary text-white px-12 py-5 rounded-full font-black text-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/40"
                                    >
                                        <ShoppingCart size={24} />
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                            <button 
                                onClick={() => navigate('/cart')}
                                className="w-full md:w-auto flex items-center justify-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:underline"
                            >
                                Checkout Now <Check size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Flying Animation Overlay */}
            <AnimatePresence>
                {flyingImage && (
                    <motion.img
                        src={flyingImage.url}
                        initial={{ 
                            position: 'fixed', 
                            top: flyingImage.startY, 
                            left: flyingImage.startX, 
                            width: 150, 
                            height: 150, 
                            zIndex: 9999, 
                            opacity: 1,
                            borderRadius: '3rem',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
                        }}
                        animate={{ 
                            top: flyingImage.endY, 
                            left: flyingImage.endX, 
                            width: 20, 
                            height: 20, 
                            opacity: 0,
                            rotate: 1080,
                            scale: 0.1
                        }}
                        transition={{ duration: 0.9, ease: "backIn" }}
                        className="pointer-events-none border-4 border-primary bg-white object-contain p-4"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetails;
