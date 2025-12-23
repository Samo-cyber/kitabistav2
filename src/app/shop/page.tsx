import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { getBooks, getCategories } from "@/lib/data";
import Link from "next/link";
import { Filter } from "lucide-react";

export default async function ShopPage({
    searchParams,
}: {
    searchParams: { category?: string | string[] | undefined };
}) {
    const allBooks = await getBooks();
    const categories = await getCategories();

    const categoryParam = searchParams.category;
    const selectedCategory = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

    const filteredBooks = selectedCategory
        ? allBooks.filter((book) => book.category === selectedCategory)
        : allBooks;

    return (
        <div className="bg-background min-h-screen">
            {/* Header */}
            <div className="bg-secondary text-secondary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl font-bold mb-4">المكتبة</h1>
                    <p className="text-gray-300">تصفح مجموعتنا المختارة من الكتب المميزة</p>
                </div>
            </div>

            <Section>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Filters */}
                    <aside className="w-full md:w-64 space-y-6">
                        <div className="flex items-center gap-2 font-bold text-lg mb-4">
                            <Filter className="w-5 h-5" />
                            <span>تصفية النتائج</span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold mb-2">الأقسام</h3>
                            <Link href="/shop">
                                <div
                                    className={`px-3 py-2 rounded-md transition-colors ${!selectedCategory
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    الكل
                                </div>
                            </Link>
                            {categories.map((cat) => (
                                <Link key={cat.id} href={`/shop?category=${cat.id}`}>
                                    <div
                                        className={`px-3 py-2 rounded-md transition-colors ${selectedCategory === cat.id
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {cat.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-text-secondary">
                                عرض {filteredBooks.length} كتاب
                            </p>
                            {/* Sort dropdown could go here */}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBooks.map((book) => (
                                <Link key={book.id} href={`/product/${book.id}`}>
                                    <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                                        <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span>{book.title}</span>
                                                </div>
                                            </div>
                                            {book.discount_price && (
                                                <Badge className="absolute top-2 right-2 bg-accent">
                                                    خصم
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                                                {book.title}
                                            </h3>
                                            <p className="text-sm text-text-secondary mb-2">
                                                {book.author}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    {book.discount_price ? (
                                                        <>
                                                            <span className="text-sm text-text-muted line-through">
                                                                {book.price} ج.م
                                                            </span>
                                                            <span className="font-bold text-primary">
                                                                {book.discount_price} ج.م
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="font-bold text-primary">
                                                            {book.price} ج.م
                                                        </span>
                                                    )}
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    التفاصيل
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {filteredBooks.length === 0 && (
                            <div className="text-center py-12 text-text-muted">
                                لا توجد كتب في هذا القسم حالياً.
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
}
