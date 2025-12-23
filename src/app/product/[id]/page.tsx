import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { getBookById, getBooks } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, Share2 } from "lucide-react";
import AddToCartButton from "@/app/product/[id]/add-to-cart-button"; // Client component

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
        .slice(0, 4);

    return (
        <div className="bg-background min-h-screen pb-12">
            {/* Breadcrumb could go here */}

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="relative aspect-[3/4] md:aspect-square bg-gray-100 rounded-lg overflow-hidden border border-border">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl text-gray-400">
                            {book.title}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
                                    {book.category}
                                </Badge>
                                {book.stock > 0 ? (
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                        متوفر
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">نفذت الكمية</Badge>
                                )}
                            </div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
                                {book.title}
                            </h1>
                            <p className="text-lg text-text-secondary">
                                تأليف: <span className="text-primary font-medium">{book.author}</span>
                            </p>
                        </div>

                        <div className="flex items-end gap-4 border-b border-border pb-6">
                            {book.discount_price ? (
                                <>
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold text-primary">
                                            {book.discount_price} ج.م
                                        </span>
                                        <span className="text-sm text-text-muted">شامل الضريبة</span>
                                    </div>
                                    <span className="text-xl text-text-muted line-through mb-1">
                                        {book.price} ج.م
                                    </span>
                                    <Badge className="mb-2 bg-accent">
                                        وفر {Math.round(((book.price - book.discount_price) / book.price) * 100)}%
                                    </Badge>
                                </>
                            ) : (
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-primary">
                                        {book.price} ج.م
                                    </span>
                                    <span className="text-sm text-text-muted">شامل الضريبة</span>
                                </div>
                            )}
                        </div>

                        <div className="prose prose-stone max-w-none text-text-secondary leading-relaxed">
                            <p>{book.description}</p>
                        </div>

                        <div className="flex flex-col gap-4 pt-6">
                            <AddToCartButton book={book} />

                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 gap-2">
                                    <Heart className="w-4 h-4" />
                                    إضافة للمفضلة
                                </Button>
                                <Button variant="ghost" className="flex-1 gap-2">
                                    <Share2 className="w-4 h-4" />
                                    مشاركة
                                </Button>
                            </div>
                        </div>

                        <div className="bg-background-paper p-4 rounded-lg border border-border text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-text-muted">رقم الكتاب:</span>
                                <span className="font-mono">{book.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">التوصيل:</span>
                                <span>خلال 2-3 أيام عمل</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-muted">الدفع:</span>
                                <span>الدفع عند الاستلام متاح</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
                <Section withDivider className="bg-background-paper">
                    <h2 className="font-display text-2xl font-bold mb-8">كتب مشابهة</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedBooks.map((related) => (
                            <Link key={related.id} href={`/product/${related.id}`}>
                                <Card className="h-full overflow-hidden group hover:shadow-md transition-all">
                                    <div className="aspect-[2/3] bg-gray-100 relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                                            {related.title}
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary">
                                            {related.title}
                                        </h3>
                                        <p className="text-xs text-text-muted">{related.price} ج.م</p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
}
