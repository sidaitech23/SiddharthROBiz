import React from 'react';
import { useProducts } from '../hooks/useProducts';

const ShopModels = ({ isDarkMode }) => {
    const { products, loading, error } = useProducts();

    if (loading) return <div className="text-center py-40">Loading Purifiers...</div>;
    if (error) return <div className="text-center py-40 text-red-500">Error: {error}</div>;

    return (
        <section className="pt-32 pb-20 bg-bg-light transition-colors duration-300 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-text-dark mb-12 font-poppins text-center">All RO Models</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all h-full">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-text-dark mb-2 font-poppins">{product.name}</h3>
                                <p className="text-text-muted mb-4 font-nunito">{product.capacity} Storage</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary italic">₹{product.price.toLocaleString()}</span>
                                    <button className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary-dark transition-all">Enquire Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopModels;
