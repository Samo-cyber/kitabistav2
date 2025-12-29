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

// Styles matching the project's premium dark theme
// Styles matching the project's premium dark theme
const cardClasses = "bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-5 mb-3 backdrop-blur-sm";
const labelClasses = "block text-right text-gray-400 text-xs md:text-sm font-bold mb-1";
const inputContainerClasses = "relative";
const inputClasses = "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-right text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm md:text-base";
const iconClasses = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4";

import { addOrder } from "@/lib/mock-db";

export default function CheckoutPage() {
    const { items, total, clearCart, isLoaded } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
    });

    const [orderId, setOrderId] = useState<string>("");

    if (!isLoaded) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isStep1Valid = formData.fullName && formData.phone && formData.address && formData.city;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Save order to mock DB
        const newOrder = addOrder({
            customer: formData.fullName,
            phone: formData.phone,
            address: `${formData.city} - ${formData.address}`,
            total: total + 50,
            items: items.map(item => ({
                title: item.title,
                quantity: item.quantity,
                price: item.discount_price || item.price
            }))
        });

        setOrderId(newOrder.id);
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
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(255,215,0,0.2)]"
                >
                    <CheckCircle className="w-12 h-12" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white mb-2">تم استلام طلبك بنجاح!</h1>
                <p className="text-gray-400 mb-6 text-lg">شكراً لثقتك بنا، سيتم التواصل معك قريباً لتأكيد الطلب.</p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 min-w-[200px]">
                    <p className="text-gray-500 text-sm mb-1">رقم الطلب</p>
                    <p className="text-2xl font-mono font-bold text-primary tracking-wider">{orderId}</p>
                </div>

                <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105">
                        العودة للرئيسية
                    </Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background gap-6">
                <ShoppingBag className="w-16 h-16 text-gray-600" />
                <p className="text-xl text-gray-400">سلة المشتريات فارغة</p>
                <Link href="/shop">
                    <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-8">تصفح الكتب</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden bg-background text-white flex flex-col">
            {/* Header */}
            <div className="pt-4 pb-2 text-center relative max-w-6xl mx-auto px-4 w-full shrink-0">
                <Link href="/" className="absolute right-4 top-4 text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium text-[10px] hidden md:inline">العودة</span>
                </Link>

                <h1 className="text-lg font-bold text-white mb-6 flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    إتمام الشراء
                </h1>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-2 flex-row-reverse">
                    {[
                        { num: 3, label: "تأكيد" },
                        { num: 2, label: "الدفع" },
                        { num: 1, label: "البيانات" }
                    ].map((step, index) => (
                        <div key={step.num} className="flex items-center flex-row-reverse">
                            <div className={`flex flex-col items-center gap-2 ${currentStep === step.num ? "opacity-100" : "opacity-40"}`}>
                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all
                                    ${currentStep === step.num ? "bg-primary text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]" : "bg-white/10 text-white"}
                                `}>
                                    {step.num}
                                </div>
                                <span className="text-[10px] md:text-xs font-medium">{step.label}</span>
                            </div>
                            {index < 2 && <div className="w-8 md:w-20 h-[2px] bg-white/10 mx-2 md:mx-4 -mt-4 rounded-full"></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content - Centered and Compact */}
            <div className="flex-1 flex items-center justify-center px-4 pb-4 overflow-y-auto md:overflow-hidden">
                <div className="max-w-5xl w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Section 1: Personal Data */}
                                        <div className={cardClasses}>
                                            <h2 className="text-base font-bold text-white mb-3 flex items-center justify-center gap-2">
                                                <User className="w-4 h-4 text-primary" />
                                                البيانات الشخصية
                                            </h2>

                                            <div className="space-y-3">
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
                                            <h2 className="text-base font-bold text-white mb-3 flex items-center justify-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                عنوان التوصيل
                                            </h2>

                                            <div className="space-y-3">
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
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                            <ChevronLeft className="w-4 h-4 rotate-[-90deg]" />
                                                        </div>
                                                    </div>
                                                </div>
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
                                            </div>
                                        </div>
                                    </div>

                                    {/* Next Button */}
                                    <div className="pt-4 max-w-md mx-auto w-full">
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!isStep1Valid}
                                            className="w-full h-12 bg-primary hover:bg-primary/90 text-black text-sm md:text-base font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            التالي
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col max-w-md mx-auto w-full"
                                >
                                    <div className={cardClasses}>
                                        <h2 className="text-base font-bold text-white mb-4 flex items-center justify-center gap-2">
                                            <CreditCard className="w-4 h-4 text-primary" />
                                            طريقة الدفع
                                        </h2>

                                        <div className="space-y-3">
                                            <label className="flex items-center justify-between p-3 bg-black/40 border border-primary/50 rounded-xl cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <Truck className="w-5 h-5 text-primary" />
                                                    <span className="text-base font-bold text-white">الدفع عند الاستلام</span>
                                                </div>
                                                <div className="w-4 h-4 rounded-full border-[4px] border-primary bg-white"></div>
                                            </label>

                                            <div className="p-3 bg-black/20 border border-white/5 rounded-xl text-center text-gray-500 text-xs">
                                                الدفع الإلكتروني غير متاح حالياً
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={prevStep}
                                            className="flex-1 h-12 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl text-xs md:text-sm"
                                        >
                                            السابق
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex-[2] h-12 bg-primary hover:bg-primary/90 text-black text-sm md:text-base font-bold rounded-xl shadow-lg shadow-primary/20"
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
                                    className="flex flex-col max-w-md mx-auto w-full"
                                >
                                    <div className={cardClasses}>
                                        <h2 className="text-base font-bold text-white mb-3 flex items-center justify-center gap-2">
                                            <ShoppingBag className="w-4 h-4 text-primary" />
                                            ملخص الطلب
                                        </h2>

                                        <div className="space-y-2 mb-4 max-h-[30vh] overflow-y-auto custom-scrollbar pr-1">
                                            {items.map((item) => (
                                                <div key={item.id} className="flex justify-between items-center bg-black/40 p-2.5 rounded-lg">
                                                    <div className="text-right">
                                                        <p className="font-bold text-white text-xs">{item.title}</p>
                                                        <p className="text-[10px] text-gray-400">{item.author}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-primary font-bold text-xs">{(item.discount_price || item.price) * item.quantity} ج.م</span>
                                                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white">x{item.quantity}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-white/10 pt-3 space-y-1.5">
                                            <div className="flex justify-between text-gray-400 text-[11px]">
                                                <span>{total} ج.م</span>
                                                <span>المجموع</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400 text-[11px]">
                                                <span>50 ج.م</span>
                                                <span>الشحن</span>
                                            </div>
                                            <div className="flex justify-between text-base font-bold text-white pt-1.5">
                                                <span className="text-primary">{total + 50} ج.م</span>
                                                <span>الإجمالي</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={prevStep}
                                            className="flex-1 h-12 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl text-xs md:text-sm"
                                        >
                                            السابق
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-[2] h-12 bg-green-600 hover:bg-green-500 text-white text-sm md:text-base font-bold rounded-xl shadow-lg shadow-green-600/20"
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
        </div>
    );
}
