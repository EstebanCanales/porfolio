"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import TransitionLink from "@/components/transition-link";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import QxenithPanel from "@/components/work/qxenith-panel";
import KoenigseggPanel from "@/components/work/koenigsegg-panel";

const PANELS: Record<number, React.ComponentType> = {
  1: QxenithPanel,
  2: KoenigseggPanel,
};

const GridBackground = dynamic(() => import("@/components/grid-background"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#faf7ff]" />,
});

const audiences = [
  {
    label: "Anyone",
    text: "I build web experiences that feel different. Fast, precise, and alive — from a rough idea to a polished product running in production.",
  },
  {
    label: "Engineers",
    text: "TypeScript-first, architecture that scales, performance that holds under pressure. I write code that's maintainable without ever being boring.",
  },
  {
    label: "Founders",
    text: "From zero to shipped in weeks. I own the full stack so you can stay focused on the product — no hand-holding required, just results.",
  },
  {
    label: "Designers",
    text: "I implement exactly what you design. Pixel-perfect, motion that feels intentional, and interactions that translate your vision into real code.",
  },
];

function ProjectThumb({
  project,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  return (
    <button
      className="text-left rounded-lg overflow-hidden transition-all duration-300 w-full shrink-0"
      style={{
        border: isActive
          ? "1px solid rgba(109,40,217,0.45)"
          : "1px solid rgba(109,40,217,0.12)",
        background: "rgba(250,247,255,0.92)",
        backdropFilter: "blur(10px)",
        boxShadow: isActive ? "0 0 0 3px rgba(109,40,217,0.08)" : "none",
        transform: isActive ? "scale(1.025)" : "scale(1)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <Image
          src={project.cover}
          alt={project.name}
          fill
          sizes="220px"
          className="object-cover transition-transform duration-500"
          style={{ transform: isActive ? "scale(1.06)" : "scale(1)" }}
        />
      </div>
    </button>
  );
}


const TERMINAL_LINES = [
  { prompt: "~", cmd: "whoami", out: "esteban" },
  { prompt: "~", cmd: "skills", out: "ts · react · next · node · gsap · three" },
  { prompt: "~", cmd: "status", out: "open to work ✦" },
];

function MiniTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), visibleLines === 0 ? 400 : 600);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <div
      className="rounded-lg px-3 py-2.5 flex flex-col gap-1.5"
      style={{
        border: "1px solid rgba(109,40,217,0.2)",
        background: "rgba(250,247,255,0.88)",
        backdropFilter: "blur(10px)",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span style={{ color: "#6d28d9", fontSize: 10 }}>❯</span>
            <span style={{ color: "#1e1030", fontSize: 10, opacity: 0.8 }}>{line.cmd}</span>
          </div>
          <span style={{ color: "rgba(30,16,48,0.45)", fontSize: 10, paddingLeft: 14 }}>{line.out}</span>
        </div>
      ))}
      {visibleLines < TERMINAL_LINES.length && (
        <div className="flex items-center gap-1.5">
          <span style={{ color: "#6d28d9", fontSize: 10 }}>❯</span>
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 10,
              background: "#6d28d9",
              opacity: 0.7,
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState<Project | null>(null);
  const [locked, setLocked] = useState<Project | null>(projects[0]);
  const active = locked ?? hovered;
  const rippleTriggerRef = useRef<((positions: { nx: number; ny: number }[]) => void) | null>(null);
  const lastBurstRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "b") return;
      const now = Date.now();
      if (now - lastBurstRef.current < 80) return;
      lastBurstRef.current = now;
      const positions = Array.from({ length: 5 }, () => ({
        nx: Math.random(),
        ny: Math.random(),
      }));
      rippleTriggerRef.current?.(positions);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="h-screen bg-[#faf7ff] flex relative overflow-hidden max-w-[100vw]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GridBackground
          variant="diamond"
          pixelSize={6}
          color="#6d28d9"
          patternScale={4}
          patternDensity={2}
          pixelSizeJitter={0}
          autoPauseOffscreen
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1}
          liquid={false}
          speed={0.25}
          edgeFade={0.18}
          transparent
          rippleTriggerRef={rippleTriggerRef}
        />
      </div>

      {/* Left panel — 25% */}
      <div
        className="relative z-10 flex flex-col justify-between h-full shrink-0 p-3"
        style={{ width: "25%" }}
      >
        {/* Single fused card */}
        <div
          className="flex flex-col gap-3 px-3 py-2 rounded-lg"
          style={{
            border: "1px solid rgba(109,40,217,0.2)",
            background: "rgba(250,247,255,0.88)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header con accent */}
          <div
            className="rounded-md px-3 py-3 flex flex-col gap-1"
            style={{ background: "rgba(109,40,217,0.08)" }}
          >
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 831 497" width={20} height={12} fill="none" aria-label="B2">
                <path d="M313.979 278.458C311.656 278.932 310.5 280.448 310.5 283C310.5 285.542 311.656 286.813 313.979 286.813C352.964 285.427 385.448 270.578 411.438 242.271C419.323 250.62 425.938 258.51 431.271 265.938C436.615 273.37 440.677 282.771 443.458 294.146C446.25 305.51 447.646 321.865 447.646 343.208C447.646 361.323 443.115 379.427 434.063 397.521C425.005 415.62 412.938 432.099 397.854 446.958C382.771 461.807 366.177 473.641 348.083 482.458C329.984 491.281 311.651 495.688 293.083 495.688H109.292C89.8021 495.688 71.7083 490.469 55 480.021C38.2917 469.578 24.9427 455.885 14.9583 438.938C4.98437 421.995 0 403.542 0 383.583V111.375C0 90.5 4.86458 71.8281 14.6042 55.3542C24.3542 38.8698 37.5833 25.7604 54.2917 16.0208C71 6.27084 89.3333 1.39584 109.292 1.39584H284.042C309.094 1.39584 332.297 7.55209 353.646 19.8542C375.005 32.1458 392.068 48.9688 404.833 70.3125C417.594 91.6615 423.979 115.563 423.979 142.021C423.979 163.828 419.104 184.25 409.354 203.292C399.604 222.323 386.484 238.333 370 251.333C353.526 264.323 334.854 273.365 313.979 278.458Z" fill="#6d28d9" />
                <path d="M499.142 496.375C478.725 496.375 460.043 491.271 443.1 481.063C426.168 470.854 412.71 457.281 402.725 440.333C392.751 423.391 387.767 404.938 387.767 384.979C387.767 368.271 391.361 352.844 398.559 338.688C405.751 324.536 414.454 311.656 424.663 300.042L536.059 189.354C537.902 187.495 538.132 185.641 536.746 183.792C535.356 181.932 533.501 181.469 531.184 182.396L474.079 222.771C452.272 217.677 434.402 208.745 420.475 195.979C406.559 183.219 396.579 168.479 390.538 151.771C384.512 135.063 382.309 117.891 383.934 100.25C385.559 82.6146 390.892 66.1354 399.934 50.8125C408.986 35.4948 421.632 23.1979 437.871 13.9167C454.121 4.64063 473.85 0 497.059 0H668.329C700.814 0 728.309 5.80729 750.809 17.4167C773.319 29.0156 791.08 44.3281 804.08 63.3542C817.08 82.3854 825.205 103.271 828.455 126.021C831.705 148.76 830.423 171.385 824.621 193.896C818.814 216.396 808.251 237.161 792.934 256.188C777.626 275.219 758.022 290.536 734.121 302.146C710.215 313.745 681.788 319.542 648.829 319.542H645.35C667.626 325.583 691.293 326.516 716.35 322.333C741.418 318.156 763.705 309.563 783.205 296.563C799.439 308.177 810.809 320.948 817.309 334.875C823.809 348.792 827.059 365.495 827.059 384.979C827.059 401.229 822.064 418.057 812.08 435.458C802.106 452.865 788.767 467.37 772.059 478.979C755.35 490.578 736.788 496.375 716.371 496.375H499.142Z" fill="#6d28d9" />
              </svg>
              <span className="text-xs font-mono font-bold" style={{ color: "#1e1030" }}>Esteban Canales</span>
            </div>
            <span className="text-[10px] font-mono" style={{ color: "rgba(109,40,217,0.7)" }}>
              Great Software Developer
            </span>
          </div>

          {/* Bio */}
          <p className="text-[10px] font-mono leading-relaxed" style={{ color: "#1e1030", opacity: 0.5 }}>
            Interfaces that have a heartbeat, code clean enough to be proud of. Off-screen: fast cars, good music, rabbit holes.
          </p>

          <div style={{ height: "1px", background: "rgba(109,40,217,0.1)" }} />

          {/* Tabs */}
          <div className="flex gap-1 flex-wrap">
            {audiences.map((a, i) => (
              <button
                key={a.label}
                onClick={() => setActiveTab(i)}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded transition-all duration-200"
                style={
                  i === activeTab
                    ? { border: "1px solid rgba(109,40,217,0.5)", color: "#6d28d9" }
                    : { border: "1px solid transparent", color: "#1e1030", opacity: 0.5 }
                }
              >
                {a.label}
              </button>
            ))}
          </div>

          <p
            key={activeTab}
            className="text-[10px] font-mono leading-relaxed"
            style={{ color: "#1e1030", opacity: 0.6, animation: "fade-in 0.2s ease-out both" }}
          >
            {audiences[activeTab].text}
          </p>

        </div>

        {/* Bottom: mini terminal + dado */}
        <div className="flex flex-col gap-2">
          <MiniTerminal />
        </div>
      </div>

      {/* Right panel — 75%: cards column + project detail */}
      <div className="relative z-10 flex-1 h-full flex gap-3 py-3 pr-3 min-w-0">
        {/* Cards column */}
        <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden shrink-0" style={{ width: 200 }}>
          {projects.map((project) => {
            const isActive = active?.id === project.id;
            return (
              <ProjectThumb
                key={project.id}
                project={project}
                isActive={isActive}
                onMouseEnter={() => setHovered(project)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setLocked((p) => (p?.id === project.id ? null : project))}
              />
            );
          })}
        </div>

        {/* Project detail panel */}
        <div
          className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden rounded-xl"
          style={{
            opacity: active ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          {active && (() => {
            const Panel = PANELS[active.id];
            return Panel ? <Panel /> : null;
          })()}
        </div>
      </div>
    </div>
  );
}
