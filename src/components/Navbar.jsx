// src/components/Navbar.jsx
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ animations

import { auth } from "../firebase/firebaseConfig";
import { ThemeContext } from "../pages/ThemeContext";

function Navbar() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[8.5%] bg-black bg-opacity-70 backdrop-blur-lg border-b border-[var(--hud-border)] z-50">
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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm md:text-lg">
          {user ? (
            <>
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
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 border border-green-500 text-green-400 rounded hover:bg-green-500 hover:text-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 border border-blue-500 text-blue-400 rounded hover:bg-blue-500 hover:text-black transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={28} className="text-[var(--hud-primary)]" />
            ) : (
              <Menu size={28} className="text-[var(--hud-primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black bg-opacity-90 px-6 py-4 space-y-4 text-lg border-t border-[var(--hud-border)] overflow-hidden text-right"
          >
            {user ? (
              <>
                <Link
                  to="/"
                  className="block hover:text-green-100 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/news"
                  className="block hover:text-green-100 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  News
                </Link>
                <Link
                  to="/bookmarks"
                  className="block hover:text-green-100 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Bookmarks
                </Link>
                <Link
                  to="/settings"
                  className="block hover:text-green-100 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1 border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-1 border border-green-500 text-green-400 rounded hover:bg-green-500 hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-1 border border-blue-500 text-blue-400 rounded hover:bg-blue-500 hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
