/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        primary: "#2563eb",
        primarydull: "#1f58d8",
        light: "#f1f5f9",
        bordercolor: "#c4c7d2",
      },
    },
  },
  plugins: [],
};
