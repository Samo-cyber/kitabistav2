import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TrendingUp, ShoppingBag, Package, Users, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardView({ db }: { db: any }) {
    const stats = [
        { label: "إجمالي المبيعات", value: `${db.orders.reduce((acc: number, o: any) => acc + (parseFloat(o.total) || 0), 0)} ج.م`, icon: <TrendingUp />, trend: "+12.5%" },
        { label: "الطلبات النشطة", value: db.orders.filter((o: any) => o.status === "pending").length, icon: <ShoppingBag />, trend: "+3" },
        { label: "إجمالي الكتب", value: db.books.length, icon: <Package />, trend: "+2" },
        { label: "العملاء", value: "154", icon: <Users />, trend: "+8%" },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-5 bg-zinc-900/50 border-white/5 hover:border-primary/30 transition-all duration-300 group backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                {stat.icon}
                            </div>
                            <div className="px-2 py-1 rounded text-[10px] font-bold bg-green-500/10 text-green-500 flex items-center gap-1">
                                {stat.trend} <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </div>
                        <p className="text-zinc-500 text-xs font-bold mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <Card className="xl:col-span-2 p-6 bg-zinc-900/50 border-white/5 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-white">أحدث الطلبات</h3>
                        <Button variant="ghost" className="text-primary text-sm hover:bg-primary/10">مشاهدة الكل</Button>
                    </div>
                    <div className="space-y-3">
                        {db.orders.slice(0, 5).map((order: any) => (
                            <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 font-mono text-xs group-hover:text-primary transition-colors">
                                        #{order.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">{order.customer}</p>
                                        <p className="text-[10px] text-zinc-500">{order.date}</p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-primary">{order.total} ج.م</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${order.status === 'pending' ? 'text-yellow-500 bg-yellow-500/10' : 'text-green-500 bg-green-500/10'}`}>
                                        {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 bg-zinc-900/50 border-white/5 backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-6 text-white">تحليل المبيعات</h3>
                    <div className="h-48 relative mt-8 flex items-end gap-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group overflow-hidden">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-primary/20 group-hover:bg-primary/40 transition-all duration-500"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-zinc-500">
                        <span>السبت</span>
                        <span>الجمعة</span>
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}
