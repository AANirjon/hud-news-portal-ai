// src/pages/ThemeContext.js
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("hudGreen"); // default theme

  useEffect(() => {
    document.documentElement.classList.remove("theme-cyberBlue", "theme-neonPurple");
    if (theme === "cyberBlue") document.documentElement.classList.add("theme-cyberBlue");
    if (theme === "neonPurple") document.documentElement.classList.add("theme-neonPurple");
    // HUD Green is default (no extra class)
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
