"use client";

import { Book, Category, DB as initialDB } from "./data";

const STORAGE_KEY = "kitabista_db_v3";

interface MockDB {
    books: Book[];
    categories: Category[];
    orders: any[];
}

export const getMockDB = (): MockDB => {
    if (typeof window === "undefined") return { ...initialDB, orders: [] };

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Always ensure categories are up to date from data.ts
            // And ensure books is an array
            return {
                ...parsed,
                books: Array.isArray(parsed.books) ? parsed.books : initialDB.books,
                categories: initialDB.categories
            };
        } catch (e) {
            console.error("Failed to parse mock DB", e);
        }
    }

    // Initialize with default data if nothing in storage
    const defaultDB = { ...initialDB, orders: [] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDB));
    return defaultDB;
};

export const saveMockDB = (db: MockDB) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("mock-db-update"));
};

export const addOrder = (order: any) => {
    const db = getMockDB();
    const newOrder = {
        ...order,
        id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        status: "pending"
    };
    db.orders = [newOrder, ...db.orders];
    saveMockDB(db);
    return newOrder;
};

export const updateBook = (book: Book) => {
    const db = getMockDB();
    db.books = db.books.map(b => b.id === book.id ? book : b);
    saveMockDB(db);
};

export const deleteBook = (id: string) => {
    const db = getMockDB();
    db.books = db.books.filter(b => b.id !== id);
    saveMockDB(db);
};

export const addBook = (book: Book) => {
    const db = getMockDB();
    db.books = [book, ...db.books];
    saveMockDB(db);
};
