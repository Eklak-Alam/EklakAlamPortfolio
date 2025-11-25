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
      background: "rgba(0, 0, 0, 0.95)",
      foreground: "#000000",
      textPrimary: "#ffffff",
      textSecondary: "#a0a0a0",
      accent: "#3b82f6",
      border: "rgba(255, 255, 255, 0.15)",
      card: "#111111",
      overlay: "rgba(0, 0, 0, 0.98)"
    },
    light: {
      background: "rgba(255, 255, 255, 0.95)",
      foreground: "#ffffff",
      textPrimary: "#000000",
      textSecondary: "#666666",
      accent: "#2563eb",
      border: "rgba(0, 0, 0, 0.15)",
      card: "#f8f8f8",
      overlay: "rgba(255, 255, 255, 0.98)"
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
        stiffness: 400
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
      backdropFilter: "blur(8px)"
    },
    exit: { 
      opacity: 0,
      backdropFilter: "blur(0px)"
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: theme.background }}
            onClick={onClose}
          >
            {/* Modal Container */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden border"
              style={{
                backgroundColor: theme.foreground,
                borderColor: theme.border,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute text-blue-600 bg-white top-2 right-6 z-50 p-2 rounded-lg transition-all cursor-pointer border"
                style={{
                  borderColor: theme.border,
                }}
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Hero Image */}
                <div className="relative h-48 md:h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Description */}
                  <div className="text-center mb-8">
                    <h2 
                      className="text-2xl md:text-3xl font-bold mb-4"
                      style={{ color: theme.textPrimary }}
                    >
                      {project.title}
                    </h2>
                    <p 
                      className="text-base leading-relaxed max-w-2xl mx-auto"
                      style={{ color: theme.textSecondary }}
                    >
                      {project.fullDescription}
                    </p>
                  </div>

                  {/* Project Metadata */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 rounded-lg border" 
                         style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                      <FiCalendar className="w-5 h-5 mx-auto mb-2" style={{ color: theme.accent }} />
                      <p style={{ color: theme.textSecondary }} className="text-sm mb-1">Duration</p>
                      <p style={{ color: theme.textPrimary }} className="font-semibold">{project.duration}</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg border" 
                         style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                      <FiUsers className="w-5 h-5 mx-auto mb-2" style={{ color: theme.accent }} />
                      <p style={{ color: theme.textSecondary }} className="text-sm mb-1">Team</p>
                      <p style={{ color: theme.textPrimary }} className="font-semibold">{project.team}</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg border" 
                         style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                      <FiAward className="w-5 h-5 mx-auto mb-2" style={{ color: theme.accent }} />
                      <p style={{ color: theme.textSecondary }} className="text-sm mb-1">Role</p>
                      <p style={{ color: theme.textPrimary }} className="font-semibold">{project.role}</p>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="space-y-6">
                    {/* Features Section */}
                    <div className="p-5 rounded-lg border" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                        <FiCheckCircle style={{ color: theme.accent }} />
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <FiArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: theme.accent }} />
                            <p style={{ color: theme.textSecondary }} className="text-sm">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies & Challenges Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Technologies Section */}
                      <div className="p-5 rounded-lg border" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                          <FiCode style={{ color: theme.accent }} />
                          Technologies
                        </h3>
                        <div className="space-y-4">
                          {Object.entries(project.technologies).map(([category, techs]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="font-semibold text-sm mb-2" style={{ color: theme.textPrimary }}>
                                {category}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {techs.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1.5 text-xs rounded-md border font-medium"
                                    style={{
                                      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                                      color: theme.textSecondary,
                                      borderColor: theme.border
                                    }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Challenges & Achievements Column */}
                      <div className="space-y-6">
                        {/* Challenges Section */}
                        <div className="p-5 rounded-lg border" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <FiTool style={{ color: theme.accent }} />
                            Challenges
                          </h3>
                          <div className="space-y-3">
                            {project.challenges.map((challenge, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }} />
                                <p style={{ color: theme.textSecondary }} className="text-sm">
                                  {challenge}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="p-5 rounded-lg border" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-3" style={{ color: theme.textPrimary }}>
                            <FiStar style={{ color: theme.accent }} />
                            Achievements
                          </h3>
                          <div className="space-y-3">
                            {project.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }} />
                                <p style={{ color: theme.textSecondary }} className="text-sm">
                                  {achievement}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 pt-6 border-t" style={{ borderColor: theme.border }}>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border w-full sm:w-auto"
                        style={{
                          backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                          color: theme.textPrimary,
                          borderColor: theme.border
                        }}
                      >
                        <FiGithub className="w-4 h-4" />
                        <span>View Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white w-full sm:w-auto"
                        style={{
                          backgroundColor: theme.accent
                        }}
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;