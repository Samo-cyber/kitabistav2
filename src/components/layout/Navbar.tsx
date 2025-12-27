"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Input } from "@/components/ui/Input";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Lock body scroll when menu or search is open
    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMenuOpen, isSearchOpen]);

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-display text-2xl font-bold text-primary group-hover:text-primary-hover transition-colors">
                            كتابيستا
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="/">الرئيسية</NavLink>
                        <NavLink href="/shop">المكتبة</NavLink>
                        <NavLink href="/offers">العروض</NavLink>
                        <NavLink href="/about">عن كتابيستا</NavLink>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden md:flex hover:bg-primary/10 hover:text-primary"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Link href="/cart">
                            <Button variant="ghost" size="sm" className="relative hover:bg-primary/10 hover:text-primary">
                                <ShoppingCart className="h-5 w-5" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white animate-pulse">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden hover:bg-primary/10 hover:text-primary"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Slide-out */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-zinc-900 border-l border-white/10 z-50 shadow-2xl p-6"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="font-display text-2xl font-bold text-primary">كتابيستا</h2>
                                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-2">
                                <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>الرئيسية</MobileNavLink>
                                <MobileNavLink href="/shop" onClick={() => setIsMenuOpen(false)}>المكتبة</MobileNavLink>
                                <MobileNavLink href="/offers" onClick={() => setIsMenuOpen(false)}>العروض</MobileNavLink>
                                <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>عن كتابيستا</MobileNavLink>
                                <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>اتصل بنا</MobileNavLink>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <Button
                                    className="w-full justify-start gap-3 mb-4"
                                    variant="outline"
                                    onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                                >
                                    <Search className="w-4 h-4" />
                                    بحث عن كتاب...
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-start justify-center pt-32 px-4"
                    >
                        <div className="w-full max-w-2xl relative">
                            <Button
                                variant="ghost"
                                className="absolute -top-16 right-0 text-gray-400 hover:text-white"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                <X className="w-8 h-8" />
                            </Button>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-3xl font-display font-bold text-center mb-8 text-white">عن ماذا تبحث؟</h2>
                                <div className="relative">
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="اكتب اسم الكتاب أو المؤلف..."
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pr-14 pl-6 text-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                        autoFocus
                                    />
                                </div>
                                <div className="mt-8">
                                    <p className="text-sm text-gray-500 mb-4">الأكثر بحثاً:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["نجيب محفوظ", "روايات رعب", "كتب تاريخية", "أحمد خالد توفيق", "تنمية بشرية"].map((tag) => (
                                            <button key={tag} className="px-4 py-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-sm text-gray-300">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
        >
            {children}
            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 text-gray-300 hover:text-primary transition-colors group"
        >
            <span className="font-medium text-lg">{children}</span>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
        </Link>
    );
}
