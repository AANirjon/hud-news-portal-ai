
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Set default theme to cyberBlue
  const [theme, setTheme] = useState("cyberBlue");

  useEffect(() => {
    // Remove all other theme classes first
    document.documentElement.classList.remove("theme-neonPurple", "theme-hudGreen");
    
    // Apply selected theme
    if (theme === "cyberBlue") document.documentElement.classList.add("theme-cyberBlue");
    if (theme === "neonPurple") document.documentElement.classList.add("theme-neonPurple");
    if (theme === "hudGreen") document.documentElement.classList.add("theme-hudGreen");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
