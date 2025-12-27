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
    {/* Best Sellers Section */ }
    <BookCarousel
        title="الأكثر مبيعاً"
        subtitle="الأكثر طلباً"
        books={featuredBooks}
        linkToAll="/shop?sort=best_selling"
    />

    {/* New Additions Section */ }
    <BookCarousel
        title="أحدث الإضافات"
        subtitle="جديد"
        books={newBooks}
        linkToAll="/shop?sort=newest"
    />
        </div >
    );
}
