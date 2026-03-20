export interface Project {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role?: string;
  features?: string[];
  learned?: string[];
  tech: string[];
  year: string;
  link: string;
  images?: string[];   // screenshots — used for hover film flash on home
  promos?: string[];   // promo shots — shown on the project detail page
  accent: string;        // grid + UI accent color
  accentDim: string;     // muted version for backgrounds
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "qxenith",
    name: "QXENITH",
    tagline: "Digital Studio Website",
    description:
      "Full production website for QXENITH — a digital studio built around the idea that interfaces should feel alive. Every interaction was designed from scratch: a 6×6 flip-card hero grid that expands on scroll, a morphing circular navigation menu, animated SVG color bars in 7 geometric variants, a bilingual Korean/English design system, and a custom Playwright-based screenshot CLI. The site runs on Next.js 16 with React 19, GSAP for all orchestrated motion, and Tailwind CSS v4.",
    role: "Lead Engineer & Creative Technologist",
    features: [
      "6×6 flip-card hero grid with GSAP ripple expansion and hover trail system",
      "Morphing circular menu using GSAP timeline — compact button ↔ full panel",
      "7 animated SVG color bar variants: vertical, horizontal, diagonal, L-shape, Z-shape, cascade",
      "SegmentedText virtual canvas — all cards share a single coordinate space for aligned typography",
      "Custom scroll container with WheelEvent dispatch and cross-device compatibility",
      "Company logo marquee with Simple Icons and seamless CSS loop",
      "Playwright CLI tool for automated design-ready screenshots across breakpoints",
      "Fully bilingual — English copy with Korean 한국어 translations throughout",
    ],
    learned: [
      "CSS Grid gap and sub-pixel rendering — gap:0 alone doesn't eliminate 1px artifacts between 3D-context elements; a -0.5px inset on CardFace fixes the compositing gap",
      "SegmentedText virtual canvas pattern — all N×N cards share a cols×100% by rows×100% coordinate space, making any horizontal edge appear across all columns simultaneously",
      "GSAP + CSS transition coexistence — running GSAP rotateX on a card while CSS transitions border-radius requires careful timing to avoid mid-animation state conflicts",
      "clamp() minimum trap — clamp(600px, 100vw, 1000px) returns 600px on mobile because 100vw=390px falls below the minimum, causing a full-width logo to become the CSS minimum",
      "styled-jsx keyframe scoping — keyframes defined in <style jsx> get renamed internally; references in inline animation styles break silently",
      "Custom scroll containers and Playwright — fullPage screenshots require overflow:visible on the container, and WheelEvent dispatch is needed to trigger React scroll listeners",
      "React Compiler with GSAP — useRef-based imperative animations conflict with compiler memoization; escape hatches via useMemo on derived state resolve the issue",
    ],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "GSAP 3.14",
      "Simple Icons",
      "Vercel Analytics",
      "Playwright",
      "Geist / Nanum Brush Script",
    ],
    year: "2026",
    link: "https://qxenith.com",
    promos: ["/qxenith/qxenith-01.jpg", "/qxenith/qxenith-02.jpg"],
    images: [
      "/qxenith/qxenith-home.png",
      "/qxenith/qxenith-projects.png",
      "/qxenith/qxenith-services.png",
      "/qxenith/qxenith-about.png",
      "/qxenith/qxenith-contact.png",
    ],
    accent: "#06D6A0",
    accentDim: "#06D6A015",
  },
  {
    id: 2,
    slug: "koenigsegg-cc850",
    name: "KOENIGSEGG CC850",
    tagline: "Editorial Automotive Landing",
    description:
      "Conceptual editorial experience inspired by Koenigsegg CC850. The site mixes cinematic scroll sequences, technical stat blocks, high-contrast typography, and full-screen visual storytelling. The latest iteration includes procedural frame loading for smoother performance and lower memory pressure during long scroll interactions.",
    role: "Design Engineer & Frontend Developer",
    features: [
      "Scroll-driven canvas sequence for hero visuals",
      "Second cinematic section with dynamic headline transitions",
      "Technical specs block redesigned with carbon-fiber visual language",
      "Section-by-section editorial composition with automotive art direction",
      "Sticky navigation with live scroll progress feedback",
      "Responsive behavior for desktop and mobile captures",
    ],
    learned: [
      "Progressive frame loading outperforms eager preload in long scroll narratives",
      "IntersectionObserver + requestAnimationFrame prevents unnecessary off-screen rendering work",
      "Lightweight cache eviction keeps memory stable without sacrificing perceived smoothness",
      "Art-direction tweaks (text position, shadow depth, contrast) matter as much as motion for premium feel",
    ],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Canvas API",
      "IntersectionObserver",
      "requestAnimationFrame",
    ],
    year: "2026",
    link: "https://koenigsegg-cc-850.vercel.app",
    promos: [
      "/koenigsegg/koenigsegg-full-page.png",
      "/koenigsegg/koenigsegg-engineering.png",
      "/koenigsegg/koenigsegg-precision.png",
    ],
    images: [
      "/koenigsegg/koenigsegg-hero.png",
      "/koenigsegg/koenigsegg-engineering.png",
      "/koenigsegg/koenigsegg-specs.png",
      "/koenigsegg/koenigsegg-finality.png",
      "/koenigsegg/koenigsegg-precision.png",
    ],
    accent: "#B8C6E3",
    accentDim: "#B8C6E315",
  },
];
