"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function MobileBottomNav() {
    const pathname = usePathname();
    const { items } = useCart();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

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
            href: "/cart",
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
            "fixed bottom-4 left-4 right-4 z-50 md:hidden transition-transform duration-300 ease-in-out",
            isVisible ? "translate-y-0" : "translate-y-[150%]"
        )}>
            <nav className="bg-zinc-900/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-2">
                <ul className="flex items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 relative",
                                        isActive
                                            ? "bg-primary text-black shadow-lg shadow-primary/20 scale-110 -translate-y-2"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                                    )}
                                >
                                    <div className="relative">
                                        <Icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                                        {item.badge ? (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-zinc-900">
                                                {item.badge}
                                            </span>
                                        ) : null}
                                    </div>
                                    {isActive && (
                                        <span className="text-[10px] font-bold mt-1 leading-none">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
