import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { getBooks, getCategories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { MiniAddToCartButton } from "@/components/product/MiniAddToCartButton";

export default async function Home() {
    const books = await getBooks();
    const categories = await getCategories();
    const featuredBooks = books.slice(0, 5);

    return (
        <div className="flex flex-col gap-0">
            {/* Hero Section */}
            <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden py-8">
                {/* Background removed to show global fixed background */}

                <div className="container relative z-10 px-4 text-center space-y-6">
                    <div className="space-y-4">
                        <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight animate-fade-in-up">
                            اكتشف عوالم <span className="text-primary">جديدة</span>
                            <br />
                            بين طيات الكتب
                        </h1>
                        <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto animate-fade-in-up delay-100">
                            مكتبة كتابيستا تقدم لك أفضل الإصدارات العربية والعالمية بتجربة تسوق فريدة مستوحاة من التراث.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-200">
                            <Link href="/shop">
                                <Button size="lg" className="min-w-[130px] h-10 text-sm">
                                    تصفح الكتب
                                </Button>
                            </Link>
                            <Link href="/offers">
                                <Button variant="outline" size="lg" className="min-w-[130px] h-10 text-sm">
                                    العروض الحالية
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Integrated Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 animate-fade-in-up delay-300">
                        {categories.map((cat) => (
                            <Link key={cat.id} href={`/shop?category=${cat.id}`}>
                                <Card className="group h-20 flex flex-col items-center justify-center p-3 bg-background/10 backdrop-blur-sm border-white/10 hover:bg-primary/20 hover:border-primary/50 cursor-pointer transition-all duration-300">
                                    <span className="font-display text-base font-bold text-white group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <Section className="bg-black/20 backdrop-blur-sm border-t border-white/5 py-8 md:py-12">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl font-bold text-primary mb-2">
                        أحدث الإصدارات
                    </h2>
                    <p className="text-text-secondary">كتب مميزة اخترناها لك بعناية</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
                    {featuredBooks.map((book) => (
                        <Link key={book.id} href={`/product/${book.id}`}>
                            <Card className="h-full overflow-hidden group relative border-0 bg-black/40 hover:bg-black/60 transition-colors duration-300">
                                <div className="flex flex-col h-full">
                                    {/* Image Container - Full Width */}
                                    <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                                        {book.image_url ? (
                                            <Image
                                                src={book.image_url}
                                                alt={book.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                                priority={true}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                                                <span>{book.title}</span>
                                            </div>
                                        )}
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                        {/* Badge if Discounted */}
                                        {book.discount_price && (
                                            <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                                                خصم
                                            </div>
                                        )}
                                    </div>

                                    {/* Content - Compact & Premium */}
                                    <div className="p-3 flex flex-col flex-grow relative">
                                        {/* Decorative Top Border */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary/30 rounded-full group-hover:w-20 transition-all duration-300"></div>

                                        <h3 className="font-display font-bold text-base text-zinc-100 line-clamp-1 mb-1 mt-2 text-center group-hover:text-primary transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-zinc-400 mb-3 line-clamp-1 text-center font-medium">{book.author}</p>

                                        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                                            <div className="flex flex-col leading-none">
                                                {book.discount_price ? (
                                                    <>
                                                        <span className="text-[10px] text-zinc-500 line-through decoration-red-500/50 mb-0.5">
                                                            {book.price}
                                                        </span>
                                                        <span className="font-bold text-sm text-primary">
                                                            {book.discount_price} <span className="text-[10px] font-normal text-zinc-400">ج.م</span>
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-bold text-sm text-primary">
                                                        {book.price} <span className="text-[10px] font-normal text-zinc-400">ج.م</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="z-20">
                                                <MiniAddToCartButton book={book} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link href="/shop">
                        <Button variant="outline" size="lg" className="min-w-[200px] border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all">
                            عرض كل الكتب
                        </Button>
                    </Link>
                </div>
            </Section>


        </div>
    );
}
