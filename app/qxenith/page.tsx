import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const accent = "#06D6A0";

const TECH_SLUG: Record<string, string> = {
  "Next.js 16": "nextdotjs",
  "React 19": "react",
  "TypeScript 5": "typescript",
  "Tailwind CSS v4": "tailwindcss",
  "GSAP 3.14": "greensock",
  "Simple Icons": "simpleicons",
};

const tech = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "GSAP 3.14",
  "Simple Icons",
  "Geist / Nanum Brush Script",
];

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

export const metadata: Metadata = {
  title: "QXENITH",
  description:
    "Full production website for QXENITH — a digital studio built around the idea that interfaces should feel alive.",
  openGraph: {
    title: "QXENITH",
    description:
      "Full production website for QXENITH — a digital studio built around the idea that interfaces should feel alive.",
  },
};

export default function QxenithPage() {
  return (
    <div className="min-h-screen bg-[#0f0c0a] flex flex-col relative">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: [
            `radial-gradient(ellipse 90% 45% at 50% -5%, ${accent}22 0%, transparent 65%)`,
            `radial-gradient(${accent}12 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "100% 100%, 28px 28px",
        }}
      />

      <Navbar accent={accent} />

      <main className="flex-1 flex flex-col px-6 md:px-10 lg:px-16 pt-20 pb-20 relative z-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono mb-12 group w-fit"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: accent }}>
            2026 · Creative Technologist
          </p>
          <div className="flex items-center justify-between gap-4 mb-1">
            <h1 className="text-3xl md:text-5xl font-light font-mono tracking-tight text-foreground">
              QXENITH
            </h1>
          </div>
          <p className="text-sm font-mono text-muted-foreground">Digital Studio Website</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-10" style={{ backgroundColor: `${accent}30` }} />

        {/* Description */}
        <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl mb-8">
          Full production website for QXENITH — a digital studio built around the idea that interfaces
          should feel alive. Every interaction was designed from scratch: a 6×6 flip-card hero grid
          that expands on scroll, a morphing circular navigation menu, animated SVG color bars in 7
          geometric variants, a bilingual Korean/English design system, and a custom Playwright-based
          screenshot CLI. The site runs on Next.js 16 with React 19, GSAP for all orchestrated motion,
          and Tailwind CSS v4.
        </p>

        {/* View Project button — bigger, below description */}
        <a
          href="https://qxenith.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded transition-opacity hover:opacity-70 group mb-14 w-fit"
          style={{
            color: accent,
            backgroundColor: `${accent}15`,
            border: `1px solid ${accent}40`,
          }}
        >
          View Project
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Screenshots */}
        <div className="flex flex-col gap-4 mb-14">
          {["/qxenith/qxenith-01.jpg", "/qxenith/qxenith-02.jpg"].map((src, i) => (
            <div
              key={src}
              className="w-full overflow-hidden rounded-lg"
              style={{ border: `1px solid ${accent}30` }}
            >
              <Image
                src={src}
                alt={`QXENITH screenshot ${i + 1}`}
                width={1440}
                height={900}
                sizes="(max-width: 1024px) 100vw, 90vw"
                className="w-full h-auto"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Technical grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-5 text-muted-foreground/60">
              What was built
            </p>
            <ul className="space-y-3.5">
              {features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-foreground/75 leading-relaxed">
                  <span className="shrink-0 w-1 h-1 rounded-full mt-[7px]" style={{ backgroundColor: accent }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-5 text-muted-foreground/60">
              What we learned
            </p>
            <ul className="space-y-5">
              {learned.map((l) => {
                const dash = l.indexOf(" — ");
                const title = dash !== -1 ? l.slice(0, dash) : l;
                const body = dash !== -1 ? l.slice(dash + 3) : "";
                return (
                  <li key={title}>
                    <span className="font-mono text-[11px] block mb-1" style={{ color: accent }}>
                      {title}
                    </span>
                    {body && (
                      <span className="text-sm text-foreground/65 leading-relaxed">{body}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-12 max-w-4xl">
          <p className="text-[10px] font-mono uppercase tracking-widest mb-3 text-muted-foreground/60">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => {
              const slug = TECH_SLUG[t];
              return (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded"
                  style={{
                    color: accent,
                    backgroundColor: `${accent}12`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  {slug && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt=""
                      width={12}
                      height={12}
                      style={{ filter: "brightness(0) invert(1)", opacity: 0.7 }}
                    />
                  )}
                  {t}
                </span>
              );
            })}
          </div>
        </div>
      </main>

      <Footer accent={accent} />
    </div>
  );
}
