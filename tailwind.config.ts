import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#D4AF37", // Metallic Gold
                    hover: "#B4941F",
                    foreground: "#000000",
                },
                secondary: {
                    DEFAULT: "#18181b", // Zinc 900 - True Neutral Dark
                    foreground: "#FAFAFA",
                },
                background: {
                    DEFAULT: "#050505", // Almost Pure Black - No Blue
                    paper: "#121212",   // Neutral Dark Grey
                },
                accent: {
                    DEFAULT: "#A1A1AA", // Zinc 400 - Neutral Silver
                },
                text: {
                    primary: "#FAFAFA", // Zinc 50
                    secondary: "#A1A1AA", // Zinc 400
                    muted: "#52525B",   // Zinc 600
                },
                border: "#27272A", // Zinc 800
            },
            fontFamily: {
                sans: ["var(--font-tajawal)", "sans-serif"],
                display: ["var(--font-amiri)", "serif"],
            },
            backgroundImage: {
                "papyrus-texture": "url('/images/papyrus-noise.png')",
            },
        },
    },
    plugins: [],
};
export default config;
