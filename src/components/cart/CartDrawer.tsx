"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export function CartDrawer() {
    const { items, removeItem, updateQuantity, total, isCartOpen, closeCart } = useCart();

    // Lock body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
                            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                                سلة التسوق
                                <span className="text-sm font-normal text-gray-500 mt-1">({items.length})</span>
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
                                        <ShoppingBag className="w-10 h-10" />
                                    </div>
                                    <p className="text-xl text-gray-400 font-medium">السلة فارغة</p>
                                    <Button onClick={closeCart} className="bg-primary text-black font-bold">
                                        تصفح الكتب
                                    </Button>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 bg-black/20 p-4 rounded-xl border border-white/5"
                                        >
                                            {/* Image */}
                                            <div className="w-16 aspect-[2/3] bg-white/5 rounded-lg overflow-hidden relative shrink-0 border border-white/10">
                                                {item.image_url ? (
                                                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-500 text-center p-1">
                                                        {item.title}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>
                                                    <p className="text-xs text-gray-400 truncate">{item.author}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="font-bold text-primary text-sm">
                                                        {(item.discount_price || item.price) * item.quantity} ج.م
                                                    </div>

                                                    <div className="flex items-center bg-zinc-800 rounded-lg border border-white/10">
                                                        <button
                                                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-6 text-center text-xs font-bold text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors self-start p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-zinc-900 border-t border-white/10 space-y-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-400">
                                        <span>المجموع الفرعي</span>
                                        <span>{total} ج.م</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>الشحن</span>
                                        <span className="text-green-500">50 ج.م</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/5">
                                        <span>الإجمالي</span>
                                        <span className="text-primary">{total + 50} ج.م</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        closeCart();
                                        window.location.href = "/checkout";
                                    }}
                                    className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                                >
                                    إتمام الشراء
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </Button>

                                <button
                                    onClick={closeCart}
                                    className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    العودة للتسوق
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
