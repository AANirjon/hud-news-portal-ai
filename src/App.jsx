
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HUDNewsFeed from "./pages/HUDNewsFeed";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ScrollSpeedProvider } from "./pages/ScrollSpeedContext";
import { ThemeProvider } from "./pages/ThemeContext";
import { BookmarkProvider } from "./pages/BookmarkContext";
import { AuthProvider } from "./AuthContext";

import Navbar from "./components/Navbar";       
import AuthWrapper from "./components/AuthWrapper"; 

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
