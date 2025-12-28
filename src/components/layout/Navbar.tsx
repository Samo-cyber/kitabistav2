"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Search, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Input } from "@/components/ui/Input";
import { Book } from "@/lib/data";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavbarProps {
    books?: Book[];
    isMenuOpen?: boolean;
    setIsMenuOpen?: (isOpen: boolean) => void;
}

export function Navbar({ books = [], isMenuOpen: propIsMenuOpen, setIsMenuOpen: propSetIsMenuOpen }: NavbarProps) {
    // Use props if available, otherwise fallback to local state (for backward compatibility/safety)
    const [localIsMenuOpen, setLocalIsMenuOpen] = useState(false);
    const isMenuOpen = propIsMenuOpen !== undefined ? propIsMenuOpen : localIsMenuOpen;
    const setIsMenuOpen = propSetIsMenuOpen || setLocalIsMenuOpen;

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // ... (keep existing scroll and search logic) ...

    // Hide Navbar on scroll down (Mobile only logic via CSS)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide if scrolling down and past 100px
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Close search and menu on route change
    const pathname = usePathname();
    useEffect(() => {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setSearchQuery("");
    }, [pathname, setIsMenuOpen]);

    // Helper to normalize Arabic text
    const normalizeArabic = (text: string) => {
        return text
            .replace(/[أإآ]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي');
    };

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const normalizedSearch = normalizeArabic(searchQuery.toLowerCase());
        const results = books.filter(book => {
            const normalizedTitle = normalizeArabic(book.title.toLowerCase());
            const normalizedAuthor = normalizeArabic(book.author.toLowerCase());
            return normalizedTitle.includes(normalizedSearch) || normalizedAuthor.includes(normalizedSearch);
        });
        setSearchResults(results.slice(0, 5)); // Limit to 5 results
    }, [searchQuery, books]);

    // Lock body scroll when menu or search is open
    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMenuOpen, isSearchOpen]);

    const isCheckout = pathname === '/checkout';

    return (
        <>
            <nav className={cn(
                "sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md",
                isCheckout && "hidden md:block" // Hide on mobile for checkout
            )}>
                <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6 gap-4">
                    {/* Logo (Right in RTL) */}
                    <Link href="/" className="flex items-center shrink-0 logo-container !transition-none" style={{ transition: 'none' }}>
                        <div className="relative h-8 md:h-10 w-24 md:w-32 !transition-none" style={{ transition: 'none' }}>
                            <Image
                                src="/images/logo.png"
                                alt="كتابيستا"
                                fill
                                className="object-contain !transition-none"
                                style={{ transition: 'none' }}
                                priority
                                loading="eager"
                            />
                        </div>
                    </Link>

                    {/* Mobile Search Bar (Center) */}
                    <div className="flex-1 md:hidden relative max-w-[280px] mx-auto">
                        <input
                            type="text"
                            placeholder="بحث..."
                            className="w-full h-9 bg-zinc-900/50 border border-white/10 rounded-full px-4 pl-10 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => {
                                if (searchQuery.trim()) {
                                    // Logic to ensure results are shown if query exists
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const query = e.currentTarget.value;
                                    if (query.trim()) {
                                        window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                                    }
                                }
                            }}
                        />
                        <button
                            className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7 bg-primary/10 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                            onClick={() => {
                                if (searchQuery.trim()) {
                                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                                }
                            }}
                        >
                            <Search className="h-3.5 w-3.5" />
                        </button>

                        {/* Live Search Results Dropdown */}
                        <AnimatePresence>
                            {searchQuery.trim() && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
                                >
                                    {searchResults.length > 0 ? (
                                        <>
                                            {searchResults.map((book) => (
                                                <Link
                                                    key={book.id}
                                                    href={`/product/${book.id}`}
                                                    onClick={() => setSearchQuery("")} // Close on click
                                                    className="flex items-center gap-3 p-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors"
                                                >
                                                    <div className="relative w-10 h-14 rounded overflow-hidden flex-shrink-0 bg-zinc-800">
                                                        <Image src={book.image_url} alt={book.title} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <h4 className="font-bold text-sm text-zinc-200 truncate">{book.title}</h4>
                                                        <p className="text-xs text-zinc-500 truncate">{book.author}</p>
                                                    </div>
                                                    <div className="text-primary font-bold text-xs whitespace-nowrap">
                                                        {book.discount_price || book.price} ج.م
                                                    </div>
                                                </Link>
                                            ))}
                                            <Link
                                                href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                                                className="block p-3 text-center text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                                            >
                                                عرض كل النتائج ({searchResults.length}+)
                                            </Link>
                                        </>
                                    ) : (
                                        <div className="p-4 text-center text-zinc-500 text-sm">
                                            لا توجد نتائج مطابقة
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Button (Left in RTL) */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden text-zinc-400 hover:text-white p-0 h-auto"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="/">الرئيسية</NavLink>
                        <NavLink href="/shop">المكتبة</NavLink>
                        <NavLink href="/offers">العروض</NavLink>
                        <NavLink href="/about">عن كتابيستا</NavLink>
                        <NavLink href="/contact">اتصل بنا</NavLink>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary/10 hover:text-primary"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="relative hover:bg-primary/10 hover:text-primary"
                            onClick={useCart().openCart}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white animate-pulse">
                                    {itemCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Slide-out (Redesigned) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-zinc-950 border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex justify-between items-center p-6 border-b border-white/5">
                                    <div className="relative h-8 w-24">
                                        <Image
                                            src="/images/logo.png"
                                            alt="كتابيستا"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)} className="hover:bg-white/5 rounded-full p-2">
                                        <X className="w-6 h-6 text-zinc-400" />
                                    </Button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 space-y-8">
                                    {/* Search in Menu */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="ابحث عن كتاب..."
                                            className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 px-4 pl-10 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                            onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                                            readOnly
                                        />
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    </div>

                                    {/* Section 1: Discover */}
                                    <div>
                                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">اكتشف</h3>
                                        <div className="space-y-1">
                                            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)} icon={<Menu className="w-5 h-5" />}>الرئيسية</MobileNavLink>
                                            <MobileNavLink href="/shop" onClick={() => setIsMenuOpen(false)} icon={<Search className="w-5 h-5" />}>المكتبة</MobileNavLink>
                                            <MobileNavLink href="/offers" onClick={() => setIsMenuOpen(false)} icon={<ShoppingCart className="w-5 h-5" />}>العروض</MobileNavLink>
                                        </div>
                                    </div>

                                    {/* Section 2: Support */}
                                    <div>
                                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">مساعدة</h3>
                                        <div className="space-y-1">
                                            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>عن كتابيستا</MobileNavLink>
                                            <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>اتصل بنا</MobileNavLink>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-white/5 bg-zinc-900/50">
                                    <p className="text-xs text-center text-zinc-500">
                                        © {new Date().getFullYear()} كتابيستا. جميع الحقوق محفوظة.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-start justify-center pt-32 px-4"
                    >
                        <div className="w-full max-w-2xl relative">
                            <Button
                                variant="ghost"
                                className="absolute -top-16 right-0 text-gray-400 hover:text-white"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                <X className="w-8 h-8" />
                            </Button>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-3xl font-display font-bold text-center mb-8 text-white">عن ماذا تبحث؟</h2>
                                <div className="relative">
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="اكتب اسم الكتاب أو المؤلف..."
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pr-14 pl-6 text-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                const query = e.currentTarget.value;
                                                if (query.trim()) {
                                                    setIsSearchOpen(false);
                                                    window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="mt-8">
                                    {searchQuery ? (
                                        <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                            {searchResults.length > 0 ? (
                                                searchResults.map((book) => (
                                                    <Link
                                                        key={book.id}
                                                        href={`/product/${book.id}`}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all group"
                                                    >
                                                        <div className="relative w-12 h-16 rounded-md overflow-hidden flex-shrink-0">
                                                            <Image src={book.image_url} alt={book.title} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors">{book.title}</h4>
                                                            <p className="text-sm text-gray-400">{book.author}</p>
                                                        </div>
                                                        <div className="text-primary font-bold text-sm">
                                                            {book.discount_price || book.price} ج.م
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="text-center py-8 text-gray-400">
                                                    لا توجد نتائج مطابقة
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-500 mb-4">الأكثر بحثاً:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {["نجيب محفوظ", "روايات رعب", "كتب تاريخية", "أحمد خالد توفيق", "تنمية بشرية"].map((tag) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => {
                                                            setSearchQuery(tag);
                                                            // Trigger search logic immediately for tags
                                                        }}
                                                        className="px-4 py-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-sm text-gray-300"
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
        >
            {children}
            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

function MobileNavLink({ href, onClick, children, icon }: { href: string; onClick: () => void; children: React.ReactNode; icon?: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-300 hover:text-white transition-all group border border-transparent hover:border-white/5"
        >
            <div className="flex items-center gap-3">
                {icon && <span className="text-zinc-500 group-hover:text-primary transition-colors">{icon}</span>}
                <span className="font-medium text-base">{children}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-primary group-hover:translate-x-[-4px] transition-all" />
        </Link>
    );
}
