"use client";

import { motion } from "framer-motion";
import { FiCode, FiServer, FiCloud, FiFilm, FiAward, FiCpu, FiGitBranch, FiDatabase } from "react-icons/fi";
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
      items: ["React.js", "Next.js 14", "JavaScript", "Tailwind CSS", "Framer Motion", "Redux"],
      gradient: "from-blue-500 to-cyan-500",
      description: "Building modern, responsive user interfaces"
    },
    {
      category: "Backend Development",
      icon: <FiServer className="text-2xl" />,
      items: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs", "Hibernate", "JWT Auth"],
      gradient: "from-emerald-500 to-green-500",
      description: "Robust server-side applications & APIs"
    },
    {
      category: "DevOps & Cloud",
      icon: <FiCloud className="text-2xl" />,
      items: ["Docker", "Kubernetes", "AWS", "Jenkins", "CI/CD", "Linux", "Nginx"],
      gradient: "from-purple-500 to-pink-500",
      description: "Infrastructure & deployment automation"
    },
    {
      category: "AI & Data Science",
      icon: <FiCpu className="text-2xl" />,
      items: ["Python", "Pandas", "NumPy", "FastAPI", "LangChain"],
      gradient: "from-indigo-500 to-purple-600",
      description: "Machine learning & AI solutions"
    },
    {
      category: "Database & Tools",
      icon: <FiDatabase className="text-2xl" />,
      items: ["MySQL", "PostgreSQL", "Redis", "Git/GitHub", "Postman"],
      gradient: "from-orange-500 to-red-500",
      description: "Data management & development tools"
    },
    {
      category: "Platforms & Services",
      icon: <FiGitBranch className="text-2xl" />,
      items: ["Vercel", "Netlify", "GitHub Actions"],
      gradient: "from-teal-500 to-blue-500",
      description: "Deployment & cloud platforms"
    }
  ];

  const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "5+", label: "Happy Clients" },
    { number: "0+", label: "Years Experience" },
    { number: "10k+", label: "Code Commits" }
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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: darkMode 
        ? "0 20px 40px rgba(0, 0, 0, 0.3)" 
        : "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-6"
          >
            <FiAward className="text-2xl" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            About <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            Full-stack developer & AI enthusiast passionate about crafting exceptional digital experiences 
            and building scalable solutions.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl backdrop-blur-sm border"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder
              }}
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm md:text-base font-medium mt-2" style={{ color: colors.textSecondary }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
              className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"
            >
              Crafting Digital Excellence
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              I'm a passionate full-stack developer with expertise in modern web technologies, 
              cloud infrastructure, and artificial intelligence. I specialize in building 
              performant, scalable, and visually stunning applications that deliver exceptional 
              user experiences.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              My journey includes working with cutting-edge technologies across the entire 
              development stack - from responsive frontends with React and Next.js to robust 
              backends with Spring Boot and Node.js, and deploying scalable solutions using 
              Docker, Kubernetes, and cloud platforms.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              I'm also deeply involved in the AI space, exploring machine learning, computer 
              vision, and building intelligent applications that solve real-world problems.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4 pt-4 p-6 rounded-2xl border"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder
              }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                <FiAward className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>Continuous Learning</h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Always exploring new technologies and best practices
                </p>
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
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden group"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder
                }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-br ${skill.gradient} text-white shadow-lg`}>
                  {skill.icon}
                </div>
                
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.textPrimary }}>
                  {skill.category}
                </h3>
                
                <p className="text-sm mb-4 opacity-80" style={{ color: colors.textSecondary }}>
                  {skill.description}
                </p>
                
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center group/item"
                    >
                      <span 
                        className="w-2 h-2 rounded-full mr-3 transition-all duration-300 group-hover/item:scale-150"
                        style={{ backgroundColor: colors.dotColor }}
                      ></span>
                      <span 
                        className="text-sm transition-all duration-300 group-hover/item:translate-x-1"
                        style={{ color: colors.textSecondary }}
                      >
                        {item}
                      </span>
                    </motion.li>
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