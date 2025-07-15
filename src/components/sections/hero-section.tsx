"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <>
      <section className="flex flex-col md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{
            borderColor: "rgba(230, 230, 230, 0.15)",
            backdropFilter: "blur(24px)",
          }}
          className="border-2 border-dashed h-auto md:h-screen w-full p-4 md:ml-12 flex items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">Mi Portafolio</h1>
            <p className="text-xl text-gray-300">
              Bienvenido a mi portafolio personal. Aquí puedes encontrar información sobre mí, mis proyectos y cómo contactarme.
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
