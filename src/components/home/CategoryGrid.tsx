"use client";

import Link from "next/link";
import { BookOpen, Ghost, Lightbulb, Moon, Scroll } from "lucide-react";
import { Category } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
    novels: BookOpen,
    horror: Ghost,
    self: Lightbulb,
    religious: Moon,
    history: Scroll,
};

const styleMap: Record<string, { bg: string, text: string, shadow: string }> = {
    novels: { bg: "from-emerald-500/20 to-emerald-900/20", text: "text-emerald-400", shadow: "shadow-emerald-500/20" },
    horror: { bg: "from-red-500/20 to-red-900/20", text: "text-red-500", shadow: "shadow-red-500/20" },
    self: { bg: "from-yellow-500/20 to-yellow-900/20", text: "text-yellow-400", shadow: "shadow-yellow-500/20" },
    religious: { bg: "from-blue-500/20 to-blue-900/20", text: "text-blue-400", shadow: "shadow-blue-500/20" },
    history: { bg: "from-amber-500/20 to-amber-900/20", text: "text-amber-500", shadow: "shadow-amber-500/20" },
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
