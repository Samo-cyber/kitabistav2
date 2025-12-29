import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Book } from "@/lib/data";
import { Search, Plus, Edit, Trash, Image as ImageIcon, Upload } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { addBook, updateBook, deleteBook } from "@/lib/mock-db";

export function ProductsView({ db }: { db: any }) {
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
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="ابحث عن كتاب..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all text-white"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none cursor-pointer font-bold text-white"
                    >
                        <option value="all">جميع الأقسام</option>
                        {db.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-primary/90 text-black font-bold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5 ml-2" />
                    إضافة منتج
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredBooks.map((book: Book) => (
                    <Card key={book.id} className="group bg-zinc-900/30 border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 backdrop-blur-sm cursor-pointer" onClick={() => setViewingBook(book)}>
                        <div className="aspect-[2/3] relative overflow-hidden bg-zinc-900">
                            {book.image_url ? (
                                <Image src={book.image_url} alt={book.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-10 h-10 text-zinc-700" /></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                                <div className="flex gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => handleOpenModal(book)} className="flex-1 py-2 bg-white text-black rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                                        <Edit className="w-3 h-3" /> تعديل
                                    </button>
                                    <button onClick={() => deleteBook(book.id)} className="w-8 h-8 bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                        <Trash className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start gap-2 mb-1">
                                <h4 className="font-bold text-base truncate group-hover:text-primary transition-colors text-white">{book.title}</h4>
                                <span className="text-primary font-bold text-sm shrink-0">{book.price} ج.م</span>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium mb-3">{book.author}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400 font-bold">
                                    {db.categories.find((c: any) => c.id === book.category)?.name || book.category}
                                </span>
                                <span className={`text-[10px] font-bold ${book.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                                    {book.stock} في المخزن
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modals */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBook ? "تعديل الكتاب" : "إضافة كتاب"}>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e); }}
                            className={`relative aspect-[2/3] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden group ${isDragging ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/40 bg-zinc-900/50"
                                }`}
                        >
                            {formData.image_url ? (
                                <>
                                    <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs shadow-lg">تغيير الغلاف</div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="font-bold text-sm mb-1 text-white">صورة الغلاف</p>
                                    <p className="text-xs text-zinc-500">اسحب الصورة هنا</p>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase">عنوان الكتاب</label>
                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-zinc-900/50 border-white/10 h-10 rounded-lg px-4 font-medium text-white focus:border-primary/50" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase">المؤلف</label>
                                <Input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="bg-zinc-900/50 border-white/10 h-10 rounded-lg px-4 font-medium text-white focus:border-primary/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase">السعر</label>
                                    <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="bg-zinc-900/50 border-white/10 h-10 rounded-lg px-4 font-medium text-white focus:border-primary/50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase">المخزون</label>
                                    <Input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })} className="bg-zinc-900/50 border-white/10 h-10 rounded-lg px-4 font-medium text-white focus:border-primary/50" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase">التصنيف</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 appearance-none font-medium cursor-pointer text-white">
                                    {db.categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase">الوصف</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 min-h-[80px] resize-none text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button onClick={handleSave} className="flex-[2] bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-xl shadow-lg shadow-primary/10">
                            {editingBook ? "تحديث" : "إضافة"}
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)} variant="ghost" className="flex-1 text-zinc-400 hover:text-white h-12 rounded-xl font-bold hover:bg-white/5">
                            إلغاء
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={!!viewingBook} onClose={() => setViewingBook(null)} title="تفاصيل الكتاب">
                {viewingBook && (
                    <div className="space-y-6">
                        <div className="flex gap-6">
                            <div className="w-32 aspect-[2/3] rounded-lg overflow-hidden shadow-lg shrink-0 border border-white/10 bg-zinc-900 relative">
                                {viewingBook.image_url ? (
                                    <Image src={viewingBook.image_url} alt={viewingBook.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-zinc-700" /></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-2xl font-bold text-white mb-1">{viewingBook.title}</h3>
                                <p className="text-zinc-400 font-medium mb-4">{viewingBook.author}</p>
                                <div className="flex flex-wrap gap-2">
                                    <div className="px-3 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-400">
                                        {db.categories.find((c: any) => c.id === viewingBook.category)?.name || viewingBook.category}
                                    </div>
                                    <div className="px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                                        {viewingBook.price} ج.م
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-zinc-300 text-sm leading-relaxed">
                                {viewingBook.description || "لا يوجد وصف متاح."}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => { setViewingBook(null); handleOpenModal(viewingBook); }} className="flex-1 bg-white text-black hover:bg-zinc-200 font-bold h-12 rounded-xl">
                                تعديل
                            </Button>
                            <Button onClick={() => setViewingBook(null)} variant="ghost" className="flex-1 text-zinc-400 hover:text-white h-12 rounded-xl font-bold hover:bg-white/5">إغلاق</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
