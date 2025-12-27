import { Section } from "@/components/ui/Section";

export default function ReturnPolicyPage() {
    return (
        <div className="bg-background min-h-screen pb-20 pt-24">
            <Section>
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            سياسة <span className="text-primary">الاسترجاع</span>
                        </h1>
                        <p className="text-xl text-gray-400">حقك مضمون معنا</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-12 text-lg leading-relaxed text-gray-300">
                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">فترة الاسترجاع</h2>
                            <p>
                                يمكنك طلب استرجاع أو استبدال المنتج خلال <strong>14 يوماً</strong> من تاريخ استلام الطلب، طالما كان المنتج في حالته الأصلية.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">شروط الاسترجاع</h2>
                            <ul className="space-y-2 text-gray-300 inline-block text-right list-disc pr-4">
                                <li>أن يكون المنتج في حالته الأصلية ولم يتم استخدامه.</li>
                                <li>وجود غلاف المنتج الأصلي وجميع الملحقات (إن وجدت).</li>
                                <li>وجود فاتورة الشراء الأصلية.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">المنتجات غير القابلة للاسترجاع</h2>
                            <p>
                                حرصاً على سلامتكم، لا يمكن استرجاع الكتب التي تم فتح غلافها البلاستيكي إلا في حالة وجود عيب طباعة أو تلف مصنعي.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">كيفية تقديم طلب الاسترجاع</h2>
                            <p>
                                يمكنك تقديم طلب الاسترجاع من خلال التواصل مع خدمة العملاء عبر صفحة &quot;اتصل بنا&quot; أو إرسال بريد إلكتروني إلى <span className="text-primary font-bold dir-ltr inline-block">support@kitabista.com</span>.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">استرداد المبلغ</h2>
                            <p>
                                يتم استرداد المبلغ بنفس طريقة الدفع الأصلية خلال 5-10 أيام عمل من تاريخ استلامنا للمنتج المرتجع وفحصه.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
