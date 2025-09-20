import { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { ScrollSpeedContext } from "./ScrollSpeedContext";
import { ThemeContext } from "./ThemeContext";

const HUDNewsFeed = () => {
  const feedRef = useRef(null);
  const scrollTl = useRef(null);
  const { theme } = useContext(ThemeContext);
  const { scrollSpeed } = useContext(ScrollSpeedContext);
  const speed = 200 / scrollSpeed;


  const mockNews = [
    { id: 1, title: "HackerNews: New AI Model Released" },
    { id: 2, title: "Reddit: Futuristic UI Trends Discussion" },
    { id: 3, title: "X: RundownAI Newsletter Highlights" },
    { id: 4, title: "Subreddit: r/MachineLearning Top Post" },
    { id: 5, title: "AI News: Breakthrough in AGI Research" },
  ];

  useEffect(() => {
    const feed = feedRef.current;
    const cloned = feed.innerHTML;
    feed.innerHTML += cloned;

    // create scroll animation
    scrollTl.current = gsap.to(feed, {
      y: "-50%",
      duration: speed, // dynamic duration
      ease: "none",
      repeat: -1,
    });

    // pause/resume on hover
    feed.addEventListener("mouseenter", () => scrollTl.current.pause());
    feed.addEventListener("mouseleave", () => scrollTl.current.resume());

    return () => {
      scrollTl.current.kill();
    };
  }, [speed]); // re-run when speed changes

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-[var(--hud-primary)] underline">Live News Feed</h2>
      </div>
      <div className="relative h-[70vh] overflow-hidden text-[var(--hud-text)] ">
        <div ref={feedRef} className="flex flex-col space-y-6 absolute w-full">
          {mockNews.map((news) => (
            <div
              key={news.id}
              className="p-4 border border-[var(--hud-border)] rounded-xl bg-black bg-opacity-40 backdrop-blur-md hover:scale-105 transition-transform hover:shadow-[0_0_20px_var(--hud-primary)]"
            >
              <h3 className="text-xl font-semibold">{news.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HUDNewsFeed;
