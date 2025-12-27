"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronDown, CreditCard, Truck, MapPin, ShoppingBag, ShieldCheck, ArrowRight, User, Phone, Map } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنوفية",
    "القليوبية", "البحيرة", "الغربية", "بور سعيد", "دمياط", "الإسماعيلية",
    "السويس", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا", "أسيوط",
    "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
    "مطروح", "شمال سيناء", "جنوب سيناء"
];

const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 pr-10 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all hover:bg-white/10";
const labelClasses = "block text-sm font-medium text-gray-400 mb-1.5";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false); // For mobile accordion

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        clearCart();
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="w-28 h-28 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-500/20 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]"
                >
                    <CheckCircle className="w-14 h-14" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    تم استلام طلبك بنجاح!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 max-w-lg mb-10 text-lg md:text-xl leading-relaxed"
                >
                    شكراً لثقتك بنا. سيتم التواصل معك قريباً لتأكيد الطلب.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link href="/">
                        <Button size="lg" className="min-w-[240px] h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">العودة للرئيسية</Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
                    <ShoppingBag className="w-10 h-10" />
                </div>
                <p className="text-2xl text-gray-400 font-medium">سلة المشتريات فارغة</p>
                <Link href="/shop">
                    <Button size="lg" className="min-w-[200px]">تصفح الكتب أولاً</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary/30">
            <div className="lg:grid lg:grid-cols-12 min-h-screen">

                {/* LEFT COLUMN: Order Summary (Sticky on Desktop) */}
                <div className="lg:col-span-5 lg:order-2 bg-zinc-900/30 border-l border-white/5 relative">
                    {/* Mobile Summary Toggle */}
                    <div className="lg:hidden bg-zinc-900/50 border-b border-white/5 p-4">
                        <button
                            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                            className="w-full flex items-center justify-between text-primary font-medium"
                        >
                            <span className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                {isSummaryOpen ? "إخفاء ملخص الطلب" : "عرض ملخص الطلب"}
                                <ChevronDown className={`w-4 h-4 transition-transform ${isSummaryOpen ? "rotate-180" : ""}`} />
                            </span>
                            <span className="text-white font-bold">{total + 50} ج.م</span>
                        </button>
                    </div>

                    {/* Summary Content */}
                    <div className={`
                        lg:block lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto custom-scrollbar
                        ${isSummaryOpen ? "block" : "hidden"}
                    `}>
                        <div className="p-6 lg:p-12 space-y-8">
                            {/* Items List */}
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center group">
                                        <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                            {/* We would use Next/Image here in production */}
                                            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                                            <span className="absolute top-0 right-0 bg-gray-500/80 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-lg z-10">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-200 truncate group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-sm text-gray-500 truncate">{item.author}</p>
                                        </div>
                                        <div className="text-white font-medium">
                                            {(item.discount_price || item.price) * item.quantity} ج.م
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-white/10" />

                            {/* Cost Breakdown */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>المجموع الفرعي</span>
                                    <span>{total} ج.م</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>الشحن</span>
                                    <span className="text-green-400">50 ج.م</span>
                                </div>
                            </div>

                            <div className="h-px bg-white/10" />

                            {/* Total */}
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-200">الإجمالي الكلي</span>
                                <div className="text-right">
                                    <span className="text-3xl font-display font-bold text-primary">{total + 50}</span>
                                    <span className="text-sm text-gray-500 mr-2">ج.م</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Checkout Form */}
                <div className="lg:col-span-7 lg:order-1">
                    <div className="max-w-2xl mx-auto p-6 lg:p-12 lg:pt-16">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/" className="font-display text-3xl font-bold text-primary">
                                كتابيستا
                            </Link>
                            <Link href="/cart" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                                <ArrowRight className="w-4 h-4" />
                                العودة للسلة
                            </Link>
                        </div>

                        {/* Breadcrumbs (Visual Only) */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
                            <span className="text-primary">السلة</span>
                            <ChevronLeft className="w-4 h-4" />
                            <span className="text-white">البيانات والشحن</span>
                            <ChevronLeft className="w-4 h-4" />
                            <span>الدفع</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* Section 1: Contact Info */}
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-primary" />
                                    بيانات الاتصال
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClasses}>رقم الهاتف</label>
                                        <div className="relative">
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                type="tel"
                                                placeholder="01xxxxxxxxx"
                                                className={inputClasses}
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2: Shipping Address */}
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    عنوان التوصيل
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className={labelClasses}>الاسم بالكامل</label>
                                        <div className="relative">
                                            <input
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="الاسم الأول والأخير"
                                                className={inputClasses}
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                <User className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className={labelClasses}>المحافظة</label>
                                        <div className="relative">
                                            <select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className={`${inputClasses} appearance-none`}
                                            >
                                                <option value="" disabled>اختر المحافظة</option>
                                                {governorates.map((gov) => (
                                                    <option key={gov} value={gov} className="bg-zinc-900 text-white">
                                                        {gov}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                <Map className="w-5 h-5" />
                                            </div>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className={labelClasses}>العنوان بالتفصيل</label>
                                        <div className="relative">
                                            <input
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="اسم الشارع، رقم العمارة، الشقة"
                                                className={inputClasses}
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 3: Payment */}
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    طريقة الدفع
                                </h2>
                                <div className="space-y-3">
                                    <label className="relative flex items-center gap-4 p-4 border border-primary bg-primary/10 rounded-lg cursor-pointer transition-all">
                                        <div className="w-5 h-5 rounded-full border-[5px] border-primary bg-white shadow-sm"></div>
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="font-bold text-white">الدفع عند الاستلام (Cash on Delivery)</span>
                                            <Truck className="w-5 h-5 text-primary" />
                                        </div>
                                    </label>

                                    <div className="p-4 bg-zinc-900/50 rounded-lg border border-white/5 text-center text-gray-500 text-sm">
                                        الدفع بالبطاقات البنكية غير متاح حالياً
                                    </div>
                                </div>
                            </section>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-black shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl"
                                >
                                    إتمام الطلب - {total + 50} ج.م
                                </Button>
                                <p className="text-center text-gray-500 text-sm mt-4 flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    بياناتك محمية ومشفرة بالكامل
                                </p>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
