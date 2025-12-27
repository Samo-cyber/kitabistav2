"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Book } from "@/lib/data";
import { Plus, Edit, Trash, TrendingUp, ShoppingBag, Users, Package, Search, Filter, Check, X, Truck, Clock, Upload, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

interface AdminDashboardProps {
    books: Book[];
}

export function AdminDashboard({ books: initialBooks }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<"sales" | "products" | "orders">("sales");
    const [books, setBooks] = useState<Book[]>(initialBooks);

    const handleAddBook = (newBook: Book) => {
        setBooks([newBook, ...books]);
    };

    const handleDeleteBook = (bookId: string) => {
        setBooks(books.filter(b => b.id !== bookId));
    };

    const handleUpdateBook = (updatedBook: Book) => {
        setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
    };

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
                        <ProductsTab
                            key="products"
                            books={books}
                            onAddBook={handleAddBook}
                            onDeleteBook={handleDeleteBook}
                            onUpdateBook={handleUpdateBook}
                        />
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

interface ProductsTabProps {
    books: Book[];
    onAddBook: (book: Book) => void;
    onDeleteBook: (id: string) => void;
    onUpdateBook: (book: Book) => void;
}

function ProductsTab({ books, onAddBook, onDeleteBook, onUpdateBook }: ProductsTabProps) {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Add Book Form State
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        price: "",
        category: "",
        stock: 0,
        image_url: "/books/placeholder.jpg"
    });
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // In a real app, we would upload the file here.
            // For now, we'll just simulate it by setting a placeholder or object URL if we wanted.
            // keeping the placeholder for simplicity as requested "local data linking"
            console.log("File dropped:", e.dataTransfer.files[0]);
        }
    };

    const handleSubmitBook = () => {
        if (!newBook.title || !newBook.price) return;

        const bookToAdd: Book = {
            id: Date.now().toString(),
            title: newBook.title,
            author: newBook.author || "غير معروف",
            price: parseFloat(newBook.price) || 0,
            category: newBook.category || "عام",
            stock: newBook.stock || 0,
            image_url: newBook.image_url || "/books/placeholder.jpg",
            description: "",
            is_active: true,
            discount_price: null
        };

        onAddBook(bookToAdd);
        setIsAddModalOpen(false);
        setNewBook({ title: "", author: "", price: "", category: "", stock: 0, image_url: "/books/placeholder.jpg" });
    };

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
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة كتاب جديد
                </Button>
            </div>

            <Card className="overflow-hidden border-0 shadow-xl">
                <div className="overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-secondary/50 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-bold text-text-primary">العنوان</th>
                                <th className="p-4 font-bold text-text-primary hidden md:table-cell">المؤلف</th>
                                <th className="p-4 font-bold text-text-primary hidden md:table-cell">القسم</th>
                                <th className="p-4 font-bold text-text-primary">السعر</th>
                                <th className="p-4 font-bold text-text-primary">المخزون</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {books.map((book) => (
                                <tr
                                    key={book.id}
                                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                                    onClick={() => setSelectedBook(book)}
                                >
                                    <td className="p-4 font-medium text-white">{book.title}</td>
                                    <td className="p-4 text-gray-400 hidden md:table-cell">{book.author}</td>
                                    <td className="p-4 hidden md:table-cell">
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Product Details Modal */}
            <Modal
                isOpen={!!selectedBook}
                onClose={() => setSelectedBook(null)}
                title="تفاصيل الكتاب"
            >
                {selectedBook && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">{selectedBook.title}</h4>
                                <p className="text-primary">{selectedBook.author}</p>
                            </div>
                            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                {selectedBook.category}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">السعر الأصلي</p>
                                <p className="font-bold">{selectedBook.price} ج.م</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1">سعر الخصم</p>
                                <p className="font-bold text-primary">{selectedBook.discount_price || "-"} ج.م</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1">المخزون</p>
                                <p className={`font-bold ${selectedBook.stock < 10 ? "text-red-400" : "text-green-400"}`}>
                                    {selectedBook.stock} قطعة
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-1">الحالة</p>
                                <p className="font-bold">{selectedBook.stock > 0 ? "متوفر" : "نفذت الكمية"}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-white/10">
                            <Button className="flex-1" onClick={() => setSelectedBook(null)}>
                                <Edit className="w-4 h-4 ml-2" />
                                تعديل
                            </Button>
                            <Button variant="outline" className="flex-1 text-red-400 hover:text-red-500 hover:bg-red-500/10 border-red-500/20" onClick={() => {
                                onDeleteBook(selectedBook.id);
                                setSelectedBook(null);
                            }}>
                                <Trash className="w-4 h-4 ml-2" />
                                حذف
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Book Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="إضافة كتاب جديد"
            >
                <div className="space-y-4">
                    {/* Drag & Drop Image Upload */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/10" : "border-white/10 hover:border-primary/50 hover:bg-white/5"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="font-bold text-white">اسحب صورة الغلاف هنا</p>
                            <p className="text-xs text-gray-400">أو اضغط للاختيار من جهازك</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">عنوان الكتاب</label>
                            <Input
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                placeholder="مثال: أولاد حارتنا"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">المؤلف</label>
                            <Input
                                value={newBook.author}
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                placeholder="مثال: نجيب محفوظ"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">السعر (ج.م)</label>
                            <Input
                                value={newBook.price}
                                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                                placeholder="150"
                                type="number"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">القسم</label>
                            <Input
                                value={newBook.category}
                                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                                placeholder="روايات"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">المخزون</label>
                            <Input
                                value={newBook.stock}
                                onChange={(e) => setNewBook({ ...newBook, stock: parseInt(e.target.value) || 0 })}
                                placeholder="10"
                                type="number"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/10 mt-4">
                        <Button className="flex-1" onClick={handleSubmitBook}>
                            <Plus className="w-4 h-4 ml-2" />
                            إضافة الكتاب
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => setIsAddModalOpen(false)}>
                            إلغاء
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
}

function OrdersTab() {
    const [orders, setOrders] = useState([
        {
            id: "#ORD-001",
            customer: "أحمد محمد",
            date: "2023-12-25",
            total: "450",
            status: "pending",
            address: "القاهرة، المعادي",
            items: [
                { title: "أولاد حارتنا", quantity: 1, price: "150" },
                { title: "ثلاثية غرناطة", quantity: 1, price: "200" },
                { title: "يوتوبيا", quantity: 1, price: "100" }
            ]
        },
        {
            id: "#ORD-002",
            customer: "سارة علي",
            date: "2023-12-24",
            total: "1200",
            status: "shipped",
            address: "الجيزة، الدقي",
            items: [
                { title: "موسوعة مصر القديمة", quantity: 1, price: "1200" }
            ]
        },
        {
            id: "#ORD-003",
            customer: "محمود حسن",
            date: "2023-12-23",
            total: "320",
            status: "delivered",
            address: "الإسكندرية، سموحة",
            items: [
                { title: "عزازيل", quantity: 2, price: "160" }
            ]
        },
        {
            id: "#ORD-004",
            customer: "نور الدين",
            date: "2023-12-23",
            total: "850",
            status: "delivered",
            address: "القاهرة، مدينة نصر",
            items: [
                { title: "الفيل الأزرق", quantity: 1, price: "150" },
                { title: "تراب الماس", quantity: 1, price: "150" },
                { title: "1919", quantity: 1, price: "150" },
                { title: "كيرة والجن", quantity: 1, price: "400" }
            ]
        },
        {
            id: "#ORD-005",
            customer: "كريم عادل",
            date: "2023-12-22",
            total: "210",
            status: "cancelled",
            address: "المنصورة",
            items: [
                { title: "شآبيب", quantity: 1, price: "210" }
            ]
        },
    ]);

    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isEditingStatus, setIsEditingStatus] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        if (!selectedOrder) return;

        const updatedOrders = orders.map(order =>
            order.id === selectedOrder.id ? { ...order, status: newStatus } : order
        );

        setOrders(updatedOrders);
        setSelectedOrder({ ...selectedOrder, status: newStatus });
        setIsEditingStatus(false);
    };

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
                <div className="overflow-hidden">
                    <table className="w-full text-right">
                        <thead className="bg-secondary/50 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-bold text-text-primary">رقم الطلب</th>
                                <th className="p-4 font-bold text-text-primary hidden md:table-cell">العميل</th>
                                <th className="p-4 font-bold text-text-primary hidden md:table-cell">التاريخ</th>
                                <th className="p-4 font-bold text-text-primary">الإجمالي</th>
                                <th className="p-4 font-bold text-text-primary">الحالة</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-white/5 transition-colors cursor-pointer"
                                    onClick={() => {
                                        setSelectedOrder(order);
                                        setIsEditingStatus(false);
                                    }}
                                >
                                    <td className="p-4 font-bold text-primary">{order.id}</td>
                                    <td className="p-4 text-white hidden md:table-cell">{order.customer}</td>
                                    <td className="p-4 text-gray-400 hidden md:table-cell">{order.date}</td>
                                    <td className="p-4 font-bold text-white">{order.total} ج.م</td>
                                    <td className="p-4">{getStatusBadge(order.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                title="تفاصيل الطلب"
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                            <div>
                                <h4 className="text-xl font-bold text-primary mb-1">{selectedOrder.id}</h4>
                                <p className="text-sm text-gray-400">{selectedOrder.date}</p>
                            </div>
                            {getStatusBadge(selectedOrder.status)}
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">العميل</span>
                                <span className="font-bold">{selectedOrder.customer}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-gray-400">العنوان</span>
                                <span className="font-bold text-sm">{selectedOrder.address}</span>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white/5 rounded-lg p-4">
                                <h5 className="font-bold text-sm mb-3 text-gray-300">المنتجات المطلوبة</h5>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item: any, index: number) => (
                                        <div key={index} className="flex justify-between items-center text-sm border-b border-white/5 last:border-0 pb-2 last:pb-0">
                                            <div className="flex items-center gap-2">
                                                <span className="w-5 h-5 flex items-center justify-center bg-primary/20 text-primary rounded text-xs font-bold">
                                                    {item.quantity}x
                                                </span>
                                                <span>{item.title}</span>
                                            </div>
                                            <span className="font-bold">{item.price} ج.م</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                <span className="text-primary font-bold">الإجمالي</span>
                                <span className="font-bold text-xl text-white">{selectedOrder.total} ج.م</span>
                            </div>
                        </div>

                        {/* Status Change Actions */}
                        {isEditingStatus ? (
                            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
                                <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10" onClick={() => handleStatusChange("pending")}>
                                    <Clock className="w-3 h-3 ml-1" /> قيد الانتظار
                                </Button>
                                <Button size="sm" variant="outline" className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10" onClick={() => handleStatusChange("shipped")}>
                                    <Truck className="w-3 h-3 ml-1" /> تم الشحن
                                </Button>
                                <Button size="sm" variant="outline" className="border-green-500/50 text-green-500 hover:bg-green-500/10" onClick={() => handleStatusChange("delivered")}>
                                    <Check className="w-3 h-3 ml-1" /> تم التوصيل
                                </Button>
                                <Button size="sm" variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10" onClick={() => handleStatusChange("cancelled")}>
                                    <X className="w-3 h-3 ml-1" /> ملغي
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-3 pt-4 border-t border-white/10">
                                <Button className="flex-1" onClick={() => setIsEditingStatus(true)}>
                                    تعديل الحالة
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => setSelectedOrder(null)}>
                                    إغلاق
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
