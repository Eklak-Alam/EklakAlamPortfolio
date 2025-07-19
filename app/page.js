import { AboutSection } from "@/components/About";
import { Contact } from "@/components/Contact";
import HeroSection from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { TestimonialsSection } from "@/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section with smooth scroll anchor */}
        <section id="home" >
          <HeroSection />
        </section>

        {/* About Section with decorative elements */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Tech Stack with animated background */}
        <section id="tech-stack" >
          <TechStack />
        </section>

        {/* Projects Section with visual separation */}
        <section id="projects">
          <Projects />
        </section>

        {/* Testimonials with subtle background */}
        <section id="testimonials" >
          <TestimonialsSection />
        </section>

        {/* Contact Section with visual emphasis */}
        <section id="contact" >
          <Contact />
        </section>
      </main>
    </>
  );
}