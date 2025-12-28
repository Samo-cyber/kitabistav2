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
        <div className="container mx-auto px-4 relative z-20 mb-8 -mt-6">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {categories.map((category) => {
                    const imageSrc = imageMap[category.id] || "/categories/novels.png";

                    return (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="group"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-full flex items-center justify-center p-3 shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/30 group-hover:-translate-y-1 transition-all duration-300 relative">
                                    <div className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={imageSrc}
                                            alt={category.name}
                                            fill
                                            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                            sizes="96px"
                                        />
                                    </div>
                                </div>
                                <span className="text-zinc-400 text-xs md:text-sm font-medium group-hover:text-primary transition-colors">
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
