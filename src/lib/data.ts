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

const DB = {
    categories: [
        { id: "novels", name: "روايات وأدب" },
        { id: "horror", name: "رعب وفانتازيا" },
        { id: "self", name: "تنمية وعلم نفس" },
        { id: "religious", name: "ديني وروحاني" },
        { id: "history", name: "تاريخ وفلسفة" },
    ],
    books: [
        // --- الروايات الأكثر مبيعاً ---
        {
            id: "bk001",
            title: "بين القصرين",
            author: "نجيب محفوظ",
            category: "novels",
            price: 120,
            discount_price: 100,
            stock: 50,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1423403217l/12713709.jpg",
            description: "الجزء الأول من الثلاثية، يصور حياة أسرة السيد أحمد عبد الجواد وصراعات الأجيال في ظل الاحتلال الإنجليزي وثورة 1919.",
            is_active: true,
        },
        {
            id: "bk002",
            title: "الفيل الأزرق",
            author: "أحمد مراد",
            category: "novels",
            price: 95,
            discount_price: 85,
            stock: 100,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1351253457l/16104433.jpg",
            description: "بعد خمس سنوات من العزلة، يعود د. يحيى للعمل في مستشفى العباسية ليجد نفسه أمام صديق قديم متهم بجريمة قتل بشعة يدفعه للنبش في أسرار الماضي.",
            is_active: true,
        },
        {
            id: "bk003",
            title: "أرض زيكولا",
            author: "عمرو عبد الحميد",
            category: "novels",
            price: 75,
            discount_price: 65,
            stock: 200,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1373511675l/18167352.jpg",
            description: "خالد يجد نفسه في أرض تتعامل بوحدات الذكاء بدلاً من المال، ومن ينفد ذكاؤه يواجه مصيراً مرعباً في يوم الزيكولا السنوي.",
            is_active: true,
        },
        {
            id: "bk004",
            title: "يوتوبيا",
            author: "أحمد خالد توفيق",
            category: "novels",
            price: 60,
            discount_price: 50,
            stock: 150,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1314986348l/6146034.jpg",
            description: "رواية ديستوبية عن مصر عام 2023، حيث يعيش الأغنياء في مدينة محصنة ويمارسون صيد الفقراء كنوع من التسلية.",
            is_active: true,
        },
        {
            id: "bk005",
            title: "ذاكرة الجسد",
            author: "أحلام مستغانمي",
            category: "novels",
            price: 100,
            discount_price: null,
            stock: 80,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1283844626l/2442475.jpg",
            description: "قصة حب شاعرية بين رسام فقد ذراعه في الثورة الجزائرية وابنة قائده، تعكس أوجاع الوطن والذاكرة.",
            is_active: true,
        },

        // --- الرعب والإثارة ---
        {
            id: "bk006",
            title: "انتخريستوس",
            author: "أحمد خالد مصطفى",
            category: "horror",
            price: 90,
            discount_price: 80,
            stock: 300,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429119561l/25360980.jpg",
            description: "رواية تدمج التاريخ بالخيال لتكشف أسرار الماسونية وشياطين بابل في رحلة عبر دهاليز مظلمة لم يطأها إنسان.",
            is_active: true,
        },
        {
            id: "bk007",
            title: "خوف",
            author: "أسامة المسلم",
            category: "horror",
            price: 85,
            discount_price: 75,
            stock: 130,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1428526558l/25324536.jpg",
            description: "شاب فضولي يفتح كتاباً يقلب حياته رأساً على عقب، ليجد نفسه في مواجهة مباشرة مع عالم الجن والسحر.",
            is_active: true,
        },
        {
            id: "bk008",
            title: "بساتين عربستان",
            author: "أسامة المسلم",
            category: "horror",
            price: 95,
            discount_price: null,
            stock: 150,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1444155104l/27014605.jpg",
            description: "ملحمة فانتازيا عربية تبدأ بصراع مرير بين ساحرات من زمن قديم يسعين للانتقام وبسط النفوذ.",
            is_active: true,
        },

        // --- تطوير الذات ---
        {
            id: "bk009",
            title: "العادات الذرية",
            author: "جيمس كلير",
            category: "self",
            price: 95,
            discount_price: 85,
            stock: 400,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1647466824l/60619049.jpg",
            description: "يقدم الكتاب استراتيجيات عملية لبناء عادات جيدة والتخلص من السيئة، بالاعتماد على قوة التغيير البسيط المستمر.",
            is_active: true,
        },
        {
            id: "bk010",
            title: "فن اللامبالاة",
            author: "مارك مانسون",
            category: "self",
            price: 80,
            discount_price: 70,
            stock: 350,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1523788734l/39832731.jpg",
            description: "كتاب يدعو للتصالح مع الحقائق الصعبة واختيار ما يستحق اهتمامنا فعلاً بدلاً من السعي وراء الإيجابية المزيفة.",
            is_active: true,
        },
        {
            id: "bk011",
            title: "نظرية الفستق",
            author: "فهد عامر الأحمدي",
            category: "self",
            price: 75,
            discount_price: 65,
            stock: 250,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1489063618l/34419263._SY475_.jpg",
            description: "مجموعة مقالات تهدف لتغيير طرق التفكير التقليدية وفتح آفاق جديدة للنجاح وتطوير الذات.",
            is_active: true,
        },

        // --- كتب دينية ---
        {
            id: "bk012",
            title: "فاتتني صلاة",
            author: "إسلام جمال",
            category: "religious",
            price: 70,
            discount_price: 60,
            stock: 180,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586550785l/52771801.jpg",
            description: "يخاطب الكتاب أولئك الذين يحبون الصلاة ولكن يجدون صعوبة في الالتزام بها، بأسلوب نفسي وإيماني مبسط.",
            is_active: true,
        },
        {
            id: "bk013",
            title: "لأنك الله",
            author: "علي جابر الفيفي",
            category: "religious",
            price: 65,
            discount_price: 55,
            stock: 200,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1471374526l/31448889.jpg",
            description: "رحلة روحية في رحاب أسماء الله الحسنى، تهدف لتعميق الصلة بالله واللجوء إليه في السراء والضراء.",
            is_active: true,
        },

        // --- التاريخ والفلسفة ---
        {
            id: "bk014",
            title: "مقدمة ابن خلدون",
            author: "ابن خلدون",
            category: "history",
            price: 250,
            discount_price: 210,
            stock: 30,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1381310618l/13596001.jpg",
            description: "الكتاب التأسيسي لعلم الاجتماع، يحلل التاريخ البشري ونشأة الحضارات وسقوط الدول بعبقرية سبقت زمانها.",
            is_active: true,
        },
        {
            id: "bk015",
            title: "عالم صوفي",
            author: "جوستاين غاردر",
            category: "history",
            price: 130,
            discount_price: 110,
            stock: 50,
            image_url: "https://wsrv.nl/?url=https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1454580214l/12711776.jpg",
            description: "رواية حول تاريخ الفلسفة، تأخذك في رحلة مشوقة من اليونان القديمة حتى العصر الحديث عبر رسائل غامضة.",
            is_active: true,
        },
        // ... يمكنك تكرار هذا النمط بوضع بادئة "https://wsrv.nl/?url=" قبل أي رابط صورة
    ]
};

export async function getBooks() { return DB.books; }
export async function getBookById(id: string) { return DB.books.find((b) => b.id === id); }