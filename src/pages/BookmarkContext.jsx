import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const { user, token } = useAuth();

  // ---------------- Fetch bookmarks from backend ----------------
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !token) return;

      try {
        const response = await axios.get("http://localhost:5000/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: user.email },
        });

        setBookmarks(response.data || []);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [user, token]);

  // ---------------- Toggle bookmark (add/remove) ----------------
  const toggleBookmark = async (item) => {
    if (!user || !token) return;

    const exists = bookmarks.find((b) => b.id === item.id);

    if (exists) {
      // Remove from backend
      try {
        await axios.delete("http://localhost:5000/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
          data: { email: user.email, id: item.id }, // send in body
        });

        setBookmarks((prev) => prev.filter((b) => b.id !== item.id));
      } catch (err) {
        console.error("Failed to remove bookmark:", err);
      }
    } else {
      // Add to backend
      try {
        const response = await axios.post(
          "http://localhost:5000/bookmarks",
          { ...item, email: user.email },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setBookmarks((prev) => [...prev, response.data]);
      } catch (err) {
        console.error("Failed to add bookmark:", err);
      }
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
