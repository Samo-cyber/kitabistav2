"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Book, Category } from "@/lib/data";
import Link from "next/link";
import { Filter, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        <div className="bg-background min-h-screen">
            {/* Header */}
            <div className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="font-display text-5xl font-bold mb-4 text-primary">المكتبة</h1>
                    <p className="text-gray-300 text-lg max-w-xl">تصفح مجموعتنا المختارة من الكتب المميزة، حيث تلتقي الفخامة بالمعرفة.</p>
                </div>
            </div>

            <Section>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Filters */}
                    <aside className="w-full md:w-64 space-y-8">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <div className="flex items-center gap-2 font-bold text-lg mb-6 text-primary">
                                <Filter className="w-5 h-5" />
                                <span>تصفية النتائج</span>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-semibold mb-4 text-white">الأقسام</h3>
                                <Link href="/shop" className="block">
                                    <div
                                        className={`px-4 py-3 rounded-lg transition-all duration-300 ${!selectedCategory
                                            ? "bg-primary text-secondary font-bold shadow-lg shadow-primary/20"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        الكل
                                    </div>
                                </Link>
                                {categories.map((cat) => (
                                    <Link key={cat.id} href={`/shop?category=${cat.id}`} className="block">
                                        <div
                                            className={`px-4 py-3 rounded-lg transition-all duration-300 ${selectedCategory === cat.id
                                                ? "bg-primary text-secondary font-bold shadow-lg shadow-primary/20"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            {cat.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <p className="text-gray-300 font-medium">
                                عرض <span className="text-primary font-bold">{displayedBooks.length}</span> كتاب
                            </p>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-black/20 hover:bg-black/40 rounded-lg text-sm font-medium transition-colors border border-white/5"
                                >
                                    <span>ترتيب حسب:</span>
                                    <span className="text-primary">
                                        {sortBy === "default" && "الافتراضي"}
                                        {sortBy === "price_asc" && "السعر: من الأقل للأكثر"}
                                        {sortBy === "price_desc" && "السعر: من الأكثر للأقل"}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {isSortOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute left-0 top-full mt-2 w-56 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => { setSortBy("default"); setIsSortOpen(false); }}
                                                className={`w-full text-right px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === "default" ? "text-primary font-bold" : "text-gray-300"}`}
                                            >
                                                الافتراضي
                                            </button>
                                            <button
                                                onClick={() => { setSortBy("price_asc"); setIsSortOpen(false); }}
                                                className={`w-full text-right px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === "price_asc" ? "text-primary font-bold" : "text-gray-300"}`}
                                            >
                                                السعر: من الأقل للأكثر
                                            </button>
                                            <button
                                                onClick={() => { setSortBy("price_desc"); setIsSortOpen(false); }}
                                                className={`w-full text-right px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === "price_desc" ? "text-primary font-bold" : "text-gray-300"}`}
                                            >
                                                السعر: من الأكثر للأقل
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedBooks.map((book) => (
                                <Link key={book.id} href={`/product/${book.id}`}>
                                    <Card className="h-full overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col border-0 bg-white/5 backdrop-blur-sm">
                                        <div className="relative aspect-[2/3] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={book.image_url}
                                                alt={book.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {book.discount_price && (
                                                <Badge className="absolute top-4 right-4 bg-primary text-secondary font-bold z-20 shadow-lg">
                                                    خصم
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col relative">
                                            <h3 className="font-display font-bold text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                                                {book.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 mb-4">
                                                {book.author}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    {book.discount_price ? (
                                                        <>
                                                            <span className="text-xs text-gray-500 line-through mb-0.5">
                                                                {book.price} ج.م
                                                            </span>
                                                            <span className="font-bold text-xl text-primary">
                                                                {book.discount_price} <span className="text-xs font-normal text-gray-400">ج.م</span>
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="font-bold text-xl text-primary">
                                                            {book.price} <span className="text-xs font-normal text-gray-400">ج.م</span>
                                                        </span>
                                                    )}
                                                </div>
                                                <Button size="sm" variant="ghost" className="rounded-full w-10 h-10 p-0 hover:bg-primary hover:text-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {displayedBooks.length === 0 && (
                            <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-gray-400 text-lg">لا توجد كتب في هذا القسم حالياً.</p>
                                <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/shop'}>
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
