import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about";
import ProjectsSection from "@/components/sections/proyects";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
