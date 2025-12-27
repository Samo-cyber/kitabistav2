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
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {books.map((book) => (
                            <div key={book.id} className="min-w-[160px] md:min-w-[200px] snap-start">
                                <Link href={`/product/${book.id}`}>
                                    <Card className="h-full overflow-hidden group/card relative border-0 bg-black/40 hover:bg-black/60 transition-colors duration-300">
                                        <div className="flex flex-col h-full">
                                            {/* Image Container */}
                                            <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                                                {book.image_url ? (
                                                    <Image
                                                        src={book.image_url}
                                                        alt={book.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                        sizes="(max-width: 768px) 160px, 200px"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                                                        <span>{book.title}</span>
                                                    </div>
                                                )}

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-300" />

                                                {/* Discount Badge */}
                                                {book.discount_price && (
                                                    <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                                                        خصم
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-3 flex flex-col flex-grow relative">
                                                <h3 className="font-display font-bold text-sm text-zinc-100 line-clamp-1 mb-1 mt-2 text-center group-hover/card:text-primary transition-colors">
                                                    {book.title}
                                                </h3>
                                                <p className="text-xs text-zinc-400 mb-3 line-clamp-1 text-center font-medium">{book.author}</p>

                                                <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                                                    <div className="flex flex-col leading-none">
                                                        {book.discount_price ? (
                                                            <>
                                                                <span className="text-[10px] text-zinc-500 line-through decoration-red-500/50 mb-0.5">
                                                                    {book.price}
                                                                </span>
                                                                <span className="font-bold text-sm text-primary">
                                                                    {book.discount_price} <span className="text-[10px] font-normal text-zinc-400">ج.م</span>
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="font-bold text-sm text-primary">
                                                                {book.price} <span className="text-[10px] font-normal text-zinc-400">ج.م</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="z-20">
                                                        <MiniAddToCartButton book={book} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Right Button (actually Left in RTL) */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-primary hover:text-black shadow-xl -translate-x-1/2"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
