import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Bookmarks = () => {
  const listRef = useRef(null);
  const { user, token, loading } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  // ---------------- Fetch bookmarks from backend ----------------
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !token) return;

      try {
        const response = await axios.get("https://news-portal-server-seven-bice.vercel.app/bookmarks", {
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

  // ---------------- GSAP animation ----------------
  useEffect(() => {
    if (listRef.current && listRef.current.children.length > 0) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 1 }
      );
    }
  }, [bookmarks]);

  // ---------------- Remove bookmark ----------------
  const handleRemove = async (bm) => {

    try {
      await axios.delete(`https://news-portal-server-seven-bice.vercel.app/bookmarks/${bm._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { email: user.email, id: bm.id },
      });

      setBookmarks((prev) => prev.filter((b) => b.id !== bm.id));
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-green-400">
        Loading Bookmarks...
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] text-[var(--hud-text)]">
      <h2 className="text-3xl font-bold mb-8 text-[var(--hud-primary)]">
        Saved Bookmarks
      </h2>

      <div ref={listRef} className="space-y-6">
        {bookmarks.length === 0 ? (
          <p className="text-gray-400">No bookmarks saved yet.</p>
        ) : (
          bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-4 border border-[var(--hud-border)] rounded-xl bg-black bg-opacity-50 backdrop-blur-sm flex justify-between items-center hover:translate-x-2 transition-transform"
            >
              <h3 className="text-lg">{bm.title}</h3>
              <button
                onClick={() => handleRemove(bm)}
                className="text-[var(--hud-primary)] hover:scale-110 transition-transform"
              >
                <FaBookmark />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
