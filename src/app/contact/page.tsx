"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Instagram, Facebook, Send, Video, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const socialLinks = [
        {
            name: "Telegram",
            icon: <Send className="w-6 h-6 text-white" />,
            url: "#",
            brandColor: "bg-[#229ED9]",
            description: "انضم لقناتنا لأحدث العروض"
        },
        {
            name: "Instagram",
            icon: <Instagram className="w-6 h-6 text-white" />,
            url: "#",
            brandColor: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
            description: "تابع صور الكتب والكواليس"
        },
        {
            name: "Facebook",
            icon: <Facebook className="w-6 h-6 text-white" />,
            url: "#",
            brandColor: "bg-[#1877F2]",
            description: "شاركنا النقاش في مجتمعنا"
        },
        {
            name: "TikTok",
            icon: <Video className="w-6 h-6 text-white" />, // Using Video as fallback
            url: "#",
            brandColor: "bg-black border border-white/10",
            description: "فيديوهات قصيرة ومراجعات"
        }
    ];

    return (
        <div className="bg-background min-h-screen pb-8 pt-20">
            <Section className="pt-0 md:pt-0 pb-8 md:pb-12">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            تواصل <span className="text-primary">معنا</span>
                        </h1>
                        <p className="text-xl text-gray-400">تابعنا على منصات التواصل الاجتماعي لنكون أقرب إليك</p>
                    </div>

                    {/* Social Grid */}
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        {socialLinks.map((social) => (
                            <Link key={social.name} href={social.url} target="_blank" className="group">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-[#161616] hover:translate-x-[-4px]">

                                    {/* Right Side: Arrow & Text (RTL) */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-gray-600 group-hover:text-primary transition-colors">
                                            <ExternalLink className="w-5 h-5 rotate-180" />
                                            {/* Rotate 180 to point left in RTL if needed, or just use ChevronLeft */}
                                        </div>
                                        <div className="text-right">
                                            <h3 className="font-display text-lg font-bold text-gray-200 group-hover:text-white transition-colors">
                                                {social.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                                {social.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Left Side: Icon */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${social.brandColor} group-hover:scale-110 transition-transform duration-300`}>
                                        {social.icon}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mt-12">
                        <p className="text-gray-400 mb-4">
                            للشكاوى والاقتراحات، يمكنك مراسلتنا عبر البريد الإلكتروني
                        </p>
                        <a href="mailto:support@kitabista.com" className="font-bold text-primary text-2xl hover:text-primary/80 transition-colors dir-ltr font-sans">
                            support@kitabista.com
                        </a>
                    </div>
                </div>
            </Section>
        </div>
    );
}
