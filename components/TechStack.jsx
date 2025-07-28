"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCode, FiServer, FiCloud, FiTool, FiCpu, FiActivity } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const techCategories = [
  {
    name: "Frontend",
    icon: <FiCode className="text-xl" />,
    color: "bg-blue-500",
    techs: [
      { 
        name: "React.js", 
        img: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
        usage: "UI Development"
      },
      { 
        name: "Next.js", 
        img: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
        usage: "Full-stack Apps"
      },
      { 
        name: "JavaScript", 
        img: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
        usage: "Code base"
      },
      { 
        name: "Tailwind CSS", 
        img: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
        usage: "Utility-first CSS"
      },
      { 
        name: "Framer Motion", 
        img: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
        usage: "Animations"
      },
    ],
  },
  {
    name: "Backend",
    icon: <FiServer className="text-xl" />,
    color: "bg-emerald-500",
    techs: [
      { 
        name: "Java", 
        img: "https://cdn.worldvectorlogo.com/logos/java-4.svg",
        usage: "Runtime"
      },
      { 
        name: "Spring", 
        img: "https://cdn.worldvectorlogo.com/logos/spring-3.svg",
        usage: "API Framework"
      },
      { 
        name: "MySQL", 
        img: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg",
        usage: "Database"
      },
      { 
        name: "JWT", 
        img: "https://cdn.worldvectorlogo.com/logos/jwt-3.svg",
        usage: "Authentication"
      },
      { 
        name: "Redis", 
        img: "https://cdn.worldvectorlogo.com/logos/redis.svg",
        usage: "Caching"
      },
    ],
  },
  {
    name: "DevOps",
    icon: <FiCloud className="text-xl" />,
    color: "bg-purple-500",
    techs: [
      { 
        name: "Git", 
        img: "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
        usage: "Version Control"
      },
      { 
        name: "GitHub", 
        img: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
        usage: "Code Hosting"
      },
      { 
        name: "Vercel", 
        img: "https://cdn.worldvectorlogo.com/logos/vercel.svg",
        usage: "Frontend Hosting"
      },
      { 
        name: "Netlify", 
        img: "https://cdn.worldvectorlogo.com/logos/netlify.svg",
        usage: "Static Hosting"
      },
      { 
        name: "Docker", 
        img: "https://cdn.worldvectorlogo.com/logos/docker.svg",
        usage: "Containerization"
      },
    ],
  },
  {
    name: "Tools",
    icon: <FiTool className="text-xl" />,
    color: "bg-amber-500",
    techs: [
      { 
        name: "VS Code", 
        img: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg",
        usage: "Code Editor"
      },
      { 
        name: "IntelliJ", 
        img: "https://cdn.worldvectorlogo.com/logos/intellij-idea-1.svg",
        usage: "Java IDE"
      },
      { 
        name: "Figma", 
        img: "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
        usage: "UI Design"
      },
      { 
        name: "Postman", 
        img: "https://cdn.worldvectorlogo.com/logos/postman.svg",
        usage: "API Testing"
      },
      { 
        name: "Notion", 
        img: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg",
        usage: "Documentation"
      },
    ],
  },
  {
    name: "Languages",
    icon: <FiCpu className="text-xl" />,
    color: "bg-red-500",
    techs: [
      { 
        name: "JavaScript", 
        img: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
        usage: "Web Development"
      },
      { 
        name: "Java", 
        img: "https://cdn.worldvectorlogo.com/logos/java-4.svg",
        usage: "Enterprise Applications"
      },
      { 
        name: "Python", 
        img: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
        usage: "Scripting & AI"
      },
      { 
        name: "C", 
        img: "https://cdn.worldvectorlogo.com/logos/c-1.svg",
        usage: "System Programming"
      },
    ],
  },
  {
    name: "AI & GenAI",
    icon: <FiActivity className="text-xl" />,
    color: "bg-indigo-500",
    techs: [
      { 
        name: "Python", 
        img: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
        usage: "Core Language"
      },
      { 
        name: "NumPy", 
        img: "https://cdn.worldvectorlogo.com/logos/numpy-1.svg",
        usage: "Numerical Computing"
      },
      { 
        name: "Pandas", 
        img: "https://cdn.worldvectorlogo.com/logos/pandas.svg",
        usage: "Data Analysis"
      },
      { 
        name: "Matplotlib", 
        img: "https://cdn.worldvectorlogo.com/logos/matplotlib.svg",
        usage: "Data Visualization"
      },
      { 
        name: "Seaborn", 
        img: "https://cdn.worldvectorlogo.com/logos/seaborn.svg",
        usage: "Statistical Plots"
      },
      { 
        name: "FastAPI", 
        img: "https://cdn.worldvectorlogo.com/logos/fastapi.svg",
        usage: "API for ML Models"
      },
      { 
        name: "LangChain", 
        img: "https://cdn.worldvectorlogo.com/logos/langchain.svg",
        usage: "LLM Framework"
      },
    ],
  }

];

export function TechStack() {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState(techCategories[0]);
  const controls = useAnimation();

  // Color schemes for both modes
  const darkColors = {
    background: "#0f172a",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    cardBg: "#1e293b",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    inactiveTabBg: "rgba(255, 255, 255, 0.05)",
    inactiveTabText: "#e2e8f0",
    inactiveTabBorder: "rgba(255, 255, 255, 0.1)"
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    cardBg: "#f8fafc",
    cardBorder: "rgba(0, 0, 0, 0.1)",
    inactiveTabBg: "rgba(0, 0, 0, 0.05)",
    inactiveTabText: "#334155",
    inactiveTabBorder: "rgba(0, 0, 0, 0.1)"
  };

  const colors = darkMode ? darkColors : lightColors;

  useEffect(() => {
    controls.start("visible");
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 15, 
        stiffness: 150,
        mass: 0.5
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: darkMode 
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            My <span className="text-blue-500">Tech Stack</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
            Technologies and languages I work with to build digital experiences
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {techCategories.map((category) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-3 rounded-xl font-medium text-sm sm:text-base flex items-center gap-2 transition-all ${
                activeCategory.name === category.name
                  ? `${category.color} text-white shadow-lg`
                  : `shadow-sm border`
              }`}
              style={{
                backgroundColor: activeCategory.name === category.name 
                  ? undefined 
                  : colors.inactiveTabBg,
                color: activeCategory.name === category.name 
                  ? undefined 
                  : colors.inactiveTabText,
                borderColor: activeCategory.name === category.name 
                  ? undefined 
                  : colors.inactiveTabBorder
              }}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Tech Cards */}
        <motion.div
          key={activeCategory.name}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {activeCategory.techs.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl shadow-lg overflow-hidden border cursor-default group relative"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder
              }}
            >
              <div className={`absolute top-0 left-0 h-2 w-full ${activeCategory.color}`}></div>
              <div className="p-6 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-lg border flex items-center justify-center p-3`}
                       style={{ borderColor: colors.cardBorder }}>
                    <img 
                      src={tech.img} 
                      alt={tech.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/128/${activeCategory.color.replace('bg-', '')}/ffffff?text=${tech.name.charAt(0)}`;
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: colors.textPrimary }}>{tech.name}</h3>
                <p className="mb-4" style={{ color: colors.textSecondary }}>{tech.usage}</p>
                <div className={`h-1 w-0 group-hover:w-full ${activeCategory.color} transition-all duration-500`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}