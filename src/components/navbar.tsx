"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { FiHome, FiUser, FiBriefcase, FiMail } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction === "down" &&
        scrollY > 50 &&
        !hidden
      ) {
        setHidden(true);
      } else if (direction === "up" && hidden) {
        setHidden(false);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [hidden]);

  useEffect(() => {
    if (hidden) {
      controls.start("hidden");
    } else {
      controls.start("visible");
    }
  }, [hidden, controls]);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={controls}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-10 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl">
              Bettotwo
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link href="#home" className="text-white">
                <FiHome size={24} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link href="#about" className="text-white">
                <FiUser size={24} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link href="#projects" className="text-white">
                <FiBriefcase size={24} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link href="#contact" className="text-white">
                <FiMail size={24} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}