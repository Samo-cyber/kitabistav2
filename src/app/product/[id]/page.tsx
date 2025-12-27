import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getBookById, getBooks } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, Share2, ChevronRight, BookOpen, Truck, ShieldCheck } from "lucide-react";
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
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                {book.image_url && (
                    <Image
                        src={book.image_url}
                        alt="Background"
                        fill
                        className="object-cover blur-[100px] scale-110"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="container relative z-10 px-4 pt-4 md:pt-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6 md:mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
                    <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/shop" className="hover:text-primary transition-colors">المتجر</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-zinc-200">{book.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                    {/* Right Column: Image (Sticky on Desktop) */}
                    <div className="md:col-span-5 lg:col-span-4 md:sticky md:top-24">
                        <div className="relative aspect-[2/3] w-full max-w-[320px] md:max-w-full mx-auto rounded-xl shadow-2xl overflow-hidden border border-white/10 group">
                            {book.image_url ? (
                                <Image
                                    src={book.image_url}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                                    <span>لا توجد صورة</span>
                                </div>
                            )}

                            {/* Floating Discount Badge */}
                            {book.discount_price && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-lg border border-white/10 backdrop-blur-md animate-pulse">
                                    خصم {discountPercentage}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Column: Details */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-8">
                        {/* Header Info */}
                        <div className="space-y-4 border-b border-white/10 pb-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 text-sm">
                                    {book.category}
                                </Badge>
                                {book.stock > 0 ? (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1 text-sm">
                                        متوفر في المخزون
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive" className="px-3 py-1 text-sm">نفذت الكمية</Badge>
                                )}
                            </div>

                            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                {book.title}
                            </h1>

                            <div className="flex items-center gap-2 text-lg text-zinc-300">
                                <span className="text-zinc-500">تأليف:</span>
                                <span className="text-primary font-bold hover:underline cursor-pointer">{book.author}</span>
                            </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                            <div className="flex flex-wrap items-end gap-4">
                                {book.discount_price ? (
                                    <>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-zinc-400 mb-1">السعر الحالي</span>
                                            <span className="text-4xl md:text-5xl font-bold text-primary font-display">
                                                {book.discount_price} <span className="text-lg text-zinc-400 font-sans">ج.م</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col mb-2">
                                            <span className="text-lg text-zinc-500 line-through decoration-red-500/50">
                                                {book.price} ج.م
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-sm text-zinc-400 mb-1">السعر</span>
                                        <span className="text-4xl md:text-5xl font-bold text-primary font-display">
                                            {book.price} <span className="text-lg text-zinc-400 font-sans">ج.م</span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                                <div className="flex-1">
                                    <AddToCartButton book={book} />
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none border-white/10 hover:bg-white/5 hover:text-red-500 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none border-white/10 hover:bg-white/5 hover:text-blue-400 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                    <Truck className="w-5 h-5 text-primary" />
                                    <span>شحن سريع</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    <span>دفع آمن</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    <span>جودة أصلية</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white font-display border-r-4 border-primary pr-4">
                                نبذة عن الكتاب
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none text-zinc-300 leading-relaxed bg-zinc-900/30 p-6 rounded-xl border border-white/5">
                                <p>{book.description}</p>
                                <p>
                                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
                <div className="mt-16 md:mt-24">
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
