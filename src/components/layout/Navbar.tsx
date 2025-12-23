"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-display text-2xl font-bold text-primary">
                        كتابيستا
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
                    >
                        الرئيسية
                    </Link>
                    <Link
                        href="/shop"
                        className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
                    >
                        الكتب
                    </Link>
                    <Link
                        href="/offers"
                        className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
                    >
                        العروض
                    </Link>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Link href="/cart">
                        <Button variant="ghost" size="sm" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                                    {itemCount}
                                </span>
                            )}
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-background"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            <Link
                                href="/"
                                className="text-sm font-medium text-text-primary hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الرئيسية
                            </Link>
                            <Link
                                href="/shop"
                                className="text-sm font-medium text-text-primary hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                الكتب
                            </Link>
                            <Link
                                href="/offers"
                                className="text-sm font-medium text-text-primary hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                العروض
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
