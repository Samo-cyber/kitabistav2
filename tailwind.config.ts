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
                    DEFAULT: "var(--primary)",
                    hover: "var(--primary-hover)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                background: {
                    DEFAULT: "var(--background)",
                    paper: "var(--background-paper)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                },
                text: {
                    primary: "var(--text-primary)",
                    secondary: "var(--text-secondary)",
                    muted: "var(--text-muted)",
                },
                border: "var(--border)",
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
