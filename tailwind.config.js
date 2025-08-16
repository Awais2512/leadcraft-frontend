/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#14a800", // Upwork green
          dark: "#0E7A00",
          light: "#E9F6E8",
        },
        ink: {
          900: "#111827",
          700: "#374151",
          500: "#6B7280",
          300: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
