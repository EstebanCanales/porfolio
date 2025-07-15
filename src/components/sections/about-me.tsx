"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutMeSection() {
  return (
    <section id="about-me" className="py-20 px-4 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">Sobre Mí</h2>
          <p className="text-lg text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/placeholder.svg"
            alt="Placeholder Image"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
