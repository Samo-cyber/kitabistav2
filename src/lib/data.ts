export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    price: number;
    discount_price: number | null;
    stock: number;
    image_url: string;
    description: string;
    is_active: boolean;
}

export interface Category {
    id: string;
    name: string;
}

export interface Bundle {
    id: string;
    title: string;
    book_ids: string[];
    original_price: number;
    bundle_price: number;
}

const DB = {
    categories: [
        { id: "novels", name: "روايات" },
        { id: "horror", name: "رعب وتشويق" },
        { id: "self", name: "تنمية ووعي" },
        { id: "religious", name: "ديني وروحاني" },
    ],
    books: [
        {
            id: "bk001",
            title: "أرض زيكولا",
            author: "عمرو عبد الحميد",
            category: "novels",
            price: 65,
            discount_price: 55,
            stock: 120,
            image_url: "/images/ard-zikola.jpg",
            description: "رواية خيالية اجتماعية شهيرة.",
            is_active: true,
        },
        {
            id: "bk002",
            title: "أماريتا",
            author: "عمرو عبد الحميد",
            category: "novels",
            price: 70,
            discount_price: null,
            stock: 90,
            image_url: "/images/amareta.jpg",
            description: "الجزء الثاني من أرض زيكولا.",
            is_active: true,
        },
        {
            id: "bk003",
            title: "انتخريستوس",
            author: "أحمد خالد مصطفى",
            category: "horror",
            price: 75,
            discount_price: 60,
            stock: 150,
            image_url: "/images/antichristos.jpg",
            description: "رواية رعب وتشويق فلسفي.",
            is_active: true,
        },
        {
            id: "bk004",
            title: "خوف",
            author: "أسامة المسلم",
            category: "horror",
            price: 70,
            discount_price: null,
            stock: 110,
            image_url: "/images/khof.jpg",
            description: "سلسلة رعب نفسية مشهورة.",
            is_active: true,
        },
        {
            id: "bk005",
            title: "لوكاندة بير الوطاويط",
            author: "أحمد خالد توفيق",
            category: "horror",
            price: 60,
            discount_price: 50,
            stock: 80,
            image_url: "/images/locanda.jpg",
            description: "قصص رعب قصيرة.",
            is_active: true,
        },
        {
            id: "bk006",
            title: "العادات الذرية",
            author: "جيمس كلير",
            category: "self",
            price: 80,
            discount_price: 65,
            stock: 200,
            image_url: "/images/atomic-habits.jpg",
            description: "كتاب عالمي في بناء العادات.",
            is_active: true,
        },
        {
            id: "bk007",
            title: "نظرية الفستق",
            author: "فهد عامر الأحمدي",
            category: "self",
            price: 75,
            discount_price: null,
            stock: 130,
            image_url: "/images/fostok.jpg",
            description: "مقالات في تطوير التفكير.",
            is_active: true,
        },
        {
            id: "bk008",
            title: "كيف تكسب الأصدقاء",
            author: "ديل كارنيجي",
            category: "self",
            price: 70,
            discount_price: 55,
            stock: 170,
            image_url: "/images/win-friends.jpg",
            description: "كتاب كلاسيكي في العلاقات.",
            is_active: true,
        },
        {
            id: "bk009",
            title: "فاتتني صلاة",
            author: "إسلام جمال",
            category: "religious",
            price: 60,
            discount_price: 50,
            stock: 140,
            image_url: "/images/fatetni-salah.jpg",
            description: "كتاب تحفيزي للالتزام بالصلاة.",
            is_active: true,
        },
        {
            id: "bk010",
            title: "رسائل من القرآن",
            author: "أدهم شرقاوي",
            category: "religious",
            price: 65,
            discount_price: null,
            stock: 100,
            image_url: "/images/quran-messages.jpg",
            description: "تأملات إيمانية معاصرة.",
            is_active: true,
        },
        {
            id: "bk011",
            title: "مع النبي",
            author: "أدهم شرقاوي",
            category: "religious",
            price: 70,
            discount_price: 58,
            stock: 95,
            image_url: "/images/with-prophet.jpg",
            description: "مواقف إنسانية من السيرة.",
            is_active: true,
        },
    ],
    bundles: [
        {
            id: "bundle001",
            title: "باكدج الروايات الأكثر مبيعًا",
            book_ids: ["bk001", "bk002", "bk003"],
            original_price: 210,
            bundle_price: 170,
        },
        {
            id: "bundle002",
            title: "باكدج تطوير الذات",
            book_ids: ["bk006", "bk007", "bk008"],
            original_price: 225,
            bundle_price: 180,
        },
    ],
};

export async function getBooks() {
    return DB.books;
}

export async function getBookById(id: string) {
    return DB.books.find((b) => b.id === id);
}

export async function getCategories() {
    return DB.categories;
}

export async function getBundles() {
    return DB.bundles;
}
