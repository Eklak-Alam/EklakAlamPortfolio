"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { allProjects } from "@/constants/projectDetails";
import ProjectModal from "./ProjectModal";
import { useState } from "react";

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

  return (
    <section
      id="projects"
      className={`py-12 px-4 sm:px-6 ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Projects
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Real-world solutions built with modern technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card
                className={`h-full transition-all cursor-pointer ${
                  darkMode 
                    ? "border-gray-900 bg-black" 
                    : "border-gray-100 bg-white"
                }`}
                onClick={() => handleProjectClick(project)}
              >
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {project.githubLink && (
                        <Button
                          variant="secondary"
                          size="icon"
                          asChild
                          className="w-7 h-7 bg-black/70 backdrop-blur-sm hover:bg-black/90 border-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiGithub className="w-3 h-3 text-white" />
                          </a>
                        </Button>
                      )}
                      {project.liveLink && (
                        <Button
                          variant="secondary"
                          size="icon"
                          asChild
                          className="w-7 h-7 bg-black/70 backdrop-blur-sm hover:bg-black/90 border-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiExternalLink className="w-3 h-3 text-white" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <CardTitle
                      className={`text-base font-semibold mb-2 line-clamp-1 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {project.title}
                    </CardTitle>

                    <CardDescription
                      className={`mb-3 line-clamp-2 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </CardDescription>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-[11px]"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-4 pb-4 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full cursor-pointer text-xs h-8"
                    onClick={() => handleProjectClick(project)}
                  >
                    <FiCode className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
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