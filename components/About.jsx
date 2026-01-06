"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { 
  Code2, Server, Cloud, Cpu, 
  TerminalSquare, Layers, Globe, Zap, 
  ArrowUpRight
} from "lucide-react";

export function AboutSection() {
  const { darkMode } = useTheme();

  // 1. Theme Config (Strict Monochrome - Clean & Professional)
  const themeStyles = darkMode ? {
    bg: "bg-[#050505]",
    textMain: "text-white",
    textSub: "text-neutral-400",
    textDim: "text-neutral-600",
    cardBg: "bg-[#0A0A0A]",
    cardBorder: "border-white/10",
    cardHover: "hover:border-white/30 hover:bg-white/5",
    badgeBg: "bg-white/10 text-white",
    statsBorder: "border-white/10",
    grid: "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
  } : {
    bg: "bg-white",
    textMain: "text-neutral-900",
    textSub: "text-neutral-600",
    textDim: "text-neutral-400",
    cardBg: "bg-white",
    cardBorder: "border-neutral-200",
    cardHover: "hover:border-black/20 hover:bg-neutral-50",
    badgeBg: "bg-black/5 text-black",
    statsBorder: "border-neutral-200",
    grid: "bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]"
  };

  const skills = [
    {
      title: "Frontend Engineering",
      icon: <Code2 className="w-6 h-6" />,
      desc: "Crafting pixel-perfect, responsive interfaces with Next.js and Tailwind.",
      tags: ["React", "TypeScript", "Framer Motion"]
    },
    {
      title: "Backend Architecture", 
      icon: <Server className="w-6 h-6" />,
      desc: "Building robust, high-availability APIs and microservices.",
      tags: ["Node.js", "Spring Boot", "GraphQL"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      desc: "Automating deployment pipelines and managing cloud infrastructure.",
      tags: ["AWS", "Docker", "Kubernetes"]
    },
    {
      title: "AI Integration",
      icon: <Cpu className="w-6 h-6" />,
      desc: "Embedding intelligent agents and LLMs into modern web apps.",
      tags: ["Python", "LangChain", "RAG"]
    },
  ];

  const stats = [
    { label: "Years Building", value: "1" },
    { label: "Clients Served", value: "5" },
    { label: "Projects Shipped", value: "10+" },
  ];


  return (
    <section id="about" className={`pt-20 px-4 sm:px-6 relative overflow-hidden ${themeStyles.bg} transition-colors duration-500`}>
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 2. CENTERED HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${themeStyles.badgeBg}`}
          >
            <TerminalSquare className="w-4 h-4" />
            <span>About The Developer</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight ${themeStyles.textMain}`}
          >
            I build systems that <br className="hidden sm:block" />
            are <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">scalable by design.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-lg sm:text-xl leading-relaxed ${themeStyles.textSub}`}
          >
            I am a Full-Stack Architect focused on performance and maintainability. 
            I bridge the gap between complex backend logic and intuitive frontend experiences.
          </motion.p>

          {/* Clean Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`grid grid-cols-3 sm:grid-cols-3 justify-center gap-8 sm:gap-16 mt-10 pt-5 border-t ${themeStyles.statsBorder}`}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-2xl sm:text-3xl font-bold ${themeStyles.textMain}`}>{stat.value}</div>
                <div className={`text-xs font-mono uppercase tracking-wider mt-1 ${themeStyles.textDim}`}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3. SYMMETRICAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group p-8 rounded-2xl border transition-all duration-300 ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardHover}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-xl border transition-colors ${themeStyles.cardBorder} ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  {skill.icon}
                </div>
                {/* Subtle Arrow Icon on Hover */}
                <ArrowUpRight className={`w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ${themeStyles.textSub}`} />
              </div>

              <h3 className={`text-xl font-bold mb-3 ${themeStyles.textMain}`}>
                {skill.title}
              </h3>
              
              <p className={`text-sm leading-relaxed mb-6 ${themeStyles.textSub}`}>
                {skill.desc}
              </p>

              {/* Minimal Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {skill.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className={`text-xs px-2 py-1 rounded border font-medium ${themeStyles.cardBorder} ${themeStyles.textDim}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}