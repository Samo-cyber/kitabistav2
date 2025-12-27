import { Section } from "@/components/ui/Section";

export default function TermsPage() {
    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-secondary text-secondary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl font-bold mb-4">شروط الاستخدام</h1>
                    <p className="text-gray-300">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
                </div>
            </div>

            <Section>
                <div className="max-w-4xl mx-auto space-y-8 text-text-primary">
                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">1. مقدمة</h2>
                        <p className="leading-relaxed text-gray-300">
                            مرحباً بكم في كتابيستا. باستخداكم لهذا الموقع، فإنكم توافقون على الالتزام بشروط الاستخدام هذه. يرجى قراءتها بعناية قبل البدء في التسوق.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">2. الحساب الشخصي</h2>
                        <p className="leading-relaxed text-gray-300">
                            عند إنشاء حساب على موقعنا، أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور، وتتحمل المسؤولية الكاملة عن جميع الأنشطة التي تحدث تحت حسابك.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">3. المنتجات والأسعار</h2>
                        <p className="leading-relaxed text-gray-300">
                            نسعى جاهدين لعرض ألوان وصور منتجاتنا بأكبر قدر ممكن من الدقة. ومع ذلك، لا يمكننا ضمان أن عرض شاشتك لأي لون سيكون دقيقاً تماماً. جميع الأسعار قابلة للتغيير دون إشعار مسبق.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">4. الشحن والتوصيل</h2>
                        <p className="leading-relaxed text-gray-300">
                            نقوم بالشحن إلى معظم مناطق الجمهورية. قد تختلف مواعيد التوصيل حسب الموقع الجغرافي والظروف الخارجة عن إرادتنا.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">5. سياسة الإرجاع</h2>
                        <p className="leading-relaxed text-gray-300">
                            يمكنكم إرجاع المنتجات غير التالفة في غضون 14 يوماً من تاريخ الاستلام، بشرط أن تكون في حالتها الأصلية ومغلفة بغلافها الأصلي.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold text-primary">6. الملكية الفكرية</h2>
                        <p className="leading-relaxed text-gray-300">
                            جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والصور، هي ملك لكتابيستا ومحمية بموجب قوانين حقوق النشر.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
