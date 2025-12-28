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
import { cn } from "@/lib/utils";

interface ShopContentProps {
    allBooks: Book[];
    categories: Category[];
    selectedCategory?: string;
}

import { getMockDB } from "@/lib/mock-db";
import { useEffect } from "react";

export function ShopContent({ allBooks: initialBooks, categories, selectedCategory }: ShopContentProps) {
    const [allBooks, setAllBooks] = useState<Book[]>(initialBooks);
    const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc">("default");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Sync with mock DB
    useEffect(() => {
        const db = getMockDB();
        if (db.books.length > 0) {
            setAllBooks(db.books);
        }

        const handleUpdate = () => {
            const updatedDb = getMockDB();
            setAllBooks(updatedDb.books);
        };
        window.addEventListener("mock-db-update", handleUpdate);
        return () => window.removeEventListener("mock-db-update", handleUpdate);
    }, []);

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

    return (
        <div className="relative min-h-screen pb-20 bg-background">
            {/* Chic Background Spectrum */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* Mobile Filter Button (Fixed) */}
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-40 p-3 rounded-r-xl rounded-l-none shadow-lg shadow-primary/20 bg-primary text-primary-foreground font-bold hover:bg-primary-hover transition-all md:hidden border-none outline-none ring-0"
                >
                    <Filter className="w-5 h-5" />
                </button>

                {/* Top Sticky Bar (Desktop Only) */}
                <div className="hidden md:sticky top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-border py-4 shadow-sm transition-all duration-500">
                    <div className="container mx-auto px-4 flex items-center gap-4">
                        {/* Search Bar (Expanded) */}
                        <div className="relative flex-grow hidden md:block">
                            <input
                                type="text"
                                placeholder="ابحث عن كتاب..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-secondary/50 border border-border rounded-xl py-3 pr-12 pl-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-background-paper transition-all"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                        </div>

                        {/* Filter Toggle Button (Desktop) */}
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="hidden md:flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
                        >
                            <Filter className="w-5 h-5" />
                            <span>تصفية وترتيب</span>
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
                                className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-background-paper border-l border-border z-50 shadow-2xl overflow-y-auto"
                            >
                                <div className="p-6 space-y-8">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-display font-bold text-text-primary">تصفية الكتب</h2>
                                        <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-secondary rounded-full text-text-muted hover:text-text-primary transition-colors">
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
                                                        : "bg-secondary text-text-secondary border border-transparent hover:bg-secondary/80"
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
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-secondary text-text-secondary border-transparent hover:bg-secondary/80 hover:text-text-primary"
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-4 md:gap-6">
                        {displayedBooks.map((book) => (
                            <div key={book.id} className="group/card relative flex flex-col h-full">
                                <Link href={`/product/${book.id}`} className="flex flex-col h-full">
                                    <div className="h-full bg-background-paper border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col relative premium-card">
                                        {/* Image Container */}
                                        <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary border-b border-border">
                                            {book.image_url ? (
                                                <Image
                                                    src={book.image_url}
                                                    alt={book.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/card:scale-110 will-change-transform"
                                                    sizes="(max-width: 768px) 160px, 200px"
                                                    priority={true}
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
                                                "font-bold text-text-primary leading-snug group-hover/card:text-primary transition-colors flex items-center justify-center text-center line-clamp-2 min-h-[2.4em]",
                                                book.title.length > 30 ? "text-[11px] md:text-base" : "text-[13px] md:text-base",
                                                "mb-0"
                                            )}>
                                                {book.title}
                                            </h3>

                                            <p className="text-[10px] md:text-xs text-text-muted mb-0.5 line-clamp-1 font-medium -mt-1.5">
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
                                                    <span className="text-[9px] md:text-[10px] text-text-muted font-normal mt-0.5">
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
                                        className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-secondary border border-border text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {displayedBooks.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookIcon className="w-10 h-10 text-text-muted" />
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">لا توجد كتب تطابق بحثك</h3>
                            <p className="text-text-secondary mb-6">جرب كلمات مختلفة أو تصفح كل الكتب.</p>
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
        </div>
    );
}
