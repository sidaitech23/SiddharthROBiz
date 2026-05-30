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
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-lg">
            {/* Ambient Background Glow */}
            <div className="absolute w-[350px] h-[350px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col items-center">
                {/* Floating Micro-bubbles / Water Droplets */}
                <div className="absolute w-40 h-40 -top-12 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-gradient-to-b from-cyan-400 to-primary rounded-full opacity-0"
                            style={{
                                width: Math.random() * 6 + 3,
                                height: Math.random() * 6 + 3,
                                left: `${Math.random() * 60 + 20}%`,
                                bottom: '0%'
                            }}
                            animate={{
                                y: [0, -140],
                                x: [0, Math.random() * 30 - 15],
                                opacity: [0, 0.7, 0],
                                scale: [0.6, 1.2, 0.6]
                            }}
                            transition={{
                                duration: Math.random() * 2 + 1.5,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>

                {/* Spinning Tech Outer Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute w-36 h-36 rounded-full border border-dashed border-primary/30"
                />
                
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 rounded-full border border-dotted border-cyan-400/40"
                />

                {/* Main Morphing Liquid Orb */}
                <motion.div
                    animate={{
                        borderRadius: [
                            "42% 58% 70% 30% / 45% 45% 55% 55%",
                            "70% 30% 52% 48% / 60% 40% 60% 40%",
                            "50% 50% 30% 70% / 50% 60% 40% 50%",
                            "42% 58% 70% 30% / 45% 45% 55% 55%"
                        ],
                        rotate: [0, 90, 180, 360]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="relative w-24 h-24 bg-gradient-to-tr from-primary via-blue-500 to-cyan-400 shadow-[0_0_35px_rgba(14,165,233,0.5)] flex items-center justify-center z-10"
                >
                    {/* Inner Glass Glow */}
                    <div className="absolute inset-1 bg-white/10 dark:bg-black/10 backdrop-blur-[1px] rounded-[inherit] overflow-hidden">
                        <div className="absolute top-1 left-2 w-4 h-2 bg-white/40 rounded-full blur-[1px] rotate-[-15deg]" />
                    </div>

                    {/* Pure Water Droplet SVG Icon */}
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="w-8 h-8 text-white fill-current relative z-20"
                        animate={{
                            scale: [0.9, 1.1, 0.9],
                            y: [0, -2, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <path d="M50,15 C50,15 72,48 72,63 C72,75.2 62.2,85 50,85 C37.8,85 28,75.2 28,63 C28,48 50,15 50,15 Z" />
                    </motion.svg>
                </motion.div>

                {/* Animated Futuristic Status */}
                <div className="mt-8 text-center relative z-20">
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="font-poppins text-xs font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-blue-500 block"
                    >
                        Purifying Purity
                    </motion.span>
                    <span className="font-nunito text-[10px] text-slate-400/80 font-semibold tracking-wider mt-1.5 block">
                        Siddharth RO Systems
                    </span>
                </div>
            </div>
        </div>
    );
};

export default WaterLoader;
