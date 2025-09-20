// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hudGreen: {
          DEFAULT: "#39ff14", // Neon green
          dark: "#00ff99",
        },
        cyberBlue: {
          DEFAULT: "#00d2ff", // Cyan-blue glow
          dark: "#0077b6",
        },
        neonPurple: {
          DEFAULT: "#7800ff", // Purple glow
          dark: "#4b0082",
        },
      },
    },
  },
  plugins: [],
};
