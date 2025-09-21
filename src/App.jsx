// App.js
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

import HUDNewsFeed from "./pages/HUDNewsFeed";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ScrollSpeedProvider } from "./pages/ScrollSpeedContext";
import { ThemeProvider, ThemeContext } from "./pages/ThemeContext";
import { BookmarkProvider } from "./pages/BookmarkContext";
import { AuthProvider } from "./AuthContext";
import HUD3DLoader from "./components/HUD3DLoader";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollSpeedProvider>
          <BookmarkProvider>
            <Router>
              <AppContent />
            </Router>
          </BookmarkProvider>
        </ScrollSpeedProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Navbar with conditional login/logout
function Navbar() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

        {/* Conditional Navigation Links */}
        <div className="flex items-center space-x-6 text-sm md:text-lg">
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
      </div>
    </nav>
  );
}

// Protected route wrapper with proper auth state handling
function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-green-400">
        <HUD3DLoader></HUD3DLoader>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/login"; // redirect if not logged in
    return null;
  }

  return children;
}

function AppContent() {
  const location = useLocation();

  // Hide navbar on login/register pages
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-black text-[var(--hud-text)] font-mono relative">
      {!hideNavbar && <Navbar />}

      <main className={hideNavbar ? "px-6" : "pt-24 px-6"}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>} />
          <Route path="/news" element={<AuthWrapper><HUDNewsFeed /></AuthWrapper>} />
          <Route path="/bookmarks" element={<AuthWrapper><Bookmarks /></AuthWrapper>} />
          <Route path="/settings" element={<AuthWrapper><Settings /></AuthWrapper>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
