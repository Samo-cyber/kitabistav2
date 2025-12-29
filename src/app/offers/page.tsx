import { getBooks, getCategories } from "@/lib/data";
import { ShopContent } from "@/components/shop/ShopContent";
import { Sparkles } from "lucide-react";

export const metadata = {
    title: "العروض الخاصة | Kitabista",
    description: "أفضل العروض والخصومات على الكتب والروايات",
};

export default async function OffersPage({
    searchParams,
}: {
    searchParams: { category?: string | string[] | undefined };
}) {
    const allBooks = await getBooks();
    const discountedBooks = allBooks.filter(book => book.discount_price);
    const categories = await getCategories();

    const categoryParam = searchParams.category;
    const selectedCategory = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

    return (
        <div className="min-h-screen bg-background">
            {/* Simplified Header */}
            <div className="bg-zinc-900 border-b border-white/5 py-8 md:py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center justify-center gap-3">
                        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                        <span>عروض <span className="text-primary">كتابيستا</span></span>
                    </h1>
                    <p className="text-zinc-400 mt-2 text-sm md:text-base">خصومات حصرية على مختارات مميزة</p>
                </div>
            </div>

            <ShopContent
                allBooks={discountedBooks}
                categories={categories}
                selectedCategory={selectedCategory}
            />
        </div>
    );
}
