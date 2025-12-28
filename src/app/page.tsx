import { Button } from "@/components/ui/Button";
import { getBooks, getCategories } from "@/lib/data";
import Link from "next/link";
import { BookCarousel } from "@/components/shop/BookCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ShoppingBag, Sparkles, Flame } from "lucide-react";
import Image from "next/image";

export default async function Home() {
    const books = await getBooks();
    const categories = await getCategories();
    const featuredBooks = books.filter(b => b.is_active).slice(0, 15);
    const newBooks = books.filter(b => b.is_active).slice(5, 20);

    return (
        <div className="flex flex-col gap-0 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center overflow-hidden py-8 md:py-12 pb-16">
                <div className="container relative z-10 px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-primary/30 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.15)] animate-float hover:border-primary/60 transition-colors cursor-default">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                            </span>
                            <span className="text-primary font-bold text-sm tracking-wide">عروض حصرية لفترة محدودة</span>
                            <Flame className="w-4 h-4 text-orange-500 animate-pulse" fill="currentColor" />
                        </div>

                        {/* Logo Heading */}
                        <div className="flex justify-center animate-fade-in-up delay-100">
                            <div className="relative w-full max-w-[300px] md:max-w-[500px] aspect-[2/1]">
                                <Image
                                    src="/images/logo.png"
                                    alt="كتابيستا - وجهتك الأولى للكتب"
                                    fill
                                    className="object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Paragraph */}
                        <p className="font-sans text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                            نقدم لك مجموعة مختارة من أفضل الكتب العربية والعالمية، لتستمتع برحلة معرفية فريدة وتصلك أينما كنت.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-fade-in-up delay-300">
                            <Link href="/shop" className="w-full sm:w-auto group relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-glow" />
                                <Button size="lg" className="relative w-full sm:min-w-[180px] h-16 text-xl font-bold rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black animate-shimmer-bg border-none overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                                    <ShoppingBag className="w-6 h-6 ml-2 animate-bounce" />
                                    تسوق الآن
                                </Button>
                            </Link>
                            <Link href="/offers" className="w-full sm:w-auto group">
                                <Button variant="outline" size="lg" className="w-full sm:min-w-[160px] h-14 text-lg font-bold rounded-full border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all duration-300">
                                    <Sparkles className="w-5 h-5 ml-2" />
                                    أحدث العروض
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pt-6 border-t border-white/10 mt-6 animate-fade-in-up delay-500">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-xs md:text-sm text-zinc-400">شحن سريع</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-xs md:text-sm text-zinc-400">دفع عند الاستلام</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-xs md:text-sm text-zinc-400">أفضل الأسعار</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            < CategoryGrid categories={categories} />

            {/* Best Sellers Section */}
            < BookCarousel
                title="الأكثر مبيعاً 🔥"
                subtitle="الأكثر طلباً"
                books={featuredBooks}
                linkToAll="/shop?sort=best_selling"
            />

            {/* New Additions Section */}
            < BookCarousel
                title="أحدث الإضافات"
                subtitle="جديد"
                books={newBooks}
                linkToAll="/shop?sort=newest"
            />
        </div >
    );
}
