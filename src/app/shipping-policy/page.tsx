import { Section } from "@/components/ui/Section";

export default function ShippingPolicyPage() {
    return (
        <div className="bg-background min-h-screen pb-20 pt-24">
            <Section>
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            سياسة <span className="text-primary">الشحن</span>
                        </h1>
                        <p className="text-xl text-gray-400">كل ما تحتاج معرفته عن توصيل طلبك</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-12 text-lg leading-relaxed text-gray-300">
                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">مناطق التوصيل</h2>
                            <p>
                                نقوم حالياً بالتوصيل إلى جميع محافظات جمهورية مصر العربية. نسعى لتوسيع نطاق خدماتنا ليشمل دولاً أخرى في المستقبل القريب.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">مدة التوصيل</h2>
                            <ul className="space-y-2 text-gray-300 inline-block text-right list-disc pr-4">
                                <li><strong>القاهرة والجيزة:</strong> 1-3 أيام عمل.</li>
                                <li><strong>الإسكندرية ومحافظات الدلتا:</strong> 2-4 أيام عمل.</li>
                                <li><strong>محافظات الصعيد:</strong> 3-5 أيام عمل.</li>
                            </ul>
                            <p className="text-sm text-gray-400 mt-2 block">
                                * أيام العمل هي من الأحد إلى الخميس. العطلات الرسمية قد تؤثر على مواعيد التوصيل.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">رسوم الشحن</h2>
                            <p>
                                رسوم الشحن ثابتة بقيمة <strong>50 ج.م</strong> لجميع الطلبات داخل القاهرة والجيزة، و <strong>70 ج.م</strong> للمحافظات الأخرى.
                            </p>
                            <div className="inline-block px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 mt-4">
                                <p className="text-primary font-bold">
                                    شحن مجاني للطلبات التي تزيد قيمتها عن 1000 ج.م! 🚚
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">تتبع الطلب</h2>
                            <p>
                                بمجرد شحن طلبك، ستتلقى رسالة نصية أو بريد إلكتروني يحتوي على رقم التتبع ورابط لمتابعة حالة الشحنة مع شركة الشحن.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
