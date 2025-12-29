import type { Metadata } from "next";
import { Cairo, Almarai } from "next/font/google";
import "./globals.css";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart/CartDrawer";

const cairo = Cairo({
    subsets: ["arabic"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-cairo",
});

const almarai = Almarai({
    subsets: ["arabic"],
    weight: ["300", "400", "700", "800"],
    variable: "--font-almarai",
});

export const metadata: Metadata = {
    title: "Kitabista | كتابيستا",
    description: "متجر كتب",
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
            <body className={`${cairo.variable} ${almarai.variable} font-sans bg-background text-text-primary min-h-screen flex flex-col`}>
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
