"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import QxenithPanel from "@/components/work/qxenith-panel";
import KoenigseggPanel from "@/components/work/koenigsegg-panel";

const ACCENT_TEXT: Record<number, string> = {
  1: "#047A5E",
  2: "#3B5C8E",
};

const PANELS: Record<number, React.ComponentType> = {
  1: QxenithPanel,
  2: KoenigseggPanel,
};

function ProjectThumb({
  project,
  index,
  isActive,
  isLocked,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  isLocked: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const accentText = ACCENT_TEXT[project.id] ?? project.accent;
  const cover = project.cover;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive]);

  return (
    <button
      className="text-left rounded-xl overflow-hidden transition-all duration-300 w-full"
      style={{
        border: isActive
          ? `1px solid rgba(109,40,217,0.45)`
          : `1px solid rgba(109,40,217,0.12)`,
        background: "rgba(250,247,255,0.92)",
        backdropFilter: "blur(10px)",
        boxShadow: isActive ? "0 0 0 3px rgba(109,40,217,0.12)" : "none",
        transform: isActive ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/10" }}
      >
        {cover ? (
          <Image
            src={cover}
            alt={project.name}
            fill
            sizes="280px"
            className="object-cover transition-transform duration-500"
            style={{ transform: isActive ? "scale(1.07)" : "scale(1)" }}
          />
        ) : null}
      </div>
    </button>
  );
}

export default function WorkPage() {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [locked, setLocked] = useState<Project | null>(projects[0]);

  const active = locked ?? hovered;

  return (
    <div className="h-screen overflow-hidden bg-[#faf7ff] flex flex-col relative">

      <Navbar
        light
        accent="#6d28d9"
        bg="rgba(250,247,255,0.92)"
        borderCol="rgba(109,40,217,0.2)"
      />

      <main className="flex-1 flex items-start gap-5 px-6 md:px-3 pt-16 pb-0 relative z-10 overflow-hidden min-h-0">
        {/* Columna izquierda — cards */}
        <div
          className="flex flex-col gap-3 shrink-0 overflow-y-auto h-full"
          style={{ width: 280 }}
        >
          {projects.map((project, i) => {
            const isLocked = locked?.id === project.id;
            const isActive =
              isLocked || (!locked && hovered?.id === project.id);
            return (
              <ProjectThumb
                key={project.id}
                project={project}
                index={i}
                isActive={isActive}
                isLocked={isLocked}
                onMouseEnter={() => setHovered(project)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setLocked((p) => (p?.id === project.id ? null : project))
                }
              />
            );
          })}
        </div>

        {/* Panel de contenido */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            height: "98%",
            opacity: active ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          {active &&
            (() => {
              const Panel = PANELS[active.id];
              return Panel ? <Panel /> : null;
            })()}
        </div>
      </main>
    </div>
  );
}
