import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getBookById, getBooks, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, BookOpen, Truck, ShieldCheck, Star } from "lucide-react";
import AddToCartButton from "@/app/product/[id]/add-to-cart-button";
import Image from "next/image";
import { BookCarousel } from "@/components/shop/BookCarousel";

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    const book = await getBookById(params.id);

    if (!book) {
        notFound();
    }

    const allBooks = await getBooks();
    const categories = await getCategories();

    // Get Arabic category name
    const categoryName = categories.find(c => c.id === book.category)?.name || book.category;

    const relatedBooks = allBooks
        .filter((b) => b.category === book.category && b.id !== book.id)
        .slice(0, 10);

    // Calculate discount percentage
    const discountPercentage = book.discount_price
        ? Math.round(((book.price - book.discount_price) / book.price) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
            {/* Blurred Background Hero */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                {book.image_url && (
                    <Image
                        src={book.image_url}
                        alt="Background"
                        fill
                        className="object-cover blur-[120px] scale-110"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background" />
            </div>

            <div className="container relative z-10 px-4 pt-6 md:pt-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-8 md:mb-12 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                    <Link href="/shop" className="hover:text-primary transition-colors">المتجر</Link>
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                    <span className="text-zinc-200">{book.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-start">
                    {/* Right Column: Image (Sticky on Desktop) */}
                    <div className="md:col-span-5 lg:col-span-4 md:sticky md:top-32">
                        <div className="relative aspect-[2/3] w-full max-w-[340px] md:max-w-full mx-auto rounded-2xl shadow-2xl shadow-black/50 overflow-hidden border border-white/10 group">
                            {book.image_url ? (
                                <Image
                                    src={book.image_url}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 500px"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                                    <span>لا توجد صورة</span>
                                </div>
                            )}

                            {/* Floating Discount Badge */}
                            {book.discount_price && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white font-bold px-4 py-1.5 rounded-full shadow-xl border border-white/10 backdrop-blur-md z-20">
                                    خصم {discountPercentage}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Column: Details */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-10">
                        {/* Header Info */}
                        <div className="space-y-6 border-b border-white/5 pb-10">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1.5 text-sm font-bold rounded-full transition-colors">
                                    {categoryName}
                                </Badge>
                                {book.stock > 0 ? (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-1.5 text-sm font-bold rounded-full">
                                        متوفر
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive" className="px-4 py-1.5 text-sm font-bold rounded-full">نفذت الكمية</Badge>
                                )}
                            </div>

                            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                                {book.title}
                            </h1>

                            <div className="flex items-center gap-3 text-xl text-zinc-300">
                                <span className="text-zinc-500 font-light">تأليف:</span>
                                <span className="text-primary font-bold hover:text-primary/80 transition-colors cursor-pointer">{book.author}</span>
                            </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 space-y-8 shadow-2xl">
                            <div className="flex flex-wrap items-end gap-6">
                                {book.discount_price ? (
                                    <>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-zinc-400 mb-2 font-medium">السعر الحالي</span>
                                            <span className="text-5xl md:text-6xl font-bold text-primary font-display tracking-tighter">
                                                {book.discount_price} <span className="text-2xl text-zinc-500 font-sans font-normal">ج.م</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col mb-3">
                                            <span className="text-xl text-zinc-600 line-through decoration-red-500/30 decoration-2">
                                                {book.price} ج.م
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-sm text-zinc-400 mb-2 font-medium">السعر</span>
                                        <span className="text-5xl md:text-6xl font-bold text-primary font-display tracking-tighter">
                                            {book.price} <span className="text-2xl text-zinc-500 font-sans font-normal">ج.م</span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-2">
                                <AddToCartButton book={book} />
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
                                <div className="flex flex-col items-center text-center gap-2 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Truck className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-xs text-zinc-400 font-medium">شحن سريع</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <ShieldCheck className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-xs text-zinc-400 font-medium">دفع آمن</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 group">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Star className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-xs text-zinc-400 font-medium">طبعة فاخرة</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white font-display flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-primary" />
                                نبذة عن الكتاب
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none text-zinc-300 leading-loose bg-zinc-900/20 p-8 rounded-3xl border border-white/5 shadow-inner">
                                <p>{book.description}</p>
                                <p className="text-zinc-400">
                                    هذا الكتاب هو رحلة ممتعة في عالم المعرفة والخيال. يتميز بأسلوب سردي مشوق ولغة رصينة تأخذك إلى عوالم أخرى. مناسب لجميع الأعمار ومثالي للإهداء.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
                <div className="mt-24 md:mt-32 border-t border-white/5 pt-16">
                    <BookCarousel
                        title="قد يعجبك أيضاً"
                        subtitle="كتب مشابهة"
                        books={relatedBooks}
                        linkToAll={`/shop?category=${book.category}`}
                    />
                </div>
            )}
        </div>
    );
}
