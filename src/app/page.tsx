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
        <div className="flex flex-col gap-0">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] md:min-h-[450px] flex items-center justify-center overflow-hidden py-8 md:py-6">
                {/* Background removed to show global fixed background */}

                <div className="container relative z-10 px-4 text-center space-y-8 md:space-y-10">
                    <div className="space-y-6">
                        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up drop-shadow-2xl">
                            اكتشف عوالم <span className="text-primary">جديدة</span>
                            <br />
                            بين طيات الكتب
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up delay-100 leading-relaxed font-light">
                            مكتبة كتابيستا تقدم لك أفضل الإصدارات العربية والعالمية بتجربة تسوق فريدة مستوحاة من التراث.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200 pt-4">
                            <Link href="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:min-w-[160px] h-14 sm:h-12 text-lg font-bold shadow-xl shadow-primary/20">
                                    تصفح الكتب
                                </Button>
                            </Link>
                            <Link href="/offers" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:min-w-[160px] h-14 sm:h-12 text-lg font-bold border-white/20 hover:bg-white/10 backdrop-blur-md">
                                    العروض الحالية
                                </Button>
                            </Link>
                        </div>
                    </div>


                </div>
            </section>

            {/* Best Sellers Section */}
            {/* Best Sellers Section */}
            <BookCarousel
                title="الأكثر مبيعاً"
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
