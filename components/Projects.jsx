"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { allProjects } from "@/constants/projectDetails";
import ProjectModal from "./ProjectModal";

export function Projects() {
  const { darkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section
      id="projects"
      // FIX 1: Added w-full, max-w-[100vw], and overflow-x-hidden to strictly contain the layout
      className={`w-full max-w-[100vw] overflow-x-hidden pb-14 pt-10 px-4 sm:px-6 lg:px-8 relative ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Background Pattern - Contained */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none w-full h-full ${
          darkMode 
            ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" 
            : "bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"
      }`} />

      {/* Main Container - Added w-full */}
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Projects
          </h2>
          <p className={`text-lg max-w-2xl mx-auto px-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Real-world solutions built with modern technologies
          </p>
        </motion.div>

        {/* Grid - FIX 2: Added w-full to ensure grid doesn't overflow parent */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {allProjects.map((project, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card
                className={`group relative h-full flex flex-col border-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ring-1
                  ${
                    darkMode
                      ? "bg-neutral-900/40 ring-neutral-800 hover:bg-neutral-900 hover:ring-neutral-700 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
                      : "bg-gray-50/50 ring-gray-200 hover:bg-white hover:ring-gray-300 hover:shadow-xl"
                  }`}
                onClick={() => handleProjectClick(project)}
              >
                {/* Image Section */}
                <div className="relative h-44 overflow-hidden w-full bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    darkMode ? "bg-black/40" : "bg-white/30"
                  }`} />

                  <div className="absolute top-3 right-3 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-black dark:text-white"
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-black dark:text-white"
                      >
                        <FiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <CardContent className="flex flex-col flex-grow p-5 w-full">
                  <div className="flex justify-between items-start gap-2 mb-2 w-full">
                    {/* FIX 3: Added break-words to prevent long titles from stretching width */}
                    <h3 className={`font-semibold text-lg tracking-tight break-words group-hover:underline decoration-1 underline-offset-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {project.title}
                    </h3>
                    <FiArrowUpRight className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        darkMode ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-black"
                    }`} />
                  </div>

                  {/* FIX 4: break-words added to description */}
                  <p className={`text-sm line-clamp-2 leading-relaxed mb-4 break-words ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 w-full">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className={`text-[10px] px-2 py-0.5 font-normal rounded-md border whitespace-nowrap ${
                          darkMode 
                            ? "bg-neutral-800/50 text-gray-300 border-neutral-700" 
                            : "bg-white text-gray-600 border-gray-200"
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className={`text-[10px] px-2 py-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}