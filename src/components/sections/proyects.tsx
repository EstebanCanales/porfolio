"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Proyecto 1",
    description: "Una breve descripción del proyecto 1.",
    image: "/placeholder.svg",
  },
  {
    title: "Proyecto 2",
    description: "Una breve descripción del proyecto 2.",
    image: "/placeholder.svg",
  },
  {
    title: "Proyecto 3",
    description: "Una breve descripción del proyecto 3.",
    image: "/placeholder.svg",
  },
  {
    title: "Proyecto 4",
    description: "Una breve descripción del proyecto 4.",
    image: "/placeholder.svg",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Proyectos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#2a2928] rounded-lg overflow-hidden"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
