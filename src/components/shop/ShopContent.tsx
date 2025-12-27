"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Book, Category } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Filter, ChevronDown, Check, Book as BookIcon } from "lucide-react";
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
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    // Helper to normalize Arabic text
    const normalizeArabic = (text: string) => {
        return text
            .replace(/[أإآ]/g, 'ا') // Normalize Alef
            .replace(/ة/g, 'ه')     // Normalize Taa Marbuta
            .replace(/ى/g, 'ي');    // Normalize Yaa (Optional but good)
    };

    // Filter
    let displayedBooks = allBooks.filter((book) => {
        const matchesCategory = selectedCategory ? book.category === selectedCategory : true;

        if (!searchQuery) return matchesCategory;

        const normalizedSearch = normalizeArabic(searchQuery.toLowerCase());
        const normalizedTitle = normalizeArabic(book.title.toLowerCase());
        const normalizedAuthor = normalizeArabic(book.author.toLowerCase());

        const matchesSearch = normalizedTitle.includes(normalizedSearch) ||
            normalizedAuthor.includes(normalizedSearch);

        return matchesCategory && matchesSearch;
    });

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


    <div className="bg-background min-h-screen pb-8">
        {/* Top Sticky Bar */}
        <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl transition-all duration-300">
            <div className="container mx-auto px-4 flex items-center gap-4">
                {/* Search Bar (Expanded) */}
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="ابحث عن كتاب..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>
                </div>

                {/* Filter Toggle Button */}
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-primary text-black rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/10 whitespace-nowrap"
                >
                    <Filter className="w-5 h-5" />
                    <span className="hidden md:inline">تصفية وترتيب</span>
                </button>
            </div>
        </div>

        {/* Filter Drawer (Side Bubble/Sheet) */}
        <AnimatePresence>
            {isFilterOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFilterOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-zinc-900 border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="p-6 space-y-8">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-display font-bold text-white">تصفية الكتب</h2>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                                    <ChevronDown className="w-6 h-6 rotate-90" />
                                </button>
                            </div>

                            {/* Sort Options */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-primary">الترتيب حسب</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { value: "default", label: "الافتراضي" },
                                        { value: "price_asc", label: "السعر: من الأقل للأكثر" },
                                        { value: "price_desc", label: "السعر: من الأكثر للأقل" }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSortBy(option.value as any)}
                                            className={`w-full text-right px-4 py-3 rounded-lg text-sm transition-all flex items-center justify-between ${sortBy === option.value
                                                ? "bg-primary/10 text-primary border border-primary/20"
                                                : "bg-white/5 text-gray-300 border border-transparent hover:bg-white/10"
                                                }`}
                                        >
                                            {option.label}
                                            {sortBy === option.value && <Check className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-primary">التصنيفات</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/shop" className="w-full">
                                        <div
                                            className={`w-full px-4 py-3 rounded-lg text-sm font-bold transition-all text-center border ${!selectedCategory
                                                ? "bg-primary text-black border-primary"
                                                : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            الكل
                                        </div>
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link key={cat.id} href={`/shop?category=${cat.id}`} className="w-full">
                                            <div
                                                className={`w-full px-4 py-3 rounded-lg text-sm font-bold transition-all text-center border ${selectedCategory === cat.id
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

                            {/* Apply Button */}
                            <div className="pt-8 mt-auto">
                                <Button onClick={() => setIsFilterOpen(false)} className="w-full py-6 text-lg">
                                    عرض {displayedBooks.length} كتاب
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="container mx-auto px-4 pt-8">
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
                        <BookIcon className="w-10 h-10 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">لا توجد كتب تطابق بحثك</h3>
                    <p className="text-gray-400 mb-6">جرب كلمات مختلفة أو تصفح كل الكتب.</p>
                    <Button
                        variant="outline"
                        onClick={() => { setSearchQuery(""); window.location.href = '/shop'; }}
                        className="border-primary text-primary hover:bg-primary hover:text-black"
                    >
                        عرض كل الكتب
                    </Button>
                </div>
            )}
        </div>
    </div>
    );
}
