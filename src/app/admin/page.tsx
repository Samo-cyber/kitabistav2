import { getBooks, getCategories } from "@/lib/data";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
    const books = await getBooks();
    const categories = await getCategories();

    return <AdminDashboard books={books} categories={categories} />;
}
