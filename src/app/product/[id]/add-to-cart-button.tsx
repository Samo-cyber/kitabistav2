"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { Book } from "@/lib/data";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ book }: { book: Book }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem(book);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            size="lg"
            className="w-full gap-2 text-lg"
            onClick={handleAdd}
            disabled={book.stock === 0}
        >
            {added ? (
                <>
                    <Check className="w-5 h-5" />
                    تمت الإضافة
                </>
            ) : (
                <>
                    <ShoppingCart className="w-5 h-5" />
                    {book.stock === 0 ? "غير متوفر" : "إضافة للسلة"}
                </>
            )}
        </Button>
    );
}
