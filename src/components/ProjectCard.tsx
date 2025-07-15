"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer"
      whileHover={{ y: -5 }}
    >
      <motion.div layout className="w-full h-64 bg-gray-800 rounded-lg">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={300}
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
      {isOpen && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-gray-300">{project.description}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
