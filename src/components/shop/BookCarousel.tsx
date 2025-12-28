"use client";

import { useRef } from "react";
import { Book } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { MiniAddToCartButton } from "@/components/product/MiniAddToCartButton";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface BookCarouselProps {
    title: string;
    books: Book[];
    linkToAll: string;
    subtitle?: string;
}

import { getMockDB } from "@/lib/mock-db";
import { useEffect, useState } from "react";

export function BookCarousel({ title, books: initialBooks, linkToAll, subtitle }: BookCarouselProps) {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const db = getMockDB();
        if (db.books.length > 0) {
            // Filter based on the original intent (featured or new)
            // For simplicity, we'll just take a slice if it's the home page
            // or we could pass a filter function. 
            // But let's just sync the whole list and let the parent handle slicing if possible.
            // Actually, since this is a client component, we'll just update the books state.
            setBooks(db.books.filter(b => b.is_active).slice(0, 15));
        }

        const handleUpdate = () => {
            const updatedDb = getMockDB();
            setBooks(updatedDb.books.filter(b => b.is_active).slice(0, 15));
        };
        window.addEventListener("mock-db-update", handleUpdate);
        return () => window.removeEventListener("mock-db-update", handleUpdate);
    }, []);

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
                        <h2 className="font-sans text-xl md:text-3xl font-bold text-white tracking-wide">
                            {title}
                        </h2>
                        {subtitle && (
                            <span className="hidden md:inline-block px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">
                                {subtitle}
                            </span>
                        )}
                    </div>
                    <Link href={linkToAll}>
                        <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 text-xs md:text-sm font-bold px-4 rounded-full">
                            <span>شاهد الكل</span>
                            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        </Button>
                    </Link>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Left Button */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-primary hover:text-black shadow-xl"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {books.map((book) => (
                            <Link href={`/product/${book.id}`} className="block h-full">
                                <div className="h-full bg-background-paper dark:bg-zinc-900/40 border border-black/10 dark:border-white/10 rounded-xl overflow-hidden hover:border-primary/50 hover:bg-background-paper dark:hover:bg-zinc-900/80 transition-all duration-300 flex flex-col md:backdrop-blur-sm relative shadow-sm hover:shadow-md">

                                    {/* Image Container */}
                                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/5 dark:bg-zinc-800 border-b border-black/5 dark:border-white/5">
                                        {book.image_url ? (
                                            <Image
                                                src={book.image_url}
                                                alt={book.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/card:scale-110 will-change-transform"
                                                sizes="(max-width: 768px) 160px, 200px"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                                <span className="text-xs">لا توجد صورة</span>
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-300" />

                                        {/* Discount Badge */}
                                        {book.discount_price && (
                                            <div className="absolute top-2 right-2 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-white/10 z-10">
                                                -{Math.round(((book.price - book.discount_price) / book.price) * 100)}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-2.5 pb-1 flex flex-col flex-grow relative text-center">
                                        {/* Golden Separator */}
                                        <div className="w-8 h-0.5 bg-primary/60 mx-auto mb-1.5 rounded-full transition-all duration-300 group-hover/card:w-20 group-hover/card:shadow-[0_0_10px_rgba(234,179,8,0.3)]" />

                                        <h3 className={cn(
                                            "font-bold text-black dark:text-white leading-snug group-hover/card:text-primary transition-colors flex items-center justify-center text-center line-clamp-2 min-h-[2.4em]",
                                            book.title.length > 30 ? "text-[11px] md:text-base" : "text-[13px] md:text-base",
                                            "mb-0"
                                        )}>
                                            {book.title}
                                        </h3>

                                        <p className="text-[10px] md:text-xs text-black/60 dark:text-zinc-400 mb-0.5 line-clamp-1 font-medium -mt-1.5">
                                            {book.author}
                                        </p>


                                        {/* Footer: Price */}
                                        <div className="mt-auto grid grid-cols-[1fr_auto_1fr] items-center w-full pb-1 gap-1">
                                            {/* Old Price */}
                                            <div className="flex justify-end">
                                                {book.discount_price && (
                                                    <span className="text-[10px] md:text-xs text-red-500/60 line-through decoration-red-500/40 font-medium whitespace-nowrap">
                                                        {book.price}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Main Price */}
                                            <div className="flex flex-col items-center justify-center leading-none px-1">
                                                <span className="font-bold text-lg md:text-2xl text-primary font-display">
                                                    {book.discount_price || book.price}
                                                </span>
                                                <span className="text-[9px] md:text-[10px] text-black/40 dark:text-zinc-400 font-normal mt-0.5">
                                                    ج.م
                                                </span>
                                            </div>

                                            {/* Add to Cart Placeholder */}
                                            <div className="w-8 md:w-10 h-8 md:h-10"></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                                    {/* Actual Add to Cart Button */ }
                            < div className = "absolute bottom-[9px] left-[15px] z-20" >
                            <MiniAddToCartButton
                                book={book}
                                iconSize="w-4 h-4 md:w-5 md:h-5"
                                className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-white/5 border border-black/10 dark:border-white/10 text-primary hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                            />
                                    </div>
                </div>
            </div>
                        ))}
        </div>

                    {/* Right Button (actually Left in RTL) */ }
    <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-primary hover:text-black shadow-xl"
        aria-label="Scroll Left"
    >
        <ChevronLeft className="w-6 h-6" />
    </button>
                </div >
            </div >
        </div >
    );
}
