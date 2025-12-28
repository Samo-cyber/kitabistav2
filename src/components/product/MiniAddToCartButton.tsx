"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { Book } from "@/lib/data";
import { ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";

export function MiniAddToCartButton({ book, className, iconSize = "w-5 h-5" }: { book: Book; className?: string; iconSize?: string }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside a Link
        e.stopPropagation();
        addItem(book);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            size="sm"
            variant="ghost"
            className={cn(
                "transition-all duration-300 p-0 flex items-center justify-center",
                added ? "bg-green-600 text-white hover:bg-green-700" : "",
                className
            )}
            onClick={handleAdd}
            disabled={book.stock === 0}
        >
            {added ? (
                <Check className={iconSize} />
            ) : (
                <ShoppingCart className={iconSize} />
            )}
        </Button>
    );
}
