import { Section } from "@/components/ui/Section";

export default function ReturnPolicyPage() {
    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-secondary text-secondary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl font-bold mb-4">سياسة الاستبدال والاسترجاع</h1>
                    <p className="text-gray-300">حقك مضمون معنا</p>
                </div>
            </div>

            <Section>
                <div className="max-w-4xl mx-auto space-y-8 text-text-primary">
                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">فترة الاسترجاع</h2>
                        <p className="leading-relaxed text-gray-300">
                            يمكنك طلب استرجاع أو استبدال المنتج خلال <strong>14 يوماً</strong> من تاريخ استلام الطلب، طالما كان المنتج في حالته الأصلية.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">شروط الاسترجاع</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mr-4">
                            <li>أن يكون المنتج في حالته الأصلية ولم يتم استخدامه.</li>
                            <li>وجود غلاف المنتج الأصلي وجميع الملحقات (إن وجدت).</li>
                            <li>وجود فاتورة الشراء الأصلية.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">المنتجات غير القابلة للاسترجاع</h2>
                        <p className="leading-relaxed text-gray-300">
                            حرصاً على سلامتكم، لا يمكن استرجاع الكتب التي تم فتح غلافها البلاستيكي إلا في حالة وجود عيب طباعة أو تلف مصنعي.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">كيفية تقديم طلب الاسترجاع</h2>
                        <p className="leading-relaxed text-gray-300">
                            يمكنك تقديم طلب الاسترجاع من خلال التواصل مع خدمة العملاء عبر صفحة "اتصل بنا" أو إرسال بريد إلكتروني إلى <span className="text-primary">support@kitabista.com</span>.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">استرداد المبلغ</h2>
                        <p className="leading-relaxed text-gray-300">
                            يتم استرداد المبلغ بنفس طريقة الدفع الأصلية خلال 5-10 أيام عمل من تاريخ استلامنا للمنتج المرتجع وفحصه.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
