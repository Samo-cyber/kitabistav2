"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function LoadingGate() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simple reliable timer to remove gate after animation
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* Left Door */}
            <motion.div
                initial={{ width: "50%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute left-0 top-0 h-full bg-background border-r-2 border-primary overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('/images/door-panel.jpg')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay for better contrast */}
            </motion.div>

            {/* Right Door */}
            <motion.div
                initial={{ width: "50%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute right-0 top-0 h-full bg-background border-l-2 border-primary overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('/images/door-panel.jpg')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay for better contrast */}
            </motion.div>
        </div>
    );
}
