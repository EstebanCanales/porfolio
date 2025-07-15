"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 md:px-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-white mb-8"
      >
        Get in touch
      </motion.h2>
      <motion.a
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        viewport={{ once: true }}
        href="mailto:example@example.com"
        className="text-2xl text-white font-bold underline"
      >
        example@example.com
      </motion.a>
    </section>
  );
}
