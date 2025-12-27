"use client";

import { usePathname } from "next/navigation";
import { Book } from "@/lib/data";
import { Navbar } from "./Navbar";
import { MobileBottomNav } from "./MobileBottomNav";

export function NavbarWrapper({ books }: { books: Book[] }) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/admin");

    if (isAuthPage) return null;

    return (
        <>
            <Navbar books={books} />
            <MobileBottomNav />
        </>
    );
}
