"use client";

import ChineseColumn from "../chineseColumn";
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
          className="border-2 border-dashed border-r-0 h-auto md:h-screen w-full md:w-11/12 p-4 md:ml-12"
        >
          Information
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{
            borderColor: "rgba(230, 230, 230, 0.15)",
            backdropFilter: "blur(24px)",
          }}
          className="border-2 border-dashed h-48 md:h-screen w-full md:w-1/12 md:mr-12"
        >
          <ChineseColumn
            className="ml-4"
            glowColor="none"
            speed={0.5}
            fontSize={40}
          />
          <ChineseColumn
            className="ml-14"
            fontSize={30}
            glowColor="none"
            speed={0.7}
          />
        </motion.div>
      </section>
    </>
  );
}
