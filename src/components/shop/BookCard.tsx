"use client";

import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MiniAddToCartButton } from "@/components/product/MiniAddToCartButton";

interface BookCardProps {
    book: Book;
    className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
    return (
        <div className={cn("group/card relative flex flex-col h-full", className)}>
            <Link href={`/product/${book.id}`} className="flex flex-col h-full">
                <div className="h-full bg-zinc-900/90 md:bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col md:backdrop-blur-sm relative">
                    {/* Image Container */}
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800 border-b border-white/5">
                        {book.image_url ? (
                            <Image
                                src={book.image_url}
                                alt={book.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover/card:scale-110 will-change-transform"
                                sizes="(max-width: 768px) 160px, 200px"
                                priority={true}
                                unoptimized
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
                        <div className="w-8 h-px bg-primary/80 mx-auto mb-2 rounded-full transition-all duration-500 ease-out group-hover/card:w-24 group-hover/card:bg-primary group-hover/card:shadow-[0_0_15px_rgba(234,179,8,0.4)]" />

                        <h3 className={cn(
                            "font-bold text-white leading-snug group-hover/card:text-primary transition-colors flex items-center justify-center text-center line-clamp-2 min-h-[2.4em]",
                            book.title.length > 30 ? "text-[11px] md:text-base" : "text-[13px] md:text-base",
                            "mb-0"
                        )}>
                            {book.title}
                        </h3>

                        <p className="text-[10px] md:text-xs text-zinc-400 mb-0.5 line-clamp-1 font-medium -mt-1.5">
                            {book.author}
                        </p>

                        {/* Footer: Price & Cart */}
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
                                <span className="text-[9px] md:text-[10px] text-zinc-400 font-normal mt-0.5">
                                    ج.م
                                </span>
                            </div>

                            {/* Add to Cart Button Placeholder (Handled outside Link) */}
                            <div className="w-8 md:w-10 h-8 md:h-10"></div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Actual Add to Cart Button - Positioned absolutely over the placeholder */}
            <div className="absolute bottom-[9px] left-[15px] z-20">
                <MiniAddToCartButton
                    book={book}
                    iconSize="w-4 h-4 md:w-5 md:h-5"
                    className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-primary hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                />
            </div>
        </div>
    );
}
