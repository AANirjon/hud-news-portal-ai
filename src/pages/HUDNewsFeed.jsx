import { useEffect, useRef, useContext, useState } from "react";
import gsap from "gsap";
import { ScrollSpeedContext } from "./ScrollSpeedContext";
import { BookmarkContext } from "./BookmarkContext";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../AuthContext";
import HUD3DAniLod from "../components/HUD3DAinLod";
import { usePreferences } from "../PreferencesContext";

const HUDNewsFeed = () => {
  const feedRef = useRef(null);
  const scrollTl = useRef(null);

  const { scrollSpeed } = useContext(ScrollSpeedContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user, token, loading: authLoading } = useAuth();
  const { version } = usePreferences(); // triggers reload when preferences change

  const [newsFeed, setNewsFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- Fetch news ----------------
  useEffect(() => {
    const fetchNews = async () => {
      if (!user || !token) return;
      setLoading(true);

      try {
        const response = await axios.get("https://news-portal-server-seven-bice.vercel.app/news", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: user.email },
        });

        const formatted = response.data.map((item, index) => ({
          id: item._id || index,
          title: item.title || "No Title",
          tags: item.tags,
          ...item,
        }));

        setNewsFeed(formatted);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [user, token, version]); // reload when preferences change

  // ---------------- GSAP auto-scroll ----------------
  useEffect(() => {
    const feed = feedRef.current;
    if (!feed || newsFeed.length === 0) return;

    // Always kill previous timeline
    scrollTl.current?.kill();

    // Duration based on scrollSpeed
    const baseDuration = 4550;
    const duration = baseDuration / scrollSpeed;

    scrollTl.current = gsap.to(feed, {
      y: "-50%",
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    const pauseScroll = () => scrollTl.current.pause();
    const resumeScroll = () => scrollTl.current.resume();

    feed.addEventListener("mouseenter", pauseScroll);
    feed.addEventListener("mouseleave", resumeScroll);

    return () => {
      scrollTl.current?.kill();
      feed.removeEventListener("mouseenter", pauseScroll);
      feed.removeEventListener("mouseleave", resumeScroll);
    };
  }, [newsFeed, scrollSpeed]);

  if (authLoading || loading) return <HUD3DAniLod />;

  if (newsFeed.length === 0)
    return (
      <div className="text-center text-[var(--hud-text)] mt-10">
        <h2 className="text-xl font-bold text-[var(--hud-primary)]">
          No news found for your preferences
        </h2>
      </div>
    );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-[var(--hud-primary)] underline">
        Live News Feed
      </h2>
      <div className="relative h-[70vh] overflow-hidden text-[var(--hud-text)]">
        <div ref={feedRef} className="flex flex-col space-y-6 absolute w-full">
          {[...newsFeed, ...newsFeed].map((news, index) => {
            const isBookmarked = bookmarks.some((b) => b.id === news.id);
            const handleBookmark = () => toggleBookmark(news);

            return (
              <div
                key={`${news.id}-${index}`}
                className="p-4 border-2 border-cyan-400 rounded-xl backdrop-blur-md transition-transform hover:shadow-[0_0_20px_var(--hud-primary)] flex justify-between items-center"
              >
                <div className="flex flex-col justify-start">
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <h3 className="text-xl font-semibold cursor-pointer hover:underline">
                      {news.title}
                    </h3>
                  </a>
                  <h3 className="text-sm font-semibold mt-1 uppercase">
                    Source: {news.source} || Tags: {news.tags?.join(", ") || "N/A"}
                  </h3>
                </div>

                <button onClick={handleBookmark}>
                  <span className="text-2xl text-[var(--hud-primary)] hover:scale-110 transition-transform inline-block flex justify-center cursor-pointer">
                    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HUDNewsFeed;
