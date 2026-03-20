"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

function useDecryptEffect(text: string, isHovered: boolean) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text, isHovered]);

  return displayText;
}

export default function ProjectCard({
  project,
  index,
  onHover,
}: {
  project: Project;
  index: number;
  onHover?: (project: Project | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const displayName = useDecryptEffect(project.name, isHovered);

  return (
    <Link
      href={`/${project.slug}`}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover?.(project);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover?.(null);
      }}
      className="group flex items-baseline gap-3 py-1.5 text-left w-full transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="text-[10px] text-muted-foreground font-mono w-5 opacity-40 group-hover:opacity-100 transition-opacity">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-base md:text-lg font-light tracking-tight text-foreground group-hover:text-primary transition-colors font-mono">
        {displayName}
      </span>
      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
