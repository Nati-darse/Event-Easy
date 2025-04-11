import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, Moon, Sun, Search, MapPin } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] dark:from-gray-800 dark:to-gray-900 shadow-md transition-all duration-500">
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-10 h-10 bg-blue-500 rounded-full mix-blend-difference opacity-70"
        style={{ x: springX, y: springY }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <motion.a
            href="#"
            whileHover={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0], rotate: [0, 5, -5, 0], color: "#00ffff" }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xl font-bold text-white pixel-dance"
          >
            Event-Easy
          </motion.a>

          <div className="hidden md:flex flex-1 mx-4 max-w-3xl">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="flex w-full border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden shadow-lg animate-gradient">

              <div className="flex items-center px-4 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search events"
                className="w-full py-2 px-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-400 outline-none"
              />
              <div className="w-px bg-gray-300 dark:bg-gray-600 my-2"></div>
              <div className="flex items-center px-3 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-1 animate-bounce" />
                <input
                  type="text"
                  placeholder="City"
                  className="bg-transparent outline-none text-sm w-28 text-gray-700 dark:text-white placeholder-gray-400"
                />
              </div>
              <button className="bg-red-600 hover:bg-pink-600 text-white px-4 rounded-r-full transition-all flex items-center justify-center animate-pulse">
                <Search className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {["Contact Sales", "Create Events", "Help Center", "Find my tickets"].map((item, i) => (
              <motion.a
                key={i}
                href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
                whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0], color: "#00ffee" }}
                className="text-white transition duration-500 ease-in-out cursor-pointer"
              >
                {item}
              </motion.a>
            ))}

            <button
              onClick={() => {
                const newMode = !darkMode;
                setDarkMode(newMode);
                document.documentElement.classList.toggle('dark', newMode);
                localStorage.setItem('darkMode', newMode);
              }}
              className="text-white hover:text-yellow-400 transition-colors duration-500"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a href="/login" className="text-sm text-white hover:underline">Log In</a>

            <Link to="/Classify">
              <motion.div
                whileHover={{ scale: 1.1, backgroundColor: "#00ffff", color: "#000" }}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full transition duration-300 ease-in-out"
              >
                Sign Up
              </motion.div>
            </Link>

          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-800 px-4 pt-2 pb-4 space-y-2 shadow-lg text-gray-900 dark:text-white"
        >
          {["Contact Sales", "Create Events", "Help Center", "Find my tickets"].map((item, i) => (
            <motion.a
              key={i}
              whileHover={{ scale: 1.1, x: [0, 10, -10, 0] }}
              href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
              className="block hover:bg-blue-500 dark:hover:bg-blue-600 px-2 py-1 rounded"
            >
              {item}
            </motion.a>
          ))}

          <button
            onClick={() => {
              const newMode = !darkMode;
              setDarkMode(newMode);
              document.documentElement.classList.toggle('dark', newMode);
              localStorage.setItem('darkMode', newMode);
            }}
            className="block text-sm text-gray-700 dark:text-gray-200"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <a href="/login">Log In</a>
          <a href="/signup">Sign Up</a>
        </motion.div>
      )}
    </nav>
  );
}
