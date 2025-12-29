"use client";

import { useState, useEffect } from "react";
import { Timer, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function OffersHero() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 12,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    // Reset for demo purposes
                    return { hours: 12, minutes: 0, seconds: 0 };
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (val: number) => val.toString().padStart(2, '0');

    return (
        <div className="relative bg-zinc-900 border-b border-white/5 py-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                    {/* Title */}
                    <div className="text-center md:text-right">
                        <h1 className="text-2xl md:text-4xl font-display font-bold text-white flex items-center justify-center md:justify-start gap-2">
                            <span>عروض</span>
                            <span className="text-primary relative">
                                كتابيستا
                                <Sparkles className="w-4 h-4 text-yellow-200 absolute -top-2 -right-3 animate-bounce" />
                            </span>
                        </h1>
                        <p className="text-zinc-400 text-sm md:text-base mt-1">خصومات تصل إلى <span className="text-white font-bold">50%</span></p>
                    </div>

                    {/* Divider (Desktop) */}
                    <div className="hidden md:block w-px h-12 bg-white/10"></div>

                    {/* Compact Timer */}
                    <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-full px-5 py-2 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-red-400">
                            <Timer className="w-4 h-4 animate-pulse" />
                            <span className="text-xs font-bold whitespace-nowrap">ينتهي خلال:</span>
                        </div>
                        <div className="flex items-center gap-1 text-white font-mono font-bold text-lg" dir="ltr">
                            <span>{formatTime(timeLeft.hours)}</span>
                            <span className="text-zinc-600">:</span>
                            <span>{formatTime(timeLeft.minutes)}</span>
                            <span className="text-zinc-600">:</span>
                            <span className="text-primary">{formatTime(timeLeft.seconds)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
