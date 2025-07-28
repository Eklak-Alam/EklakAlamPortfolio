"use client";

import { motion } from "framer-motion";
import { FiCode, FiServer, FiCloud, FiFilm, FiAward, FiCpu } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export function AboutSection() {
  const { darkMode } = useTheme();

  // Color schemes for both modes
  const darkColors = {
    background: "#0f172a",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    accent: "#38bdf8",
    cardBg: "#1e293b",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    divider: "rgba(255, 255, 255, 0.05)",
    iconBg: "rgba(255, 255, 255, 0.05)",
    dotColor: "rgba(255, 255, 255, 0.8)"
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    accent: "#0284c7",
    cardBg: "#f8fafc",
    cardBorder: "rgba(0, 0, 0, 0.1)",
    divider: "rgba(0, 0, 0, 0.05)",
    iconBg: "rgba(0, 0, 0, 0.05)",
    dotColor: "rgba(0, 0, 0, 0.8)"
  };

  const colors = darkMode ? darkColors : lightColors;

  const skills = [
    {
      category: "Frontend Development",
      icon: <FiCode className="text-2xl" />,
      items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion", "etc..."],
      gradient: "from-blue-500 to-blue-600"
    },
    {
      category: "Backend Development",
      icon: <FiServer className="text-2xl" />,
      items: ["Java", "Spring", "Spring Boot", "JDBC", "REST APIs", "Hibernate", "JPA"],
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      category: "DevOps & Deployment",
      icon: <FiCloud className="text-2xl" />,
      items: ["Git/GitHub", "Vercel", "Netlify", "Docker", "Domain Management"],
      gradient: "from-purple-500 to-purple-600"
    },
    {
      category: "AI & Generative Tech",
      icon: <FiCpu className="text-2xl" />, // You can also use FiActivity or another AI-related icon
      items: [ "Python & NumPy", "Pandas & Data Analysis", "Matplotlib & Seaborn", "Data Visualization", "FastAPI for AI APIs", "LangChain & LLMs"],
      gradient: "from-indigo-500 to-purple-600"
    }

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section id="about" className="py-20 px-6" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            About <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
            Full-stack developer with a passion for creating exceptional digital experiences and sharing knowledge through content creation.
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Introduction */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              Crafting Digital Excellence
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              style={{ color: colors.textSecondary }}
            >
              I'm a passionate full-stack developer with expertise in both frontend and backend technologies. With 5+ years of experience, I specialize in building performant, accessible, and visually stunning web applications.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              style={{ color: colors.textSecondary }}
            >
              My DevOps skills ensure seamless deployment and hosting solutions using platforms like Vercel, Netlify, and custom domain configurations. I'm also an active content creator, sharing my knowledge through tutorials, articles, and open-source contributions.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4 pt-4"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <FiAward className="text-xl" />
              </div>
              <div>
                <h4 className="font-medium" style={{ color: colors.textPrimary }}>20+ Projects</h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>Delivered successfully</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.cardBorder}`
                }}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${skill.gradient} text-white`}>
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: colors.textPrimary }}>
                  {skill.category}
                </h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span 
                        className="w-2 h-2 rounded-full mr-2" 
                        style={{ backgroundColor: colors.dotColor }}
                      ></span>
                      <span style={{ color: colors.textSecondary }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}