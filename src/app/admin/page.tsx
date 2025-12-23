import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { getBooks } from "@/lib/data";
import { Plus, Edit, Trash } from "lucide-react";

export default async function AdminPage() {
    const books = await getBooks();

    return (
        <div className="bg-background min-h-screen">
            <div className="bg-secondary text-secondary-foreground py-8">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="font-display text-3xl font-bold">لوحة التحكم</h1>
                    <Button>
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة كتاب
                    </Button>
                </div>
            </div>

            <Section>
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-gray-50 border-b border-border">
                                <tr>
                                    <th className="p-4 font-bold text-text-primary">العنوان</th>
                                    <th className="p-4 font-bold text-text-primary">المؤلف</th>
                                    <th className="p-4 font-bold text-text-primary">القسم</th>
                                    <th className="p-4 font-bold text-text-primary">السعر</th>
                                    <th className="p-4 font-bold text-text-primary">المخزون</th>
                                    <th className="p-4 font-bold text-text-primary">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {books.map((book) => (
                                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium">{book.title}</td>
                                        <td className="p-4 text-text-secondary">{book.author}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                                {book.category}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold">
                                            {book.discount_price ? (
                                                <div className="flex flex-col">
                                                    <span className="text-primary">{book.discount_price}</span>
                                                    <span className="text-xs line-through text-text-muted">{book.price}</span>
                                                </div>
                                            ) : (
                                                <span>{book.price}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`font-bold ${book.stock < 10 ? "text-red-500" : "text-green-600"}`}>
                                                {book.stock}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
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
            </Section>
        </div>
    );
}
