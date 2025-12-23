"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Book } from "./data";

interface CartItem extends Book {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (book: Book) => void;
    removeItem: (bookId: string) => void;
    updateQuantity: (bookId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (book: Book) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === book.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...book, quantity: 1 }];
        });
    };

    const removeItem = (bookId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== bookId));
    };

    const updateQuantity = (bookId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) =>
                item.id === bookId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => {
        const price = item.discount_price || item.price;
        return sum + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
