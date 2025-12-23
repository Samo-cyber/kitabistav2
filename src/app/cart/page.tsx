"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { useCart } from "@/lib/cart-context";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <h1 className="font-display text-2xl font-bold text-text-primary">
                    سلة التسوق فارغة
                </h1>
                <p className="text-text-secondary">لم تقم بإضافة أي كتب للسلة بعد.</p>
                <Link href="/shop">
                    <Button>تصفح الكتب</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-secondary text-secondary-foreground py-8">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-3xl font-bold">سلة التسوق</h1>
                </div>
            </div>

            <Section>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {items.map((item) => (
                            <Card key={item.id} className="p-4 flex gap-4 items-center">
                                <div className="w-20 h-28 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 text-center p-1">
                                        {item.title}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-text-primary">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary mb-2">
                                        {item.author}
                                    </p>
                                    <div className="font-bold text-primary">
                                        {item.discount_price || item.price} ج.م
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center border border-border rounded-md">
                                        <button
                                            className="p-1 hover:bg-gray-100 transition-colors"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="p-1 hover:bg-gray-100 transition-colors"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="w-full lg:w-80">
                        <Card className="p-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>

                            <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">المجموع الفرعي</span>
                                    <span>{total} ج.م</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">الشحن</span>
                                    <span>50 ج.م</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-bold text-lg mb-6">
                                <span>الإجمالي</span>
                                <span className="text-primary">{total + 50} ج.م</span>
                            </div>

                            <Link href="/checkout" className="block">
                                <Button className="w-full" size="lg">
                                    إتمام الشراء
                                </Button>
                            </Link>

                            <Link href="/shop" className="block mt-4 text-center">
                                <Button variant="ghost" className="text-sm text-text-secondary">
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                    متابعة التسوق
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </Section>
        </div>
    );
}
