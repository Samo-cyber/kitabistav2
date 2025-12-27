import { getBooks, getCategories } from "@/lib/data";
import { ShopContent } from "@/components/shop/ShopContent";

export default async function ShopPage({
    searchParams,
}: {
    searchParams: { category?: string | string[] | undefined };
}) {
    const allBooks = await getBooks();
    const categories = await getCategories();

    const categoryParam = searchParams.category;
    const selectedCategory = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

    return (
        <ShopContent
            allBooks={allBooks}
            categories={categories}
            selectedCategory={selectedCategory}
        />
    );
}
