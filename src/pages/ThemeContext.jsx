import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [theme, setTheme] = useState("cyberBlue"); // default theme

  // Fetch theme from backend when user loads
  useEffect(() => {
    const fetchTheme = async () => {
      if (!user || !token) return;

      try {
        const response = await axios.get(
          `https://news-portal-server-seven-bice.vercel.app/settings/${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: user.email },
          }
        );
        if (response.data?.theme) setTheme(response.data.theme);
      } catch (err) {
        console.error("Failed to fetch theme:", err);
      }
    };

    fetchTheme();
  }, [user, token]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove(
      "theme-neonPurple",
      "theme-hudGreen",
      "theme-cyberBlue"
    );

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
