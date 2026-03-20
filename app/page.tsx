"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";
import FilmFlash from "@/components/film-flash";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

const GridBackground = dynamic(() => import("@/components/grid-background"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0f0c0a]" />,
});

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#0f0c0a] flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <GridBackground
          variant="diamond"
          pixelSize={6}
          color="#B19EEF"
          patternScale={1.6}
          patternDensity={0.75}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.35}
          rippleThickness={0.09}
          rippleIntensityScale={1.8}
          liquid={false}
          speed={0.25}
          edgeFade={0.18}
          transparent
        />
      </div>

      {/* Precarga silenciosa de todas las imágenes de hover */}
      <div aria-hidden style={{ position: "fixed", opacity: 0, pointerEvents: "none", left: -9999, top: 0 }}>
        {projects.flatMap((p) => p.images ?? []).map((src) => (
          <Image key={src} src={src} alt="" width={480} height={300} priority />
        ))}
      </div>

      <FilmFlash
        images={hoveredProject?.images ?? []}
        active={hoveredProject !== null}
      />

      <Navbar />

      <main className="flex-1 flex flex-col justify-start px-6 md:px-10 lg:px-16 pt-20 pb-12 relative z-10">
        <div className="max-w-md">
          <div className="space-y-0">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onHover={setHoveredProject}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
