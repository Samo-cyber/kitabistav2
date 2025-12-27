"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-6 border border-white/10"
                >
                    <ShoppingBag className="w-10 h-10" />
                </motion.div>
                <h1 className="font-display text-3xl font-bold text-white mb-2">
                    سلة التسوق فارغة
                </h1>
                <p className="text-gray-400 mb-8 text-lg">لم تقم بإضافة أي كتب للسلة بعد.</p>
                <Link href="/shop">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold px-8 h-12 rounded-xl shadow-lg shadow-primary/20 transition-all">
                        تصفح الكتب
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-20 pt-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-primary" />
                        سلة التسوق
                        <span className="text-lg font-normal text-gray-500 mt-2">({items.length} كتب)</span>
                    </h1>
                    <Link href="/shop">
                        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 hidden md:flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" />
                            متابعة التسوق
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="group bg-zinc-900/50 border border-white/5 rounded-2xl p-4 md:p-6 flex gap-4 md:gap-6 items-center hover:border-white/10 transition-all hover:bg-zinc-900/80 backdrop-blur-sm"
                                >
                                    {/* Book Cover */}
                                    <div className="w-20 md:w-24 aspect-[2/3] bg-white/5 rounded-lg overflow-hidden relative shrink-0 border border-white/10 shadow-lg">
                                        {item.image_url ? (
                                            <Image
                                                src={item.image_url}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 text-center p-2 bg-zinc-800">
                                                {item.title}
                                            </div>
                                        )}
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg md:text-xl text-white mb-1 truncate max-w-[200px] md:max-w-md">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {item.author}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-lg text-primary">
                                                    {(item.discount_price || item.price) * item.quantity} <span className="text-xs text-gray-500 font-normal">ج.م</span>
                                                </div>
                                                {item.quantity > 1 && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {item.discount_price || item.price} ج.م / كتاب
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-1">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-10 text-center font-bold text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= (item.stock || 99)}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg flex items-center gap-2 text-sm"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="hidden md:inline">حذف</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
                                    ملخص الطلب
                                </h3>

                                <div className="space-y-4 text-sm border-b border-white/10 pb-6 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">المجموع الفرعي</span>
                                        <span className="text-white font-medium">{total} ج.م</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">الشحن</span>
                                        <span className="text-green-400 font-medium">50 ج.م</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-lg font-bold text-white">الإجمالي</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-display font-bold text-primary">{total + 50}</span>
                                        <span className="text-sm text-gray-500 mr-1">ج.م</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="block">
                                    <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-black text-lg font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                                        إتمام الشراء
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    </Button>
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    ضمان استرجاع خلال 14 يوم
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
