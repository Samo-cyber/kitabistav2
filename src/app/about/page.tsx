import { Section } from "@/components/ui/Section";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-secondary text-secondary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl font-bold mb-4">عن كتابيستا</h1>
                    <p className="text-gray-300">قصة شغف بالكتب والقراءة</p>
                </div>
            </div>

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="font-display text-3xl font-bold text-primary">من نحن؟</h2>
                        <p className="leading-relaxed text-gray-300 text-lg">
                            كتابيستا هي أكثر من مجرد متجر كتب؛ هي مجتمع للقراء ومحبي المعرفة. تأسست كتابيستا برؤية بسيطة: جعل الكتب عالية الجودة في متناول الجميع، مع الحفاظ على الهوية العربية الأصيلة.
                        </p>
                        <p className="leading-relaxed text-gray-300 text-lg">
                            نحن نؤمن بأن القراءة هي بوابة لعوالم لا حصر لها، ونسعى لتوفير تجربة تسوق فريدة تجمع بين سهولة التكنولوجيا ودفء المكتبات التقليدية.
                        </p>
                        <div className="pt-4">
                            <h3 className="font-bold text-xl text-primary mb-2">رؤيتنا</h3>
                            <p className="text-gray-400">
                                أن نكون الوجهة الأولى للقارئ العربي، ومصدراً للإلهام والمعرفة في كل بيت.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-600">
                            {/* Placeholder for an about image */}
                            <span className="text-lg">صورة عن المكتبة</span>
                        </div>
                        {/* 
                        <Image 
                            src="/images/about-us.jpg" 
                            alt="مكتبة كتابيستا" 
                            fill 
                            className="object-cover"
                        /> 
                        */}
                    </div>
                </div>
            </Section>
        </div>
    );
}
