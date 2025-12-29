"use client";

import { useState, useEffect } from "react";
import { getMockDB } from "@/lib/mock-db";
import {
    LayoutDashboard, ShoppingBag, Package,
    Search, Settings, LogOut, Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardView } from "./DashboardView";
import { ProductsView } from "./ProductsView";
import { OrdersView } from "./OrdersView";

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders">("dashboard");
    const [db, setDb] = useState(getMockDB());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Sync with localStorage
    useEffect(() => {
        const handleUpdate = () => setDb(getMockDB());
        window.addEventListener("mock-db-update", handleUpdate);
        return () => window.removeEventListener("mock-db-update", handleUpdate);
    }, []);

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };

    const sidebarItems = [
        { id: "dashboard", label: "لوحة التحكم", icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: "products", label: "المنتجات", icon: <Package className="w-5 h-5" /> },
        { id: "orders", label: "الطلبات", icon: <ShoppingBag className="w-5 h-5" /> },
    ];

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-sans select-none" dir="rtl">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #EAB308; }
            `}</style>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isSidebarOpen ? 280 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 80),
                    x: typeof window !== 'undefined' && window.innerWidth < 1024 && !isSidebarOpen ? 280 : 0
                }}
                className={`bg-zinc-950 border-l border-white/10 flex flex-col fixed lg:relative h-full z-[70] transition-all duration-500 ease-in-out ${!isSidebarOpen && "lg:w-20"}`}
            >
                <div className="p-6 flex items-center gap-4 shrink-0 justify-center lg:justify-start">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                        <span className="text-black font-black text-xl">K</span>
                    </div>
                    {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                        <span className={`font-bold text-xl tracking-tight transition-all duration-300 text-white ${!isSidebarOpen && "lg:opacity-0 lg:scale-0 lg:w-0"}`}>
                            كتابيستا
                        </span>
                    )}
                </div>

                <nav className="flex-1 px-3 space-y-2 mt-8 overflow-y-auto no-scrollbar">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id as any)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${activeTab === item.id
                                ? "bg-primary text-black font-bold shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className={activeTab === item.id ? "text-black" : "text-zinc-500 group-hover:text-primary transition-colors"}>
                                {item.icon}
                            </span>
                            {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                                <span className={`font-bold text-sm transition-all duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:translate-x-4 lg:w-0"}`}>{item.label}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-white/5 shrink-0">
                    <button className="w-full flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-300">
                        <LogOut className="w-5 h-5" />
                        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                            <span className={`font-bold text-sm transition-all duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:w-0"}`}>تسجيل الخروج</span>
                        )}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full relative bg-black">
                {/* Header */}
                <header className="h-20 border-b border-white/10 px-6 lg:px-8 flex items-center justify-between shrink-0 bg-black/50 backdrop-blur-xl z-50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg lg:hidden transition-colors text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                {sidebarItems.find(i => i.id === activeTab)?.label}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block group">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="بحث..."
                                className="bg-zinc-900/50 border border-white/10 rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary/50 w-64 text-white transition-all"
                            />
                        </div>

                        <button className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
                            <Settings className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        {activeTab === "dashboard" && <DashboardView key="dashboard" db={db} />}
                        {activeTab === "products" && <ProductsView key="products" db={db} />}
                        {activeTab === "orders" && <OrdersView key="orders" db={db} />}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
