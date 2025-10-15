"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FiGithub, FiExternalLink, FiCode, FiLayers, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { allProjects } from "@/constants/projectDetails";
import ProjectModal from "./ProjectModal";
import { useState } from "react";

export function Projects() {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const colors = darkMode ? {
    background: "#0f172a",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    cardBg: "#1e293b",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    blobColor1: "rgba(124, 58, 237, 0.1)",
    blobColor2: "rgba(37, 99, 235, 0.1)",
    blobColor3: "rgba(16, 185, 129, 0.1)"
  } : {
    background: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    cardBg: "#f8fafc",
    cardBorder: "rgba(0, 0, 0, 0)",
    blobColor1: "rgba(219, 234, 254, 0.5)",
    blobColor2: "rgba(220, 252, 231, 0.5)",
    blobColor3: "rgba(224, 231, 255, 0.5)"
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section 
      id="projects" 
      className="relative py-20 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl animate-blob"
          style={{ backgroundColor: colors.blobColor1 }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-blob animation-delay-2000"
          style={{ backgroundColor: colors.blobColor2 }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full filter blur-3xl animate-blob animation-delay-4000"
          style={{ backgroundColor: colors.blobColor3 }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <FiCode className="text-3xl text-blue-500 mr-3" />
            <h2 
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: colors.textPrimary }}
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Projects</span>
            </h2>
            <FiLayers className="text-3xl text-emerald-500 ml-3" />
          </div>
          
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Each project represents <span className="font-semibold text-blue-400">real-world solutions</span> crafted with modern technologies and <span className="font-semibold text-emerald-400">attention to detail</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <CardContainer className="inter-var h-full">
                <CardBody 
                  className={`relative group/card w-full h-full rounded-xl p-6 ${darkMode ? "" : "border"}`}
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder
                  }}
                >
                  {/* View Details Button */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <button className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm">
                      <FiEye className="text-lg" />
                    </button>
                  </div>

                  <CardItem translateZ="100" className="w-full">
                    <img
                      src={project.image}
                      height="1000"
                      width="1000"
                      className="h-48 w-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      alt={project.title}
                    />
                  </CardItem>

                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold mt-4 mb-2 line-clamp-1"
                    style={{ color: colors.textPrimary }}
                  >
                    {project.title}
                  </CardItem>
                  
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-sm line-clamp-2 mb-4"
                    style={{ color: colors.textSecondary }}
                  >
                    {project.description}
                  </CardItem>

                  <CardItem translateZ="40" className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                            color: darkMode ? "#93c5fd" : "#3b82f6"
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span
                          className="px-2.5 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                            color: darkMode ? "#93c5fd" : "#3b82f6"
                          }}
                        >
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </CardItem>

                  <div className="flex justify-between items-center mt-auto">
                    {project.githubLink && (
                      <CardItem
                        translateZ={30}
                        as="a"
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                        style={{
                          backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                          color: colors.textPrimary
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub className="text-lg" />
                        <span>Code</span>
                      </CardItem>
                    )}
                    {project.liveLink && (
                      <CardItem
                        translateZ={30}
                        as="a"
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                        style={{
                          background: "linear-gradient(to right, #2563eb, #10b981)",
                          color: "white"
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink className="text-lg" />
                        <span>Live Demo</span>
                      </CardItem>
                    )}
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p style={{ color: colors.textSecondary }}>
            Interested in my work? <span className="text-blue-400">Let's build something amazing</span> together
          </p>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}