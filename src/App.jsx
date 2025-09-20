// App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";

import HUDNewsFeed from "./pages/HUDNewsFeed";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Home from "./pages/Home";

import { ScrollSpeedProvider } from "./pages/ScrollSpeedContext";
import { ThemeProvider, ThemeContext } from "./pages/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ScrollSpeedProvider>
        <Router>
          <AppContent />
        </Router>
      </ScrollSpeedProvider>
    </ThemeProvider>
  );
}

// Separate component to use ThemeContext
function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-black text-[var(--hud-text)] font-mono relative">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-lg border-b border-[var(--hud-border)] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* App Title + Glowing Theme Indicator */}
          <div className="flex items-center gap-3">
            <h1 className="text-sm md:text-2xl font-bold tracking-widest text-[var(--hud-primary)]">
              AAN<span className="text-gray-500">Feed</span>
            </h1>
            <div
              className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_8px_var(--hud-primary)]"
              style={{ backgroundColor: "var(--hud-primary)" }}
              title={`Current Theme: ${theme}`}
            ></div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 text-sm md:text-lg">
            <Link to="/" className="hover:text-green-100 transition duration-200">
              Home
            </Link>
            <Link to="/news" className="hover:text-green-100 transition duration-200">
              News
            </Link>
            <Link to="/bookmarks" className="hover:text-green-100 transition duration-200">
              Bookmarks
            </Link>
            <Link to="/settings" className="hover:text-green-100 transition duration-200">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<HUDNewsFeed />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
