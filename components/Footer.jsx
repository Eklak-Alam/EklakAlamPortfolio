"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

// --- 2. MAIN FOOTER COMPONENT ---
export function Footer() {
  const { darkMode } = useTheme();

  // --- SMOOTH SCROLL FUNCTION ---
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId.toLowerCase());
    if (element) {
      const offset = 80; // Adjust for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // STRICT BLACK & WHITE CONFIGURATION
  const themeStyles = darkMode ? {
    bg: "bg-[#050505]", 
    text: "text-white",
    subText: "text-neutral-500",
    border: "border-neutral-800",
    grid: "bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
    nameGradient: "bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-600",
    dot: "bg-white"
  } : {
    bg: "bg-white",
    text: "text-neutral-900",
    subText: "text-neutral-500",
    border: "border-neutral-200",
    grid: "bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]",
    nameGradient: "text-neutral-900",
    dot: "bg-black"
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: FiLinkedin, href: 'https://www.linkedin.com/in/eklak-alam/' },
    { name: 'GitHub', icon: FiGithub, href: 'https://github.com/Eklak-Alam' },
    { name: 'Twitter', icon: FiTwitter, href: 'https://x.com/eklak__alam' }
  ];

  const roles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cloud Architect",
    "GenAI Engineer",
  ];

  const sitemap = ['Home', 'About', 'Projects', 'DevOps', 'Contact'];

  return (
    <footer className={`relative w-full pt-20 sm:pt-32 overflow-hidden ${themeStyles.bg} transition-colors duration-500`}>
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* TOP SECTION: Call to Action */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-0 mb-24 sm:mb-32">
          
          {/* Left: Heading */}
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-10 ${themeStyles.text}`}
            >
              Let’s build the <br />
              <span className="opacity-30 font-serif italic">impossible.</span>
            </motion.h2>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex gap-16 sm:gap-24 text-sm sm:text-base">
             {/* Sitemap */}
             <div className="flex flex-col gap-6">
                <h4 className={`font-mono text-xs tracking-widest uppercase opacity-50 ${themeStyles.text}`}>Sitemap</h4>
                <ul className={`flex flex-col gap-3 ${themeStyles.text}`}>
                  {sitemap.map((item, i) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <a 
                        href={`#${item.toLowerCase()}`} 
                        onClick={(e) => handleScroll(e, item)}
                        className="hover:opacity-50 transition-opacity cursor-pointer block"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
             </div>

             {/* Socials */}
             <div className="flex flex-col gap-6">
                <h4 className={`font-mono text-xs tracking-widest uppercase opacity-50 ${themeStyles.text}`}>Socials</h4>
                <ul className={`flex flex-col gap-3 ${themeStyles.text}`}>
                  {socialLinks.map((item, i) => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:opacity-50 transition-opacity cursor-pointer">
                        {item.name}
                        <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
             </div>
          </div>
        </div>

        {/* MIDDLE: Ticker (Fixed Spacing & Added Dot) */}
        <div className={`w-full border-t border-b py-4 sm:py-6 mb-20 overflow-hidden flex ${themeStyles.border}`}>
           <motion.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 30, ease: "linear", repeat: Infinity }}
             // NOTE: Gap here (gap-12 sm:gap-24) matches the gap inside the map below to ensure even spacing
             className={`flex whitespace-nowrap gap-12 sm:gap-24 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] ${themeStyles.subText}`}
           >
             {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-10 sm:gap-14">
                {roles.map((role, index) => (
                  <span key={index} className="flex items-center gap-3">
                    {/* The Dot Separator */}
                    <span className={`w-1.5 h-1.5 rounded-full ${themeStyles.dot}`} />
                    <span>{role}</span>
                  </span>
                ))}
              </span>
            ))}
           </motion.div>
        </div>

        {/* BOTTOM: THE BIG NAME */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative w-full text-center select-none"
        >
           <h1 className={`
             text-[13vw] sm:text-[14.5vw] 
             leading-[0.8] 
             font-black 
             tracking-tighter 
             mix-blend-overlay opacity-90
             ${themeStyles.nameGradient}
           `}>
             EKLAK ALAM
           </h1>
        </motion.div>

        {/* COPYRIGHT */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 sm:py-12 mt-4 sm:mt-12 opacity-30 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
           <span>© 2026 Eklak Alam — All Rights Reserved.</span>
           <span className="mt-2 sm:mt-0">
             Full-Stack Engineer • DevOps • Cloud Architecture
            </span>
        </div>

      </div>
    </footer>
  );
}