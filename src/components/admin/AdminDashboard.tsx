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
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans" dir="rtl">
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    width: isSidebarOpen ? 260 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 80),
                    x: typeof window !== 'undefined' && window.innerWidth < 1024 && !isSidebarOpen ? 260 : 0
                }}
                className={`bg-zinc-900/50 border-l border-white/5 flex flex-col fixed lg:relative h-full z-50 backdrop-blur-xl transition-all duration-300 ${!isSidebarOpen && "lg:w-20"}`}
            >
                <div className="p-6 flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-black font-black text-xl">K</span>
                    </div>
                    {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                        <span className={`font-bold text-xl tracking-tight transition-opacity duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:w-0"}`}>
                            كتابيستا <span className="text-primary text-xs">ADMIN</span>
                        </span>
                    )}
                </div>

                <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                ? "bg-primary text-black font-bold shadow-lg shadow-primary/20"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span className={activeTab === item.id ? "text-black" : "text-gray-400 group-hover:text-primary transition-colors"}>
                                {item.icon}
                            </span>
                            {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                                <span className={`transition-opacity duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:w-0"}`}>{item.label}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-white/5 shrink-0">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut className="w-5 h-5" />
                        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                            <span className={`transition-opacity duration-300 ${!isSidebarOpen && "lg:opacity-0 lg:w-0"}`}>تسجيل الخروج</span>
                        )}
                    </button>
                </div>
            </motion.aside>

            <main className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col w-full">
                <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg lg:hidden"
                        >
                            <Menu className="w-6 h-6 text-gray-400" />
                        </button>
                        <h2 className="text-lg lg:text-xl font-bold truncate">
                            {sidebarItems.find(i => i.id === activeTab)?.label}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="بحث..."
                                className="bg-zinc-900 border border-white/10 rounded-full pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary w-32 md:w-64 transition-all"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-4 lg:p-8 flex-1">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-4 lg:p-6 bg-zinc-900/40 border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full ${stat.color.replace('text', 'bg')}`} />
                        <div className="flex justify-between items-start mb-3 lg:mb-4">
                            <div className={`p-2.5 lg:p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-[10px] lg:text-xs font-bold flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.trend} {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs lg:text-sm font-medium">{stat.label}</p>
                        <h3 className="text-xl lg:text-2xl font-black mt-1">{stat.value}</h3>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <Card className="lg:col-span-2 p-4 lg:p-6 bg-zinc-900/40 border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-base lg:text-lg">أحدث الطلبات</h3>
                        <Button variant="ghost" className="text-primary text-xs lg:text-sm">مشاهدة الكل</Button>
                    </div>
                    <div className="space-y-3 lg:space-y-4">
                        {db.orders.slice(0, 5).map((order: any) => (
                            <div key={order.id} className="flex items-center justify-between p-3 lg:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                <div className="flex items-center gap-3 lg:gap-4">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs lg:text-sm">
                                        {order.id.split('-')[1]}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-xs lg:text-sm truncate">{order.customer}</p>
                                        <p className="text-[10px] lg:text-xs text-gray-500">{order.date}</p>
                                    </div>
                                </div>
                                <div className="text-left shrink-0">
                                    <p className="font-bold text-xs lg:text-sm">{order.total} ج.م</p>
                                    <span className={`text-[8px] lg:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                                        {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {db.orders.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <ShoppingBag className="w-10 h-10 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">لا توجد طلبات حالياً</p>
                            </div>
                        )}
                    </div>
                </Card>

                <Card className="p-4 lg:p-6 bg-zinc-900/40 border-white/5 overflow-hidden">
                    <h3 className="font-bold text-base lg:text-lg mb-6">تحليل المبيعات</h3>
                    <div className="h-48 lg:h-64 relative mt-4">
                        <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,80 Q100,60 200,70 T400,40 T600,50 T800,20 T1000,30 L1000,100 L0,100 Z" fill="url(#lineGradient)" />
                            <path d="M0,80 Q100,60 200,70 T400,40 T600,50 T800,20 T1000,30" fill="none" stroke="var(--primary)" strokeWidth="3" />
                        </svg>
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-gray-500">
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
        if (!formData.title || !formData.author || !formData.price) {
            alert("يرجى ملء البيانات الأساسية");
            return;
        }
        if (editingBook) {
            updateBook({ ...editingBook, ...formData } as Book);
        } else {
            addBook({ ...formData, id: `bk${Date.now()}`, is_active: true, discount_price: null } as Book);
        }
        setIsModalOpen(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        let file: File | null = null;
        if ('files' in e.target && e.target.files) {
            file = e.target.files[0];
        } else if ('dataTransfer' in e && e.dataTransfer.files) {
            file = e.dataTransfer.files[0];
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image_url: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="بحث في الكتب..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    >
                        <option value="all">كل الأقسام</option>
                        {db.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-black font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة منتج
                </Button>
            </div>

            <div className="hidden md:block">
                <Card className="bg-zinc-900/40 border-white/5 overflow-hidden">
                    <table className="w-full text-right">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-6 py-4 font-bold text-sm">المنتج</th>
                                <th className="px-6 py-4 font-bold text-sm">القسم</th>
                                <th className="px-6 py-4 font-bold text-sm text-center">المخزون</th>
                                <th className="px-6 py-4 font-bold text-sm text-center">السعر</th>
                                <th className="px-6 py-4 font-bold text-sm text-left">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredBooks.map((book: Book) => (
                                <tr key={book.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setViewingBook(book)}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-14 bg-zinc-800 rounded overflow-hidden shrink-0">
                                                {book.image_url ? (
                                                    <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-4 h-4 text-zinc-600" /></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{book.title}</p>
                                                <p className="text-xs text-gray-500">{book.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                                            {db.categories.find((c: any) => c.id === book.category)?.name || book.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`font-bold text-sm ${book.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>{book.stock}</span>
                                            <div className="w-12 bg-white/5 h-1 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${book.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(book.stock, 100)}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-primary">
                                        {book.price} ج.م
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => handleOpenModal(book)} className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => deleteBook(book.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredBooks.map((book: Book) => (
                    <Card key={book.id} className="p-4 bg-zinc-900/40 border-white/5 flex gap-4 cursor-pointer" onClick={() => setViewingBook(book)}>
                        <div className="w-20 h-28 bg-zinc-800 rounded shadow-lg shrink-0 overflow-hidden">
                            {book.image_url ? (
                                <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-zinc-600" /></div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex justify-between items-start gap-2">
                                <h4 className="font-bold text-sm truncate">{book.title}</h4>
                                <span className="text-primary font-bold text-sm shrink-0">{book.price} ج.م</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2 truncate">{book.author}</p>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-gray-400">
                                    {db.categories.find((c: any) => c.id === book.category)?.name || book.category}
                                </span>
                                <span className={`text-[10px] font-bold ${book.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                                    المخزون: {book.stock}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleOpenModal(book)} className="flex-1 py-2 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-bold flex items-center justify-center gap-1">
                                    <Edit className="w-3 h-3" /> تعديل
                                </button>
                                <button onClick={() => deleteBook(book.id)} className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-bold flex items-center justify-center gap-1">
                                    <Trash className="w-3 h-3" /> حذف
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBook ? "تعديل المنتج" : "إضافة منتج جديد"}>
                <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> صورة المنتج
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e); }}
                                    className={`relative aspect-[3/4] rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden group ${isDragging ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/50 bg-white/5"
                                        }`}
                                >
                                    {formData.image_url ? (
                                        <>
                                            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white font-bold text-sm">تغيير الصورة</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-6">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                                <Upload className="w-6 h-6 text-primary" />
                                            </div>
                                            <p className="font-bold text-sm mb-1">اسحب الصورة هنا</p>
                                            <p className="text-xs text-gray-500">أو اضغط لاختيار ملف</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">عنوان الكتاب</label>
                                <Input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="مثال: رواية الفيل الأزرق"
                                    className="bg-zinc-900 border-white/10 h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">المؤلف</label>
                                <Input
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="اسم الكاتب"
                                    className="bg-zinc-900 border-white/10 h-12"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">السعر (ج.م)</label>
                                    <Input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        placeholder="0.00"
                                        className="bg-zinc-900 border-white/10 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">المخزون</label>
                                    <Input
                                        type="number"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                        placeholder="0"
                                        className="bg-zinc-900 border-white/10 h-12"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">القسم</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary appearance-none"
                                >
                                    {db.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400">وصف الكتاب</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary min-h-[120px] resize-none"
                            placeholder="اكتب نبذة مختصرة عن الكتاب..."
                        />
                    </div>

                    <div className="flex gap-4 pt-4 sticky bottom-0 bg-[#0c0c0c] pb-2 border-t border-white/5">
                        <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-xl shadow-lg shadow-primary/20">
                            {editingBook ? "تحديث البيانات" : "إضافة المنتج الآن"}
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 border-white/10 h-12 rounded-xl">
                            إلغاء
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!viewingBook} onClose={() => setViewingBook(null)} title="تفاصيل المنتج">
                {viewingBook && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10 bg-zinc-800">
                                {viewingBook.image_url ? (
                                    <img src={viewingBook.image_url} alt={viewingBook.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-zinc-600" /></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-2xl font-black text-primary mb-1">{viewingBook.title}</h3>
                                <p className="text-lg text-gray-400 mb-4">{viewingBook.author}</p>
                                <div className="flex flex-wrap gap-3">
                                    <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold">
                                        {db.categories.find((c: any) => c.id === viewingBook.category)?.name || viewingBook.category}
                                    </div>
                                    <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                                        {viewingBook.price} ج.م
                                    </div>
                                    <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${viewingBook.stock < 10 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                                        المخزون: {viewingBook.stock}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">وصف الكتاب</h4>
                            <p className="text-gray-300 leading-relaxed text-sm bg-white/5 p-5 rounded-2xl border border-white/5">
                                {viewingBook.description || "لا يوجد وصف متاح لهذا الكتاب حالياً."}
                            </p>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button onClick={() => { setViewingBook(null); handleOpenModal(viewingBook); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl">
                                <Edit className="w-4 h-4 ml-2" /> تعديل البيانات
                            </Button>
                            <Button onClick={() => setViewingBook(null)} variant="outline" className="flex-1 border-white/10 h-12 rounded-xl">إغلاق</Button>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="بحث في الطلبات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                >
                    <option value="all">كل الحالات</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="delivered">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                </select>
            </div>

            <div className="hidden md:block">
                <Card className="bg-zinc-900/40 border-white/5 overflow-hidden">
                    <table className="w-full text-right">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-6 py-4 font-bold text-sm">رقم الطلب</th>
                                <th className="px-6 py-4 font-bold text-sm">العميل</th>
                                <th className="px-6 py-4 font-bold text-sm">التاريخ</th>
                                <th className="px-6 py-4 font-bold text-sm">الإجمالي</th>
                                <th className="px-6 py-4 font-bold text-sm">الحالة</th>
                                <th className="px-6 py-4 font-bold text-sm text-left">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                    <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-sm">{order.customer}</p>
                                            <p className="text-xs text-gray-500">{order.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{order.date}</td>
                                    <td className="px-6 py-4 font-bold">{order.total} ج.م</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border ${order.status === 'pending'
                                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            : order.status === 'shipped'
                                                ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                : 'bg-green-500/10 text-green-500 border-green-500/20'
                                            }`}>
                                            {order.status === 'pending' ? 'قيد الانتظار' : order.status === 'shipped' ? 'تم الشحن' : 'مكتمل'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-primary hover:text-black transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredOrders.map((order: any) => (
                    <Card key={order.id} onClick={() => setSelectedOrder(order)} className="p-4 bg-zinc-900/40 border-white/5 space-y-3 cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-primary">{order.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${order.status === 'pending'
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                : 'bg-green-500/10 text-green-500 border-green-500/20'
                                }`}>
                                {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                            </span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="font-bold text-sm">{order.customer}</p>
                                <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                            <p className="font-bold text-sm text-white">{order.total} ج.م</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="تفاصيل الطلب">
                {selectedOrder && (
                    <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-white/10">
                            <div>
                                <h4 className="text-xl font-bold text-primary mb-1">{selectedOrder.id}</h4>
                                <p className="text-sm text-gray-400">{selectedOrder.date}</p>
                            </div>
                            <div className="w-full sm:w-auto">
                                <p className="text-xs text-gray-500 mb-1">حالة الطلب</p>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary appearance-none"
                                >
                                    <option value="pending">قيد الانتظار</option>
                                    <option value="shipped">تم الشحن</option>
                                    <option value="delivered">مكتمل</option>
                                    <option value="cancelled">ملغي</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-gray-500 mb-2">معلومات العميل</p>
                                    <p className="font-bold text-lg mb-1">{selectedOrder.customer}</p>
                                    <p className="text-sm text-gray-400 flex items-center gap-2"><Truck className="w-4 h-4" /> {selectedOrder.phone}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-xs text-gray-500 mb-2">عنوان الشحن</p>
                                    <p className="text-sm font-medium leading-relaxed">{selectedOrder.address}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-xs text-gray-500 mb-4">ملخص المنتجات</p>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-gray-200 font-medium">{item.title}</span>
                                                <span className="text-xs text-gray-500">الكمية: {item.quantity}</span>
                                            </div>
                                            <span className="font-bold text-primary">{item.price * item.quantity} ج.م</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-white/10 pt-3 mt-3 flex justify-between items-center font-black text-lg text-white">
                                        <span>الإجمالي</span>
                                        <span className="text-primary">{selectedOrder.total} ج.م</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 sticky bottom-0 bg-[#0c0c0c] pb-2 border-t border-white/5">
                            <Button onClick={() => setSelectedOrder(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white h-12 rounded-xl">إغلاق</Button>
                            <Button className="flex-1 bg-primary text-black font-bold h-12 rounded-xl shadow-lg shadow-primary/20">طباعة الفاتورة</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
