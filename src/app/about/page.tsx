import { Section } from "@/components/ui/Section";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen pb-20 pt-20">
            <Section className="pt-0 md:pt-0">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            عن <span className="text-primary">كتابيستا</span>
                        </h1>
                        <p className="text-xl text-gray-400">قصة شغف بالكتب والقراءة</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8 text-lg leading-relaxed text-gray-300">
                        <p>
                            كتابيستا هي أكثر من مجرد متجر كتب؛ هي مجتمع للقراء ومحبي المعرفة. تأسست كتابيستا برؤية بسيطة: جعل الكتب عالية الجودة في متناول الجميع، مع الحفاظ على الهوية العربية الأصيلة.
                        </p>
                        <p>
                            نحن نؤمن بأن القراءة هي بوابة لعوالم لا حصر لها، ونسعى لتوفير تجربة تسوق فريدة تجمع بين سهولة التكنولوجيا ودفء المكتبات التقليدية.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h3 className="font-display text-2xl font-bold text-primary mb-4">رؤيتنا</h3>
                        <p className="text-gray-300">
                            أن نكون الوجهة الأولى للقارئ العربي، ومصدراً للإلهام والمعرفة في كل بيت.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
