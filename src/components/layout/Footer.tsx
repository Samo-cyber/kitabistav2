"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, ChevronLeft } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="relative bg-background-paper text-text-primary overflow-hidden border-t border-border">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-4 pt-8 pb-24 md:pt-12 md:pb-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-8 md:mb-12">
                    {/* Brand Column - Takes full width on mobile, 4 cols on desktop */}
                    <div className="lg:col-span-4 space-y-1 md:space-y-4 text-center">
                        <Link href="/" className="inline-block">
                            <div className="relative h-14 md:h-16 w-48 md:w-56 mx-auto">
                                <Image
                                    src="/images/logo.png"
                                    alt="كتابيستا"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-text-muted text-xs md:text-base font-medium leading-relaxed max-w-md mx-auto font-sans tracking-wide">
                            رفيقك في كل صفحة
                        </p>
                        <div className="flex justify-center gap-3">
                            <SocialIcon icon={<Facebook className="w-4 h-4 md:w-5 md:h-5" />} href="#" />
                            <SocialIcon icon={<Instagram className="w-4 h-4 md:w-5 md:h-5" />} href="#" />
                            <SocialIcon icon={<Twitter className="w-4 h-4 md:w-5 md:h-5" />} href="#" />
                        </div>
                    </div>

                    {/* Links Section - 2 Columns on Mobile (Compact), 8 cols on desktop split into 2 */}
                    <div className="lg:col-span-8 grid grid-cols-2 gap-8 lg:gap-12">
                        {/* Quick Links */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-right">
                            <h3 className="font-bold text-sm md:text-lg text-text-primary mb-3 md:mb-6 flex items-center justify-center lg:justify-start gap-2">
                                <span className="w-1 h-4 md:h-6 bg-primary rounded-full"></span>
                                اكتشف
                            </h3>
                            <ul className="space-y-2 w-fit lg:w-full flex flex-col items-start">
                                <FooterLink href="/shop">المكتبة</FooterLink>
                                <FooterLink href="/offers">العروض</FooterLink>
                                <FooterLink href="/bestsellers">الأكثر مبيعاً</FooterLink>
                                <FooterLink href="/new-arrivals">وصل حديثاً</FooterLink>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-right">
                            <h3 className="font-bold text-sm md:text-lg text-text-primary mb-3 md:mb-6 flex items-center justify-center lg:justify-start gap-2">
                                <span className="w-1 h-4 md:h-6 bg-primary rounded-full"></span>
                                مساعدة
                            </h3>
                            <ul className="space-y-2 w-fit lg:w-full flex flex-col items-start">
                                <FooterLink href="/about">عن كتابيستا</FooterLink>
                                <FooterLink href="/contact">اتصل بنا</FooterLink>
                                <FooterLink href="/shipping-policy">الشحن</FooterLink>
                                <FooterLink href="/return-policy">الاسترجاع</FooterLink>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] md:text-xs text-text-muted">
                    <p>© {new Date().getFullYear()} كتابيستا. جميع الحقوق محفوظة.</p>
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/privacy" className="hover:text-text-primary transition-colors">الخصوصية</Link>
                        <Link href="/terms" className="hover:text-text-primary transition-colors">الشروط</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            href={href}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-secondary border border-border flex items-center justify-center text-text-muted hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
        >
            <div className="transform group-hover:scale-110 transition-transform">
                {icon}
            </div>
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li className="w-full flex justify-start">
            <Link
                href={href}
                className="text-text-secondary hover:text-text-primary hover:translate-x-[-4px] transition-all duration-300 flex items-center justify-start gap-2 group text-[13px] md:text-sm w-fit"
            >
                <ChevronLeft className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                {children}
            </Link>
        </li>
    );
}
