import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Button } from '../Constants/ui/button';
import { features } from '../Constants/features';
import bg_1 from '../assets/bg_1.jpg'; 
import bg_2 from '../assets/bg_2.webp'; 
import bg_3 from '../assets/bg_3.jpg'; 


const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const images = [
    bg_1, 
    bg_2,
    bg_3,
  ];
  const [bgImage, setBgImage] = useState(images[0]);

  // Pixel dance animation variants
  const pixelVariants = {
    hover: {
      textShadow: [
        "0 0 5px #00f",
        "2px 2px 0 #f00",
        "-2px -2px 0 #0f0",
        "0 0 5px #00f"
      ],
      transition: { duration: 0.3, repeat: Infinity }
    }
  };

  // Cursor following effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Enhanced hover effects
  const hoverEffects = {
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      color: ['#f97316', '#3b82f6', '#10b981'],
      transition: { duration: 0.5, repeat: Infinity }
    }
  };

  // Dynamic background transitions
  const handleFeatureHover = (index) => {
    setHoveredIndex(index);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const interval = setInterval(() => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setBgImage(randomImage);  // Set bgImage based on the interval
      console.log(randomImage); // Log the random image to check
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    // Save dark mode preference in localStorage
    localStorage.setItem('darkMode', newMode);
  };

  
  return (
    <div className="font-sans text-gray-900 dark:text-gray-100 transition-all min-h-screen" ref={ref}>
      {/* Floating Cursor Elements */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)'
        }}
      />

      {/* Hero Section */}
        <section
          className="py-24 px-4 justify-center text-center items-center text-white dark:bg-gradient-to-r dark:from-indigo-700 dark:to-blue-900"
          style={{
            backgroundImage: `url(${bgImage})`,  // Dynamically set the background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',  // Ensure it covers the entire viewport height
          }}
        >
            <motion.h1
              className="text-6xl font-extrabold mb-6 justify-center text-center items-center drop-shadow-lg mt-10 pt-10"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: [0, 20, -20, 0],
                x: [0, 50, -50, 0],
                color: ['#fff', '#000', '', '#fff'],
                transition: { duration: 1.5, repeat: Infinity }
              }}
              variants={pixelVariants}
            >
              Simplify Your Events. Maximize Your Impact.
            </motion.h1>
            <p className="text-2xl  mb-8 max-w-3xl mx-auto text-blue-200 dark:text-blue-200">
              Event-Easy helps you plan, manage, and execute events with ease—so you can focus on what matters most.
            </p>
            <motion.button
        className="bg-gradient-to-r from-[#34d5eb] to-blue-800 text-black text-lg px-8 py-3 rounded-full shadow-lg relative overflow-hidden group "
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          rotate: 10,
          x: 20,
          y: 20,
          backgroundColor: '#f0f0f0',
          transition: { duration: 0.5, ease: 'easeInOut' },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-50 transition-all duration-300"
        />
        <motion.span
          className="relative z-10 group-hover:text-blue-800 transition-colors duration-300"
          whileHover={{ y: -5 }}
          whileTap={{ y: 5 }}
        >
          Get Started
        </motion.span>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500"
        />
      </motion.button>
        </section>


      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-all duration-300"
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900 text-center dark:text-white">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-green-700 to-indigo-500 text-transparent bg-clip-text">
          Core Features
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-left shadow-lg hover:shadow-xl transition-all duration-500 transform hover:rotate-6 hover:scale-105"
              onHoverStart={() => handleFeatureHover(index)}
              whileHover={{
                scale: 1.1,
                rotate: 10,
                backgroundColor: '#05C8D9',
                color: '#fff',
                transition: { duration: 0.4 }
              }}
            >
              <div className="text-gray-800 dark:text-white flex items-center justify-start">
                {feature.icon}
              </div>
              <motion.h3
                className="text-xl font-semibold mb-2 mt-2 text-indigo-700 dark:text-indigo-300"
                variants={pixelVariants}
                whileHover={{
                  textShadow: '0 0 5px #fff',
                  transition: { duration: 0.3 }
                }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-sm text-gray-600 dark:text-gray-400"
                whileHover={{ color: '#000', transition: { duration: 0.5 } }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>

       {/* Benefits Section */}
       <section>
        {(() => {
          const [pos, setPos] = React.useState({ x: 0, y: 0 });

          React.useEffect(() => {
            const move = (e) => setPos({ x: e.clientX, y: e.clientY });
            window.addEventListener('mousemove', move);
            return () => window.removeEventListener('mousemove', move);
          }, []);

          return (
            <div className="relative py-16 px-4 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-800 text-gray-800 dark:text-white text-center overflow-hidden">
              {/* Cursor Bubble */}
              <div
                className="absolute w-12 h-12 bg-indigo-500 opacity-25 rounded-full pointer-events-none transition-transform duration-100"
                style={{ left: `${pos.x}px`, top: `${pos.y}px`, transform: 'translate(-50%, -50%)' }}
              />

              <h2 className="text-4xl font-bold mb-4 pixel-dance">Why Event-Easy?</h2>
              <p className="text-lg max-w-xl mx-auto mb-8">Plan smart, track real-time, stress less.</p>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {['Easy Management', 'Instant Analytics'].map((title, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      rotate: i % 2 === 0 ? 3 : -3,
                      backgroundColor: '#05C8D9',
                      color: '#fff',
                      transition: { duration: 0.3 },
                    }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm">
                      {i === 0
                        ? 'Handle events like a boss from start to finish.'
                        : 'Know what’s popping — instantly.'}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Floating Blobs */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute w-4 h-4 bg-pink-400 rounded-full top-12 left-16 animate-float-slow"></div>
                <div className="absolute w-6 h-6 bg-yellow-300 rounded-full bottom-12 right-12 animate-float-medium"></div>
              </div>

              <style jsx>{`
                @keyframes pixelDance {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .pixel-dance {
                  background: linear-gradient(90deg, red, lime, blue, fuchsia, cyan, yellow);
                  background-size: 600% 600%;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: pixelDance 3s ease infinite;
                }
                @keyframes float-slow {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                .animate-float-slow {
                  animation: float-slow 5s ease-in-out infinite;
                }
                @keyframes float-medium {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-15px); }
                }
                .animate-float-medium {
                  animation: float-medium 7s ease-in-out infinite;
                }
              `}</style>
            </div>
          );
        })()}
      </section>

      {/* Screenshot / Demo Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800 text-center dark:text-gray-100">
        <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-10">See It in Action</h2>
        <motion.img
          src="https://images.unsplash.com/photo-1604882733123-68b3690b40f5"
          alt="Event dashboard"
          className="mx-auto rounded-xl shadow-lg"
          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
        />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-indigo-50 dark:bg-indigo-900 text-center">
        <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-8">
          What Our Users Say
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          <motion.div
            className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
            whileHover={{ scale: 1.05, y: -10, backgroundColor: 'rgb(30, 64, 175)', color: '#fff', transition: { duration: 0.3 } }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              "Event-Easy transformed our entire event experience. From start to finish, we were able to stay organized and track every detail."
            </p>
            <div className="mt-4 font-semibold text-indigo-800 dark:text-indigo-300">John Doe</div>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
            whileHover={{ scale: 1.05, y: -10, backgroundColor: 'rgb(30, 64, 175)', color: '#fff', transition: { duration: 0.3 } }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              "An amazing platform that simplified the event planning process for our team. Everything was more streamlined and efficient."
            </p>
            <div className="mt-4 font-semibold text-indigo-800 dark:text-indigo-300">Jane Smith</div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900 text-center">
        <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-300 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto text-left">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">How does the event planning process work?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Event-Easy allows you to create, manage, and track all aspects of your event, from start to finish, in one simple platform.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Can I track event performance?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Yes! Event-Easy provides instant analytics and tracking tools to help you measure the success of your event.</p>
          </div>
        </div>
      </section>

      {/* Contact/Newsletter Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-400 to-indigo-600 text-center text-white">
        <h2 className="text-4xl font-bold mb-8">Stay Informed</h2>
        <p className="text-xl mb-8">Sign up for our newsletter to get the latest updates and tips.</p>
        <Button className="bg-white text-indigo-600 hover:bg-gray-200 text-lg px-8 py-3 rounded-full shadow-lg relative overflow-hidden">
          Subscribe Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-gray-800 text-center text-white">
        <p>&copy; 2025 Event-Easy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
