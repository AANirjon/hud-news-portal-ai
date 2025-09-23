import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export const ScrollSpeedContext = createContext();

export const ScrollSpeedProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [scrollSpeed, setScrollSpeed] = useState(15);

  // Fetch from backend when user logs in
  useEffect(() => {
    if (!user || !token) return;

    const fetchSpeed = async () => {
      try {
        const res = await axios.get(`https://news-portal-server-seven-bice.vercel.app/settings/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: user.email },
        });
        setScrollSpeed(res.data.scrollSpeed);
        console.log(res.data.scrollSpeed)
      } catch (err) {
        console.error("Failed to fetch scroll speed:", err);
      }
    };
    fetchSpeed();
  }, [user, token]);

  // Update backend whenever scrollSpeed changes
  const updateScrollSpeed = async (value) => {
    setScrollSpeed(value);
    if (!user || !token) return;
    try {
      await axios.post(
        "https://news-portal-server-seven-bice.vercel.app/settings",
        { email: user.email, scrollSpeed: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to update scroll speed:", err);
    }
  };

  return (
    <ScrollSpeedContext.Provider value={{ scrollSpeed, setScrollSpeed: updateScrollSpeed }}>
      {children}
    </ScrollSpeedContext.Provider>
  );
};
