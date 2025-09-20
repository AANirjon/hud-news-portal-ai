// Home.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import HUDNewsFeed from "./HUDNewsFeed";

const Home = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Intro fade-in
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    // Title flicker + scale
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out",
      },
      "-=0.5"
    );

    // Subtitle typing effect
    tl.fromTo(
      subtitleRef.current,
      { width: "0ch" },
      { width: "60ch", duration: 3.5, ease: "steps(40)" },
      "-=0.5"
    );

    // Neon pulse loop
    gsap.to(glowRef.current, {
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });

    // Background grid floating
    gsap.to(gridRef.current, {
      backgroundPosition: "200% 200%",
      repeat: -1,
      duration: 30,
      ease: "linear",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center min-h-[80vh] overflow-hidden text-center"
    >
      {/* Moving HUD grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(90deg,var(--hud-grid)_2px,transparent_1px),linear-gradient(var(--hud-grid)_2px,transparent_1px)] bg-[length:40px_40px] opacity-40 animate-pulse"
      ></div>

      {/* Glow layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-[var(--hud-primary)] mix-blend-overlay blur-3xl opacity-20"
      ></div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="relative text-3xl md:text-7xl font-extrabold text-green-400 tracking-widest drop-shadow-[0_0_10px_#22c55e]"
      >
        AI <span className="text-yellow-500">News </span><span className="text-[var(--hud-primary)]">Feed</span>
      </h1>

      {/* Subtitle with typing effect */}
      <p
        ref={subtitleRef}
        className="overflow-hidden whitespace-nowrap text-sm md:text-2xl text-green-100 border-r-2 mb-5"
      >
        The future of personalized news delivery, right in your HUD.
      </p>
      <div className="w-[95%] p-5 mx-5 border rounded-xl">
        <HUDNewsFeed />
      </div>
    </div>
  );
};

export default Home;
