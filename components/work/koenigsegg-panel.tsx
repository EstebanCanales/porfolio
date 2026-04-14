import Image from "next/image";
import TransitionLink from "@/components/transition-link";
import { ArrowUpRight } from "lucide-react";

const accent = "#B8C6E3";
const accentText = "#3B5C8E";

const TECH_SLUG: Record<string, string> = {
  "Next.js 16": "nextdotjs",
  "React 19": "react",
  "TypeScript 5": "typescript",
  "Tailwind CSS v4": "tailwindcss",
};

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

const tech = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "Canvas API",
  "IntersectionObserver",
  "requestAnimationFrame",
];

export default function KoenigseggPanel() {
  return (
    <div
      className="h-full overflow-y-auto rounded-lg"
      style={{
        width: "100%",
        border: `1px solid ${accent}60`,
        background: "rgba(250,247,255,0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* 1. Hero section — video con info superpuesta */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/koenigsegg/Hero-video.mp4" type="video/mp4" />
        </video>

        {/* Gradiente para legibilidad del texto */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, rgba(0,0,0,0.65) 100%)" }}
        />

        {/* Badge año */}
        <span
          className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ color: "#fff", backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          2026
        </span>

        {/* Info superpuesta — bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
          <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
            Design Engineer & Frontend Developer
          </p>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-mono font-light tracking-tight mb-0.5" style={{ color: "#fff" }}>
                KOENIGSEGG CC850
              </h2>
              <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
                Editorial Automotive Landing
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TransitionLink
                href="/koenigsegg-cc850"
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded transition-opacity hover:opacity-70"
                style={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.12)", border: `1px solid ${accent}` }}
              >
                Detail
              </TransitionLink>
              <a
                href="https://koenigsegg-cc-850.vercel.app"
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
      <div className="px-6 py-5" style={{ borderBottom: `1px solid ${accent}40` }}>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(30,16,48,0.7)" }}>
          Conceptual editorial experience inspired by Koenigsegg CC850. The site mixes cinematic
          scroll sequences, technical stat blocks, high-contrast typography, and full-screen visual
          storytelling. The latest iteration includes procedural frame loading for smoother performance
          and lower memory pressure during long scroll interactions.
        </p>
      </div>

      {/* 3. Demos — completas, sin recorte */}
      <div className="flex flex-col gap-px" style={{ borderBottom: `1px solid ${accent}40` }}>
        <Image
          src="/koenigsegg/Demo.jpg"
          alt="Koenigsegg demo"
          width={1920}
          height={1080}
          sizes="100%"
          className="w-full h-auto"
        />
        <div className="flex">
          <Image
            src="/koenigsegg/koenigsegg-engineering.png"
            alt="Koenigsegg engineering"
            width={1440}
            height={900}
            sizes="50%"
            className="w-1/2 h-auto"
          />
          <Image
            src="/koenigsegg/koenigsegg-precision.png"
            alt="Koenigsegg precision"
            width={1440}
            height={900}
            sizes="50%"
            className="w-1/2 h-auto"
          />
        </div>
      </div>

      {/* 4. Features / Learned / Stack */}
      <div className="px-6 py-6 flex flex-col gap-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(30,16,48,0.45)" }}>
            What was built
          </p>
          <ul className="space-y-2">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-xs leading-relaxed" style={{ color: "rgba(30,16,48,0.8)" }}>
                <span className="shrink-0 w-1 h-1 rounded-full mt-[5px]" style={{ backgroundColor: accentText }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(30,16,48,0.45)" }}>
            What we learned
          </p>
          <ul className="space-y-4">
            {learned.map((l) => {
              const dash = l.indexOf(" — ");
              const title = dash !== -1 ? l.slice(0, dash) : l;
              const body = dash !== -1 ? l.slice(dash + 3) : "";
              return (
                <li key={title}>
                  <span className="font-mono text-[11px] block mb-0.5" style={{ color: accentText }}>{title}</span>
                  {body && <span className="text-xs leading-relaxed" style={{ color: "rgba(30,16,48,0.65)" }}>{body}</span>}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(30,16,48,0.45)" }}>
            Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => {
              const slug = TECH_SLUG[t];
              return (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono rounded"
                  style={{ color: accentText, backgroundColor: `${accent}25`, border: `1px solid ${accent}70` }}
                >
                  {slug && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://cdn.simpleicons.org/${slug}`} alt="" width={10} height={10} style={{ filter: "brightness(0)", opacity: 0.5 }} />
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
