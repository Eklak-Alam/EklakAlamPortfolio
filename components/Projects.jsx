"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { allProjects } from "@/constants/projectDetails";
import ProjectModal from "./ProjectModal";

// Icons
import { FiGithub, FiExternalLink, FiArrowRight, FiPlus } from "react-icons/fi";
import { Layers } from "lucide-react";

export function Projects() {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- LOAD MORE LOGIC ---
  const [visibleCount, setVisibleCount] = useState(3); // Start with 3
  const increment = 3; // Load 2 more on click

  // 1. Theme Config
  const themeStyles = darkMode ? {
    bg: "bg-[#050505]",
    textMain: "text-white",
    textSub: "text-neutral-400",
    textDim: "text-neutral-500",
    cardBg: "bg-[#0A0A0A]",
    cardBorder: "border-white/10",
    cardHover: "hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)]", 
    badgeBg: "bg-white/5 text-neutral-300 border-white/10",
    btnBg: "bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700",
  } : {
    bg: "bg-white",
    textMain: "text-neutral-900",
    textSub: "text-neutral-600",
    textDim: "text-neutral-400",
    cardBg: "bg-white",
    cardBorder: "border-black/5",
    cardHover: "hover:border-black/10 hover:shadow-2xl",
    badgeBg: "bg-black/5 text-neutral-700 border-black/10",
    btnBg: "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-200",
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); 
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  // Helper: Flatten stack
  const getPreviewStack = (techStack) => {
    if (Array.isArray(techStack)) return techStack;
    const list = [];
    if (techStack.frontend) list.push(...techStack.frontend);
    if (techStack.backend) list.push(...techStack.backend);
    if (techStack.ai) list.push(...techStack.ai);
    if (techStack.cloud) list.push(...techStack.cloud);
    return [...new Set(list)].slice(0, 5); 
  };

  return (
    <section
      id="projects"
      className={`w-full relative overflow-hidden pt-24 lg:pb-10 px-4 sm:px-6 lg:px-8 ${themeStyles.bg} transition-colors duration-500`}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 2. SECTION HEADER */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allProjects.slice(0, visibleCount).map((project, index) => {
            const previewStack = getPreviewStack(project.techStack);

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
                     src={project.coverImage || project.image}
                     alt={project.title}
                     className="w-full h-full object-cover"
                     loading="lazy"
                   />
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

        {/* 4. LOAD MORE BUTTON */}
        {visibleCount < allProjects.length && (
          <div className="flex justify-center w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className={`
                group relative flex items-center gap-2 px-8 py-3 rounded-full 
                font-medium text-sm transition-all duration-300 border
                ${themeStyles.btnBg}
              `}
            >
              <span>Load More Works</span>
              <FiPlus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </motion.button>
          </div>
        )}

      </div>

      {/* 5. MODAL */}
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