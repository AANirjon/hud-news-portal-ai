// src/components/Navbar.jsx
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { auth } from "../firebase/firebaseConfig";
import { ThemeContext } from "../pages/ThemeContext";

function Navbar() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const linkClass = ({ isActive }) =>
    `underline-from-center hover:text-green-100 transition-colors duration-300 ${isActive ? "text-green-400" : "text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full h-[8.5%] bg-black bg-opacity-70 backdrop-blur-lg border-b border-[var(--hud-border)] z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* App Title + Theme Indicator */}
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

        <div className="hidden md:flex items-center space-x-4 text-sm md:text-lg">
          {user ? (
            <div className="flex items-center gap-4">
              <NavLink to="/" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/news" className={linkClass}>
                News
              </NavLink>
              <NavLink to="/bookmarks" className={linkClass}>
                Bookmarks
              </NavLink>
              <NavLink to="/settings" className={linkClass}>
                Settings
              </NavLink>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full object-cover border-1 border-[var(--hud-border)] hover:shadow-[0_0_8px_rgba(0,255,0,0.7),0_0_12px_rgba(0,255,0,0.4)] transition-shadow duration-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-black font-bold">
                  {user.email[0].toUpperCase()}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-3 py-1 border border-green-500 text-green-400 rounded hover:bg-green-500 hover:text-black transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1 border border-blue-500 text-blue-400 rounded hover:bg-blue-500 hover:text-black transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

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
            {user && (
              <div className="flex items-center gap-2 mb-4 justify-end">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover border-1 border-[var(--hud-border)] hover:shadow-[0_0_8px_rgba(0,255,0,0.7),0_0_12px_rgba(0,255,0,0.4)] transition-shadow duration-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-black font-bold">
                    {user.email[0].toUpperCase()}
                  </div>
                )}
                <span className="text-green-300 font-medium">{user.displayName || user.email}</span>
              </div>
            )}

            {user ? (
              <>
                <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/news" className={linkClass} onClick={() => setMenuOpen(false)}>
                  News
                </NavLink>
                <NavLink to="/bookmarks" className={linkClass} onClick={() => setMenuOpen(false)}>
                  Bookmarks
                </NavLink>
                <NavLink to="/settings" className={linkClass} onClick={() => setMenuOpen(false)}>
                  Settings
                </NavLink>
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
                <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClass} onClick={() => setMenuOpen(false)}>
                  Register
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
