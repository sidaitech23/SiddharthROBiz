import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, Send, ArrowLeft, Package, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        city: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                items: cartItems.map(item => ({
                    productId: item.id.toString(),
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: getCartTotal()
            };

            await axios.post('/api/contact/cart', payload);
            setIsSuccess(true);
            clearCart();
            toast.success("Enquiry sent successfully!");
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            toast.error("Failed to send enquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="pt-32 pb-20 px-4 min-h-screen bg-bg-light flex items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-card p-10 rounded-[3rem] border border-border shadow-2xl text-center"
                >
                    <CheckCircle size={80} className="text-primary mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-text-dark mb-4 font-poppins">Enquiry Sent!</h2>
                    <p className="text-text-muted mb-8 font-nunito">We have received your enquiry for {getCartCount()} products. Our team will contact you shortly at {formData.mobile}.</p>
                    <Link to="/" className="inline-block bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-md hover:shadow-primary/20 transition-all active:scale-95 duration-300">
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="pt-32 pb-20 px-4 min-h-screen bg-bg-light text-center">
                <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative z-10">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <ShoppingCart size={48} className="text-primary" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 font-poppins tracking-tight">Your Cart is Empty</h2>
                        <p className="text-slate-400 mb-10 font-nunito leading-relaxed px-4">Looks like you haven't added any premium purification products yet. Start your journey to pure health today.</p>
                        <Link to="/purifiers" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white px-10 py-4.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 duration-300">
                            Explore Catalog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-bg-light">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <Link to="/" className="p-3 rounded-full bg-card border border-border text-text-dark hover:text-primary transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-4xl font-black text-text-dark font-poppins tracking-tighter">Shopping Cart <span className="text-primary text-xl font-bold italic">({getCartCount()})</span></h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="bg-card p-6 rounded-[2rem] border border-border flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <Link to={item.compatibility ? `/spare-part/${item.id}` : `/purifier/${item.id}`} className="flex flex-col md:flex-row items-center gap-6 flex-grow group/item">
                                        <div className="w-24 h-24 bg-bg-light rounded-2xl p-4 flex items-center justify-center border border-border group-hover/item:border-primary transition-colors">
                                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover/item:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-grow text-center md:text-left">
                                            <h3 className="text-lg font-bold text-text-dark font-poppins mb-1 group-hover/item:text-primary transition-colors">{item.name}</h3>
                                            <p className="text-sm text-text-muted font-nunito">{item.category || "RO Purifier"}</p>
                                            <p className="text-primary font-black italic mt-2 text-xl">₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                    </Link>
                                    <div className="flex items-center gap-4 bg-bg-light p-2 rounded-2xl border border-border">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 text-text-dark transition-all"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-bold text-lg min-w-[20px] text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 text-text-dark transition-all"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        
                        <div className="flex justify-between items-center p-8 bg-slate-900 dark:bg-slate-800 rounded-[2rem] text-white shadow-xl">
                            <div>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Total Amount</p>
                                <p className="text-3xl font-black italic">₹{getCartTotal().toLocaleString('en-IN')}</p>
                            </div>
                            <button onClick={clearCart} className="text-slate-400 hover:text-white text-sm font-bold underline transition-all">Clear All Items</button>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[3rem] border border-slate-200/60 shadow-xl sticky top-32">
                            <h2 className="text-2xl font-bold text-text-dark mb-8 font-poppins">Common Enquiry Form</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none font-nunito text-text-dark shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Mobile Number</label>
                                    <input 
                                        type="tel" 
                                        name="mobile"
                                        required
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="+91 00000 00000"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none font-nunito text-text-dark shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">City</label>
                                    <input 
                                        type="text" 
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none font-nunito text-text-dark shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Message (Optional)</label>
                                    <textarea 
                                        name="message"
                                        rows="3"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Ask us anything about these products..."
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none font-nunito text-text-dark resize-none shadow-sm"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 shadow-md disabled:opacity-50 active:scale-95"
                                >
                                    {isSubmitting ? "Sending..." : (
                                        <>
                                            <Send size={20} />
                                            Submit Enquiry
                                        </>
                                    )}
                                </button>
                                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">Safe & Secure Purification</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
