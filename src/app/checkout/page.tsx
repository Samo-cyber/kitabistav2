import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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

const formClasses = "w-full bg-black/40 border border-white/10 rounded-xl px-4 pr-10 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";
const inputClasses = `${formClasses} h-12`;
const textareaClasses = `${formClasses} py-3 min-h-[120px] resize-none`;

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
                    className="font-display text-5xl font-bold text-white mb-6"
                >
                    تم استلام طلبك بنجاح!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 max-w-lg mb-10 text-xl leading-relaxed"
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
        <div className="bg-background min-h-screen flex flex-col">
            {/* Header with Back Button */}
            <div className="w-full max-w-3xl mx-auto px-4 py-6 flex justify-between items-center">
                <Link href="/" className="font-display text-2xl font-bold text-primary">
                    كتابيستا
                </Link>
                <Link href="/cart" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="group-hover:-translate-x-1 transition-transform">العودة للسلة</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4 pb-20">
                <div className="w-full max-w-3xl">
                    <Card className="border-0 shadow-2xl bg-zinc-900/50 backdrop-blur-xl border-t border-white/10 overflow-hidden ring-1 ring-white/5">

                        {/* Internal Progress Bar */}
                        <div className="bg-black/20 border-b border-white/5 p-8">
                            <div className="flex items-center justify-between relative max-w-lg mx-auto">
                                {/* Progress Line */}
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
                                <div
                                    className="absolute top-1/2 right-0 h-1 bg-gradient-to-l from-primary to-primary/50 -z-10 rounded-full transition-all duration-700 ease-in-out"
                                    style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                                ></div>

                                {/* Steps */}
                                {[
                                    { step: 1, icon: MapPin, label: "العنوان" },
                                    { step: 2, icon: CreditCard, label: "الدفع" },
                                    { step: 3, icon: ShieldCheck, label: "المراجعة" }
                                ].map(({ step, icon: Icon, label }) => (
                                    <div key={step} className={`flex flex-col items-center gap-3 relative z-10 ${currentStep >= step ? "text-primary" : "text-gray-500"}`}>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-lg bg-background ${currentStep >= step ? "border-primary text-primary scale-110 shadow-primary/25" : "border-zinc-700 text-gray-500"}`}>
                                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <span className={`text-sm font-bold transition-colors duration-300 ${currentStep >= step ? "text-white" : "text-gray-500"}`}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 md:p-10">
                            <form onSubmit={handleSubmit}>
                                <AnimatePresence mode="wait">
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="mb-6 text-center">
                                                <h2 className="font-display text-3xl font-bold text-white">عنوان التوصيل</h2>
                                            </div>
                                            <Button type="button" size="lg" onClick={nextStep} disabled={!isStep1Valid} className="w-full md:w-auto px-10 h-12 text-lg shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all">
                                                التالي
                                                <ChevronLeft className="w-5 h-5 mr-2" />
                                            </Button>
                                        </div>
                                        </motion.div>
                                    )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mb-6 text-center">
                                            <h2 className="font-display text-3xl font-bold text-white">طريقة الدفع</h2>
                                        </div>

                                        <div className="space-y-4 max-w-2xl mx-auto">
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <label className="relative flex items-center gap-6 p-6 border-2 border-primary bg-gradient-to-r from-primary/10 to-transparent rounded-xl cursor-pointer transition-all hover:bg-primary/5">
                                                    <div className="w-6 h-6 rounded-full border-[6px] border-primary bg-white shadow-lg"></div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                                                <Truck className="w-6 h-6" />
                                                            </div>
                                                            <span className="font-bold text-xl text-white">الدفع عند الاستلام</span>
                                                        </div>
                                                        <p className="text-sm text-gray-300 pr-[52px]">ادفع نقداً عند استلام طلبك</p>
                                                    </div>
                                                </label>
                                            </div>

                                            <label className="flex items-center gap-6 p-6 border border-white/5 bg-black/20 rounded-xl cursor-not-allowed opacity-50 grayscale">
                                                <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                                                            <CreditCard className="w-6 h-6" />
                                                        </div>
                                                        <span className="font-bold text-xl text-gray-400">الدفع بالبطاقة</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 pr-[52px]">غير متاح حالياً - قريباً</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="mt-12 flex justify-between items-center">
                                            <Button type="button" variant="ghost" size="lg" onClick={prevStep} className="px-6 text-gray-400 hover:text-white hover:bg-white/5">
                                                <ChevronRight className="w-5 h-5 ml-2" />
                                                السابق
                                            </Button>
                                            <Button type="button" size="lg" onClick={nextStep} className="px-10 h-12 text-lg shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all">
                                                التالي
                                                <ChevronLeft className="w-5 h-5 mr-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mb-6 text-center">
                                            <h2 className="font-display text-3xl font-bold text-white">مراجعة الطلب</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Order Items */}
                                            <div className="space-y-6">
                                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                                    <ShoppingBag className="w-5 h-5 text-primary" />
                                                    المنتجات
                                                </h3>
                                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                                    {items.map((item) => (
                                                        <div key={item.id} className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold text-sm text-white">
                                                                    {item.quantity}x
                                                                </div>
                                                                <div>
                                                                    <p className="text-white font-bold text-base">{item.title}</p>
                                                                    <p className="text-xs text-gray-400">{item.author}</p>
                                                                </div>
                                                            </div>
                                                            <span className="font-bold text-primary text-lg">{(item.discount_price || item.price) * item.quantity} <span className="text-xs text-gray-500">ج.م</span></span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Customer Info & Totals */}
                                            <div className="space-y-6">
                                                <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
                                                        <MapPin className="w-5 h-5 text-primary" />
                                                        بيانات التوصيل
                                                    </h3>
                                                    <div className="space-y-2 text-sm">
                                                        <p className="text-gray-300 flex justify-between"><span className="text-gray-500">الاسم:</span> <span className="text-white font-medium">{formData.fullName}</span></p>
                                                        <p className="text-gray-300 flex justify-between"><span className="text-gray-500">الهاتف:</span> <span className="text-white font-medium">{formData.phone}</span></p>
                                                        <p className="text-gray-300 flex justify-between"><span className="text-gray-500">العنوان:</span> <span className="text-white font-medium text-left" dir="ltr">{formData.address}, {formData.city}</span></p>
                                                    </div>
                                                </div>

                                                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-gray-400 text-base">
                                                            <span>المجموع الفرعي</span>
                                                            <span>{total} ج.م</span>
                                                        </div>
                                                        <div className="flex justify-between text-gray-400 text-base">
                                                            <span>الشحن</span>
                                                            <span className="text-green-400">50 ج.م</span>
                                                        </div>
                                                        <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-white/10 mt-2">
                                                            <span>الإجمالي الكلي</span>
                                                            <span className="text-primary">{total + 50} <span className="text-sm font-normal text-gray-500">ج.م</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-12 flex justify-between items-center">
                                            <Button type="button" variant="ghost" size="lg" onClick={prevStep} className="px-6 text-gray-400 hover:text-white hover:bg-white/5">
                                                <ChevronRight className="w-5 h-5 ml-2" />
                                                السابق
                                            </Button>
                                            <Button type="submit" size="lg" className="px-10 h-14 text-lg bg-green-600 hover:bg-green-500 text-white border-0 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all">
                                                تأكيد الطلب
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                </div>
            </Card>
        </div>
            </div >
        </div >
    );
}
