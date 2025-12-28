/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "i.gr-assets.com" },
            { protocol: "https", hostname: "m.media-amazon.com" },
            { protocol: "https", hostname: "upload.wikimedia.org" },
            { protocol: "https", hostname: "**" },
        ],
    },
};

export default nextConfig;
