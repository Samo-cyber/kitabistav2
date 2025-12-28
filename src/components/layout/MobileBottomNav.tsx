"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function MobileBottomNav({ isHidden }: { isHidden?: boolean }) {
    const pathname = usePathname();
    const { items, openCart } = useCart();

    const navItems = [
        {
            name: "الرئيسية",
            href: "/",
            icon: Home
        },
        {
            name: "المتجر",
            href: "/shop",
            icon: BookOpen
        },
        {
            name: "السلة",
            action: openCart, // Custom action for cart
            icon: ShoppingCart,
            badge: items.length
        },
        {
            name: "العروض",
            href: "/offers",
            icon: Star
        }
    ];

    return (
        <div className={cn(
            "fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-500 ease-in-out",
            isHidden ? "translate-y-[200%] opacity-0" : "translate-y-0 opacity-100"
        )}>
            <nav className="bg-zinc-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-1.5">
                <ul className="flex items-center justify-around">
                    {navItems.map((item, index) => {
                        const isActive = item.href ? pathname === item.href : false;
                        const Icon = item.icon;

                        const content = (
                            <>
                                <div className="relative">
                                    <Icon className={cn("w-5 h-5", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                                    {item.badge ? (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full border border-zinc-900">
                                            {item.badge}
                                        </span>
                                    ) : null}
                                </div>
                                {isActive && (
                                    <span className="text-[9px] font-bold mt-0.5 leading-none">
                                        {item.name}
                                    </span>
                                )}
                            </>
                        );

                        const className = cn(
                            "flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 relative",
                            isActive
                                ? "bg-primary text-black shadow-lg shadow-primary/20 scale-105 -translate-y-1"
                                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                        );

                        return (
                            <li key={index}>
                                {item.href ? (
                                    <Link href={item.href} className={className}>
                                        {content}
                                    </Link>
                                ) : (
                                    <button onClick={item.action} className={className}>
                                        {content}
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
