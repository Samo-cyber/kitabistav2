"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would send data to backend
        setIsSubmitted(true);
        clearCart();
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="font-display text-3xl font-bold text-primary mb-2">
                    تم استلام طلبك بنجاح!
                </h1>
                <p className="text-text-secondary max-w-md mb-8">
                    شكراً لثقتك بنا. سيتم التواصل معك قريباً لتأكيد الطلب وموعد التوصيل.
                </p>
                <Link href="/">
                    <Button size="lg">العودة للرئيسية</Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Link href="/shop">
                    <Button>تصفح الكتب أولاً</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-secondary text-secondary-foreground py-8">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-3xl font-bold">إتمام الشراء</h1>
                </div>
            </div>

            <Section>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6">
                            <h2 className="font-display text-xl font-bold mb-6 text-primary">
                                بيانات التوصيل
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">الاسم الأول</label>
                                    <Input required placeholder="مثال: أحمد" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">اسم العائلة</label>
                                    <Input required placeholder="مثال: محمد" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">رقم الهاتف</label>
                                    <Input required type="tel" placeholder="01xxxxxxxxx" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">العنوان بالتفصيل</label>
                                    <Input required placeholder="اسم الشارع، رقم العمارة، الشقة" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">المدينة</label>
                                    <Input required placeholder="مثال: القاهرة" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">المنطقة</label>
                                    <Input required placeholder="مثال: المعادي" />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="font-display text-xl font-bold mb-6 text-primary">
                                طريقة الدفع
                            </h2>
                            <div className="flex items-center gap-4 p-4 border border-primary/30 bg-primary/5 rounded-lg">
                                <div className="w-4 h-4 rounded-full bg-primary" />
                                <span className="font-bold">الدفع عند الاستلام</span>
                            </div>
                        </Card>
                    </div>

                    {/* Summary */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>
                            <div className="space-y-3 mb-6 max-h-60 overflow-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-text-secondary">
                                            {item.quantity}x {item.title}
                                        </span>
                                        <span>{(item.discount_price || item.price) * item.quantity} ج.م</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-4 space-y-2 text-sm mb-6">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">المجموع</span>
                                    <span>{total} ج.م</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">الشحن</span>
                                    <span>50 ج.م</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                                    <span>الإجمالي</span>
                                    <span className="text-primary">{total + 50} ج.م</span>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" size="lg">
                                تأكيد الطلب
                            </Button>
                        </Card>
                    </div>
                </form>
            </Section>
        </div>
    );
}
