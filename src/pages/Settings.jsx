import { useEffect, useRef, useContext, useState } from "react";
import gsap from "gsap";
import { ScrollSpeedContext } from "./ScrollSpeedContext";
import { ThemeContext } from "./ThemeContext";
import { useAuth } from "../AuthContext";
import axios from "axios";

const Settings = () => {
  const sectionRef = useRef(null);
  const { scrollSpeed, setScrollSpeed } = useContext(ScrollSpeedContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1 }
    );
  }, []);

  // ---------------- Update scroll speed in backend ----------------
  const handleScrollSpeedChange = async (value) => {
    setScrollSpeed(value);

    if (!user || !token) return;

    try {
      setLoading(true);
      await axios.post(
        "https://news-portal-server-seven-bice.vercel.app/settings",
        { email: user.email, scrollSpeed: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to update scroll speed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Update theme in backend ----------------
  const handleThemeChange = async (value) => {
    setTheme(value);

    if (!user || !token) return;

    try {
      setLoading(true);
      await axios.post(
        "https://news-portal-server-seven-bice.vercel.app/settings",
        { email: user.email, theme: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to update theme:", err);
    } finally {
      setLoading(false);
    }
  };

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
            min="1"
            max="50"
            value={scrollSpeed}
            onChange={(e) => handleScrollSpeedChange(Number(e.target.value))}
            className="w-full accent-green-400"
          />
          <p className="mt-2">Current speed: {scrollSpeed}</p>
        </div>

        <div>
          <label className="block mb-2 text-lg">Theme</label>
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="bg-black border border-[var(--hud-border)] p-2 rounded-md"
          >
            <option value="hudGreen">HUD Green</option>
            <option value="cyberBlue">Cyber Blue</option>
            <option value="neonPurple">Neon Purple</option>
          </select>
        </div>

        {loading && (
          <p className="text-sm text-yellow-400 mt-2">
            Saving preferences...
          </p>
        )}
      </div>
    </div>
  );
};

export default Settings;
