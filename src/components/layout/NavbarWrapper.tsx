"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function NavbarWrapper() {
    const pathname = usePathname();
    const isCheckout = pathname === "/checkout";
    const isAdmin = pathname?.startsWith("/admin");

    if (isCheckout || isAdmin) return null;

    return <Navbar />;
}
