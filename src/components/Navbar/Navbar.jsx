import React, { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navItems = [
  {name:"Home",href:"/"},
  { name: "Events", href: "/events" },
  { name: "Job Board", href: "/job-board" },
  { name: "Blog", href: "/blog" },
  {name:"Profile",href:"/profile"},
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <div>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 p-1"
      >
        {/* Wrapper with rotating glow border */}
        <div className="glow-border-wrapper mx-auto max-w-7xl rounded-2xl">
          <div
            className="flex items-center justify-between p-4 rounded-2xl
            bg-gray-700/90 backdrop-blur-lg relative z-10"
          >
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center space-x-2 text-2xl font-bold text-white tracking-wider"
              whileHover={{ scale: 1.05, color: "#00ffff" }}
            >
              <Zap className="w-6 h-6 text-cyan-400" />
              <span className="text-indigo-400/80">IIUC Connect</span>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 transition duration-300 font-semibold"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  {item.name}
                </motion.a>
              ))}

              {isLoggedIn ? (
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg 
                  hover:bg-red-500 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              ) : (
                <motion.a
                  href="/register"
                  className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg shadow-lg 
                  hover:bg-cyan-500 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect
                </motion.a>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-cyan-400 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 mx-auto max-w-7xl bg-gray-900/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10"
            >
              <div className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-cyan-400 transition duration-300 font-semibold py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-500 transition duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    href="/register"
                    className="w-full text-center px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connect
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;