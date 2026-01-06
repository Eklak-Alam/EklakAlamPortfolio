"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { allProjects } from "@/constants/projectDetails"; // Ensure this points to your NEW data structure
import ProjectModal from "./ProjectModal";

// Icons
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Layers, FolderGit2, Activity, Server } from "lucide-react";

export function Projects() {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Theme Config (Clean Monochrome + Gradient Text)
  const themeStyles = darkMode ? {
    bg: "bg-[#050505]",
    textMain: "text-white",
    textSub: "text-neutral-400",
    textDim: "text-neutral-500",
    cardBg: "bg-[#0A0A0A]",
    cardBorder: "border-white/10",
    // Dark Mode Hover: Subtle Glow
    cardHover: "hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)]", 
    badgeBg: "bg-white/5 text-neutral-300 border-white/10",
    statusLive: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    statusDev: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    textGradient: "from-white via-neutral-200 to-neutral-400", 
  } : {
    bg: "bg-white",
    textMain: "text-neutral-900",
    textSub: "text-neutral-600",
    textDim: "text-neutral-400",
    cardBg: "bg-white",
    cardBorder: "border-black/5",
    cardHover: "hover:border-black/10 hover:shadow-2xl",
    badgeBg: "bg-black/5 text-neutral-700 border-black/10",
    statusLive: "bg-emerald-100 text-emerald-700 border-emerald-200",
    statusDev: "bg-amber-100 text-amber-700 border-amber-200",
    textGradient: "from-neutral-900 via-neutral-700 to-neutral-500",
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); 
  };

  // Helper: Flatten the nested techStack object into a single array for preview
  const getPreviewStack = (techStack) => {
    if (Array.isArray(techStack)) return techStack; // Fallback for old data
    const list = [];
    // Prioritize core technologies
    if (techStack.frontend) list.push(...techStack.frontend);
    if (techStack.backend) list.push(...techStack.backend);
    if (techStack.ai) list.push(...techStack.ai);
    if (techStack.cloud) list.push(...techStack.cloud);
    // Return top 5 unique tags
    return [...new Set(list)].slice(0, 5); 
  };

  return (
    <section
      id="projects"
      className={`w-full relative overflow-hidden pt-24 lg:pb-10 px-4 sm:px-6 lg:px-8 ${themeStyles.bg} transition-colors duration-500`}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 2. SECTION HEADER (Terminal Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${themeStyles.cardBorder} ${themeStyles.badgeBg}`}>
               <Layers className={`w-4 h-4`} />
               <span className={`text-xs font-mono font-bold tracking-wider uppercase`}>
                 /Development
               </span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${themeStyles.textMain}`}>
              Selected Works
            </h2>
          </div>
          
          <div className="md:text-right max-w-md">
             <p className={`text-base md:text-lg ${themeStyles.textSub} leading-relaxed`}>
               Architecting scalable solutions with a focus on performance, security, and business impact.
             </p>
          </div>
        </motion.div>

        {/* 3. PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => {
            const previewStack = getPreviewStack(project.techStack);
            const isLive = project.status?.toLowerCase().includes("live");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => handleProjectClick(project)}
                className={`group flex flex-col rounded-xl border cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 
                  ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardHover}`}
              >
                
                {/* A. Image "Window" */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-inherit">

                   <img
                     src={project.coverImage || project.image} // Fallback for safety
                     alt={project.title}
                     className="w-full h-full object-cover"
                     loading="lazy"
                   />
                   
                   {/* Dark Overlay on Hover */}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* B. Content Body */}
                <div className="flex flex-col flex-grow p-6">
                  
                  {/* Title & Icons */}
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex flex-col gap-1">
                        <h3 className={`text-xl font-bold tracking-tight ${themeStyles.textMain}`}>
                            {project.title}
                        </h3>
                        {/* Tagline (New Field) */}
                        {project.tagline && (
                          <span className={`text-xs font-mono font-medium ${themeStyles.textDim} uppercase tracking-wide`}>
                            {project.tagline}
                          </span>
                        )}
                     </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${themeStyles.textSub}`}>
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="mt-auto pt-4 border-t border-dashed" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                     <div className="flex flex-wrap gap-2">
                       {previewStack.map((tech, i) => (
                         <span
                           key={i}
                           className={`text-[10px] px-2.5 py-1 rounded border font-mono font-medium tracking-tight transition-colors 
                             ${themeStyles.badgeBg}`}
                         >
                            {tech}
                         </span>
                       ))}
                       {/* "View Case Study" Hint */}
                       <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className={`text-[10px] font-bold ${themeStyles.textMain}`}>VIEW</span>
                          <FiArrowRight className={`w-3 h-3 ${themeStyles.textMain}`} />
                       </div>
                     </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 4. MODAL */}
      <AnimatePresence>
        {isModalOpen && (
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        )}
      </AnimatePresence>
      
    </section>
  );
}