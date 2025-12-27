import { getBooks } from "@/lib/data";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
    const books = await getBooks();

    return <AdminDashboard books={books} />;
}
