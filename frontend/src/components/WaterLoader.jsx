import React from 'react';
import { motion } from 'framer-motion';

const WaterLoader = ({ size = 'large' }) => {
    const isSmall = size === 'small';

    if (isSmall) {
        return (
            <div className="flex items-center justify-center gap-1.5" aria-label="Loading">
                <motion.div
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        y: [0, -4, 0]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        y: [0, -4, 0]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                    }}
                    className="w-2 h-2 bg-primary/70 rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        y: [0, -4, 0]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                    }}
                    className="w-2 h-2 bg-primary/40 rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md">
            <div className="relative flex flex-col items-center">
                {/* Ripple Wave 2 */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                    className="absolute w-28 h-28 rounded-full border border-primary/20 bg-primary/5"
                />
                
                {/* Ripple Wave 1 */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.6
                    }}
                    className="absolute w-28 h-28 rounded-full border border-primary/30 bg-primary/10"
                />

                {/* Central Liquid Droplet Container */}
                <div className="relative w-20 h-20 rounded-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 shadow-2xl flex items-center justify-center z-10">
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-10 h-10 text-primary fill-current"
                        animate={{
                            y: [0, -6, 0],
                            scaleY: [1, 0.85, 1.05, 1],
                            scaleX: [1, 1.05, 0.95, 1]
                        }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <path d="M50,15 C50,15 75,50 75,65 C75,78.8 63.8,90 50,90 C36.2,90 25,78.8 25,65 C25,50 50,15 50,15 Z" />
                    </motion.svg>
                </div>

                {/* Animated Purifying Status */}
                <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-6 text-center"
                >
                    <span className="font-poppins text-xs font-black uppercase tracking-[0.2em] text-white block">
                        Purifying
                    </span>
                    <span className="font-nunito text-[10px] text-slate-400 font-bold mt-1 block">
                        Siddharth RO Systems
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default WaterLoader;
