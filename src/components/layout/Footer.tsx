import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative bg-black/40 backdrop-blur-md border-t border-white/10 text-secondary-foreground pt-20 pb-8 overflow-hidden">
            {/* Frieze Pattern */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-[url('/images/frieze-pattern.png')] bg-contain bg-repeat-x opacity-80 border-b border-primary/30" />

            {/* Stone Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-5 pointer-events-none mix-blend-overlay" />

            <div className="container relative z-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
                    <div className="space-y-4 md:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-background font-bold text-xl">ك</span>
                            </div>
                            <span className="font-display text-2xl font-bold text-primary">كتابيستا</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-400 max-w-xs">
                            وجهتك الأولى للكتب العربية والعالمية.
                        </p>
                    </div>

                    {/* Links Section - 2 Columns on Mobile */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-bold mb-3 text-primary text-sm md:text-base">روابط سريعة</h3>
                            <ul className="space-y-1.5 text-xs md:text-sm text-gray-400">
                                <li><a href="#" className="hover:text-primary transition-colors">عن كتابيستا</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">المدونة</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">وظائف</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">اتصل بنا</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold mb-3 text-primary text-sm md:text-base">المساعدة</h3>
                            <ul className="space-y-1.5 text-xs md:text-sm text-gray-400">
                                <li><a href="#" className="hover:text-primary transition-colors">الأسئلة الشائعة</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">سياسة الشحن</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">سياسة الإرجاع</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">شروط الاستخدام</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-3 text-primary text-sm md:text-base">تواصل معنا</h3>
                        <ul className="space-y-1.5 text-xs md:text-sm text-gray-400">
                            <li>support@kitabista.com</li>
                            <li>+20 123 456 7890</li>
                            <li>القاهرة، مصر</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                    <p>جميع الحقوق محفوظة © {new Date().getFullYear()} Smarto</p>
                </div>
            </div>
        </footer>
    );
}
