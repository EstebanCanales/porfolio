"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/profile-pic.jpg"
            alt="Profile Picture"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-lg text-gray-300">
            I am a creative developer with a passion for building beautiful and
            functional web experiences. I have a strong background in web
            development and a keen eye for design. I am always looking for new
            challenges and opportunities to learn and grow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
