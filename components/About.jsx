"use client";

import { motion } from "framer-motion";
import { FiCode, FiServer, FiCloud, FiCpu, FiDatabase, FiGitBranch, FiAward } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { Code, Languages } from "lucide-react";

export function AboutSection() {
  const { darkMode } = useTheme();

  const skills = [
    {
      category: "Frontend",
      icon: <FiCode className="w-4 h-4" />,
      items: ["React.js", "Next.js 14", "JavaScript", "Tailwind CSS", "Framer Motion"],
      color: "text-blue-500"
    },
    {
      category: "Backend", 
      icon: <FiServer className="w-4 h-4" />,
      items: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs"],
      color: "text-emerald-500"
    },
    {
      category: "DevOps",
      icon: <FiCloud className="w-4 h-4" />,
      items: ["Docker", "Kubernetes", "AWS", "Jenkins", "CI/CD", "Linux"],
      color: "text-purple-500"
    },
    {
      category: "AI & Data",
      icon: <FiCpu className="w-4 h-4" />,
      items: ["Python", "Pandas", "NumPy", "FastAPI", "LangChain"],
      color: "text-indigo-500"
    },
    {
      category: "Database",
      icon: <FiDatabase className="w-4 h-4" />,
      items: ["MySQL", "PostgreSQL", "Redis", "Git/GitHub"],
      color: "text-orange-500"
    },
    {
      category: "Languages",
      icon: <Code className="w-4 h-4" />,
      items: ["JavaScript", "Java", "Python", "C language"],
      color: "text-blue-500"
    }
  ];

  const stats = [
    { number: "10+", label: "Projects" },
    { number: "5+", label: "Clients" }, 
    { number: "1+", label: "Years Exp" },
    { number: "20k+", label: "Commits" }
  ];

  return (
    <section id="about" className={`pt-16 pb-6 lg:py-5 px-4 sm:px-6 ${darkMode ? "bg-black" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border mb-4"
            style={{
              backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}
          >
            About Me
          </div>
          <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Crafting Digital Excellence
          </h2>
          <p className={`text-sm lg:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Full-stack developer passionate about building exceptional digital experiences and scalable solutions.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4"
            >
              <div className={`text-2xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {stat.number}
              </div>
              <div className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="p-4 rounded-lg border backdrop-blur-sm"
            style={{
              backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0,0,0,0.2)' 
                : '0 8px 32px rgba(0,0,0,0.05)'
            }}
          >
            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Full-stack developer with expertise in modern web technologies, cloud infrastructure, 
                and artificial intelligence. I build performant, scalable applications that deliver 
                exceptional user experiences.
              </p>
              
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                From responsive frontends with React and Next.js to robust backends with Spring Boot, 
                and deploying scalable solutions using Docker and cloud platforms.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg border backdrop-blur-sm transition-all duration-300"
              style={{
                backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                boxShadow: darkMode 
                  ? '0 4px 20px rgba(0,0,0,0.15)' 
                  : '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${skill.color} bg-opacity-10`}>
                  {skill.icon}
                </div>
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {skill.category}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 text-xs rounded-full border font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      color: darkMode ? '#d1d5db' : '#4b5563'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}