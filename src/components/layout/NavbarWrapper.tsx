"use client";

import { usePathname } from "next/navigation";
import { Book } from "@/lib/data";

interface NavbarWrapperProps {
    books: Book[];
}

export function NavbarWrapper({ books }: NavbarWrapperProps) {
    const pathname = usePathname();
    const isCheckout = pathname === "/checkout";
    const isAdmin = pathname?.startsWith("/admin");

    if (isCheckout || isAdmin) return null;

    return <Navbar books={books} />;
}
