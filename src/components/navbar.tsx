"use client";
import DecryptedText from "./DecryptedText";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function AnimatedNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        borderColor: "rgba(230, 230, 230, 0.15)",
        backdropFilter: "blur(24px)",
      }}
      className="border-b-2 fixed border-dashed z-10 min-w-full"
    >
      <div className="flex justify-between max-w-7xl border-x-2 border-dashed mx-auto min-h-14 px-10 items-center">
        <DecryptedText
          text="Bettotwo"
          speed={100}
          animateOn="view"
          useOriginalCharsOnly
          sequential
          revealDirection="start"
          className="revealed text-white font-bold"
        />
        <div className="hidden md:flex gap-x-4">
          <Link href="#about-me">
            <DecryptedText
              text="About me"
              speed={100}
              useOriginalCharsOnly
              animateOn="view"
              sequential
              revealDirection="start"
              className="revealed text-white font-bold"
            />
          </Link>
          <Link href="#projects">
            <DecryptedText
              text="Projects"
              speed={100}
              animateOn="view"
              sequential
              useOriginalCharsOnly
              revealDirection="start"
              className="revealed text-white font-bold"
            />
          </Link>
          <Link href="#contact">
            <DecryptedText
              text="Contact"
              speed={100}
              animateOn="view"
              sequential
              useOriginalCharsOnly
              revealDirection="start"
              className="revealed text-white font-bold"
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#252423] py-4">
          <div className="flex flex-col items-center gap-y-4">
            <Link href="#about-me" onClick={toggleMenu}>
              <DecryptedText
                text="About me"
                speed={100}
                useOriginalCharsOnly
                animateOn="view"
                sequential
                revealDirection="start"
                className="revealed text-white font-bold"
              />
            </Link>
            <Link href="#projects" onClick={toggleMenu}>
              <DecryptedText
                text="Projects"
                speed={100}
                animateOn="view"
                sequential
                useOriginalCharsOnly
                revealDirection="start"
                className="revealed text-white font-bold"
              />
            </Link>
            <Link href="#contact" onClick={toggleMenu}>
              <DecryptedText
                text="Contact"
                speed={100}
                animateOn="view"
                sequential
                useOriginalCharsOnly
                revealDirection="start"
                className="revealed text-white font-bold"
              />
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
}