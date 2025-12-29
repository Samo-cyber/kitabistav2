import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Search, Eye, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { saveMockDB } from "@/lib/mock-db";

export function OrdersView({ db }: { db: any }) {
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
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="ابحث برقم الطلب أو اسم العميل..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all text-white"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-3 text-sm focus:outline-none focus:border-primary/50 backdrop-blur-sm appearance-none cursor-pointer font-bold text-white"
                >
                    <option value="all">جميع الحالات</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="delivered">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                </select>
            </div>

            <Card className="bg-zinc-900/30 border-white/5 backdrop-blur-sm overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-right min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-zinc-500">رقم الطلب</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-zinc-500">العميل</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-zinc-500">التاريخ</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-zinc-500">الإجمالي</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-zinc-500">الحالة</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-zinc-500 text-left">التفاصيل</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-all duration-200 group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                    <td className="px-6 py-4 font-mono text-sm text-primary">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-sm text-white">{order.customer}</p>
                                            <p className="text-[10px] text-zinc-500">{order.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-zinc-400 font-medium">{order.date}</td>
                                    <td className="px-6 py-4 font-bold text-sm text-white">{order.total} ج.م</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${order.status === 'pending'
                                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            : order.status === 'shipped'
                                                ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                : 'bg-green-500/10 text-green-500 border-green-500/20'
                                            }`}>
                                            {order.status === 'pending' ? 'قيد الانتظار' : order.status === 'shipped' ? 'تم الشحن' : 'مكتمل'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-black transition-all">
                                                <Eye className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="تفاصيل الطلب">
                {selectedOrder && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-white/10">
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-1 tracking-tight">{selectedOrder.id}</h4>
                                <p className="text-sm text-zinc-500">{selectedOrder.date}</p>
                            </div>
                            <div className="w-full sm:w-56">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase mb-2 block">تحديث الحالة</label>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary appearance-none font-bold cursor-pointer text-white"
                                >
                                    <option value="pending">قيد الانتظار</option>
                                    <option value="shipped">تم الشحن</option>
                                    <option value="delivered">مكتمل</option>
                                    <option value="cancelled">ملغي</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-3">بيانات العميل</p>
                                    <p className="font-bold text-lg mb-1 text-white">{selectedOrder.customer}</p>
                                    <p className="text-sm text-zinc-400 font-medium flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> {selectedOrder.phone}</p>
                                </div>
                                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-3">عنوان التوصيل</p>
                                    <p className="text-sm font-medium leading-relaxed text-zinc-300">&quot;{selectedOrder.address}&quot;</p>
                                </div>
                            </div>
                            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 flex flex-col">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-4">المنتجات</p>
                                <div className="space-y-3 flex-1">
                                    {selectedOrder.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-sm">{item.title}</span>
                                                <span className="text-[10px] text-zinc-500">الكمية: {item.quantity}</span>
                                            </div>
                                            <span className="font-bold text-primary text-sm">{item.price * item.quantity} ج.م</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                                    <span className="font-bold text-zinc-400 text-xs uppercase">الإجمالي</span>
                                    <span className="text-2xl font-bold text-white tracking-tight">{selectedOrder.total} ج.م</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button onClick={() => setSelectedOrder(null)} variant="ghost" className="flex-1 text-zinc-400 hover:text-white h-12 rounded-xl font-bold hover:bg-white/5">إغلاق</Button>
                            <Button className="flex-1 bg-white text-black font-bold h-12 rounded-xl shadow-lg hover:bg-zinc-200 transition-all">طباعة الفاتورة</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
