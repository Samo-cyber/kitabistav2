import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { getBooks, getCategories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { MiniAddToCartButton } from "@/components/product/MiniAddToCartButton";
import { BookCarousel } from "@/components/shop/BookCarousel";

export default async function Home() {
    const books = await getBooks();
    const categories = await getCategories();
    const featuredBooks = books.slice(0, 15);
    const newBooks = books.slice(5, 20);

    return (
        <div className="flex flex-col gap-0 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center overflow-hidden py-8 md:py-12">
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

                        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 animate-fade-in-up delay-300">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:min-w-[140px] h-12 text-base font-bold shadow-xl shadow-primary/20">
                                    تسوق الآن
                                </Button>
                            </Link>
                            <Link href="/offers" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:min-w-[140px] h-12 text-base font-bold border-white/20 hover:bg-white/10 backdrop-blur-md">
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
