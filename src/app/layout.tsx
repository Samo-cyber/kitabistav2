import type { Metadata } from "next";
import { Tajawal, Amiri } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";

import { LoadingGate } from "@/components/ui/LoadingGate";


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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className={`${tajawal.variable} ${amiri.variable} font-sans bg-background text-text-primary min-h-screen flex flex-col`}>
                <LoadingGate />

                <CartProvider>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
