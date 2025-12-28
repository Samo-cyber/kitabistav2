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

            <div className="max-w-6xl mx-auto px-4 pt-16 pb-28 md:pb-8 relative z-10">
                {/* Brand Section - Centered & Premium */}
                <div className="flex flex-col items-center text-center mb-16 space-y-8">
                    <Link href="/" className="inline-block">
                        <div className="relative h-20 md:h-28 w-64 md:w-96">
                            <Image
                                src="/images/logo.png"
                                alt="كتابيستا"
                                fill
                                className="object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.3)]"
                                priority
                            />
                        </div>
                    </Link>

                    <div className="w-full max-w-5xl px-4">
                        <p className="text-zinc-300 text-sm md:text-lg lg:text-xl font-sans leading-relaxed tracking-wide md:whitespace-nowrap">
                            كتابيستا.. حيث تلتقي عراقة الحرف بحداثة التصميم. ننتقي لك أفضل الإصدارات لنصحبك في رحلة معرفية فريدة تليق بشغفك.
                        </p>
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-8" />
                    </div>

                    <div className="flex justify-center gap-6">
                        <SocialIcon icon={<Facebook className="w-6 h-6" />} href="#" />
                        <SocialIcon icon={<Instagram className="w-6 h-6" />} href="#" />
                        <SocialIcon icon={<Twitter className="w-6 h-6" />} href="#" />
                    </div>
                </div>

                {/* Links Grid - 4 Columns on Desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12 border-t border-white/5 pt-12">
                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-right">
                        <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            اكتشف
                        </h3>
                        <ul className="space-y-4">
                            <FooterLink href="/shop">المكتبة</FooterLink>
                            <FooterLink href="/offers">العروض</FooterLink>
                            <FooterLink href="/bestsellers">الأكثر مبيعاً</FooterLink>
                            <FooterLink href="/new-arrivals">وصل حديثاً</FooterLink>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-right">
                        <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            مساعدة
                        </h3>
                        <ul className="space-y-4">
                            <FooterLink href="/about">عن كتابيستا</FooterLink>
                            <FooterLink href="/contact">اتصل بنا</FooterLink>
                            <FooterLink href="/shipping-policy">الشحن</FooterLink>
                            <FooterLink href="/return-policy">الاسترجاع</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="hidden md:flex flex-col items-start text-right">
                        <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            تواصل معنا
                        </h3>
                        <p className="text-zinc-400 text-sm leading-loose">
                            القاهرة، جمهورية مصر العربية<br />
                            support@kitabista.com<br />
                            +20 123 456 7890
                        </p>
                    </div>

                    {/* Newsletter */}
                    <div className="hidden md:flex flex-col items-start text-right">
                        <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            النشرة البريدية
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">اشترك ليصلك جديدنا من الكتب والعروض.</p>
                        <div className="flex w-full">
                            <input type="email" placeholder="بريدك الإلكتروني" className="bg-white/5 border border-white/10 rounded-r-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-primary/50" />
                            <button className="bg-primary text-black px-4 py-2 rounded-l-lg text-xs font-bold">اشترك</button>
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
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group shadow-lg"
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
