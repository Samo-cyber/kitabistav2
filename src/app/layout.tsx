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
    metadataBase: new URL("https://kitabista.vercel.app"),
    title: {
        default: "Kitabista | كتابيستا - وجهتك الأولى للكتب",
        template: "%s | Kitabista - كتابيستا"
    },
    description: "اكتشف عالمًا من المعرفة مع كتابيستا. أفضل الكتب والروايات العربية والعالمية بأسعار تنافسية. توصيل سريع لجميع المحافظات.",
    keywords: ["كتب", "روايات", "متجر كتب", "كتب عربية", "ثقافة", "قراءة", "كتابيستا", "Kitabista"],
    authors: [{ name: "Kitabista Team" }],
    creator: "Kitabista",
    publisher: "Kitabista",
    openGraph: {
        type: "website",
        locale: "ar_EG",
        url: "https://kitabista.vercel.app",
        title: "Kitabista | كتابيستا - وجهتك الأولى للكتب",
        description: "اكتشف عالمًا من المعرفة مع كتابيستا. أفضل الكتب والروايات العربية والعالمية بأسعار تنافسية.",
        siteName: "Kitabista - كتابيستا",
        images: [
            {
                url: "/images/og-image.jpg", // Make sure to add this image later or use a default
                width: 1200,
                height: 630,
                alt: "Kitabista - كتابيستا",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kitabista | كتابيستا - وجهتك الأولى للكتب",
        description: "اكتشف عالمًا من المعرفة مع كتابيستا. أفضل الكتب والروايات العربية والعالمية بأسعار تنافسية.",
        images: ["/images/og-image.jpg"],
        creator: "@kitabista",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Kitabista",
                            url: "https://kitabista.vercel.app",
                            logo: "https://kitabista.vercel.app/images/logo.png",
                            sameAs: [
                                "https://facebook.com/kitabista",
                                "https://twitter.com/kitabista",
                                "https://instagram.com/kitabista"
                            ],
                            contactPoint: {
                                "@type": "ContactPoint",
                                telephone: "+201000000000",
                                contactType: "customer service",
                                areaServed: "EG",
                                availableLanguage: "Arabic"
                            }
                        })
                    }}
                />
            </body>
        </html>
    );
}
