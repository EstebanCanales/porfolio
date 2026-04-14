import Image from "next/image";
import TransitionLink from "@/components/transition-link";
import { ArrowUpRight } from "lucide-react";

const accent = "#06D6A0";
const accentText = "#047A5E";

const TECH_SLUG: Record<string, string> = {
  "Next.js 16": "nextdotjs",
  "React 19": "react",
  "TypeScript 5": "typescript",
  "Tailwind CSS v4": "tailwindcss",
  "GSAP 3.14": "greensock",
  "Simple Icons": "simpleicons",
  "Vercel Analytics": "vercel",
  Playwright: "playwright",
};

const features = [
  "6×6 flip-card hero grid with GSAP ripple expansion and hover trail system",
  "Morphing circular menu using GSAP timeline — compact button ↔ full panel",
  "7 animated SVG color bar variants: vertical, horizontal, diagonal, L-shape, Z-shape, cascade",
  "SegmentedText virtual canvas — all cards share a single coordinate space for aligned typography",
  "Custom scroll container with WheelEvent dispatch and cross-device compatibility",
  "Company logo marquee with Simple Icons and seamless CSS loop",
  "Playwright CLI tool for automated design-ready screenshots across breakpoints",
  "Fully bilingual — English copy with Korean 한국어 translations throughout",
];

const learned = [
  "CSS Grid gap and sub-pixel rendering — gap:0 alone doesn't eliminate 1px artifacts between 3D-context elements; a -0.5px inset on CardFace fixes the compositing gap",
  "SegmentedText virtual canvas pattern — all N×N cards share a cols×100% by rows×100% coordinate space, making any horizontal edge appear across all columns simultaneously",
  "GSAP + CSS transition coexistence — running GSAP rotateX on a card while CSS transitions border-radius requires careful timing to avoid mid-animation state conflicts",
  "clamp() minimum trap — clamp(600px, 100vw, 1000px) returns 600px on mobile because 100vw=390px falls below the minimum, causing a full-width logo to become the CSS minimum",
  "styled-jsx keyframe scoping — keyframes defined in <style jsx> get renamed internally; references in inline animation styles break silently",
  "Custom scroll containers and Playwright — fullPage screenshots require overflow:visible on the container, and WheelEvent dispatch is needed to trigger React scroll listeners",
  "React Compiler with GSAP — useRef-based imperative animations conflict with compiler memoization; escape hatches via useMemo on derived state resolve the issue",
];

const tech = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "GSAP 3.14",
  "Simple Icons",
  "Vercel Analytics",
  "Playwright",
  "Geist / Nanum Brush Script",
];

export default function QxenithPanel() {
  return (
    <div
      className="h-full overflow-y-auto rounded-lg"
      style={{
        width: "100%",
        border: `1px solid ${accent}30`,
        background: "rgba(250,247,255,0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* 1. Hero section — imagen con info superpuesta */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <video
          muted
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/qxenith/qxenith-video.mp4" type="video/mp4" />
        </video>

        {/* Gradiente para legibilidad */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 30%, rgba(0,0,0,0.70) 100%)",
          }}
        />

        {/* Info superpuesta — bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-1"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Creative Technologist
          </p>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2
                className="text-2xl font-mono font-light tracking-tight mb-0.5"
                style={{ color: "#fff" }}
              >
                QXENITH
              </h2>
              <p
                className="text-xs font-mono"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Digital Studio Website
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TransitionLink
                href="/qxenith"
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded transition-opacity hover:opacity-70"
                style={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.12)", border: `1px solid ${accent}` }}
              >
                Detail
              </TransitionLink>
              <a
                href="https://qxenith.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded transition-opacity hover:opacity-70 group"
                style={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.12)", border: `1px solid ${accent}` }}
              >
                Live
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Descripción */}
      <div
        className="px-6 py-5"
        style={{ borderBottom: `1px solid ${accent}25` }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(30,16,48,0.7)" }}
        >
          Full production website for QXENITH — a digital studio built around
          the idea that interfaces should feel alive. Every interaction was
          designed from scratch: a 6×6 flip-card hero grid that expands on
          scroll, a morphing circular navigation menu, animated SVG color bars
          in 7 geometric variants, a bilingual Korean/English design system, and
          a custom Playwright-based screenshot CLI.
        </p>
      </div>

      {/* 3. Demos — completas, sin recorte */}
      <div
        className="flex flex-col gap-px"
        style={{ borderBottom: `1px solid ${accent}25` }}
      >
        <Image
          src="/qxenith/qxenith-01.jpg"
          alt="QXENITH demo 1"
          width={1440}
          height={900}
          sizes="100%"
          className="w-full h-auto"
        />
        <Image
          src="/qxenith/qxenith-02.jpg"
          alt="QXENITH demo 2"
          width={1440}
          height={900}
          sizes="100%"
          className="w-full h-auto"
        />
      </div>

      {/* 4. Features / Learned / Stack */}
      <div className="px-6 py-6 flex flex-col gap-6">
        <div>
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-3"
            style={{ color: "rgba(30,16,48,0.45)" }}
          >
            What was built
          </p>
          <ul className="space-y-2">
            {features.map((f) => (
              <li
                key={f}
                className="flex gap-2.5 text-xs leading-relaxed"
                style={{ color: "rgba(30,16,48,0.8)" }}
              >
                <span
                  className="shrink-0 w-1 h-1 rounded-full mt-[5px]"
                  style={{ backgroundColor: accentText }}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-3"
            style={{ color: "rgba(30,16,48,0.45)" }}
          >
            What we learned
          </p>
          <ul className="space-y-4">
            {learned.map((l) => {
              const dash = l.indexOf(" — ");
              const title = dash !== -1 ? l.slice(0, dash) : l;
              const body = dash !== -1 ? l.slice(dash + 3) : "";
              return (
                <li key={title}>
                  <span
                    className="font-mono text-[11px] block mb-0.5"
                    style={{ color: accentText }}
                  >
                    {title}
                  </span>
                  {body && (
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: "rgba(30,16,48,0.65)" }}
                    >
                      {body}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-3"
            style={{ color: "rgba(30,16,48,0.45)" }}
          >
            Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => {
              const slug = TECH_SLUG[t];
              return (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono rounded"
                  style={{
                    color: accentText,
                    backgroundColor: `${accent}18`,
                    border: `1px solid ${accent}45`,
                  }}
                >
                  {slug && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt=""
                      width={10}
                      height={10}
                      style={{ filter: "brightness(0)", opacity: 0.5 }}
                    />
                  )}
                  {t}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
