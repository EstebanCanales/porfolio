import { motion } from "framer-motion";

export default function ProyectsSection() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        style={{
          borderColor: "rgba(230, 230, 230, 0.15)",
          backdropFilter: "blur(24px)",
        }}
        className="max-w-7xl border-x-2 border-b-2 border-dashed mx-auto min-h-screen px-4 sm:px-6 lg:px-8"
      >
        <div className="pt-14">Proyects</div>
      </motion.section>
    </>
  );
}
