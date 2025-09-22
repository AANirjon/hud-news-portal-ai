import { FaHome, FaBookmark, FaCog, FaNewspaper, FaBars, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="sidebar"
          initial={{ x: isMobile ? -250 : 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isMobile ? -250 : 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-16 md:top-18 left-0 h-[calc(100%-4rem)] md:h-[calc(100%-4rem)] flex flex-col items-start p-5 space-y-6 z-50 w-52
            bg-black
            border-r-4 border-cyan-400 shadow-[0_0_10px_cyan,0_0_20px_cyan]
          `}
        >
          {/* Sidebar Header */}
          <h2 className="text-cyan-400 font-bold text-xl mb-5 tracking-widest">
            HUD Menu
          </h2>

          {/* Navigation */}
          <nav className="flex flex-col gap-5 w-full">
            <a href="#" className="flex items-center gap-3 text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all">
              <FaHome /> Home
            </a>
            <a href="#" className="flex items-center gap-3 text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all">
              <FaNewspaper /> News
            </a>
            <a href="#" className="flex items-center gap-3 text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all">
              <FaBookmark /> Bookmarks
            </a>
            <a href="#" className="flex items-center gap-3 text-cyan-300 hover:text-cyan-100 hover:scale-105 transition-all">
              <FaCog /> Settings
            </a>
            <p>Prefarance section will be there</p>
          </nav>

          {/* Toggle Button inside sidebar */}
          <button
            onClick={toggleSidebar}
            className="absolute right-[-12px] top-5 z-50 bg-black text-cyan-400 p-2 rounded-full shadow-lg hover:bg-cyan-900 transition-all flex items-center justify-center"
          >
            {isOpen ? <FaArrowLeft /> : <FaBars />}
          </button>
        </motion.aside>
      )}

      {/* Show toggle button when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-16 left-2 z-50 bg-black text-cyan-400 p-2 rounded-full shadow-lg hover:bg-cyan-900 transition-all flex items-center justify-center"
        >
          <FaBars />
        </button>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
