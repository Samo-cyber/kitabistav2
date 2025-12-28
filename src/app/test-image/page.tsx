import Image from "next/image";

export default function TestImagePage() {
    const urls = [
        "https://upload.wikimedia.org/wikipedia/ar/5/52/%D8%BA%D9%84%D8%A7%D9%81_%D8%B1%D9%88%D8%A7%D9%8A%D8%A9_%D8%A8%D9%8A%D9%86_%D8%A7%D9%84%D9%82%D8%B5%D8%B1%D9%8A%D9%84%D9%86.JPG",
        "https://m.media-amazon.com/images/I/81eGzB85LNL._AC_UF1000,1000_QL80_.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Muqaddimah.jpg/440px-Muqaddimah.jpg"
    ];

    return (
        <div className="p-10 space-y-10 bg-white text-black">
            <h1 className="text-2xl font-bold">Image Loading Test</h1>
            {urls.map((url, i) => (
                <div key={i} className="border p-4 rounded">
                    <p className="mb-2 font-mono text-xs break-all">{url}</p>
                    <div className="flex gap-10">
                        <div>
                            <h3 className="font-bold mb-2">Standard &lt;img&gt;</h3>
                            <div className="relative w-[200px] h-[300px]">
                                <Image src={url} alt="Standard" fill className="object-contain" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Next.js &lt;Image&gt;</h3>
                            <Image src={url} alt="Next" width={200} height={300} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
