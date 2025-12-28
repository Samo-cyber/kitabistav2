import { Button } from "@/components/ui/Button";
import { getBooks, getCategories } from "@/lib/data";
import Link from "next/link";
import { BookCarousel } from "@/components/shop/BookCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ShoppingBag, Sparkles } from "lucide-react";

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
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md animate-fade-in-up">
                            <span className="text-primary font-bold text-xs md:text-sm">✨ عروض حصرية لفترة محدودة</span>
                        </div>

                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-2xl animate-fade-in-up delay-100">
                            عالم من الكتب..
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-primary to-yellow-200 bg-[length:200%_auto] animate-shimmer">
                                بين يديك
                            </span>
                        </h1>

                        <p className="text-base md:text-lg text-zinc-300 leading-relaxed animate-fade-in-up delay-200 max-w-2xl mx-auto">
                            تسوق الآن واكتشف آلاف العناوين من الروايات والكتب بأسعار لا تقبل المنافسة.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-fade-in-up delay-300">
                            <Link href="/shop" className="w-full sm:w-auto group">
                                <Button size="lg" className="w-full sm:min-w-[160px] h-14 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-yellow-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-105 transition-all duration-300 border-none">
                                    <ShoppingBag className="w-5 h-5 ml-2" />
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
            <CategoryGrid categories={categories} />

            {/* Best Sellers Section */}
            <BookCarousel
                title="الأكثر مبيعاً 🔥"
                subtitle="الأكثر طلباً"
                books={featuredBooks}
                linkToAll="/shop?sort=best_selling"
            />

            {/* New Additions Section */}
            <BookCarousel
                title="أحدث الإضافات"
                subtitle="جديد"
                books={newBooks}
                linkToAll="/shop?sort=newest"
            />
        </div>
    );
}
