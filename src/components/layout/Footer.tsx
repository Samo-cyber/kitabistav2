"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Send, Video } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground border-t border-white/5">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand & Social */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="font-display text-2xl font-bold text-primary mb-2">كتابيستا</h2>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                متجر كتب مصري يجمع بين أصالة الماضي وحداثة الحاضر. نسعى لنشر المعرفة والثقافة في كل بيت.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Send className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Video className="w-5 h-5" />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display text-lg font-bold text-white mb-6 relative inline-block">
                            روابط سريعة
                            <span className="absolute -bottom-2 right-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>الرئيسية</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>المكتبة</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>عن كتابيستا</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>اتصل بنا</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="font-display text-lg font-bold text-white mb-6 relative inline-block">
                            السياسات والمساعدة
                            <span className="absolute -bottom-2 right-0 w-1/2 h-0.5 bg-primary rounded-full"></span>
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/shipping-policy" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>سياسة الشحن</Link></li>
                            <li><Link href="/return-policy" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>سياسة الاسترجاع</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>شروط الاستخدام</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary/50"></span>سياسة الخصوصية</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} كتابيستا. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-secondary transition-all duration-300 transform hover:-translate-y-1"
        >
            {icon}
        </a>
    );
}
