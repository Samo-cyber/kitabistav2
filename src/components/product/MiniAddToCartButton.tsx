"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { Book } from "@/lib/data";
import { ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";

export function MiniAddToCartButton({ book }: { book: Book }) {
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
            variant={added ? "primary" : "secondary"}
            className={`h-8 w-8 p-0 rounded-full transition-all duration-300 ${added ? "bg-green-600 hover:bg-green-700 text-white" : "bg-zinc-800 hover:bg-primary hover:text-black text-white border border-white/10"}`}
            onClick={handleAdd}
            disabled={book.stock === 0}
        >
            {added ? (
                <Check className="w-4 h-4" />
            ) : (
                <ShoppingCart className="w-4 h-4" />
            )}
        </Button>
    );
}
