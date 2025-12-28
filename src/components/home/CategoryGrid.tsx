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

const colorMap: Record<string, string> = {
    novels: "text-emerald-400",
    horror: "text-red-500",
    self: "text-yellow-400",
    religious: "text-blue-400",
    history: "text-amber-600",
};

interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className="container mx-auto px-4 -mt-10 relative z-20 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => {
                    const Icon = iconMap[category.id] || BookOpen;
                    const colorClass = colorMap[category.id] || "text-primary";

                    return (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="group"
                        >
                            <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-zinc-800/90 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/5 h-full">
                                <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${colorClass} group-hover:bg-white/10`}>
                                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                                </div>
                                <span className="text-white font-bold text-lg group-hover:text-primary transition-colors">
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
