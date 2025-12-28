import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#EAB308", // Logo Gold (Yellow-500)
                    hover: "#CA8A04",   // Yellow-600
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
                sans: ["var(--font-almarai)", "sans-serif"],
                display: ["var(--font-cairo)", "sans-serif"],
            },
            backgroundImage: {
                "papyrus-texture": "url('/images/papyrus-noise.png')",
            },
        },
    },
    plugins: [],
};
export default config;
