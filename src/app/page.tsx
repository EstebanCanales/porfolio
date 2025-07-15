import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import AboutMeSection from "@/components/sections/about-me";
import ProjectsSection from "@/components/sections/proyects";
import ContactSection from "@/components/sections/contact";

export default function Home() {
  return (
    <section className="bg-[#252423]">
      <Navbar />
      <HeroSection />
      <AboutMeSection />
      <ProjectsSection />
      <ContactSection />
    </section>
  );
}
