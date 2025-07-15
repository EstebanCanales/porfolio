"use client";
import DecryptedText from "./DecryptedText";
import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        borderColor: "rgba(230, 230, 230, 0.15)",
        backdropFilter: "blur(24px)",
      }}
      className="
        border-b-2 fixed border-dashed z-10 min-w-full 
        "
    >
      <div
        style={{
          borderColor: "rgba(230, 230, 230, 0.15)",
          backdropFilter: "blur(24px)",
        }}
        className="flex justify-between max-w-7xl border-x-2 border-dashed mx-auto  min-h-14 px-10 items-center"
      >
        <DecryptedText
          text="Bettotwo"
          speed={100}
          animateOn="view"
          useOriginalCharsOnly
          sequential
          revealDirection="start"
          className="revealed text-white font-bold"
        />
        <div className="flex gap-x-4">
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
      </div>
    </motion.nav>
  );
}