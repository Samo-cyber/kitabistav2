"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Book } from "@/lib/data";
import { Plus, Edit, Trash, TrendingUp, ShoppingBag, Users, Package, Search, Filter, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";

interface AdminDashboardProps {
    books: Book[];
}

export function AdminDashboard({ books }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<"sales" | "products" | "orders">("sales");

    return (
        <div className="bg-background min-h-screen pb-12">
            {/* Header */}
            <div className="bg-secondary text-secondary-foreground py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="font-display text-3xl font-bold mb-2">لوحة التحكم</h1>
                            <p className="text-gray-300 text-sm">مرحباً بك في لوحة إدارة كتابيستا</p>
                        </div>
                        <div className="flex gap-2 bg-background/10 p-1 rounded-lg backdrop-blur-sm overflow-x-auto max-w-full no-scrollbar">
                            <TabButton
                                active={activeTab === "sales"}
                                onClick={() => setActiveTab("sales")}
                                icon={<TrendingUp className="w-4 h-4" />}
                                label="المبيعات"
                            />
                            <TabButton
                                active={activeTab === "products"}
                                onClick={() => setActiveTab("products")}
                                icon={<Package className="w-4 h-4" />}
                                label="المنتجات"
                            />
                            <TabButton
                                active={activeTab === "orders"}
                                onClick={() => setActiveTab("orders")}
                                icon={<ShoppingBag className="w-4 h-4" />}
                                label="الطلبات"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Section>
                <AnimatePresence mode="wait">
                    {activeTab === "sales" && (
                        <SalesTab key="sales" />
                    )}
                    {activeTab === "products" && (
                        <ProductsTab key="products" books={books} />
                    )}
                    {activeTab === "orders" && (
                        <OrdersTab key="orders" />
                    )}
                </AnimatePresence>
            </Section>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${active
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
        >
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </button>
    );
}

function SalesTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="إجمالي المبيعات"
                    value="45,250 ج.م"
                    change="+12%"
                    icon={<TrendingUp className="w-6 h-6 text-green-500" />}
                />
                <StatsCard
                    title="عدد الطلبات"
                    value="1,250"
                    change="+5%"
                    icon={<ShoppingBag className="w-6 h-6 text-blue-500" />}
                />
                <StatsCard
                    title="العملاء الجدد"
                    value="320"
                    change="+18%"
                    icon={<Users className="w-6 h-6 text-purple-500" />}
                />
            </div>

            {/* Chart Placeholder */}
            <Card className="p-6">
                <h3 className="font-bold text-lg mb-6">تحليل المبيعات الشهرية</h3>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                        <div key={i} className="w-full bg-primary/10 hover:bg-primary/20 rounded-t-lg relative group transition-all duration-300" style={{ height: `${height}%` }}>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {height * 1000}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-gray-400 px-2">
                    <span>يناير</span>
                    <span>فبراير</span>
                    <span>مارس</span>
                    <span>أبريل</span>
                    <span>مايو</span>
                    <span>يونيو</span>
                    <span>يوليو</span>
                    <span>أغسطس</span>
                    <span>سبتمبر</span>
                    <span>أكتوبر</span>
                    <span>نوفمبر</span>
                    <span>ديسمبر</span>
                </div>
            </Card>
        </motion.div>
    );
}

function StatsCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
    return (
        <Card className="p-6 flex items-start justify-between hover:border-primary/50 transition-colors">
            <div>
                <p className="text-text-secondary text-sm mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-text-primary mb-2">{value}</h3>
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    {change} مقارنة بالشهر الماضي
                </span>
            </div>
            <div className="p-3 bg-background rounded-lg border border-border">
                {icon}
            </div>
        </Card>
    );
}

function ProductsTab({ books }: { books: Book[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="بحث عن كتاب..." className="pr-10" />
                </div>
                <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة كتاب جديد
                </Button>
            </div>

            <Card className="overflow-hidden border-0 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-secondary/50 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-bold text-text-primary">العنوان</th>
                                <th className="p-4 font-bold text-text-primary">المؤلف</th>
                                <th className="p-4 font-bold text-text-primary">القسم</th>
                                <th className="p-4 font-bold text-text-primary">السعر</th>
                                <th className="p-4 font-bold text-text-primary">المخزون</th>
                                <th className="p-4 font-bold text-text-primary">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {books.map((book) => (
                                <tr key={book.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 font-medium text-white">{book.title}</td>
                                    <td className="p-4 text-gray-400">{book.author}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-white">
                                        {book.discount_price ? (
                                            <div className="flex flex-col">
                                                <span className="text-primary">{book.discount_price}</span>
                                                <span className="text-xs line-through text-gray-500">{book.price}</span>
                                            </div>
                                        ) : (
                                            <span>{book.price}</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${book.stock < 10 ? "bg-red-500" : "bg-green-500"}`} />
                                            <span className={`font-bold ${book.stock < 10 ? "text-red-400" : "text-green-400"}`}>
                                                {book.stock}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="sm" className="hover:text-primary">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500 hover:bg-red-500/10">
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </motion.div>
    );
}

function OrdersTab() {
    const orders = [
        { id: "#ORD-001", customer: "أحمد محمد", date: "2023-12-25", total: "450 ج.م", status: "pending" },
        { id: "#ORD-002", customer: "سارة علي", date: "2023-12-24", total: "1,200 ج.م", status: "shipped" },
        { id: "#ORD-003", customer: "محمود حسن", date: "2023-12-23", total: "320 ج.م", status: "delivered" },
        { id: "#ORD-004", customer: "نور الدين", date: "2023-12-23", total: "850 ج.م", status: "delivered" },
        { id: "#ORD-005", customer: "كريم عادل", date: "2023-12-22", total: "210 ج.م", status: "cancelled" },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending": return <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">قيد الانتظار</span>;
            case "shipped": return <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">تم الشحن</span>;
            case "delivered": return <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">تم التوصيل</span>;
            case "cancelled": return <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">ملغي</span>;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">أحدث الطلبات</h2>
                <Button variant="outline">
                    <Filter className="w-4 h-4 ml-2" />
                    تصفية
                </Button>
            </div>

            <Card className="overflow-hidden border-0 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-secondary/50 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-bold text-text-primary">رقم الطلب</th>
                                <th className="p-4 font-bold text-text-primary">العميل</th>
                                <th className="p-4 font-bold text-text-primary">التاريخ</th>
                                <th className="p-4 font-bold text-text-primary">الإجمالي</th>
                                <th className="p-4 font-bold text-text-primary">الحالة</th>
                                <th className="p-4 font-bold text-text-primary"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-primary">{order.id}</td>
                                    <td className="p-4 text-white">{order.customer}</td>
                                    <td className="p-4 text-gray-400">{order.date}</td>
                                    <td className="p-4 font-bold text-white">{order.total}</td>
                                    <td className="p-4">{getStatusBadge(order.status)}</td>
                                    <td className="p-4">
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </motion.div>
    );
}
