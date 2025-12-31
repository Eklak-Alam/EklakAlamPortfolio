"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  FiActivity, 
  FiAlertCircle, 
  FiAward, 
  FiCalendar, 
  FiCheckCircle, 
  FiCpu, 
  FiExternalLink, 
  FiGithub, 
  FiLayers, 
  FiUsers, 
  FiX 
} from "react-icons/fi";
import { Activity, Trophy } from "lucide-react";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { darkMode } = useTheme();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Fix for mobile Safari scroll bounce
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const formatCategory = (str) => {
    if (str === "ai_ml") return "AI & ML";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Hide Scrollbar CSS */}
          <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 transition-colors ${
              darkMode ? "bg-black/90 backdrop-blur-sm" : "bg-white/80 backdrop-blur-md"
            }`}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-5xl max-h-[85dvh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${
              darkMode 
                ? "bg-neutral-950 border-neutral-800 text-gray-100" 
                : "bg-white border-gray-200 text-gray-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* --- 1. HEADER IMAGE & TITLE (Fixed Height) --- */}
            <div className="relative h-48 sm:h-64 md:h-80 flex-shrink-0 w-full bg-neutral-900 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Close Button - Larger touch target for mobile */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 sm:p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all border border-white/10 z-50 cursor-pointer shadow-lg active:scale-95"
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                {project.status && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-500/20 text-blue-100 border border-blue-500/30 backdrop-blur-md mb-2 sm:mb-3">
                    <FiActivity className="w-3 h-3" /> {project.status}
                  </span>
                )}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white shadow-sm leading-tight line-clamp-2">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* --- 2. SCROLLABLE CONTENT (Flex-1 ensures it fills space but scrolls) --- */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-8 no-scrollbar scroll-smooth overscroll-contain">
              
              {/* Meta Data Grid - 2 cols on mobile, 4 on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {[
                  { icon: FiUsers, label: "Team", val: project.team || "Solo" },
                  { icon: FiAward, label: "Role", val: project.role || "Dev" },
                  { icon: FiCalendar, label: "Timeline", val: project.duration || "N/A" },
                  { icon: Activity, label: "Status", val: project.status || "Completed" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 sm:p-4 rounded-xl border ${darkMode ? "bg-neutral-900/50 border-neutral-800" : "bg-gray-50 border-gray-100"}`}>
                     <div className="flex items-center gap-2 mb-1.5 opacity-60">
                        <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">{item.label}</span>
                     </div>
                     <p className="font-semibold text-xs sm:text-sm leading-tight line-clamp-1" title={item.val}>{item.val}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                   Overview
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                   <FiLayers className="w-5 h-5 text-blue-500" /> Technical Architecture
                </h3>
                
                {project.technologies ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {Object.entries(project.technologies).map(([category, techs], idx) => (
                      <div key={idx} className="space-y-2 sm:space-y-3">
                        <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wide opacity-70 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {formatCategory(category)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech, i) => (
                            <span 
                              key={i} 
                              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-medium border ${
                                darkMode 
                                  ? "bg-neutral-800 border-neutral-700 text-gray-300" 
                                  : "bg-white border-gray-200 text-gray-700 shadow-sm"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, i) => (
                       <span key={i} className={`px-2.5 py-1 rounded-md text-xs font-medium border ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-gray-100"}`}>
                         {tech}
                       </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Features */}
              {project.features && (
                <div className="mb-8 sm:mb-10">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <FiCpu className="w-5 h-5 text-purple-500" /> Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                    {project.features.map((feature, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${darkMode ? "border-neutral-800 bg-neutral-900/30" : "border-gray-100 bg-gray-50/50"}`}>
                        <FiCheckCircle className={`mt-0.5 w-4 h-4 flex-shrink-0 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                        <span className={`text-xs sm:text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {project.challenges && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <FiAlertCircle className="w-5 h-5 text-orange-500" /> Challenges
                    </h3>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {project.challenges.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                           <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                           <span className={darkMode ? "text-gray-300" : "text-gray-600"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.achievements && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" /> Achievements
                    </h3>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {project.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                           <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                           <span className={darkMode ? "text-gray-300" : "text-gray-600"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* --- 3. STICKY FOOTER (Fixed at bottom) --- */}
            <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 z-10 ${
              darkMode ? "bg-neutral-900 border-neutral-800" : "bg-gray-50 border-gray-100"
            }`}>
              {project.githubLink && (
                <Button 
                  variant="outline"
                  className={`flex-1 h-10 sm:h-11 gap-2 text-sm sm:text-base ${darkMode ? "border-neutral-700 hover:bg-neutral-800 text-white" : "bg-white border-gray-300 hover:bg-gray-50"}`}
                  onClick={() => window.open(project.githubLink, "_blank")}
                >
                  <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" /> Source Code
                </Button>
              )}
              {project.liveLink && (
                <Button 
                  className={`flex-1 h-10 sm:h-11 gap-2 text-sm sm:text-base ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
                  onClick={() => window.open(project.liveLink, "_blank")}
                >
                  <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" /> Visit Live Site
                </Button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;