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
            <section className="relative min-h-[60vh] md:min-h-[500px] flex items-center overflow-hidden py-8 md:py-12">
                <div className="container relative z-10 px-4">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Right Content (Text) */}
                        <div className="space-y-6 text-right order-2 md:order-1">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                                <span className="text-primary font-bold text-sm">✨ عروض حصرية لفترة محدودة</span>
                            </div>
                            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-2xl">
                                مكتبتك <span className="text-primary">الشاملة</span>
                                <br />
                                لكل ما تبحث عنه
                            </h1>
                            <p className="text-lg text-zinc-300 max-w-xl leading-relaxed">
                                تسوق الآن واكتشف آلاف العناوين من الروايات، الكتب السياسية، والتاريخية بأسعار لا تقبل المنافسة. توصيل سريع لجميع المحافظات.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link href="/shop">
                                    <Button size="lg" className="min-w-[160px] h-12 text-lg font-bold shadow-xl shadow-primary/20">
                                        تسوق الآن
                                    </Button>
                                </Link>
                                <Link href="/offers">
                                    <Button variant="outline" size="lg" className="min-w-[160px] h-12 text-lg font-bold border-white/20 hover:bg-white/10 backdrop-blur-md">
                                        أحدث العروض
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 pt-6 border-t border-white/10 mt-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm text-zinc-400">شحن سريع</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm text-zinc-400">دفع عند الاستلام</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm text-zinc-400">جودة أصلية</span>
                                </div>
                            </div>
                        </div>

                        {/* Left Content (Visual/Featured Book) */}
                        <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
                            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square">
                                {/* Abstract Background Elements */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />

                                {/* Featured Book Card Mockup */}
                                <div className="relative z-10 w-full h-full flex items-center justify-center">
                                    <div className="relative w-[260px] md:w-[320px] rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-black/50 blur-xl translate-y-10" />
                                        <Card className="relative bg-zinc-900 border-white/10 overflow-hidden shadow-2xl">
                                            <div className="aspect-[2/3] relative">
                                                {featuredBooks[0]?.image_url ? (
                                                    <Image
                                                        src={featuredBooks[0].image_url}
                                                        alt="Featured Book"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                                        <span className="text-zinc-500">كتاب مميز</span>
                                                    </div>
                                                )}
                                                <div className="absolute top-4 right-4 bg-primary text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                                                    الأكثر مبيعاً
                                                </div>
                                            </div>
                                            <div className="p-4 bg-zinc-900">
                                                <h3 className="font-bold text-lg text-white truncate">{featuredBooks[0]?.title || "عنوان الكتاب"}</h3>
                                                <p className="text-zinc-400 text-sm">{featuredBooks[0]?.author || "المؤلف"}</p>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-primary font-bold text-xl">
                                                        {featuredBooks[0]?.discount_price || featuredBooks[0]?.price || "150"} ج.م
                                                    </span>
                                                    <Button size="sm" className="h-8">شراء الآن</Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
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
