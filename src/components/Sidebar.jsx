import {  FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PreferencesSearch from "./PreferencesSearch";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: isMobile ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -300 : 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`
              fixed top-[8.8%] md:top-[8.8%] left-0 h-[calc(100%-4rem)]
              flex flex-col items-start p-5 space-y-6 z-50 w-80 md:w-70
              bg-black border-r-4 border-cyan-400 shadow-[0_0_10px_cyan,0_0_20px_cyan]
            `}
          >
            {/* Sidebar Header */}
            <h2 className="text-cyan-400 font-bold text-xl mb-5 tracking-widest">
              Add Preferances
            </h2>

            {/* Navigation */}
            {/* <nav className="flex flex-col gap-5 w-full"> */}
            {/* </nav> */}
            <div className="mt-6 w-full">
              <PreferencesSearch />
            </div>

            {/* Toggle Button inside sidebar */}
            <button
              onClick={toggleSidebar}
              className="absolute -right-4 top-5 z-50 bg-black text-cyan-400 p-2 rounded-full shadow-lg hover:bg-cyan-900 transition-all flex items-center justify-center"
            >
              <FaArrowLeft />
            </button>
          </motion.aside>
        )}

        {/* Show toggle button when sidebar is closed */}
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed top-[8.5%] left-4 z-50 md:left-2 bg-black text-cyan-400 p-2 rounded-full shadow-lg hover:bg-cyan-900 transition-all flex items-center justify-center"
          >
            <FaArrowRight />
          </button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
