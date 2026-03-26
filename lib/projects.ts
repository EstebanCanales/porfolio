export interface Project {
  id: number;
  slug: string;
  name: string;
  link: string;
  cover: string; // imagen para la card thumbnail en /work
  accent: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "qxenith",
    name: "QXENITH",
    link: "https://qxenith.vercel.app",
    cover: "/qxenith/qxenith-home.png",
    accent: "#06D6A0",
  },
  {
    id: 2,
    slug: "koenigsegg-cc850",
    name: "KOENIGSEGG CC850",
    link: "https://koenigsegg-cc-850.vercel.app",
    cover: "/koenigsegg/koenigsegg-hero.png",
    accent: "#B8C6E3",
  },
];
