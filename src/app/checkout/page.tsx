"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, CreditCard, Truck, MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        area: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isStep1Valid = formData.firstName && formData.lastName && formData.phone && formData.address && formData.city && formData.area;

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
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6"
                >
                    <CheckCircle className="w-12 h-12" />
                </motion.div>
                <h1 className="font-display text-4xl font-bold text-white mb-4">
                    تم استلام طلبك بنجاح!
                </h1>
                <p className="text-gray-400 max-w-md mb-8 text-lg">
                    شكراً لثقتك بنا. سيتم التواصل معك قريباً لتأكيد الطلب وموعد التوصيل.
                </p>
                <Link href="/">
                    <Button size="lg" className="min-w-[200px]">العودة للرئيسية</Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
                <p className="text-xl text-gray-400">سلة المشتريات فارغة</p>
                <Link href="/shop">
                    <Button size="lg">تصفح الكتب أولاً</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-12">
            {/* Header / Progress */}
            <div className="bg-secondary/50 border-b border-white/5 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between items-center relative">
                            {/* Progress Bar Background */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
                            {/* Active Progress */}
                            <div
                                className="absolute top-1/2 right-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
                                style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                            ></div>

                            {/* Step 1 */}
                            <div className={`flex flex-col items-center gap-2 bg-background px-2 ${currentStep >= 1 ? "text-primary" : "text-gray-500"}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 1 ? "border-primary bg-primary text-secondary" : "border-white/10 bg-zinc-900"}`}>
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold">العنوان</span>
                            </div>

                            {/* Step 2 */}
                            <div className={`flex flex-col items-center gap-2 bg-background px-2 ${currentStep >= 2 ? "text-primary" : "text-gray-500"}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 2 ? "border-primary bg-primary text-secondary" : "border-white/10 bg-zinc-900"}`}>
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold">الدفع</span>
                            </div>

                            {/* Step 3 */}
                            <div className={`flex flex-col items-center gap-2 bg-background px-2 ${currentStep >= 3 ? "text-primary" : "text-gray-500"}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 3 ? "border-primary bg-primary text-secondary" : "border-white/10 bg-zinc-900"}`}>
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold">المراجعة</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Section>
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Card className="p-8 border-0 shadow-2xl bg-white/5 backdrop-blur-sm">
                                        <h2 className="font-display text-2xl font-bold mb-8 text-white flex items-center gap-2">
                                            <span className="w-1 h-8 bg-primary rounded-full"></span>
                                            بيانات التوصيل
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">الاسم الأول</label>
                                                <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="مثال: أحمد" className="bg-black/20 border-white/10 focus:border-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">اسم العائلة</label>
                                                <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="مثال: محمد" className="bg-black/20 border-white/10 focus:border-primary" />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-medium text-gray-300">رقم الهاتف</label>
                                                <Input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" placeholder="01xxxxxxxxx" className="bg-black/20 border-white/10 focus:border-primary" />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-medium text-gray-300">العنوان بالتفصيل</label>
                                                <Input name="address" value={formData.address} onChange={handleInputChange} required placeholder="اسم الشارع، رقم العمارة، الشقة" className="bg-black/20 border-white/10 focus:border-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">المدينة</label>
                                                <Input name="city" value={formData.city} onChange={handleInputChange} required placeholder="مثال: القاهرة" className="bg-black/20 border-white/10 focus:border-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">المنطقة</label>
                                                <Input name="area" value={formData.area} onChange={handleInputChange} required placeholder="مثال: المعادي" className="bg-black/20 border-white/10 focus:border-primary" />
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <Button type="button" size="lg" onClick={nextStep} disabled={!isStep1Valid} className="w-full md:w-auto px-8">
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
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Card className="p-8 border-0 shadow-2xl bg-white/5 backdrop-blur-sm">
                                        <h2 className="font-display text-2xl font-bold mb-8 text-white flex items-center gap-2">
                                            <span className="w-1 h-8 bg-primary rounded-full"></span>
                                            طريقة الدفع
                                        </h2>

                                        <div className="space-y-4">
                                            <label className="flex items-center gap-4 p-6 border border-primary bg-primary/10 rounded-xl cursor-pointer transition-all">
                                                <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Truck className="w-5 h-5 text-primary" />
                                                        <span className="font-bold text-lg text-white">الدفع عند الاستلام</span>
                                                    </div>
                                                    <p className="text-sm text-gray-400">ادفع نقداً عند استلام طلبك</p>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-4 p-6 border border-white/10 bg-black/20 rounded-xl cursor-not-allowed opacity-50">
                                                <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                                        <span className="font-bold text-lg text-gray-400">الدفع بالبطاقة (قريباً)</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">غير متاح حالياً</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="mt-8 flex justify-between">
                                            <Button type="button" variant="outline" size="lg" onClick={prevStep} className="px-8">
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                                السابق
                                            </Button>
                                            <Button type="button" size="lg" onClick={nextStep} className="px-8">
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
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Card className="p-8 border-0 shadow-2xl bg-white/5 backdrop-blur-sm">
                                        <h2 className="font-display text-2xl font-bold mb-8 text-white flex items-center gap-2">
                                            <span className="w-1 h-8 bg-primary rounded-full"></span>
                                            مراجعة الطلب
                                        </h2>

                                        <div className="space-y-6">
                                            {/* Customer Info Summary */}
                                            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                                <h3 className="font-bold text-gray-300 mb-3 text-sm">بيانات التوصيل</h3>
                                                <p className="text-white font-medium">{formData.firstName} {formData.lastName}</p>
                                                <p className="text-gray-400 text-sm">{formData.phone}</p>
                                                <p className="text-gray-400 text-sm">{formData.address}, {formData.area}, {formData.city}</p>
                                            </div>

                                            {/* Order Items */}
                                            <div className="space-y-4">
                                                <h3 className="font-bold text-gray-300 text-sm">المنتجات</h3>
                                                {items.map((item) => (
                                                    <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-xs">
                                                                {item.quantity}x
                                                            </div>
                                                            <span className="text-white font-medium">{item.title}</span>
                                                        </div>
                                                        <span className="font-bold text-primary">{(item.discount_price || item.price) * item.quantity} ج.م</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Totals */}
                                            <div className="border-t border-white/10 pt-4 space-y-2">
                                                <div className="flex justify-between text-gray-400">
                                                    <span>المجموع الفرعي</span>
                                                    <span>{total} ج.م</span>
                                                </div>
                                                <div className="flex justify-between text-gray-400">
                                                    <span>الشحن</span>
                                                    <span>50 ج.م</span>
                                                </div>
                                                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10 mt-2">
                                                    <span>الإجمالي الكلي</span>
                                                    <span className="text-primary">{total + 50} ج.م</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex justify-between">
                                            <Button type="button" variant="outline" size="lg" onClick={prevStep} className="px-8">
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                                السابق
                                            </Button>
                                            <Button type="submit" size="lg" className="px-8 bg-green-600 hover:bg-green-700 text-white border-0">
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
            </Section>
        </div>
    );
}
