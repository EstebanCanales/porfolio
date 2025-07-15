"use client";
import ProjectCard from "../ProjectCard";

const projects = [
  {
    title: "Project One",
    description: "A short description of project one.",
    image: "/project-placeholder.jpg",
  },
  {
    title: "Project Two",
    description: "A short description of project two.",
    image: "/project-placeholder.jpg",
  },
  {
    title: "Project Three",
    description: "A short description of project three.",
    image: "/project-placeholder.jpg",
  },
  {
    title: "Project Four",
    description: "A short description of project four.",
    image: "/project-placeholder.jpg",
  },
  {
    title: "Project Five",
    description: "A short description of project five.",
    image: "/project-placeholder.jpg",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-12">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <ProjectCard project={projects[0]} />
        </div>
        <div className="md:col-span-4">
          <ProjectCard project={projects[1]} />
        </div>
        <div className="md:col-span-4">
          <ProjectCard project={projects[2]} />
        </div>
        <div className="md:col-span-8">
          <ProjectCard project={projects[3]} />
        </div>
        <div className="md:col-span-12">
          <ProjectCard project={projects[4]} />
        </div>
      </div>
    </section>
  );
}
