"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { allDevOpsProjects } from "@/constants/devopsProjects"; 
import { 
  Terminal, Server, Cloud, X, ChevronRight, Plus
} from "lucide-react";

// --- 1. DETAIL MODAL ---
const DevOpsModal = ({ project, isOpen, onClose, themeStyles }) => {
  
  // SCROLL LOCK
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center sm:p-6">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: "100%", transition: { duration: 0.2 } }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()} 
        className={`relative w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-4xl flex flex-col sm:rounded-2xl shadow-2xl border overflow-hidden ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
      >
        
        {/* HEADER */}
        <div className={`flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b z-20 backdrop-blur-xl bg-opacity-95 ${themeStyles.terminalHeader}`}>
           <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${themeStyles.badgeBg}`}>
                <Server className={`w-5 h-5 ${themeStyles.accentColor}`} />
              </div>
              <div className="flex flex-col">
                <h3 className={`text-lg sm:text-xl font-bold leading-tight ${themeStyles.textMain}`}>{project.title}</h3>
                <p className={`text-[10px] sm:text-xs font-mono opacity-60 ${themeStyles.textDim}`}>ID: {project.id}</p>
              </div>
           </div>
           <button 
             onClick={onClose} 
             className={`p-2 rounded-full hover:bg-white/10 transition-colors ${themeStyles.textMain}`}
           >
             <X className="w-6 h-6" />
           </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div 
          className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-8 sm:space-y-10 custom-scrollbar"
          data-lenis-prevent="true" 
        >
          
          {/* Section: Overview */}
          <section>
             <h4 className={`text-xs font-bold uppercase tracking-widest mb-3 ${themeStyles.textDim}`}>System Architecture</h4>
             <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${themeStyles.textSub}`}>
               {project.fullDescription}
             </p>
          </section>

          {/* Section: Pipeline */}
          <section>
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-6 ${themeStyles.textDim}`}>Execution Pipeline</h4>
            
            <div className={`relative pl-2 sm:pl-4 border-l-2 border-dashed ${themeStyles.timelineLine} space-y-8`}>
              {project.steps.map((step, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[9px] sm:-left-[11px] top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border bg-inherit ${themeStyles.cardBorder} z-10`}>
                    <div className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full animate-pulse ${themeStyles.timelineDot}`}></div>
                  </div>
                  
                  {/* Step Content */}
                  <div>
                    <span className={`text-[10px] font-mono font-bold mb-1 block ${themeStyles.accentColor}`}>STEP 0{idx + 1}</span>
                    <p className={`text-sm sm:text-base ${themeStyles.textMain}`}>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Tech Stack */}
          <section className="pb-6">
            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${themeStyles.textDim}`}>Tech Stack & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <span key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-[11px] sm:text-xs font-mono font-medium transition-colors ${themeStyles.badgeBg}`}>
                   <span className={`w-1.5 h-1.5 rounded-full ${themeStyles.dotColor}`} />
                   {tool}
                </span>
              ))}
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
};

// --- 2. MAIN COMPONENT ---
export function DevOpsProjects() {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LOAD MORE STATE ---
  const [visibleCount, setVisibleCount] = useState(2); // Start with 2
  const increment = 2; // Load 2 more on click

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  // MONOCHROMATIC THEME CONFIGURATION
  const themeStyles = darkMode ? {
    // DARK MODE (Strict Black/Gray/White)
    bg: "bg-[#050505]",
    textMain: "text-neutral-100",
    textSub: "text-neutral-400",
    textDim: "text-neutral-600",
    cardBg: "bg-[#09090b]", // Zinc-950
    cardBorder: "border-white/10",
    cardHover: "hover:border-white/25 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]", 
    badgeBg: "bg-white/5 text-neutral-300 border-white/10",
    terminalHeader: "bg-[#000000] border-white/10",
    accentColor: "text-white", // Pure white accents
    dotColor: "bg-white",
    timelineDot: "bg-white",
    timelineLine: "border-neutral-800",
    btnBg: "bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700", // Button style
    grid: "bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
  } : {
    // LIGHT MODE (Clean Industrial Gray)
    bg: "bg-white",
    textMain: "text-neutral-900",
    textSub: "text-neutral-600",
    textDim: "text-neutral-400",
    cardBg: "bg-white",
    cardBorder: "border-neutral-200",
    cardHover: "hover:border-neutral-400 hover:shadow-xl",
    badgeBg: "bg-neutral-100 text-neutral-700 border-neutral-200",
    terminalHeader: "bg-neutral-50 border-neutral-200",
    accentColor: "text-neutral-900",
    dotColor: "bg-neutral-900",
    timelineDot: "bg-neutral-900",
    timelineLine: "border-neutral-300",
    btnBg: "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-200", // Button style
    grid: "bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]"
  };

  const handleOpen = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="devops" className={`w-full relative overflow-hidden pt-20 sm:py-24 px-4 sm:px-6 lg:px-8 ${themeStyles.bg} transition-colors duration-500`}>
      
      {/* Background Grid */}
      <div className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none ${themeStyles.grid}`} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${themeStyles.cardBorder} ${themeStyles.badgeBg}`}>
               <Cloud className="w-3.5 h-3.5" />
               <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase">
                 /DevOps & Cloud
               </span>
            </div>
            
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${themeStyles.textMain}`}>
              DevOps & Engineering
            </h2>
          </div>
          
          <div className="md:text-right max-w-md">
             <p className={`text-sm sm:text-base md:text-lg ${themeStyles.textSub} leading-relaxed`}>
               Building the invisible backbone. Automated pipelines, container orchestration, and Infrastructure as Code.
             </p>
          </div>
        </motion.div>

        {/* Projects Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {allDevOpsProjects.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOpen(project)}
              className={`group relative flex flex-col rounded-xl border cursor-pointer overflow-hidden transition-all duration-300 transform active:scale-[0.98] ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardHover}`}
            >
              {/* Terminal Tab Header */}
              <div className={`px-4 sm:px-6 py-3 flex items-center justify-between border-b ${themeStyles.terminalHeader}`}>
                {/* Traffic Lights */}
                <div className="flex gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? 'bg-neutral-600' : 'bg-neutral-300'}`} />
                  <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? 'bg-neutral-700' : 'bg-neutral-400'}`} />
                  <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? 'bg-neutral-800' : 'bg-neutral-500'}`} />
                </div>
                <div className={`text-[10px] font-mono opacity-70 ${themeStyles.textDim}`}>
                  bash ~ {project.slug?.substring(0, 20)}...
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="mb-6">
                   <h3 className={`text-lg sm:text-xl font-bold mb-3 flex items-center gap-2 ${themeStyles.textMain}`}>
                     <Terminal className={`w-5 h-5 ${themeStyles.accentColor}`} />
                     {project.title}
                   </h3>
                   <p className={`text-sm leading-relaxed ${themeStyles.textSub} line-clamp-3`}>
                     {project.shortDescription}
                   </p>
                </div>

                {/* Footer: Tools + Action */}
                <div className="mt-auto pt-4 border-t border-dashed border-opacity-50" style={{ borderColor: 'inherit' }}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.slice(0, 4).map((tool, i) => (
                      <span key={i} className={`text-[10px] px-2 py-1 rounded border font-mono ${themeStyles.badgeBg}`}>
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 4 && (
                      <span className={`text-[10px] px-2 py-1 rounded border font-mono ${themeStyles.badgeBg}`}>
                        +{project.tools.length - 4}
                      </span>
                    )}
                  </div>
                  
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${themeStyles.accentColor} group-hover:gap-2 transition-all`}>
                    <span className="uppercase tracking-wider">Inspect Architecture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visibleCount < allDevOpsProjects.length && (
          <div className="flex justify-center w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className={`
                group relative flex items-center gap-2 px-8 py-3 rounded-full 
                font-mono font-medium text-xs tracking-wider uppercase transition-all duration-300 border
                ${themeStyles.btnBg}
              `}
            >
              <span>{`> Load_More_Architectures`}</span>
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        )}

      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <DevOpsModal 
            project={selectedProject} 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            themeStyles={themeStyles}
          />
        )}
      </AnimatePresence>
    </section>
  );
}