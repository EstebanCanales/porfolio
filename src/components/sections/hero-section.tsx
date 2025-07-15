"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/hero-bg.jpg)" }}
    >
      <div className="text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Creative Developer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          className="text-lg md:text-2xl"
        >
          Building beautiful and functional web experiences.
        </motion.p>
      </div>
    </section>
  );
}
