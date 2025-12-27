import type { Metadata } from "next";
import { Tajawal, Amiri } from "next/font/google";
import "./globals.css";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { CartProvider } from "@/lib/cart-context";
import { LoadingGate } from "@/components/ui/LoadingGate";
import { CartDrawer } from "@/components/cart/CartDrawer";

const tajawal = Tajawal({
    subsets: ["arabic"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-tajawal",
});

const amiri = Amiri({
    subsets: ["arabic"],
    weight: ["400", "700"],
    variable: "--font-amiri",
});

export const metadata: Metadata = {
    title: "Kitabista | كتابيستا",
    description: "متجر كتب بروح مصرية أصيلة",
};

import { getBooks } from "@/lib/data";

// ... (imports)

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const books = await getBooks();

    return (
        <html lang="ar" dir="rtl">
            <body className={`${tajawal.variable} ${amiri.variable} font-sans bg-background text-text-primary min-h-screen flex flex-col`}>
                <LoadingGate />
                <CartProvider>
                    <NavbarWrapper books={books} />
                    <CartDrawer />
                    <main className="flex-grow">{children}</main>
                    <FooterWrapper />
                </CartProvider>
            </body>
        </html>
    );
}
