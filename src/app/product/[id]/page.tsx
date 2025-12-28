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
        <div className="min-h-screen bg-background pb-10 overflow-x-hidden">
            {/* Blurred Background Hero */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                {book.image_url && (
                    <Image
                        src={book.image_url}
                        alt="Background"
                        fill
                        className="object-cover blur-[120px] scale-110"
                        priority
                        unoptimized
                        referrerPolicy="no-referrer"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background" />
            </div>

            <div className="container relative z-10 px-4 pt-6 md:pt-10 pb-12 md:pb-0">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6 md:mb-10 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                    <Link href="/shop" className="hover:text-primary transition-colors">المتجر</Link>
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                    <span className="text-zinc-200">{book.title}</span>
                </div>

                {/* Mobile Header (Visible only on mobile) */}
                <div className="md:hidden mb-4">
                    <div className="flex gap-5">
                        {/* Image */}
                        <div className="w-[35%] flex-shrink-0">
                            <div className="relative aspect-[2/3] w-full rounded-lg shadow-lg overflow-hidden border border-white/10">
                                {book.image_url ? (
                                    <Image
                                        src={book.image_url}
                                        alt={book.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="150px"
                                        unoptimized
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 text-xs">
                                        <span>لا توجد صورة</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-2 py-0.5 text-xs font-bold rounded-md">
                                    {categoryName}
                                </Badge>
                                {book.stock > 0 ? (
                                    <Badge variant="outline" className="bg-green-500/5 text-green-400 border-green-500/20 px-2 py-0.5 text-xs font-bold rounded-md">
                                        متوفر
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive" className="px-2 py-0.5 text-xs font-bold rounded-md">نفذت الكمية</Badge>
                                )}
                            </div>

                            <h1 className="font-display text-xl font-bold text-white leading-tight mb-1 line-clamp-2">
                                {book.title}
                            </h1>

                            <div className="flex items-center gap-1 text-sm text-zinc-300 mb-3">
                                <span className="text-zinc-500 font-light">تأليف:</span>
                                <span className="text-primary font-bold">{book.author}</span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                {book.discount_price ? (
                                    <>
                                        <span className="text-xl font-bold text-primary font-display">
                                            {book.discount_price} <span className="text-sm text-zinc-500 font-sans font-normal">ج.م</span>
                                        </span>
                                        <span className="text-sm text-zinc-600 line-through decoration-red-500/30">
                                            {book.price}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-primary font-display">
                                        {book.price} <span className="text-sm text-zinc-500 font-sans font-normal">ج.م</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-10 items-start">
                    {/* Right Column: Image (Hidden on Mobile, Sticky on Desktop) */}
                    <div className="hidden md:block md:col-span-5 lg:col-span-4 md:sticky md:top-24">
                        <div className="relative aspect-[2/3] w-full max-w-[300px] md:max-w-full mx-auto rounded-xl shadow-2xl shadow-black/50 overflow-hidden border border-white/10 group">
                            {book.image_url ? (
                                <Image
                                    src={book.image_url}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    unoptimized
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                                    <span>لا توجد صورة</span>
                                </div>
                            )}

                            {/* Floating Discount Badge */}
                            {book.discount_price && (
                                <div className="absolute top-3 right-3 bg-red-600 text-white font-bold px-3 py-1 rounded-lg shadow-xl border border-white/10 backdrop-blur-md z-20 text-sm">
                                    خصم {discountPercentage}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Column: Details */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-4">
                        {/* Header Info (Hidden on Mobile) */}
                        <div className="hidden md:block space-y-3 border-b border-white/5 pb-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 px-3 py-1 text-xs font-bold rounded-md transition-colors">
                                    {categoryName}
                                </Badge>
                                {book.stock > 0 ? (
                                    <Badge variant="outline" className="bg-green-500/5 text-green-400 border-green-500/20 px-3 py-1 text-xs font-bold rounded-md">
                                        متوفر
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive" className="px-3 py-1 text-xs font-bold rounded-md">نفذت الكمية</Badge>
                                )}
                            </div>

                            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                                {book.title}
                            </h1>

                            <div className="flex items-center gap-2 text-base text-zinc-300">
                                <span className="text-zinc-500 font-light text-base">تأليف:</span>
                                <span className="text-primary font-bold hover:text-primary/80 transition-colors cursor-pointer">{book.author}</span>
                            </div>
                        </div>

                        {/* Price & Actions (Hidden on Mobile) */}
                        <div className="hidden md:block bg-zinc-900/20 backdrop-blur-sm border border-white/5 rounded-2xl p-5 md:p-6 space-y-4">
                            <div className="flex flex-wrap items-end gap-4">
                                {book.discount_price ? (
                                    <>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-zinc-500 mb-1 font-medium">السعر الحالي</span>
                                            <span className="text-4xl md:text-5xl font-bold text-primary font-display tracking-tighter">
                                                {book.discount_price} <span className="text-lg text-zinc-500 font-sans font-normal">ج.م</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col mb-2">
                                            <span className="text-lg text-zinc-600 line-through decoration-red-500/30 decoration-2">
                                                {book.price} ج.م
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-zinc-500 mb-1 font-medium">السعر</span>
                                        <span className="text-4xl md:text-5xl font-bold text-primary font-display tracking-tighter">
                                            {book.price} <span className="text-lg text-zinc-500 font-sans font-normal">ج.م</span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-2">
                                <AddToCartButton book={book} />
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                                <div className="flex flex-col items-center text-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Truck className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400 font-medium">شحن سريع</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <ShieldCheck className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400 font-medium">دفع آمن</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Star className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400 font-medium">طبعة فاخرة</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                نبذة عن الكتاب
                            </h2>
                            <div className="text-zinc-300 leading-[1.8] bg-zinc-900/10 p-5 rounded-xl border border-white/5 font-normal text-base md:text-lg">
                                <p className="mb-4">{book.description}</p>
                                <p className="text-zinc-400 text-sm md:text-base italic">
                                    هذا الكتاب هو رحلة ممتعة في عالم المعرفة والخيال. يتميز بأسلوب سردي مشوق ولغة رصينة تأخذك إلى عوالم أخرى. مناسب لجميع الأعمار ومثالي للإهداء.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/90 backdrop-blur-lg border-t border-white/10 p-4 md:hidden pb-safe">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <AddToCartButton book={book} />
                    </div>
                    <div className="flex flex-col items-end">
                        {book.discount_price ? (
                            <>
                                <span className="text-xl font-bold text-primary font-display">
                                    {book.discount_price} <span className="text-xs text-zinc-500 font-sans font-normal">ج.م</span>
                                </span>
                                <span className="text-xs text-zinc-600 line-through decoration-red-500/30">
                                    {book.price}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-primary font-display">
                                {book.price} <span className="text-xs text-zinc-500 font-sans font-normal">ج.م</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
                <div className="mt-8 md:mt-12 border-t border-white/5 pt-8">
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
