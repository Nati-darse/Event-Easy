import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

import bg_1 from "../assets/bg_1.jpg";
import bg_2 from "../assets/bg_2.webp";
import bg_3 from "../assets/bg_3.jpg";

export default function Login() {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentBg, setCurrentBg] = useState(0);

  const bgImages = [bg_1];
  const headingControls = useAnimation();

  useEffect(() => {
    if (hovered) {
      headingControls.start({
        x: [0, 20],
        y: [0, 20],
        transition: { yoyo: Infinity, duration: 0.5 },
      });
    } else {
      headingControls.stop();
    }
  }, [hovered]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-white rounded-3xl shadow-2xl grid grid-cols-2 w-[900px] h-[600px] overflow-hidden">
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-30 pointer-events-none"
          style={{
            left: mousePos.x - 50,
            top: mousePos.y - 50,
            position: "fixed",
          }}
        />

        {/* Left Side */}
        <div className="flex flex-col justify-center px-10">
          <motion.h1
            className="text-4xl font-bold mb-4"
            animate={headingControls}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ rotate: 2 }}
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            className="mb-6 text-sm text-gray-600"
            whileHover={{ scale: 1.05, color: "#7c3aed" }}
          >
            Please enter your login details below
          </motion.p>

          <input
            placeholder="Email"
            className="mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <input
            placeholder="Password"
            type="password"
            className="mb-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />

          <motion.a
            href="#"
            className="text-sm text-blue-600 hover:underline mb-6"
            whileHover={{ color: "#1e3a8a" }}
          >
            Forgot password?
          </motion.a>

          <motion.button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in
          </motion.button>

          <div className="text-center text-sm my-4 text-gray-500">Or continue</div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            className="flex items-center justify-center w-full border px-4 py-3 rounded-lg font-medium"
          >
            <span className="mr-2">🟢</span> Log in with Google
          </motion.button>

          <p className="mt-6 text-sm text-center">
            Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>

        {/* Right Side with Image & Animation */}
        <motion.div
          className="relative h-full w-full"
          initial={{ rotateY: 0 }}
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={bgImages[currentBg]}
            alt="Illustration"
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <motion.p
            className="absolute bottom-4 left-4 right-4 text-gray-500 text-sm text-center"
            whileHover={{ x: [0, 10, -10, 0], transition: { duration: 1 } }}
          >
            Manage your events in an easy and more efficient way with Event-Easy...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}