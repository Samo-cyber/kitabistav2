"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, CreditCard, Truck, MapPin, ShoppingBag, ShieldCheck, ArrowRight, User, Phone, Map } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنوفية",
    "القليوبية", "البحيرة", "الغربية", "بور سعيد", "دمياط", "الإسماعيلية",
    "السويس", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا", "أسيوط",
    "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
    "مطروح", "شمال سيناء", "جنوب سيناء"
];

// Styles matching the project's premium dark theme (Green/Primary)
const cardClasses = "bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:p-8 mb-6 backdrop-blur-sm";
const labelClasses = "block text-right text-gray-300 text-sm font-bold mb-2";
const inputContainerClasses = "relative";
const inputClasses = "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-right text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";
const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500";

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
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6"
                >
                    <CheckCircle className="w-12 h-12" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white mb-4">تم استلام طلبك بنجاح!</h1>
                <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-xl">
                        العودة للرئيسية
                    </Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
                <ShoppingBag className="w-16 h-16 text-gray-600" />
                <p className="text-xl text-gray-400">سلة المشتريات فارغة</p>
                <Link href="/shop">
                    <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-8">تصفح الكتب</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white pb-20">
            {/* Header */}
            <div className="pt-10 pb-6 text-center relative max-w-2xl mx-auto px-4">
                <Link href="/cart" className="absolute right-4 top-11 text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium hidden md:inline">العودة للسلة</span>
                </Link>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">إتمام الشراء</h1>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 flex-row-reverse">
                    {[
                        { num: 3, label: "تأكيد" },
                        { num: 2, label: "الدفع" },
                        { num: 1, label: "البيانات" }
                    ].map((step, index) => (
                        <div key={step.num} className="flex items-center flex-row-reverse">
                            <div className={`flex flex-col items-center gap-2 ${currentStep === step.num ? "opacity-100" : "opacity-40"}`}>
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                    ${currentStep === step.num ? "bg-primary text-black" : "bg-white/10 text-white"}
                                `}>
                                    {step.num}
                                </div>
                                <span className="text-xs md:text-sm font-medium">{step.label}</span>
                            </div>
                            {index < 2 && <div className="w-8 md:w-16 h-[1px] bg-white/10 mx-2 md:mx-4 -mt-6"></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4">
                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {/* Section 1: Personal Data */}
                                <div className={cardClasses}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-end gap-2 text-right">
                                        البيانات الشخصية
                                        <User className="w-5 h-5 text-primary" />
                                    </h2>

                                    <div className="space-y-5">
                                        <div>
                                            <label className={labelClasses}>الاسم بالكامل</label>
                                            <div className={inputContainerClasses}>
                                                <input
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClasses}>رقم الهاتف</label>
                                            <div className={inputContainerClasses}>
                                                <input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    type="tel"
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Delivery Address */}
                                <div className={cardClasses}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-end gap-2 text-right">
                                        عنوان التوصيل
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </h2>

                                    <div className="space-y-5">
                                        <div>
                                            <label className={labelClasses}>العنوان بالتفصيل</label>
                                            <div className={inputContainerClasses}>
                                                <input
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="اسم الشارع، رقم العمارة، الشقة"
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClasses}>المحافظة</label>
                                            <div className={inputContainerClasses}>
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
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <ChevronLeft className="w-5 h-5 rotate-[-90deg]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Button */}
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!isStep1Valid}
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-black text-lg font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    التالي
                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                </Button>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <div className={cardClasses}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-end gap-2 text-right">
                                        طريقة الدفع
                                        <CreditCard className="w-5 h-5 text-primary" />
                                    </h2>

                                    <div className="space-y-4">
                                        <label className="flex items-center justify-between p-4 bg-black/40 border border-primary/50 rounded-xl cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <Truck className="w-6 h-6 text-primary" />
                                                <span className="text-lg font-bold text-white">الدفع عند الاستلام</span>
                                            </div>
                                            <div className="w-5 h-5 rounded-full border-[5px] border-primary bg-white"></div>
                                        </label>

                                        <div className="p-4 bg-black/20 border border-white/5 rounded-xl text-center text-gray-500">
                                            الدفع الإلكتروني غير متاح حالياً
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={prevStep}
                                        className="flex-1 h-14 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
                                    >
                                        السابق
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-black text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
                                    >
                                        التالي
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <div className={cardClasses}>
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-end gap-2 text-right">
                                        ملخص الطلب
                                        <ShoppingBag className="w-5 h-5 text-primary" />
                                    </h2>

                                    <div className="space-y-4 mb-6">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center bg-black/40 p-4 rounded-xl">
                                                <div className="text-right">
                                                    <p className="font-bold text-white">{item.title}</p>
                                                    <p className="text-sm text-gray-400">{item.author}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-primary font-bold">{(item.discount_price || item.price) * item.quantity} ج.م</span>
                                                    <span className="bg-white/10 px-2 py-1 rounded text-xs text-white">x{item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-white/10 pt-4 space-y-2">
                                        <div className="flex justify-between text-gray-400">
                                            <span>{total} ج.م</span>
                                            <span>المجموع</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400">
                                            <span>50 ج.م</span>
                                            <span>الشحن</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold text-white pt-2">
                                            <span className="text-primary">{total + 50} ج.م</span>
                                            <span>الإجمالي</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={prevStep}
                                        className="flex-1 h-14 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
                                    >
                                        السابق
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-[2] h-14 bg-green-600 hover:bg-green-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-green-600/20"
                                    >
                                        تأكيد الطلب
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
}
