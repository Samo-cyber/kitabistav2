"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, ChevronLeft } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="relative bg-zinc-950 text-white overflow-hidden border-t border-white/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-4 pt-12 pb-28 md:pb-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                    {/* Brand Column - Takes full width on mobile, 4 cols on desktop */}
                    <div className="lg:col-span-4 space-y-4 md:space-y-6 text-center">
                        <Link href="/" className="inline-block">
                            <div className="relative h-20 md:h-16 w-64 md:w-56 mx-auto">
                                <Image
                                    src="/images/logo.png"
                                    alt="كتابيستا"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto font-sans tracking-wide">
                            رفيقك في كل صفحة
                        </p>
                        <div className="flex justify-center gap-4">
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
                        </div>
                    </div>

                    {/* Links Section - 2 Columns on Mobile (Compact), 8 cols on desktop split into 2 */}
                    <div className="lg:col-span-8 grid grid-cols-2 gap-8 lg:gap-12">
                        {/* Quick Links */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-right">
                            <h3 className="font-bold text-base md:text-lg text-white mb-4 md:mb-6 flex items-center justify-center lg:justify-start gap-2">
                                <span className="w-1 h-5 md:h-6 bg-primary rounded-full"></span>
                                اكتشف
                            </h3>
                            <ul className="space-y-3 w-fit lg:w-full flex flex-col items-start">
                                <FooterLink href="/shop">المكتبة</FooterLink>
                                <FooterLink href="/offers">العروض</FooterLink>
                                <FooterLink href="/bestsellers">الأكثر مبيعاً</FooterLink>
                                <FooterLink href="/new-arrivals">وصل حديثاً</FooterLink>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-right">
                            <h3 className="font-bold text-base md:text-lg text-white mb-4 md:mb-6 flex items-center justify-center lg:justify-start gap-2">
                                <span className="w-1 h-5 md:h-6 bg-primary rounded-full"></span>
                                مساعدة
                            </h3>
                            <ul className="space-y-3 w-fit lg:w-full flex flex-col items-start">
                                <FooterLink href="/about">عن كتابيستا</FooterLink>
                                <FooterLink href="/contact">اتصل بنا</FooterLink>
                                <FooterLink href="/shipping-policy">الشحن</FooterLink>
                                <FooterLink href="/return-policy">الاسترجاع</FooterLink>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} كتابيستا. جميع الحقوق محفوظة.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">الخصوصية</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">الشروط</Link>
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
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group"
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
                className="text-gray-400 hover:text-white hover:translate-x-[-4px] transition-all duration-300 flex items-center justify-start gap-2 group text-sm w-fit"
            >
                <ChevronLeft className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                {children}
            </Link>
        </li>
    );
}
