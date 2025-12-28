"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useState } from "react";

export function HeroLogo() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="relative w-full max-w-[280px] md:max-w-[350px] aspect-[2/1] animate-float">
                <Image
                    src="/images/logo.png"
                    alt="كتابيستا - وجهتك الأولى للكتب"
                    fill
                    className="object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                    priority
                />
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-[280px] md:max-w-[350px] aspect-[2/1] animate-float">
            <Image
                src={theme === 'light' ? "/images/logo-light.png" : "/images/logo.png"}
                alt="كتابيستا - وجهتك الأولى للكتب"
                fill
                className={`object-contain ${theme === 'light' ? '' : 'drop-shadow-[0_0_15px_rgba(234,179,8,0.2)]'}`}
                priority
            />
        </div>
    );
}
