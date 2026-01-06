'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

// Icons
import { Github, Download, ArrowDown, Youtube } from 'lucide-react';
import { FaXTwitter, FaAws, FaDocker, FaLinkedinIn, FaNodeJs } from "react-icons/fa6";
import { SiKubernetes, SiTerraform, SiAnsible, SiJenkins, SiSpringboot, SiNextdotjs, SiTypescript, SiHtml5, SiCss3, SiJavascript, SiReact, SiSpring, SiHibernate, SiJsonwebtokens, SiNodedotjs, SiExpress, SiFastapi, SiPython, SiMysql, SiDocker, SiGithub, SiLangchain } from "react-icons/si";
import { FiGitlab } from 'react-icons/fi';
import { FaJava } from 'react-icons/fa';

const HeroSection = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef(null);
  
  // 1. Theme Configuration
  const themeStyles = darkMode ? {
    bg: "bg-[#030303]",
    textMain: "text-white",
    textMuted: "text-neutral-400",
    grid: "bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]",
    badgeBg: "bg-emerald-950/30 border-emerald-500/30 text-emerald-400",
    // Button Styles (Dark)
    btnPrimary: "bg-white text-black hover:bg-neutral-200 border-transparent",
    btnSecondary: "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20",
    gradientText: "from-white via-neutral-200 to-neutral-400",
    accentGradient: "from-emerald-600 to-teal-600",
    mask: "from-[#030303] to-transparent",
    socialBorder: "border-white/10 bg-white/5"
  } : {
    bg: "bg-white",
    textMain: "text-neutral-900",
    textMuted: "text-neutral-600",
    grid: "bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)]",
    badgeBg: "bg-emerald-50/50 border-emerald-200 text-emerald-700",
    // Button Styles (Light)
    btnPrimary: "bg-neutral-900 text-white hover:bg-neutral-800 border-transparent",
    btnSecondary: "bg-neutral-100 text-neutral-900 border-neutral-200 hover:bg-neutral-200",
    gradientText: "from-neutral-900 via-neutral-700 to-neutral-500",
    accentGradient: "from-emerald-600 to-teal-600",
    mask: "from-white to-transparent",
    socialBorder: "border-black/5 bg-black/5"
  };


const techStack = [
  // 🌐 Frontend
  { name: "JavaScript", Icon: SiJavascript, color: "text-[#F7DF1E]", category: "Frontend" }, // JS Yellow
  { name: "Python", Icon: SiPython, color: "text-[#3776AB]", category: "Backend" },      // Python Blue
  { name: "Spring", Icon: SiSpring, color: "text-[#6DB33F]", category: "Backend" },      // Spring Green
  { name: "Express.js", Icon: SiExpress, color: darkMode ? "text-white" : "text-black", category: "Backend" }, // Monochrome
  { name: "Terraform", Icon: SiTerraform, color: "text-[#7B42BC]", category: "DevOps" },  // Terraform Purple
  { name: "TypeScript", Icon: SiTypescript, color: "text-[#3178C6]", category: "Frontend" }, // TS Blue
  
  // 🧠 Backend
  { name: "Java", Icon: FaJava, color: "text-[#007396]", category: "Backend" },          // Java Blue
  { name: "HTML", Icon: SiHtml5, color: "text-[#E34F26]", category: "Frontend" },        // HTML Orange
  { name: "Ansible", Icon: SiAnsible, color: "text-[#EE0000]", category: "DevOps" },      // Ansible Red
  { name: "CSS", Icon: SiCss3, color: "text-[#1572B6]", category: "Frontend" },          // CSS Blue
  { name: "React.js", Icon: SiReact, color: "text-[#61DAFB]", category: "Frontend" },    // React Cyan
  { name: "GitHub", Icon: SiGithub, color: darkMode ? "text-white" : "text-black", category: "DevOps" }, // Official
  { name: "FastAPI", Icon: SiFastapi, color: "text-[#009688]", category: "Backend" },    // FastAPI Teal
  { name: "Spring Boot", Icon: SiSpringboot, color: "text-[#6DB33F]", category: "Backend" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "text-[#326CE5]", category: "DevOps" },// K8s Blue
  { name: "Hibernate", Icon: SiHibernate, color: "text-[#59666C]", category: "Backend" }, // Hibernate Gray
  { name: "JWT", Icon: SiJsonwebtokens, color: "text-[#D63AFF]", category: "Backend" },   // JWT Purple
  { name: "Node.js", Icon: SiNodedotjs, color: "text-[#339933]", category: "Backend" },   // Node Green
  
  { name: "AWS", Icon: FaAws, color: "text-[#FF9900]", category: "Cloud" },               // AWS Orange
  // 🗄️ Database
  { name: "MySQL", Icon: SiMysql, color: "text-[#4479A1]", category: "Database" },        // MySQL Blue

  // ☁️ Cloud & DevOps
  { name: "Docker", Icon: SiDocker, color: "text-[#2496ED]", category: "DevOps" },        // Docker Blue
  { name: "Next.js", Icon: SiNextdotjs, color: darkMode ? "text-white" : "text-black", category: "Frontend" }, // Official
  { name: "Jenkins", Icon: SiJenkins, color: "text-[#D24939]", category: "DevOps" },      // Jenkins Red

  // 🤖 AI / LLM
  { name: "LangChain", Icon: SiLangchain, color: "text-[#7C3AED]", category: "AI" },      // LangChain Purple
];

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".hero-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .fromTo(".hero-title-1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-title-2", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".tech-marquee", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.3")
        .fromTo(".hero-btn", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.6")
        .fromTo(".hero-social", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={heroRef}
      className={`relative w-full flex flex-col items-center justify-center overflow-hidden ${themeStyles.bg} transition-colors duration-500`}
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 lg:pb-5 flex flex-col items-center text-center">
        
        {/* A. SYSTEM STATUS BADGE */}
        <div className={`hero-badge mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md shadow-lg ${themeStyles.badgeBg}`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              Available for Work
          </span>
        </div>

        {/* B. MAIN HEADLINE */}
        <h1 className="flex flex-col gap-2 mb-6 sm:mb-8 font-bold tracking-tight leading-[1.1]">
          <span className={`hero-title-1 text-4xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b ${themeStyles.gradientText}`}>
            Designing Systems
          </span>
          <span className="hero-title-2 relative inline-block text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${themeStyles.accentGradient}`}>
              That Scale Beyond Code
            </span>
          </span>
        </h1>

        {/* C. DESCRIPTION */}
        <p className={`hero-desc text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium ${themeStyles.textMuted}`}>
          Cloud Architect & Full-Stack Engineer specializing in scalable web apps and production-ready infrastructure.
        </p>

        {/* D. TECH STACK MARQUEE */}
        <div className="tech-marquee relative w-full max-w-4xl mb-12 overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r ${themeStyles.mask}`}></div>
            <div className={`absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l ${themeStyles.mask}`}></div>

            <motion.div 
                className="flex items-center gap-12 sm:gap-20 w-max"
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            >
                {[...techStack, ...techStack].map((tech, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center">
                        <tech.Icon className={`text-3xl sm:text-4xl ${tech.color}`} />
                    </div>
                ))}
            </motion.div>
        </div>

        {/* E. ACTION BUTTONS (Optimized for Mobile) */}
        {/* Using Grid for perfect side-by-side on mobile, Flex on Desktop */}
        <div className="hero-btn grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-5 w-full max-w-md sm:max-w-none justify-center items-center mb-12">
          
          <a
            href="/EklakResume.pdf"
            download
            className={`group relative flex items-center justify-center gap-2 px-4 py-3 sm:px-8 sm:py-4 rounded-xl font-bold overflow-hidden transition-all active:scale-95 shadow-xl ${themeStyles.btnPrimary}`}
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-base">Resume</span>
          </a>
          
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className={`group flex items-center justify-center gap-2 px-4 py-3 sm:px-8 sm:py-4 rounded-xl font-bold transition-all active:scale-95 border ${themeStyles.btnSecondary}`}
          >
             <span className="text-xs sm:text-base">Architecture</span>
             <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
          </button>

        </div>

        {/* F. SOCIAL FOOTER (The "Dock" Look) */}
        <div className="hero-social">
            <div className={`inline-flex items-center gap-3 sm:gap-4 px-6 py-3 rounded-2xl ${themeStyles.socialBorder}`}>
                {[
                    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/eklak-alam-40ba632b5/" },
                    { Icon: Github, href: "https://github.com/Eklak-Alam" },
                    { Icon: FiGitlab, href: "https://gitlab.com/eklakalam420" },
                    { Icon: FaXTwitter, href: "https://x.com/eklak__alam" },
                    { Icon: Youtube, href: "https://www.youtube.com/@eklakalam04" }
                ].map((link, idx) => (
                    <a 
                        key={idx} 
                        href={link.href}
                        target="_blank"
                        className={`group relative p-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500/10`}
                    >
                        <link.Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${themeStyles.textMuted} group-hover:text-emerald-500 transition-colors`} />
                    </a>
                ))}
            </div>
        </div>

      </div>

      <style jsx>{`
        .bg-radial-gradient {
            background: radial-gradient(circle at center, transparent 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;