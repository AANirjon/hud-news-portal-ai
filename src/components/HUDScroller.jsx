// src/components/HUDScroller.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useUIStore } from "../stores/uiStore";
import FeedCard from "./FeedCard";
import { fetchMixedBatch } from "../lib/fetchers";
import { saveBookmark, loadBookmarks } from "../lib/bookmarks";

export default function HUDScroller() {
  const containerRef = useRef(null);
  const [items, setItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const { playing, speed, currentIndex, setCurrentIndex } = useUIStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchMixedBatch({ limit: 14 });
      if (!mounted) return;
      setItems(data);
    })();
    return () => (mounted = false);
  }, []);

  // Auto-scroll logic: animate index changes using GSAP timeline for smooth transitions.
  useEffect(() => {
    if (!items.length) return;
    let timer = null;
    let start = performance.now();
    let durationSec = computeDwellSec(items[currentIndex]) / speed;

    function tick(now) {
      const elapsed = (now - start) / 1000;
      const p = Math.min(1, elapsed / durationSec);
      setProgress(p);
      if (p >= 1) {
        // advance
        const next = (currentIndex + 1) % items.length;
        setCurrentIndex(next);
        // animate translate Y to show next card
        gsap.to(containerRef.current, {
          y: -next * (window.innerHeight * 0.65),
          duration: 0.9,
          ease: "power2.out",
        });
        // reset progress math
        start = performance.now();
        durationSec = computeDwellSec(items[next]) / speed;
      }
      if (playing) {
        timer = requestAnimationFrame(tick);
      }
    }

    if (playing) timer = requestAnimationFrame(tick);
    return () => {
      if (timer) cancelAnimationFrame(timer);
    };
  }, [playing, speed, items, currentIndex, setCurrentIndex]);

  function computeDwellSec(item) {
    // Simple heuristic: base 6s + 0.12s per 10 words in body
    const words = (item.body || "").split(/\s+/).length;
    return Math.min(18, Math.max(6, 4 + (words * 0.12)));
  }

  function handleBookmark(it) {
    saveBookmark(it);
    // small visual cue can be added here
  }

  // When user hovers, pause
  function onMouseEnter() {
    // set playing false via store
    // direct import of hook to set playing would be used; but for clarity we can use window store
    // If you want keyboard pause, add key handlers here.
  }

  return (
    <div className="hud-root relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* HUD background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-10 w-64 h-64 rounded-full opacity-20 blur-3xl neon-glow-1"></div>
        <div className="absolute right-10 bottom-8 w-72 h-72 rounded-full opacity-18 blur-3xl neon-glow-2"></div>
      </div>

      {/* HUD content viewport */}
      <div className="relative z-10 w-full max-w-4xl h-[65vh] flex items-center justify-center">
        <div
          className="viewport overflow-hidden w-full h-full flex items-center justify-start relative"
          onMouseEnter={onMouseEnter}
        >
          <div
            ref={containerRef}
            className="cards-rail absolute left-1/2 transform -translate-x-1/2 will-change-transform"
            style={{ top: 0 }}
          >
            {items.map((it, idx) => (
              <div
                key={it.id}
                className="card-wrapper mb-8 flex items-center justify-center"
                style={{ height: "65vh", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <FeedCard item={it} onBookmark={handleBookmark} isHighlighted={idx === currentIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom HUD controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl">
        <div className="flex justify-between items-center px-4">
          <div className="w-1/3">
            <div className="progress h-1 rounded-full bg-white/10 w-full overflow-hidden">
              <div style={{ width: `${progress * 100}%` }} className="h-full bg-gradient-to-r from-neon-400 to-neon-600"></div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            {/* Controls will be placed here - lazy load to reduce initial footprint */}
            <div className="controls-wrap">
              {/* import Controls dynamically or place component */}
            </div>
          </div>
          <div className="w-1/3 flex justify-end text-sm text-gray-300">HUD • Live</div>
        </div>
      </div>
    </div>
  );
}
