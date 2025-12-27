"use client";

import { useRef } from "react";
import { Book } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { MiniAddToCartButton } from "@/components/product/MiniAddToCartButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BookCarouselProps {
    title: string;
    books: Book[];
    linkToAll: string;
    subtitle?: string;
}

export function BookCarousel({ title, books, linkToAll, subtitle }: BookCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust scroll amount as needed
            const newScrollLeft = direction === "left"
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="py-8 md:py-12 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                            {title}
                        </h2>
                        {subtitle && (
                            <span className="hidden md:inline-block px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">
                                {subtitle}
                            </span>
                        )}
                    </div>
                    <Link href={linkToAll}>
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 gap-2">
                            <span>شاهد الكل</span>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Left Button */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-primary hover:text-black shadow-xl translate-x-1/2"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Scroll Area */}
                </div>
            </div>
        </div>
                                        </div >
                                    </Card >
                                </Link >
                            </div >
                        ))
}
                    </div >

    {/* Right Button (actually Left in RTL) */ }
    < button
onClick = {() => scroll("left")}
className = "absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-primary hover:text-black shadow-xl -translate-x-1/2"
aria - label="Scroll Left"
    >
    <ChevronLeft className="w-6 h-6" />
                    </button >
                </div >
            </div >
        </div >
    );
}
