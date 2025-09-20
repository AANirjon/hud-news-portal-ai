// Bookmarks.js
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Bookmarks = () => {
  const listRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.2, duration: 1 }
    );
  }, []);

  const mockBookmarks = [
    { id: 1, title: "AI News: OpenAI New Features" },
    { id: 2, title: "Subreddit: r/Futurology Top Post" },
  ];

  return (
    <div className="min-h-[70vh] text-[var(--hud-primary)]">
      <h2 className="text-3xl font-bold mb-8 text-green-400">Saved Bookmarks</h2>
      <div ref={listRef} className="space-y-6">
        {mockBookmarks.map((bm) => (
          <div
            key={bm.id}
            className="p-4 border border-green-400 rounded-xl bg-black bg-opacity-50 backdrop-blur-sm hover:translate-x-2 transition-transform"
          >
            <h3 className="text-lg">{bm.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
