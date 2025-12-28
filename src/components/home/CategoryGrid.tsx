"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/data";

const imageMap: Record<string, string> = {
    novels: "/categories/novels.png",
    horror: "/categories/horror.png",
    self: "/categories/self.png",
    religious: "/categories/religious.png",
    history: "/categories/history.png", // Fallback or missing
};

interface CategoryGridProps {
    categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <div className="container mx-auto px-4 relative z-20 mb-16 mt-8">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {categories.map((category) => {
                    const imageSrc = imageMap[category.id] || "/categories/novels.png";

                    return (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="group"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-24 h-24 md:w-28 md:h-28 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center p-4 shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={imageSrc}
                                            alt={category.name}
                                            fill
                                            className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 96px, 112px"
                                        />
                                    </div>
                                </div>
                                <span className="text-zinc-300 text-sm font-bold group-hover:text-primary transition-colors">
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
