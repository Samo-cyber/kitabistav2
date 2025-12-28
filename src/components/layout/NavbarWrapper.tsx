"use client";

import { usePathname } from "next/navigation";
import { Book } from "@/lib/data";
import { Navbar } from "./Navbar";
import { MobileBottomNav } from "./MobileBottomNav";
import { useState } from "react";

export function NavbarWrapper({ books }: { books: Book[] }) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/admin");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (isAuthPage) return null;

    return (
        <>
            <Navbar books={books} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <MobileBottomNav isHidden={isMenuOpen} />
        </>
    );
}
