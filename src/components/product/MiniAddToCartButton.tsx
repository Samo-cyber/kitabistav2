"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { Book } from "@/lib/data";
import { ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import confetti from "canvas-confetti";

export function MiniAddToCartButton({ book, className, iconSize = "w-5 h-5" }: { book: Book; className?: string; iconSize?: string }) {
    const { addItem, openCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Add to cart
        addItem(book);
        setAdded(true);

        // Trigger confetti
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ['#FFD700', '#FFA500', '#FF4500'], // Gold, Orange, Red-Orange
            zIndex: 9999
        });

        // Open cart drawer
        openCart();

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
