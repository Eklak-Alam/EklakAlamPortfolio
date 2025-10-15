"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  FiGithub, 
  FiExternalLink, 
  FiX, 
  FiCode, 
  FiCalendar, 
  FiUsers, 
  FiAward,
  FiCheckCircle,
  FiTool,
  FiStar,
  FiArrowRight
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { darkMode } = useTheme();

  const colors = {
    dark: {
      background: "rgba(0, 0, 0, 0.9)",
      foreground: "#0f172a",
      textPrimary: "#f8fafc",
      textSecondary: "#cbd5e1",
      accent: "#3b82f6",
      border: "rgba(255, 255, 255, 0.1)",
      card: "#1e293b",
      overlay: "rgba(15, 23, 42, 0.95)"
    },
    light: {
      background: "rgba(255, 255, 255, 0.9)",
      foreground: "#ffffff",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      accent: "#2563eb",
      border: "rgba(0, 0, 0, 0.08)",
      card: "#f8fafc",
      overlay: "rgba(255, 255, 255, 0.95)"
    }
  };

  const theme = darkMode ? colors.dark : colors.light;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 400,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      backdropFilter: "blur(10px)"
    },
    exit: { 
      opacity: 0,
      backdropFilter: "blur(0px)"
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            style={{ backgroundColor: theme.background }}
            onClick={onClose}
          >
            {/* Modal Container */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden rounded-2xl border"
              style={{
                backgroundColor: theme.foreground,
                borderColor: theme.border,
                boxShadow: darkMode 
                  ? "0 20px 40px -10px rgba(0, 0, 0, 0.5)" 
                  : "0 20px 40px -10px rgba(0, 0, 0, 0.1)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg border group"
                style={{
                  backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                  borderColor: theme.border,
                  color: theme.textPrimary
                }}
              >
                <FiX className="text-lg group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Hero Image - Better Responsive */}
                <motion.div 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-48 sm:h-56 md:h-64"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Content Section */}
                <div className="p-5 sm:p-6 md:p-7">
                  {/* Title and Description */}
                  <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-8"
                  >
                    <h2 
                      className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                    >
                      {project.title}
                    </h2>
                    <p 
                      className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto opacity-90"
                      style={{ color: theme.textSecondary }}
                    >
                      {project.fullDescription}
                    </p>
                  </motion.div>

                  {/* Project Metadata - Compact Cards */}
                  <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-3 gap-3 mb-8"
                  >
                    <div className="flex flex-col items-center text-center p-3 rounded-lg border transition-all duration-300 hover:scale-105" 
                         style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                      <div className="p-2 rounded-lg mb-2 bg-blue-500/20">
                        <FiCalendar className="text-blue-500 text-base" />
                      </div>
                      <p style={{ color: theme.textSecondary }} className="text-xs font-medium mb-1">Duration</p>
                      <p style={{ color: theme.textPrimary }} className="font-semibold text-sm">{project.duration}</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-3 rounded-lg border transition-all duration-300 hover:scale-105" 
                         style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                      <div className="p-2 rounded-lg mb-2 bg-emerald-500/20">
                        <FiUsers className="text-emerald-500 text-base" />
                      </div>
                      <p style={{ color: theme.textSecondary }} className="text-xs font-medium mb-1">Team</p>
                      <p style={{ color: theme.textPrimary }} className="font-semibold text-sm">{project.team}</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-3 rounded-lg border transition-all duration-300 hover:scale-105" 
                         style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                      <div className="p-2 rounded-lg mb-2 bg-purple-500/20">
                        <FiAward className="text-purple-500 text-base" />
                      </div>
                      <p style={{ color: theme.textSecondary }} className="text-xs font-medium mb-1">Role</p>
                      <p style={{ color: theme.textPrimary }} className="font-semibold text-sm">{project.role}</p>
                    </div>
                  </motion.div>

                  {/* Main Content Grid */}
                  <div className="space-y-6">
                    {/* Features Section */}
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
                      style={{ backgroundColor: theme.card, borderColor: theme.border }}
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                          <FiCheckCircle className="text-emerald-500 text-base" />
                        </div>
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 group p-2 rounded-lg transition-all duration-300 hover:bg-opacity-50 cursor-pointer"
                               style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                            <FiArrowRight className="text-emerald-500 text-sm mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                            <p style={{ color: theme.textSecondary }} className="text-xs leading-relaxed font-medium">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Technologies & Challenges Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Technologies Section */}
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: theme.card, borderColor: theme.border }}
                      >
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                          <div className="p-2 rounded-lg bg-blue-500/20">
                            <FiCode className="text-blue-500 text-base" />
                          </div>
                          Technologies
                        </h3>
                        <div className="space-y-4">
                          {Object.entries(project.technologies).map(([category, techs]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="font-semibold text-sm mb-2 uppercase tracking-wide opacity-70" 
                                  style={{ color: theme.textPrimary }}>
                                {category}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {techs.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-2.5 py-1.5 text-xs rounded-lg font-medium transition-all duration-300 hover:scale-105 border"
                                    style={{
                                      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                                      color: darkMode ? "#93c5fd" : "#3b82f6",
                                      borderColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
                                    }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Challenges & Achievements Column */}
                      <div className="space-y-6">
                        {/* Challenges Section */}
                        <motion.div
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
                          style={{ backgroundColor: theme.card, borderColor: theme.border }}
                        >
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <div className="p-2 rounded-lg bg-orange-500/20">
                              <FiTool className="text-orange-500 text-base" />
                            </div>
                            Challenges
                          </h3>
                          <div className="space-y-3">
                            {project.challenges.map((challenge, index) => (
                              <div key={index} className="flex items-start gap-3 group">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 group-hover:scale-150" 
                                     style={{ backgroundColor: theme.accent }} />
                                <p style={{ color: theme.textSecondary }} className="text-xs leading-relaxed font-medium">
                                  {challenge}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Achievements Section */}
                        <motion.div
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
                          style={{ backgroundColor: theme.card, borderColor: theme.border }}
                        >
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <div className="p-2 rounded-lg bg-yellow-500/20">
                              <FiStar className="text-yellow-500 text-base" />
                            </div>
                            Achievements
                          </h3>
                          <div className="space-y-3">
                            {project.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-start gap-3 group">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 group-hover:scale-150" 
                                     style={{ backgroundColor: theme.accent }} />
                                <p style={{ color: theme.textSecondary }} className="text-xs leading-relaxed font-medium">
                                  {achievement}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Better Centered */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8 pt-6 border-t"
                    style={{ borderColor: theme.border }}
                  >
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border w-full sm:w-auto min-w-[140px] group"
                        style={{
                          backgroundColor: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                          color: theme.textPrimary,
                          borderColor: theme.border
                        }}
                      >
                        <FiGithub className="text-base group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto min-w-[140px] group"
                        style={{
                          background: "linear-gradient(135deg, #2563eb, #10b981)",
                          boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)"
                        }}
                      >
                        <FiExternalLink className="text-base group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Custom Scrollbar Styles */}
          <style jsx global>{`
            body {
              overflow: ${isOpen ? 'hidden' : 'auto'} !important;
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: ${darkMode ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9'};
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: ${darkMode ? '#1e293b' : '#f1f5f9'};
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: ${darkMode ? '#475569' : '#cbd5e1'};
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: ${darkMode ? '#64748b' : '#94a3b8'};
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;