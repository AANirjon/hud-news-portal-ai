import { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { ScrollSpeedContext } from "./ScrollSpeedContext";
import { ThemeContext } from "./ThemeContext";

const Settings = () => {
  const sectionRef = useRef(null);
  const { scrollSpeed, setScrollSpeed } = useContext(ScrollSpeedContext);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1 }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-[70vh] p-6 border border-green-400 rounded-xl bg-black bg-opacity-40 backdrop-blur-lg text-green-200"
    >
      <h2 className="text-3xl font-bold mb-6 text-green-400">Settings</h2>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-lg">Auto-scroll speed</label>
          <input
            type="range"
            min="5"
            max="40"
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(Number(e.target.value))}
            className="w-full accent-green-400"
          />
          <p className="mt-2">Current speed: {scrollSpeed}</p>
        </div>

        <div>
          <label className="block mb-2 text-lg">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-black border border-[var(--hud-border)] p-2 rounded-md"
          >
            <option value="hudGreen">HUD Green</option>
            <option value="cyberBlue">Cyber Blue</option>
            <option value="neonPurple">Neon Purple</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
