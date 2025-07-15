"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 md:px-12 bg-[#2a2928]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Contacto
        </h2>
        <p className="text-base md:text-lg text-gray-300 mb-8">
          Puedes encontrarme en las siguientes plataformas:
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <FaGithub size={32} className="md:size-40" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <FaLinkedin size={32} className="md:size-40" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <FaTwitter size={32} className="md:size-40" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
