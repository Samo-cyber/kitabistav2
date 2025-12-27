"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Book, Category } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Filter, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MiniAddToCartButton } from "@/components/product/MiniAddToCartButton";

interface ShopContentProps {
    allBooks: Book[];
    categories: Category[];
    selectedCategory?: string;
}

export function ShopContent({ allBooks, categories, selectedCategory }: ShopContentProps) {
    const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc">("default");
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Filter
    let displayedBooks = selectedCategory
        ? allBooks.filter((book) => book.category === selectedCategory)
        : [...allBooks];

    // Sort
    if (sortBy === "price_asc") {
        displayedBooks.sort((a, b) => {
            const priceA = a.discount_price || a.price;
            const priceB = b.discount_price || b.price;
            return priceA - priceB;
        });
    } else if (sortBy === "price_desc") {
        displayedBooks.sort((a, b) => {
            const priceA = a.discount_price || a.price;
            const priceB = b.discount_price || b.price;
            return priceB - priceA;
        });
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background"></div>

                <div className="relative z-10 text-center space-y-4 px-4">
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
                        المكتبة
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto animate-fade-in-up delay-100">
                        تصفح مجموعتنا المختارة من الكتب المميزة، حيث تلتقي الفخامة بالمعرفة.
                    </p>
                </div>
            </div>

            <Section className="pt-0">
                <div className="flex flex-col gap-8">
                    {/* Top Filter & Sort Bar */}
                    <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-y border-white/5 py-4">
                        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

                            {/* Categories (Horizontal Scroll) */}
                            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                <div className="flex items-center gap-2 min-w-max">
                                    <Link href="/shop">
                                        <div
                                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${!selectedCategory
                                                ? "bg-primary text-black border-primary"
                                                : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            الكل
                                        </div>
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link key={cat.id} href={`/shop?category=${cat.id}`}>
                                            <div
                                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${selectedCategory === cat.id
                                                    ? "bg-primary text-black border-primary"
                                                    : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                {cat.name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Sort & Count */}
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <p className="text-gray-400 text-sm hidden md:block">
                                    <span className="text-primary font-bold">{displayedBooks.length}</span> كتاب
                                </p>

                                <div className="relative">
                                    <button
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors border border-white/5 text-white"
                                    >
                                        <Filter className="w-4 h-4 text-primary" />
                                        <span>
                                            {sortBy === "default" && "الافتراضي"}
                                            {sortBy === "price_asc" && "السعر: الأقل"}
                                            {sortBy === "price_desc" && "السعر: الأكثر"}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isSortOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute left-0 top-full mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                                            >
                                                {[
                                                    { value: "default", label: "الافتراضي" },
                                                    { value: "price_asc", label: "السعر: من الأقل للأكثر" },
                                                    { value: "price_desc", label: "السعر: من الأكثر للأقل" }
                                                ].map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => { setSortBy(option.value as any); setIsSortOpen(false); }}
                                                        className={`w-full text-right px-4 py-3 text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${sortBy === option.value ? "text-primary font-bold bg-white/5" : "text-gray-300"}`}
                                                    >
                                                        {option.label}
                                                        {sortBy === option.value && <Check className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {displayedBooks.map((book) => (
                                <Link key={book.id} href={`/product/${book.id}`}>
                                    <Card className="h-full overflow-hidden group relative border-0 bg-black/40 hover:bg-black/60 transition-colors duration-300">
                                        <div className="flex flex-col h-full">
                                            {/* Image Container - Full Width */}
                                            <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                                                {book.image_url ? (
                                                    <Image
                                                        src={book.image_url}
                                                        alt={book.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                                        priority={true}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                                                        <span>{book.title}</span>
                                                    </div>
                                                )}
                                                {/* Overlay Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                                {/* Badge if Discounted */}
                                                {book.discount_price && (
                                                    <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                                                        خصم
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content - Compact & Premium */}
                                            <div className="p-3 flex flex-col flex-grow relative">
                                                {/* Decorative Top Border */}
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary/30 rounded-full group-hover:w-20 transition-all duration-300"></div>

                                                <h3 className="font-display font-bold text-base text-zinc-100 line-clamp-1 mb-1 mt-2 text-center group-hover:text-primary transition-colors">
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
                            ))}
                        </div>

                        {displayedBooks.length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Book className="w-10 h-10 text-gray-600" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">لا توجد كتب في هذا القسم</h3>
                                <p className="text-gray-400 mb-6">جرب اختيار قسم آخر أو تصفح كل الكتب.</p>
                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = '/shop'}
                                    className="border-primary text-primary hover:bg-primary hover:text-black"
                                >
                                    عرض كل الكتب
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
}
