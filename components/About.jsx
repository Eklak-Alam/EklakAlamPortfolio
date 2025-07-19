"use client";

import { motion } from "framer-motion";
import { FiCode, FiServer, FiCloud, FiFilm, FiAward } from "react-icons/fi";

export function AboutSection() {
  const skills = [
    {
      category: "Frontend Development",
      icon: <FiCode className="text-2xl" />,
      items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion", "etc..."],
      color: "from-blue-500 to-blue-700",
      borderColor: "border-blue-400",
      dotColor: "bg-blue-400" // Specific color for dots
    },
    {
      category: "Backend Development",
      icon: <FiServer className="text-2xl" />,
      items: ["Java", "Spring", "Spring Boot", "JDBC", "REST APIs", "Hibernate", "JPA"],
      color: "from-emerald-500 to-emerald-700",
      borderColor: "border-emerald-400",
      dotColor: "bg-emerald-400" // Specific color for dots
    },
    {
      category: "DevOps & Deployment",
      icon: <FiCloud className="text-2xl" />,
      items: ["Git/GitHub", "Vercel", "Netlify", "Docker", "Domain Management"],
      color: "from-purple-500 to-purple-700",
      borderColor: "border-purple-400",
      dotColor: "bg-purple-400" // Specific color for dots
    },
    {
      category: "Content Creation",
      icon: <FiFilm className="text-2xl" />,
      items: ["Technical Posting", "Video Tutorials", "Open Source", "Community Building"],
      color: "from-amber-500 to-amber-700",
      borderColor: "border-amber-400",
      dotColor: "bg-amber-400" // Specific color for dots
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
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"></div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
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
              className="text-2xl font-bold text-white"
            >
              Crafting Digital Excellence
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-slate-400"
            >
              I'm a passionate full-stack developer with expertise in both frontend and backend technologies. With 5+ years of experience, I specialize in building performant, accessible, and visually stunning web applications.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-slate-400"
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
                <h4 className="font-medium text-white">20+ Projects</h4>
                <p className="text-sm text-slate-400">Delivered successfully</p>
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
                className={`bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 ${skill.borderColor} border-opacity-50`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${skill.color} text-white`}>
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${skill.dotColor}`}></span>
                      <span className="text-slate-300">{item}</span>
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