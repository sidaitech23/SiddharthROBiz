/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        "primary-dark": "#0284c7",
        accent: "#06b6d4",
        success: "#10b981",
        "bg-light": "#f0f9ff",
        "text-dark": "#0f172a",
        "text-muted": "#64748b",
        "card-bg": "#ffffff",
        border: "#e0f2fe",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
