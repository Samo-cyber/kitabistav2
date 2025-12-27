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
            icon: <Send className="w-8 h-8" />,
            url: "#",
            color: "hover:text-blue-400",
            bg: "hover:bg-blue-400/10",
            borderColor: "hover:border-blue-400/50",
            description: "انضم لقناتنا لأحدث العروض"
        },
        {
            name: "Instagram",
            icon: <Instagram className="w-8 h-8" />,
            url: "#",
            color: "hover:text-pink-500",
            bg: "hover:bg-pink-500/10",
            borderColor: "hover:border-pink-500/50",
            description: "تابع صور الكتب والكواليس"
        },
        {
            name: "Facebook",
            icon: <Facebook className="w-8 h-8" />,
            url: "#",
            color: "hover:text-blue-600",
            bg: "hover:bg-blue-600/10",
            borderColor: "hover:border-blue-600/50",
            description: "شاركنا النقاش في مجتمعنا"
        },
        {
            name: "TikTok",
            icon: <Video className="w-8 h-8" />, // Using Video as fallback for TikTok
            url: "#",
            color: "hover:text-black dark:hover:text-white",
            bg: "hover:bg-zinc-500/10",
            borderColor: "hover:border-zinc-500/50",
            description: "فيديوهات قصيرة ومراجعات"
        }
    ];

    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-secondary text-secondary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl font-bold mb-4">تواصل معنا</h1>
                    <p className="text-gray-300">تابعنا على منصات التواصل الاجتماعي لنكون أقرب إليك</p>
                </div>
            </div>

            <Section>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {socialLinks.map((social) => (
                            <Link key={social.name} href={social.url} target="_blank">
                                <Card className={`p-8 flex items-center gap-6 group transition-all duration-300 border-white/5 ${social.borderColor} ${social.bg}`}>
                                    <div className={`p-4 rounded-full bg-background/50 text-text-secondary transition-colors duration-300 ${social.color}`}>
                                        {social.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className={`font-display text-2xl font-bold transition-colors duration-300 ${social.color}`}>
                                                {social.name}
                                            </h3>
                                            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                                        </div>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {social.description}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-gray-400 mb-4">
                            للشكاوى والاقتراحات، يمكنك مراسلتنا عبر البريد الإلكتروني
                        </p>
                        <a href="mailto:support@kitabista.com" className="font-bold text-primary text-xl hover:underline">
                            support@kitabista.com
                        </a>
                    </div>
                </div>
            </Section>
        </div>
    );
}
