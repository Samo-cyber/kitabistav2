"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Book } from "@/lib/data";
import {
    Plus, Edit, Trash, TrendingUp, ShoppingBag, Users, Package,
    Search, Filter, Check, X, Truck, Clock, Upload,
    LayoutDashboard, Settings, LogOut, ChevronRight,
    ArrowUpRight, ArrowDownRight, MoreVertical, Eye, Menu,
    Image as ImageIcon, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { getMockDB, saveMockDB, addBook, updateBook, deleteBook } from "@/lib/mock-db";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon } from "lucide-react";

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders">("dashboard");
    const [db, setDb] = useState(getMockDB());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

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
        <div className="flex h-screen bg-background text-text-primary overflow-hidden font-sans select-none" dir="rtl">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--primary); }
            `}</style>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] lg:hidden"
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
                className={`bg-background-paper border-l border-border flex flex-col fixed lg:relative h-full z-[70] backdrop-blur-2xl transition-all duration-500 ease-in-out ${!isSidebarOpen && "lg:w-20"}`}
            >
                <div className="p-8 flex items-center gap-4 shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <span className="text-black font-black text-2xl">K</span>
                    </div>
                    {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                        <span className={`font-black text-2xl tracking-tighter transition-all duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:scale-0 lg:w-0"}`}>
                            كتابيستا
                        </span>
                    )}
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto no-scrollbar">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id as any)}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative ${activeTab === item.id
                                ? "bg-primary text-black font-bold shadow-2xl shadow-primary/30"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className={activeTab === item.id ? "text-black" : "text-zinc-500 group-hover:text-primary transition-colors"}>
                                {item.icon}
                            </span>
                            {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                                <span className={`font-bold transition-all duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:translate-x-4 lg:w-0"}`}>{item.label}</span>
                            )}
                            {activeTab === item.id && !isSidebarOpen && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-black rounded-l-full lg:block hidden" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 mt-auto border-t border-white/5 shrink-0">
                    <button className="w-full flex items-center gap-4 px-4 py-4 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300">
                        <LogOut className="w-5 h-5" />
                        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                            <span className={`font-bold transition-all duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:w-0"}`}>تسجيل الخروج</span>
                        )}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Header */}
                <header className="h-20 border-b border-border px-6 lg:px-10 flex items-center justify-between shrink-0 bg-background/50 backdrop-blur-xl z-50">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-3 bg-secondary hover:bg-border rounded-xl lg:hidden transition-colors"
                        >
                            <Menu className="w-6 h-6 text-text-secondary" />
                        </button>
                        <div className="flex flex-col">
                            <h2 className="text-xl lg:text-2xl font-black tracking-tight">
                                {sidebarItems.find(i => i.id === activeTab)?.label}
                            </h2>
                            <p className="text-xs text-text-secondary font-medium hidden sm:block">مرحباً بك في لوحة التحكم الخاصة بك</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block group">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="بحث سريع..."
                                className="bg-background-paper border border-border rounded-2xl pr-12 pl-6 py-2.5 text-sm focus:outline-none focus:border-primary/50 w-64 lg:w-80 transition-all backdrop-blur-md"
                            />
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="p-3 bg-secondary hover:bg-border rounded-xl transition-colors text-text-secondary"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button className="p-3 bg-secondary hover:bg-border rounded-xl transition-colors relative">
                            <div className="absolute top-3 left-3 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
                            <Settings className="w-5 h-5 text-text-secondary" />
                        </button>
                    </div>
                </header>

                {/* Content Area - THE ONLY SCROLLABLE PART */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
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

function DashboardView({ db }: { db: any }) {
    const stats = [
        { label: "إجمالي المبيعات", value: `${db.orders.reduce((acc: number, o: any) => acc + (parseFloat(o.total) || 0), 0)} ج.م`, icon: <TrendingUp />, color: "text-green-500", bg: "bg-green-500/10", trend: "+12.5%" },
        { label: "الطلبات النشطة", value: db.orders.filter((o: any) => o.status === "pending").length, icon: <ShoppingBag />, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+3" },
        { label: "إجمالي الكتب", value: db.books.length, icon: <Package />, color: "text-primary", bg: "bg-primary/10", trend: "+2" },
        { label: "العملاء", value: "154", icon: <Users />, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+8%" },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-6 bg-zinc-900/20 border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                                {stat.icon}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {stat.trend} {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <p className="text-zinc-500 text-sm font-bold mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <Card className="xl:col-span-2 p-8 bg-zinc-900/20 border-white/5 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-black text-xl">أحدث الطلبات</h3>
                        <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10">مشاهدة الكل</Button>
                    </div>
                    <div className="space-y-4">
                        {db.orders.slice(0, 5).map((order: any) => (
                            <div key={order.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 font-black text-sm group-hover:bg-primary group-hover:text-black transition-all">
                                        #{order.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <p className="font-black text-base">{order.customer}</p>
                                        <p className="text-xs text-zinc-500 font-medium">{order.date}</p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-lg text-primary">{order.total} ج.م</p>
                                    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                                        {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-8 bg-zinc-900/20 border-white/5 backdrop-blur-sm overflow-hidden">
                    <h3 className="font-black text-xl mb-8">تحليل المبيعات</h3>
                    <div className="h-64 relative mt-10">
                        <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,80 Q100,60 200,70 T400,40 T600,50 T800,20 T1000,30 L1000,100 L0,100 Z" fill="url(#lineGradient)" />
                            <path d="M0,80 Q100,60 200,70 T400,40 T600,50 T800,20 T1000,30" fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="flex justify-between mt-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        <span>يناير</span>
                        <span>يونيو</span>
                        <span>ديسمبر</span>
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}

function ProductsView({ db }: { db: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingBook, setViewingBook] = useState<Book | null>(null);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [formData, setFormData] = useState<Partial<Book>>({
        title: "", author: "", price: 0, category: "novels", stock: 0, image_url: "", description: ""
    });
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredBooks = db.books.filter((book: Book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleOpenModal = (book?: Book) => {
        if (book) {
            setEditingBook(book);
            setFormData(book);
        } else {
            setEditingBook(null);
            setFormData({ title: "", author: "", price: 0, category: "novels", stock: 0, image_url: "", description: "" });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.author || !formData.price) return;
        if (editingBook) {
            updateBook({ ...editingBook, ...formData } as Book);
        } else {
            addBook({ ...formData, id: `bk${Date.now()}`, is_active: true, discount_price: null } as Book);
        }
        setIsModalOpen(false);
    };

    const handleImageUpload = (e: any) => {
        let file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData(prev => ({ ...prev, image_url: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="ابحث عن كتاب أو مؤلف..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl pr-12 pl-6 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all backdrop-blur-sm"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-zinc-900/40 border border-white/10 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-primary/50 backdrop-blur-sm appearance-none cursor-pointer font-bold"
                    >
                        <option value="all">جميع الأقسام</option>
                        {db.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-black font-black h-14 px-8 rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة منتج جديد
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredBooks.map((book: Book) => (
                    <Card key={book.id} className="group bg-zinc-900/20 border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 backdrop-blur-sm cursor-pointer" onClick={() => setViewingBook(book)}>
                        <div className="aspect-[3/4] relative overflow-hidden bg-zinc-800">
                            {book.image_url ? (
                                <img src={book.image_url} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-10 h-10 text-zinc-700" /></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                                <div className="flex gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => handleOpenModal(book)} className="flex-1 py-3 bg-white text-black rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                                        <Edit className="w-4 h-4" /> تعديل
                                    </button>
                                    <button onClick={() => deleteBook(book.id)} className="w-12 h-12 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start gap-4 mb-2">
                                <h4 className="font-black text-lg truncate group-hover:text-primary transition-colors">{book.title}</h4>
                                <span className="text-primary font-black text-lg shrink-0">{book.price} ج.م</span>
                            </div>
                            <p className="text-sm text-zinc-500 font-bold mb-4">{book.author}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-black uppercase tracking-widest">
                                    {db.categories.find((c: any) => c.id === book.category)?.name || book.category}
                                </span>
                                <span className={`text-xs font-black ${book.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                                    {book.stock} في المخزن
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modals are handled by the main component's AnimatePresence for better flow */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBook ? "تعديل بيانات الكتاب" : "إضافة كتاب جديد للمكتبة"}>
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e); }}
                            className={`relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden group ${isDragging ? "border-primary bg-primary/5 scale-95" : "border-white/10 hover:border-primary/40 bg-white/5"
                                }`}
                        >
                            {formData.image_url ? (
                                <>
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <div className="bg-white text-black px-6 py-3 rounded-2xl font-black text-sm shadow-2xl">تغيير الغلاف</div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-10">
                                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Upload className="w-10 h-10 text-primary" />
                                    </div>
                                    <p className="font-black text-xl mb-2">اسحب صورة الغلاف</p>
                                    <p className="text-sm text-zinc-500 font-medium">أو اضغط لاختيار ملف من جهازك</p>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">عنوان الكتاب</label>
                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="أدخل العنوان الكامل" className="bg-zinc-900/50 border-white/10 h-14 rounded-2xl px-6 font-bold focus:ring-primary/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">اسم المؤلف</label>
                                <Input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} placeholder="الكاتب أو المترجم" className="bg-zinc-900/50 border-white/10 h-14 rounded-2xl px-6 font-bold focus:ring-primary/20" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">السعر</label>
                                    <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} placeholder="0.00" className="bg-zinc-900/50 border-white/10 h-14 rounded-2xl px-6 font-bold focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">المخزون</label>
                                    <Input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })} placeholder="0" className="bg-zinc-900/50 border-white/10 h-14 rounded-2xl px-6 font-bold focus:ring-primary/20" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">تصنيف الكتاب</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 appearance-none font-bold cursor-pointer">
                                    {db.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">وصف مختصر</label>
                        <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 min-h-[120px] resize-none font-medium leading-relaxed" placeholder="اكتب نبذة تشجع القراء على اقتناء الكتاب..." />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button onClick={handleSave} className="flex-[2] bg-primary hover:bg-primary/90 text-black font-black h-16 rounded-2xl shadow-2xl shadow-primary/20 text-lg transition-all hover:scale-[1.02]">
                            {editingBook ? "تحديث البيانات" : "إضافة للمكتبة الآن"}
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 border-white/10 h-16 rounded-2xl font-bold hover:bg-white/5">
                            إلغاء
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!viewingBook} onClose={() => setViewingBook(null)} title="بطاقة الكتاب">
                {viewingBook && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row gap-10">
                            <div className="w-full sm:w-48 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shrink-0 border border-white/10 bg-zinc-800 self-center">
                                {viewingBook.image_url ? (
                                    <img src={viewingBook.image_url} alt={viewingBook.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-12 h-12 text-zinc-700" /></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{viewingBook.title}</h3>
                                <p className="text-xl text-zinc-400 font-bold mb-8">{viewingBook.author}</p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-zinc-300">
                                        {db.categories.find((c: any) => c.id === viewingBook.category)?.name || viewingBook.category}
                                    </div>
                                    <div className="px-5 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-sm font-black">
                                        {viewingBook.price} ج.م
                                    </div>
                                    <div className={`px-5 py-2 rounded-2xl border text-xs font-black ${viewingBook.stock < 10 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                                        {viewingBook.stock} في المخزن
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">عن الكتاب</h4>
                            <p className="text-zinc-300 leading-relaxed text-lg bg-white/5 p-8 rounded-3xl border border-white/5 font-medium italic">
                                "{viewingBook.description || "لا يوجد وصف متاح لهذا الكتاب حالياً."}"
                            </p>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Button onClick={() => { setViewingBook(null); handleOpenModal(viewingBook); }} className="flex-1 bg-white text-black hover:bg-primary transition-colors font-black h-16 rounded-2xl text-lg shadow-xl">
                                <Edit className="w-5 h-5 ml-2" /> تعديل البيانات
                            </Button>
                            <Button onClick={() => setViewingBook(null)} variant="outline" className="flex-1 border-white/10 h-16 rounded-2xl font-bold text-lg">إغلاق</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}

function OrdersView({ db }: { db: any }) {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredOrders = db.orders.filter((order: any) => {
        const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const updateStatus = (id: string, status: string) => {
        const updatedOrders = db.orders.map((o: any) => o.id === id ? { ...o, status } : o);
        saveMockDB({ ...db, orders: updatedOrders });
        setSelectedOrder(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="ابحث برقم الطلب أو اسم العميل..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl pr-12 pl-6 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all backdrop-blur-sm"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-zinc-900/40 border border-white/10 rounded-2xl px-8 py-3 text-sm focus:outline-none focus:border-primary/50 backdrop-blur-sm appearance-none cursor-pointer font-bold"
                >
                    <option value="all">جميع الحالات</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="delivered">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                </select>
            </div>

            <Card className="bg-zinc-900/20 border-white/5 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-right min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-zinc-500">رقم الطلب</th>
                                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-zinc-500">العميل</th>
                                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-zinc-500">التاريخ</th>
                                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-zinc-500">الإجمالي</th>
                                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-zinc-500">الحالة</th>
                                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-zinc-500 text-left">التفاصيل</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-all duration-300 group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                    <td className="px-8 py-6 font-black text-primary text-lg">{order.id}</td>
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="font-black text-base">{order.customer}</p>
                                            <p className="text-xs text-zinc-500 font-medium">{order.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-zinc-400 font-bold">{order.date}</td>
                                    <td className="px-8 py-6 font-black text-lg">{order.total} ج.م</td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest border ${order.status === 'pending'
                                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            : order.status === 'shipped'
                                                ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                : 'bg-green-500/10 text-green-500 border-green-500/20'
                                            }`}>
                                            {order.status === 'pending' ? 'قيد الانتظار' : order.status === 'shipped' ? 'تم الشحن' : 'مكتمل'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-primary group-hover:text-black transition-all">
                                                <Eye className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="تفاصيل الطلب الكاملة">
                {selectedOrder && (
                    <div className="space-y-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pb-8 border-b border-white/10">
                            <div>
                                <h4 className="text-4xl font-black text-primary mb-2 tracking-tighter">{selectedOrder.id}</h4>
                                <p className="text-lg text-zinc-500 font-bold">{selectedOrder.date}</p>
                            </div>
                            <div className="w-full sm:w-64">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">تحديث حالة الطلب</label>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary appearance-none font-black cursor-pointer"
                                >
                                    <option value="pending">قيد الانتظار</option>
                                    <option value="shipped">تم الشحن</option>
                                    <option value="delivered">مكتمل</option>
                                    <option value="cancelled">ملغي</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 shadow-inner">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">بيانات العميل</p>
                                    <p className="font-black text-2xl mb-2">{selectedOrder.customer}</p>
                                    <p className="text-lg text-zinc-400 font-bold flex items-center gap-3"><Truck className="w-5 h-5 text-primary" /> {selectedOrder.phone}</p>
                                </div>
                                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 shadow-inner">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">عنوان التوصيل</p>
                                    <p className="text-lg font-bold leading-relaxed text-zinc-300 italic">"{selectedOrder.address}"</p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 shadow-inner flex flex-col">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">قائمة المشتريات</p>
                                <div className="space-y-4 flex-1">
                                    {selectedOrder.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-black/20 border border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-white font-black text-base">{item.title}</span>
                                                <span className="text-xs text-zinc-500 font-bold">الكمية: {item.quantity}</span>
                                            </div>
                                            <span className="font-black text-primary text-lg">{item.price * item.quantity} ج.م</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-white/10 pt-6 mt-6 flex justify-between items-center">
                                    <span className="font-black text-zinc-500 uppercase tracking-widest">الإجمالي النهائي</span>
                                    <span className="text-4xl font-black text-white tracking-tighter">{selectedOrder.total} ج.م</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button onClick={() => setSelectedOrder(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white h-16 rounded-2xl font-bold text-lg">إغلاق النافذة</Button>
                            <Button className="flex-1 bg-primary text-black font-black h-16 rounded-2xl shadow-2xl shadow-primary/20 text-lg hover:scale-[1.02] transition-all">طباعة الفاتورة</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
