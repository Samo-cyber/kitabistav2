"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, CreditCard, Truck, MapPin, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنوفية",
    "القليوبية", "البحيرة", "الغربية", "بور سعيد", "دمياط", "الإسماعيلية",
    "السويس", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا", "أسيوط",
    "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
    "مطروح", "شمال سيناء", "جنوب سيناء"
];

const formClasses = "w-full bg-black/20 border border-white/10 rounded-lg px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";
const inputClasses = `${formClasses} h-10`; // Reduced height
const textareaClasses = `${formClasses} py-2 min-h-[80px] resize-none`; // Reduced height

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

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

    const isStep1Valid = formData.fullName && formData.phone && formData.address && formData.city;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        clearCart();
    };

    const nextStep = () => {
        if (currentStep === 1 && isStep1Valid) setCurrentStep(2);
        else if (currentStep === 2) setCurrentStep(3);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    if (isSubmitted) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-center px-4 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 border border-green-500/20 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]"
                >
                    <CheckCircle className="w-12 h-12" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-4xl font-bold text-white mb-4"
                >
                    تم استلام طلبك بنجاح!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 max-w-lg mb-8 text-lg leading-relaxed"
                >
                    شكراً لثقتك بنا. سيتم التواصل معك قريباً لتأكيد الطلب.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link href="/">
                        <Button size="lg" className="min-w-[200px] h-12 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">العودة للرئيسية</Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background gap-6">
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
        <div className="bg-background h-screen flex flex-col overflow-hidden">
            {/* Compact Header */}
            <div className="bg-secondary/30 backdrop-blur-md border-b border-white/5 py-4 shrink-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto flex items-center justify-between relative">
                        {/* Back Button */}
                        <Link href="/cart" className="absolute right-0 top-1/2 -translate-y-1/2 md:static md:translate-y-0 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowRight className="w-5 h-5" />
                            <span className="hidden md:inline">العودة للسلة</span>
                        </Link>

                        {/* Progress Steps */}
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center gap-8 relative w-full max-w-md justify-between">
                                {/* Progress Line */}
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 rounded-full"></div>
                                <div
                                    className="absolute top-1/2 right-0 h-0.5 bg-gradient-to-l from-primary to-primary/50 -z-10 rounded-full transition-all duration-700 ease-in-out"
                                    style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                                ></div>

                                {/* Steps */}
                                {[
                                    { step: 1, icon: MapPin, label: "العنوان" },
                                    { step: 2, icon: CreditCard, label: "الدفع" },
                                    { step: 3, icon: ShieldCheck, label: "المراجعة" }
                                ].map(({ step, icon: Icon, label }) => (
                                    <div key={step} className={`flex flex-col items-center gap-2 relative group ${currentStep >= step ? "text-primary" : "text-gray-500"}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${currentStep >= step ? "border-primary bg-primary text-secondary scale-110 shadow-primary/25" : "border-white/10 bg-zinc-900 group-hover:border-white/20"}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className={`text-xs font-bold transition-colors duration-300 ${currentStep >= step ? "text-white" : "text-gray-500"}`}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Spacer for centering */}
                        <div className="w-24 hidden md:block"></div>
                    </div>
                </div>
            </div>

            {/* Main Content - Centered & Compact */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto md:overflow-hidden">
                <div className="w-full max-w-3xl">
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="p-6 md:p-8 border-0 shadow-2xl bg-white/5 backdrop-blur-md border-t border-white/10">
                                        <div className="mb-6 text-start">
                                            <h2 className="font-display text-2xl font-bold text-white mb-1">بيانات التوصيل</h2>
                                            <p className="text-sm text-gray-400">أدخل عنوانك لتوصيل الطلب</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-xs font-medium text-gray-300 mr-1">الاسم بالكامل</label>
                                                <input name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="مثال: أحمد محمد" className={inputClasses} />
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <label className="text-xs font-medium text-gray-300 mr-1">رقم الهاتف</label>
                                                <input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" placeholder="01xxxxxxxxx" className={inputClasses} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-300 mr-1">المحافظة</label>
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
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                        <ChevronLeft className="w-4 h-4 rotate-[-90deg]" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-300 mr-1">العنوان بالتفصيل</label>
                                                <textarea
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="اسم الشارع، رقم العمارة، رقم الشقة..."
                                                    className={textareaClasses}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <Button type="button" size="lg" onClick={nextStep} disabled={!isStep1Valid} className="w-full md:w-auto px-8 h-10 text-base shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all">
                                                التالي
                                                <ChevronLeft className="w-4 h-4 mr-2" />
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="p-6 md:p-8 border-0 shadow-2xl bg-white/5 backdrop-blur-md border-t border-white/10">
                                        <div className="mb-8 text-start">
                                            <h2 className="font-display text-2xl font-bold text-white mb-1">طريقة الدفع</h2>
                                            <p className="text-sm text-gray-400">اختر طريقة الدفع المناسبة لك</p>
                                        </div>

                                        <div className="space-y-3 max-w-xl mx-auto">
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <label className="relative flex items-center gap-4 p-4 border-2 border-primary bg-gradient-to-r from-primary/10 to-transparent rounded-xl cursor-pointer transition-all hover:bg-primary/5">
                                                    <div className="w-5 h-5 rounded-full border-[5px] border-primary bg-white shadow-lg"></div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <div className="p-1.5 bg-primary/20 rounded-lg text-primary">
                                                                <Truck className="w-5 h-5" />
                                                            </div>
                                                            <span className="font-bold text-lg text-white">الدفع عند الاستلام</span>
                                                        </div>
                                                        <p className="text-xs text-gray-300 pr-[42px]">ادفع نقداً عند استلام طلبك</p>
                                                    </div>
                                                </label>
                                            </div>

                                            <label className="flex items-center gap-4 p-4 border border-white/5 bg-black/20 rounded-xl cursor-not-allowed opacity-50 grayscale">
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <div className="p-1.5 bg-white/5 rounded-lg text-gray-400">
                                                            <CreditCard className="w-5 h-5" />
                                                        </div>
                                                        <span className="font-bold text-lg text-gray-400">الدفع بالبطاقة</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 pr-[42px]">غير متاح حالياً - قريباً</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="mt-8 flex justify-between items-center">
                                            <Button type="button" variant="ghost" size="sm" onClick={prevStep} className="px-4 text-gray-400 hover:text-white hover:bg-white/5">
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                                السابق
                                            </Button>
                                            <Button type="button" size="lg" onClick={nextStep} className="px-8 h-10 text-base shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all">
                                                التالي
                                                <ChevronLeft className="w-4 h-4 mr-2" />
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="p-6 md:p-8 border-0 shadow-2xl bg-white/5 backdrop-blur-md border-t border-white/10">
                                        <div className="mb-6 text-start">
                                            <h2 className="font-display text-2xl font-bold text-white mb-1">مراجعة الطلب</h2>
                                            <p className="text-sm text-gray-400">تأكد من تفاصيل طلبك</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Order Items */}
                                            <div className="space-y-4">
                                                <h3 className="font-bold text-white text-base flex items-center gap-2">
                                                    <ShoppingBag className="w-4 h-4 text-primary" />
                                                    المنتجات
                                                </h3>
                                                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                                    {items.map((item) => (
                                                        <div key={item.id} className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-xs text-white">
                                                                    {item.quantity}x
                                                                </div>
                                                                <div>
                                                                    <p className="text-white font-bold text-sm">{item.title}</p>
                                                                    <p className="text-[10px] text-gray-400">{item.author}</p>
                                                                </div>
                                                            </div>
                                                            <span className="font-bold text-primary text-sm">{(item.discount_price || item.price) * item.quantity} <span className="text-[10px] text-gray-500">ج.م</span></span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Customer Info & Totals */}
                                            <div className="space-y-4">
                                                <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2 text-sm">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                        بيانات التوصيل
                                                    </h3>
                                                    <div className="space-y-1 text-xs">
                                                        <p className="text-gray-300 flex justify-between"><span className="text-gray-500">الاسم:</span> <span className="text-white font-medium">{formData.fullName}</span></p>
                                                        <p className="text-gray-300 flex justify-between"><span className="text-gray-500">الهاتف:</span> <span className="text-white font-medium">{formData.phone}</span></p>
                                                        <p className="text-gray-300 flex justify-between"><span className="text-gray-500">العنوان:</span> <span className="text-white font-medium text-left truncate max-w-[150px]" dir="ltr">{formData.address}, {formData.city}</span></p>
                                                    </div>
                                                </div>

                                                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-gray-400 text-xs">
                                                            <span>المجموع الفرعي</span>
                                                            <span>{total} ج.م</span>
                                                        </div>
                                                        <div className="flex justify-between text-gray-400 text-xs">
                                                            <span>الشحن</span>
                                                            <span className="text-green-400">50 ج.م</span>
                                                        </div>
                                                        <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10 mt-1">
                                                            <span>الإجمالي</span>
                                                            <span className="text-primary">{total + 50} <span className="text-xs font-normal text-gray-500">ج.م</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex justify-between items-center">
                                            <Button type="button" variant="ghost" size="sm" onClick={prevStep} className="px-4 text-gray-400 hover:text-white hover:bg-white/5">
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                                السابق
                                            </Button>
                                            <Button type="submit" size="lg" className="px-8 h-12 text-base bg-green-600 hover:bg-green-500 text-white border-0 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all">
                                                تأكيد الطلب
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    );
}
