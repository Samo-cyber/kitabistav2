"use client";

import Image from "next/image";
import Link from "next/link";
import { Book } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { MiniAddToCartButton } from "@/components/product/MiniAddToCartButton";

interface FeaturedDealProps {
    book: Book;
}

export function FeaturedDeal({ book }: FeaturedDealProps) {
    const discountPercentage = Math.round(((book.price - (book.discount_price || 0)) / book.price) * 100);

    return (
        <div className="container mx-auto px-4 -mt-8 relative z-20 mb-12">
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-primary/20 rounded-3xl overflow-hidden shadow-2xl shadow-primary/5">
                <div className="grid md:grid-cols-[1.2fr_2fr] gap-0">
                    {/* Image Section */}
                    <div className="relative h-[300px] md:h-full min-h-[400px] bg-zinc-800">
                        {book.image_url && (
                            <Image
                                src={book.image_url}
                                alt={book.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r md:from-zinc-900 md:via-transparent md:to-transparent" />

                        {/* Badge */}
                        <div className="absolute top-4 right-4 bg-primary text-black font-bold px-4 py-2 rounded-xl shadow-lg z-10 flex flex-col items-center leading-none">
                            <span className="text-xs uppercase tracking-wider mb-1">خصم</span>
                            <span className="text-2xl font-display">{discountPercentage}%</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-10 flex flex-col justify-center relative">
                        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                            <Star className="w-40 h-40 text-primary" fill="currentColor" />
                        </div>

                        <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-4">
                            <Star className="w-4 h-4" fill="currentColor" />
                            <span>صفقة اليوم</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                            {book.title}
                        </h2>
                        <p className="text-xl text-zinc-400 mb-6 font-medium">{book.author}</p>

                        <p className="text-zinc-300 mb-8 leading-relaxed max-w-xl text-lg">
                            {book.description}
                        </p>

                        <div className="flex flex-wrap items-end gap-6 mt-auto">
                            <div className="flex flex-col">
                                <span className="text-zinc-500 text-lg line-through mb-1">
                                    {book.price} ج.م
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl md:text-5xl font-bold text-primary font-display">
                                        {book.discount_price}
                                    </span>
                                    <span className="text-zinc-400 font-medium">ج.م</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mr-auto w-full md:w-auto">
                                <Link href={`/product/${book.id}`} className="flex-1 md:flex-none">
                                    <Button variant="outline" className="w-full h-12 md:h-14 px-8 text-lg border-white/10 hover:bg-white/5">
                                        <span>التفاصيل</span>
                                    </Button>
                                </Link>
                                <div className="flex-1 md:flex-none">
                                    <MiniAddToCartButton
                                        book={book}
                                        className="w-full h-12 md:h-14 px-8 text-lg bg-primary text-black hover:bg-primary-hover rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                                        iconSize="w-5 h-5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
