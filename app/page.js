import { AboutSection } from "@/components/About";
import { Contact } from "@/components/Contact";
import { DevOpsProjects } from "@/components/DevOpsProjects";
import HeroSection from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
// import { TechStack } from "@/components/TechStack";
// import { TestimonialsSection } from "@/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <main className="bg-white dark:bg-[#050505]">
        
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Tech Stack (Currently hidden) */}
        {/* <section id="tech-stack">
          <TechStack />
        </section> */}

        {/* Full Stack Projects Section */}
        <section id="work">
          <Projects />
        </section>

        {/* DevOps Projects Section - Added specific ID here */}
        <section id="devops">
          <DevOpsProjects />
        </section>

        {/* Testimonials (Currently hidden) */}
        <section id="testimonials">
          {/* <TestimonialsSection /> */}
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

      </main>
    </>
  );
}