import { Button } from "@/components/ui/Button";
import { getBooks, getCategories } from "@/lib/data";
import Link from "next/link";
import { BookCarousel } from "@/components/shop/BookCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ShoppingBag, Sparkles, Flame } from "lucide-react";
import Image from "next/image";
import { HeroLogo } from "@/components/home/HeroLogo";

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
                    <div className="max-w-3xl mx-auto space-y-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-primary/30 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:border-primary/60 transition-colors cursor-default animate-float">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500/40 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600/80"></span>
                            </span>
                            <span className="text-primary font-bold text-xs tracking-wide">عروض حصرية لفترة محدودة</span>
                            <Flame className="w-3.5 h-3.5 text-orange-500/80 animate-pulse" fill="currentColor" />
                        </div>

                        {/* Logo Heading with Live Motion */}
                        <div className="flex justify-center animate-fade-in-up">
                            <HeroLogo />
                        </div>

                        {/* Paragraph */}
                        <p className="font-sans text-sm md:text-lg text-black/80 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium">
                            نقدم لك مجموعة مختارة من أفضل الكتب العربية والعالمية، لتستمتع برحلة معرفية فريدة وتصلك أينما كنت.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 animate-fade-in-up delay-300">
                            <Link href="/shop" className="w-full sm:w-auto group relative">
                                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full animate-pulse-glow" />
                                <Button size="lg" className="btn-shop-now relative w-full sm:min-w-[200px] h-14 md:h-16 text-base md:text-lg font-bold rounded-full bg-primary text-primary-foreground border-none overflow-hidden group-hover:scale-105 transition-all duration-300 shadow-xl animate-shimmer-bg">
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                                    <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                                    <span>تسوق الآن</span>
                                </Button>
                            </Link>
                            <Link href="/offers" className="w-full sm:w-auto group">
                                <Button variant="outline" size="lg" className="btn-latest-offers w-full sm:min-w-[160px] h-12 md:h-14 text-base md:text-lg font-bold rounded-full border-2 border-black dark:border-white/10 bg-transparent hover:bg-black hover:text-yellow-400 dark:hover:bg-white/10 dark:hover:text-primary text-black dark:text-primary transition-all duration-300">
                                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                                    أحدث العروض
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pt-6 border-t border-black/10 dark:border-white/10 mt-6 animate-fade-in-up delay-500">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-900/60 dark:bg-emerald-900/60" />
                                <span className="text-xs md:text-sm text-black/70 dark:text-zinc-400 font-medium">شحن سريع</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-900/60 dark:bg-emerald-900/60" />
                                <span className="text-xs md:text-sm text-black/70 dark:text-zinc-400 font-medium">دفع عند الاستلام</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-900/60 dark:bg-emerald-900/60" />
                                <span className="text-xs md:text-sm text-black/70 dark:text-zinc-400 font-medium">أفضل الأسعار</span>
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
