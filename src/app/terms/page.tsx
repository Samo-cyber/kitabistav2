import { Section } from "@/components/ui/Section";

export default function TermsPage() {
    return (
        <div className="bg-background min-h-screen pb-20 pt-20">
            <Section className="pt-0 md:pt-0">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            شروط <span className="text-primary">الاستخدام</span>
                        </h1>
                        <p className="text-xl text-gray-400">آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-12 text-lg leading-relaxed text-gray-300">
                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">1. مقدمة</h2>
                            <p>
                                مرحباً بكم في كتابيستا. باستخداكم لهذا الموقع، فإنكم توافقون على الالتزام بشروط الاستخدام هذه. يرجى قراءتها بعناية قبل البدء في التسوق.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">2. الحساب الشخصي</h2>
                            <p>
                                عند إنشاء حساب على موقعنا، أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور، وتتحمل المسؤولية الكاملة عن جميع الأنشطة التي تحدث تحت حسابك.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">3. المنتجات والأسعار</h2>
                            <p>
                                نسعى جاهدين لعرض ألوان وصور منتجاتنا بأكبر قدر ممكن من الدقة. ومع ذلك، لا يمكننا ضمان أن عرض شاشتك لأي لون سيكون دقيقاً تماماً. جميع الأسعار قابلة للتغيير دون إشعار مسبق.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">4. الشحن والتوصيل</h2>
                            <p>
                                نقوم بالشحن إلى معظم مناطق الجمهورية. قد تختلف مواعيد التوصيل حسب الموقع الجغرافي والظروف الخارجة عن إرادتنا.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">5. سياسة الإرجاع</h2>
                            <p>
                                يمكنكم إرجاع المنتجات غير التالفة في غضون 14 يوماً من تاريخ الاستلام، بشرط أن تكون في حالتها الأصلية ومغلفة بغلافها الأصلي.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">6. الملكية الفكرية</h2>
                            <p>
                                جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والصور، هي ملك لكتابيستا ومحمية بموجب قوانين حقوق النشر.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
