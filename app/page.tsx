import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import TechStack from "@/app/components/TechStack";
import DevelopmentPhases from "@/app/components/DevelopmentPhases";
import Projects from "@/app/components/Projects";
import Testimonials from "@/app/components/Testimonials";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Testimonials />
      <DevelopmentPhases />
      <Contact />
      <Footer />
    </main>
  );
}
