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
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            borderColor: "border-blue-400/20",
            description: "انضم لقناتنا لأحدث العروض"
        },
        {
            name: "Instagram",
            icon: <Instagram className="w-8 h-8" />,
            url: "#",
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            borderColor: "border-pink-500/20",
            description: "تابع صور الكتب والكواليس"
        },
        {
            name: "Facebook",
            icon: <Facebook className="w-8 h-8" />,
            url: "#",
            color: "text-blue-600",
            bg: "bg-blue-600/10",
            borderColor: "border-blue-600/20",
            description: "شاركنا النقاش في مجتمعنا"
        },
        {
            name: "TikTok",
            icon: <Video className="w-8 h-8" />, // Using Video as fallback for TikTok
            url: "#",
            color: "text-white",
            bg: "bg-zinc-500/10",
            borderColor: "border-zinc-500/20",
            description: "فيديوهات قصيرة ومراجعات"
        }
    ];

    return (
        <div className="bg-background min-h-screen pb-20 pt-24">
            <Section>
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                            تواصل <span className="text-primary">معنا</span>
                        </h1>
                        <p className="text-xl text-gray-400">تابعنا على منصات التواصل الاجتماعي لنكون أقرب إليك</p>
                    </div>

                    {/* Social Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {socialLinks.map((social) => (
                            <Link key={social.name} href={social.url} target="_blank">
                                <Card className={`p-8 flex flex-col items-center text-center gap-4 group transition-all duration-300 border hover:scale-[1.02] ${social.borderColor} bg-black/40 hover:bg-black/60`}>
                                    <div className={`p-4 rounded-full transition-transform duration-300 group-hover:scale-110 ${social.bg} ${social.color}`}>
                                        {social.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <h3 className={`font-display text-2xl font-bold ${social.color}`}>
                                                {social.name}
                                            </h3>
                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                                        </div>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {social.description}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
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
