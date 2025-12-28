"use client";

import Link from "next/link";
import { BookOpen, Ghost, Lightbulb, Moon, Scroll, Gift } from "lucide-react";
import { Category } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
    novels: BookOpen,
    horror: Ghost,
    self: Lightbulb,
    religious: Moon,
    history: Scroll,
    gifts: Gift,
};

const styleMap: Record<string, { bg: string, text: string, shadow: string }> = {
    novels: { bg: "from-emerald-900/40 to-emerald-950/40", text: "text-emerald-500/80", shadow: "shadow-emerald-900/20" },
    horror: { bg: "from-rose-900/40 to-rose-950/40", text: "text-rose-500/80", shadow: "shadow-rose-900/20" },
    self: { bg: "from-yellow-900/40 to-yellow-950/40", text: "text-primary/80", shadow: "shadow-yellow-900/20" },
    religious: { bg: "from-sky-900/40 to-sky-950/40", text: "text-sky-500/80", shadow: "shadow-sky-900/20" },
    history: { bg: "from-stone-800/40 to-stone-900/40", text: "text-stone-400/80", shadow: "shadow-stone-900/20" },
    gifts: { bg: "from-purple-900/40 to-purple-950/40", text: "text-purple-400/80", shadow: "shadow-purple-900/20" },
};

interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className="container mx-auto relative z-20 mb-12 -mt-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 pb-0 px-4">
                {categories.map((category) => {
                    const Icon = iconMap[category.id] || BookOpen;
                    const style = styleMap[category.id] || styleMap.novels;

                    return (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="group"
                        >
                            <div className="flex flex-col items-center gap-2 min-w-[70px]">
                                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${style.bg} backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg ${style.shadow} group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-300 relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Icon className={`w-6 h-6 md:w-9 md:h-9 ${style.text} drop-shadow-lg`} strokeWidth={1.5} />
                                </div>
                                <span className="text-zinc-400 text-[10px] md:text-sm font-bold group-hover:text-white transition-colors whitespace-nowrap">
                                    {category.name}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
