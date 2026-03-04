/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'rot-red': '#dc2626',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                bebas: ['var(--font-bebas)', 'sans-serif'],
                oswald: ['var(--font-oswald)', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
