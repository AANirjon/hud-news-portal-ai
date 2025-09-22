import { useEffect, useRef, useContext, useState } from "react";
import gsap from "gsap";
import { ScrollSpeedContext } from "./ScrollSpeedContext";
import { BookmarkContext } from "./BookmarkContext";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../AuthContext";
// import HUD3DLoader from "../components/HUD3DLoader";
import HUD3DAniLod from "../components/HUD3DAinLod";

const HUDNewsFeed = () => {
  const feedRef = useRef(null);
  const scrollTl = useRef(null);

  const { scrollSpeed } = useContext(ScrollSpeedContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);
  const { user, token, loading } = useAuth();

  const [newsFeed, setNewsFeed] = useState([]);

  const speed = 800 / scrollSpeed;

  // ---------------- Fetch news from backend ----------------
  useEffect(() => {
    const fetchNews = async () => {
      if (!user || !token) return;

      try {
        const response = await axios.get("https://news-portal-server-seven-bice.vercel.app/news", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: user.email },
        });

        const formatted = response.data.map((item, index) => ({
          id: item._id || index,
          title: item.title || "No Title",
          ...item,
        }));

        setNewsFeed(formatted);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, [user, token]);

  // ---------------- GSAP auto-scroll ----------------
  useEffect(() => {
    const feed = feedRef.current;
    if (!feed || newsFeed.length === 0) return;

    // GSAP infinite scroll animation
    scrollTl.current = gsap.to(feed, {
      y: "-50%",
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    feed.addEventListener("mouseenter", () => scrollTl.current.pause());
    feed.addEventListener("mouseleave", () => scrollTl.current.resume());

    return () => scrollTl.current?.kill();
  }, [newsFeed]);

  useEffect(() => {
    if (scrollTl.current) {
      scrollTl.current.duration(speed);
    }
  }, [speed]);

  if (loading) {
    return (
      <div>
        <HUD3DAniLod></HUD3DAniLod>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-[var(--hud-primary)] underline">
        Live News Feed
      </h2>
      <div className="relative h-[70vh] overflow-hidden text-[var(--hud-text)]">
        {/* Render newsFeed twice for seamless scroll*/}
        <div ref={feedRef} className="flex flex-col space-y-6 absolute w-full">
          {[...newsFeed, ...newsFeed].map((news, index) => {
            const isBookmarked = bookmarks.some((b) => b.id === news.id);

            const handleBookmark = () => {
              console.log("Bookmark clicked:", news);
              toggleBookmark(news);
            };
            let url = news.url;

            return (
              <div
                key={`${news.id}-${index}`}
                className="p-4 border border-cyan-400 rounded-xl backdrop-blur-md transition-transform hover:shadow-[0_0_20px_var(--hud-primary)] flex justify-between items-start"
              >
                {/* Left section */}
                <div className="flex flex-col justify-start">
                  <a href={url} target="_blank">
                  <h3 className="text-xl font-semibold cursor-pointer hover:underline">{news.title}</h3>
                  </a>                
                  <h3 className="text-sm font-semibold mt-1 uppercase">
                    Source: {news.source}  ||  Type: {news.tags[0]}
                  </h3>
                </div>

                {/* Right section: bookmark button */}
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
