import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-lg border-b border-green-400 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-widest text-green-400">
                AAN <span className="text-gray-500">Feed</span>
              </h1>
              <div className="flex space-x-6 text-lg">
                <Link
                  to="/"
                  className="hover:text-green-200 transition duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/news"
                  className="hover:text-green-200 transition duration-200"
                >
                  News
                </Link>
                <Link
                  to="/bookmarks"
                  className="hover:text-green-200 transition duration-200"
                >
                  Bookmarks
                </Link>
                <Link
                  to="/settings"
                  className="hover:text-green-200 transition duration-200"
                >
                  Settings
                </Link>
                {/* <Link
                  to="/control"
                  className="hover:text-green-200 transition duration-200"
                >
                  Control
                </Link> */}
              </div>
            </div>
          </nav>
        </div>
    );
};

export default Navbar;