import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HUDNewsFeed from "./HUDNewsFeed";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [preferencesVersion, setPreferencesVersion] = useState(0);

  const handlePreferencesChange = () => {
    // Increment version to trigger HUDNewsFeed refresh
    setPreferencesVersion((v) => v + 1);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
      "-=0.5"
    );
    tl.fromTo(
      subtitleRef.current,
      { width: "0ch" },
      { width: "60ch", duration: 3.5, ease: "steps(40)" },
      "-=0.5"
    );

    gsap.to(glowRef.current, {
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });

    gsap.to(gridRef.current, {
      backgroundPosition: "200% 200%",
      repeat: -1,
      duration: 30,
      ease: "linear",
    });
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row min-h-screen bg-black text-white relative">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`flex-1 relative transition-all duration-500 p-4 md:p-6 lg:p-8
          ${!isMobile ? (isSidebarOpen ? "ml-[16%]" : "ml-0") : "ml-0"}`
        }
      >
        {/* Moving HUD grid background */}
        <div
          ref={gridRef}
          className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,var(--hud-grid)_2px,transparent_1px),linear-gradient(var(--hud-grid)_2px,transparent_1px)] bg-[length:10%_10%] opacity-40 animate-pulse"
        ></div>

        {/* Glow layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 w-full h-full bg-[var(--hud-primary)] mix-blend-overlay blur-3xl opacity-20"
        ></div>

        <div className="relative flex flex-col items-center text-center w-full max-w-[95%] mx-auto">
          <h1
            ref={titleRef}
            className="relative text-[6vw] sm:text-[5vw] md:text-[3.5vw] lg:text-[2.5vw] font-extrabold text-green-400 tracking-widest drop-shadow-[0_0_10px_#22c55e]"
          >
            AI <span className="text-yellow-500">News</span>{" "}
            <span className="text-[var(--hud-primary)]">Feed</span>
          </h1>

          <p
            ref={subtitleRef}
            className="overflow-hidden whitespace-nowrap text-[3vw] sm:text-[2.5vw] md:text-[1.5vw] lg:text-[1vw] text-green-100 border-r-2 mb-5 mt-2"
          >
            The future of personalized news delivery, right in your HUD.
          </p>
        </div>

        <div className="w-[95%] md:w-[80%] lg:w-[80%] p-4 md:p-6 mx-auto border-2 border-cyan-400 rounded-xl">
          <HUDNewsFeed preferencesVersion={preferencesVersion}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
