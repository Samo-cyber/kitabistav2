import { Section } from "@/components/ui/Section";

export default function PrivacyPage() {
    return (
        <div className="bg-background min-h-screen pb-8 pt-20">
            <Section className="pt-0 md:pt-0 pb-8 md:pb-12">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            سياسة <span className="text-primary">الخصوصية</span>
                        </h1>
                        <p className="text-xl text-gray-400">نحن نهتم بخصوصيتك ونلتزم بحماية بياناتك الشخصية</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-12 text-lg leading-relaxed text-gray-300">
                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">ما هي المعلومات التي نجمعها؟</h2>
                            <p>
                                نقوم بجمع المعلومات التي تقدمها لنا عند التسجيل في الموقع، أو تقديم طلب، أو الاشتراك في نشرتنا الإخبارية. قد تتضمن هذه المعلومات اسمك، عنوان بريدك الإلكتروني، عنوان الشحن، ورقم الهاتف.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">كيف نستخدم معلوماتك؟</h2>
                            <ul className="space-y-2 text-gray-300 inline-block text-right list-disc pr-4">
                                <li>لمعالجة طلباتك وتوصيل مشترياتك.</li>
                                <li>لتحسين تجربتك على الموقع وخدمة العملاء.</li>
                                <li>لإرسال رسائل بريد إلكتروني دورية بخصوص طلبك أو منتجات وخدمات أخرى.</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">حماية المعلومات</h2>
                            <p>
                                نحن نطبق مجموعة من الإجراءات الأمنية للحفاظ على سلامة معلوماتك الشخصية. يتم نقل جميع المعلومات الحساسة عبر تقنية Secure Socket Layer (SSL) ثم تشفيرها في قاعدة بياناتنا.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">ملفات تعريف الارتباط (Cookies)</h2>
                            <p>
                                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا، وفهم كيفية استخدامه، وتخصيص المحتوى والإعلانات.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="font-display text-2xl font-bold text-primary">مشاركة المعلومات مع أطراف ثالثة</h2>
                            <p>
                                نحن لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف خارجية دون موافقتك، باستثناء الأطراف الموثوقة التي تساعدنا في تشغيل موقعنا أو إجراء أعمالنا، طالما وافقت تلك الأطراف على الحفاظ على سرية هذه المعلومات.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
