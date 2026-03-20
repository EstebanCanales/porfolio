import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const accent = "#B8C6E3";

const TECH_SLUG: Record<string, string> = {
  "Next.js 16": "nextdotjs",
  "React 19": "react",
  "TypeScript 5": "typescript",
  "Tailwind CSS v4": "tailwindcss",
};

const tech = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "Canvas API",
  "IntersectionObserver",
  "requestAnimationFrame",
];

const features = [
  "Scroll-driven canvas sequence for hero visuals",
  "Second cinematic section with dynamic headline transitions",
  "Technical specs block redesigned with carbon-fiber visual language",
  "Section-by-section editorial composition with automotive art direction",
  "Sticky navigation with live scroll progress feedback",
  "Responsive behavior for desktop and mobile captures",
];

const learned = [
  "Progressive frame loading outperforms eager preload in long scroll narratives",
  "IntersectionObserver + requestAnimationFrame prevents unnecessary off-screen rendering work",
  "Lightweight cache eviction keeps memory stable without sacrificing perceived smoothness",
  "Art-direction tweaks (text position, shadow depth, contrast) matter as much as motion for premium feel",
];

export const metadata: Metadata = {
  title: "KOENIGSEGG CC850",
  description:
    "Conceptual editorial experience inspired by Koenigsegg CC850. Cinematic scroll sequences, technical stat blocks, and full-screen visual storytelling.",
  openGraph: {
    title: "KOENIGSEGG CC850",
    description:
      "Conceptual editorial experience inspired by Koenigsegg CC850.",
  },
};

export default function KoenigseggPage() {
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

      <main className="flex-1 flex flex-col px-6 md:px-10 lg:px-16 pt-20 pb-20 relative z-10 overflow-x-hidden">
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
            2026 · Design Engineer & Frontend Developer
          </p>
          <div className="flex items-center justify-between gap-4 mb-1">
            <h1 className="text-3xl md:text-5xl font-light font-mono tracking-tight text-foreground">
              KOENIGSEGG CC850
            </h1>
          </div>
          <p className="text-sm font-mono text-muted-foreground">Editorial Automotive Landing</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-10" style={{ backgroundColor: `${accent}30` }} />

        {/* Description */}
        <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl mb-8">
          Conceptual editorial experience inspired by Koenigsegg CC850. The site mixes cinematic
          scroll sequences, technical stat blocks, high-contrast typography, and full-screen visual
          storytelling. The latest iteration includes procedural frame loading for smoother performance
          and lower memory pressure during long scroll interactions.
        </p>

        {/* View Project button — bigger, below description */}
        <a
          href="https://koenigsegg-cc-850.vercel.app"
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

        {/* Gallery */}
        <div className="mb-14 space-y-4">

          {/* Hero image — full bleed */}
          <div className="-mx-6 md:-mx-10 lg:-mx-30 relative overflow-hidden h-[420px] md:h-[1000px]">
            <Image
              src="/koenigsegg/koenigsegg-hero.png"
              alt="Koenigsegg hero"
              fill
              sizes=""
              className="object-cover"
              priority
            />
          </div>

          {/* Chamber + Engineering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-lg border border-white/10 h-[300] md:h-[300]">
              <Image
                src="/koenigsegg/koenigsegg-chamber.png"
                alt="Koenigsegg chamber"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg border border-white/10 h-[300] md:h-[300]">
              <Image
                src="/koenigsegg/koenigsegg-engineering.png"
                alt="Koenigsegg engineering"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Video standalone */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="relative overflow-hidden rounded-lg border border-white/10 h-[300] md:h-[800]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/koenigsegg/Hero-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Demo — altura completa, sin recorte */}
          <div className="overflow-hidden rounded-lg border border-white/10">
            <Image
              src="/koenigsegg/Demo.jpg"
              alt="Koenigsegg demo"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>

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
