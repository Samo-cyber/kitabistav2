"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-zinc-950 text-white overflow-hidden border-t border-white/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="container mx-auto px-4 pt-12 pb-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                    {/* Brand Column - Takes full width on mobile, 4 cols on desktop */}
                    <div className="lg:col-span-4 space-y-6 text-center lg:text-right">
                        <Link href="/" className="inline-block">
                            <h2 className="font-display text-3xl font-bold text-white flex items-center justify-center lg:justify-start gap-2">
                                كتابيستا
                                <span className="w-2 h-2 rounded-full bg-primary mt-2"></span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                            وجهتك الأولى للكتب المميزة. نجمع بين سحر الورق وأناقة التصميم لنقدم لك تجربة قراءة لا تُنسى.
                        </p>
                        <div className="flex justify-center lg:justify-start gap-3">
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
                        </div>
                    </div>

                    {/* Links Section - 2 Columns on Mobile (Compact), 8 cols on desktop split into 2 */}
                    <div className="lg:col-span-8 grid grid-cols-2 gap-8 lg:gap-12">
                        {/* Quick Links */}
                        <div className="text-right">
                            <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                اكتشف
                            </h3>
                            <ul className="space-y-3">
                                <FooterLink href="/shop">المكتبة</FooterLink>
                                <FooterLink href="/offers">العروض</FooterLink>
                                <FooterLink href="/bestsellers">الأكثر مبيعاً</FooterLink>
                                <FooterLink href="/new-arrivals">وصل حديثاً</FooterLink>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="text-right">
                            <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                مساعدة
                            </h3>
                            <ul className="space-y-3">
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
        <li>
            <Link
                href={href}
                className="text-gray-400 hover:text-white hover:translate-x-[-4px] transition-all duration-300 flex items-center gap-2 group text-sm"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors"></span>
                {children}
            </Link>
        </li>
    );
}
