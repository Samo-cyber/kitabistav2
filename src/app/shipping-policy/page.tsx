import { Section } from "@/components/ui/Section";

export default function ShippingPolicyPage() {
    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-secondary text-secondary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl font-bold mb-4">سياسة الشحن والتوصيل</h1>
                    <p className="text-gray-300">كل ما تحتاج معرفته عن توصيل طلبك</p>
                </div>
            </div>

            <Section>
                <div className="max-w-4xl mx-auto space-y-8 text-text-primary">
                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">مناطق التوصيل</h2>
                        <p className="leading-relaxed text-gray-300">
                            نقوم حالياً بالتوصيل إلى جميع محافظات جمهورية مصر العربية. نسعى لتوسيع نطاق خدماتنا ليشمل دولاً أخرى في المستقبل القريب.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">مدة التوصيل</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mr-4">
                            <li><strong>القاهرة والجيزة:</strong> 1-3 أيام عمل.</li>
                            <li><strong>الإسكندرية ومحافظات الدلتا:</strong> 2-4 أيام عمل.</li>
                            <li><strong>محافظات الصعيد:</strong> 3-5 أيام عمل.</li>
                        </ul>
                        <p className="text-sm text-gray-400 mt-2">
                            * أيام العمل هي من الأحد إلى الخميس. العطلات الرسمية قد تؤثر على مواعيد التوصيل.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">رسوم الشحن</h2>
                        <p className="leading-relaxed text-gray-300">
                            رسوم الشحن ثابتة بقيمة <strong>50 ج.م</strong> لجميع الطلبات داخل القاهرة والجيزة، و <strong>70 ج.م</strong> للمحافظات الأخرى.
                        </p>
                        <p className="text-primary font-bold">
                            شحن مجاني للطلبات التي تزيد قيمتها عن 1000 ج.م!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">تتبع الطلب</h2>
                        <p className="leading-relaxed text-gray-300">
                            بمجرد شحن طلبك، ستتلقى رسالة نصية أو بريد إلكتروني يحتوي على رقم التتبع ورابط لمتابعة حالة الشحنة مع شركة الشحن.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
