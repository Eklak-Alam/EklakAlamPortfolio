"use client";

import { motion, useAnimation } from "framer-motion";
import { 
  FiMail, 
  FiPhone, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram,
  FiSend,
  FiMapPin,
  FiMessageSquare
} from "react-icons/fi";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaTelegram } from "react-icons/fa";

export function Contact() {
  const { darkMode } = useTheme();
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub className="text-2xl" />,
      url: "https://github.com/Eklak-Alam",
      color: "from-gray-800 via-gray-700 to-gray-900",
      hover: "hover:shadow-gray-500/20"
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin className="text-2xl" />,
      url: "https://www.linkedin.com/in/eklak-alam-40ba632b5/",
      color: "from-blue-600 via-blue-700 to-blue-800",
      hover: "hover:shadow-blue-500/30"
    },
    {
      name: "Twitter",
      icon: <FiTwitter className="text-2xl" />,
      url: "https://x.com/dev_eklak",
      color: "from-sky-400 via-sky-500 to-sky-600",
      hover: "hover:shadow-sky-400/30"
    },
    {
      name: "Instagram",
      icon: <FiInstagram className="text-2xl" />,
      url: "https://www.instagram.com/eklak__alam/",
      color: "from-pink-500 via-purple-500 to-purple-600",
      hover: "hover:shadow-purple-500/30"
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="text-2xl" />,
      url: "https://t.me/stack_connect",
      color: "from-blue-500 via-blue-500 to-blue-600",
      hover: "hover:shadow-blue-500/30"
    }
  ];

  const contactMethods = [
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email Me",
      value: "eklakalam420@gmail.com",
      action: "mailto:eklakalam420@gmail.com",
      color: "from-blue-500 to-emerald-500",
      textColor: darkMode ? "#60a5fa" : "#2563eb" // Tailwind: blue-400 (dark) / blue-600 (light)
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: "WhatsApp",
      value: "+91 XXXXXXXXXX",
      action: "https://wa.me/XXXXXXXXXX",
      color: "from-emerald-500 to-green-500",
      textColor: darkMode ? "#34d399" : "#059669" // emerald-400 / emerald-600
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Location",
      value: "Chapra, Bihar, India",
      action: "https://maps.google.com",
      color: "from-amber-500 to-orange-500",
      textColor: darkMode ? "#fbbf24" : "#f97316" // amber-400 / orange-500
    }
  ];


  // Color schemes for both modes
  const darkColors = {
    background: "#0f172a",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    cardBg: "rgba(30, 41, 59, 0.5)",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    accentGradient: "from-blue-400 to-emerald-400",
    iconBg: "rgba(59, 130, 246, 0.1)",
    glowBg1: "rgba(59, 130, 246, 0.1)",
    glowBg2: "rgba(16, 185, 129, 0.1)",
    particleColor: "rgba(96, 165, 250, 0.3)",
    arrowColor: "#9ca3af",
    arrowHoverColor: "#ffffff"
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    cardBg: "rgba(248, 250, 252, 0.8)",
    cardBorder: "rgba(0, 0, 0, 0.1)",
    accentGradient: "from-blue-500 to-emerald-500",
    iconBg: "rgba(219, 234, 254, 0.5)",
    glowBg1: "rgba(219, 234, 254, 0.5)",
    glowBg2: "rgba(209, 250, 229, 0.5)",
    particleColor: "rgba(59, 130, 246, 0.2)",
    arrowColor: "#6b7280",
    arrowHoverColor: "#1e40af"
  };

  const colors = darkMode ? darkColors : lightColors;

  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      ref={containerRef}
      style={{ backgroundColor: colors.background }}
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100 * (i % 2 === 0 ? 1 : -1)],
              y: [0, 50 * (i % 3 === 0 ? 1 : -1)],
              rotate: [0, 180],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{
              width: `${10 + i * 2}px`,
              height: `${10 + i * 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: colors.particleColor
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div 
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-3xl filter pointer-events-none" 
        style={{ backgroundColor: colors.glowBg1 }}
      />
      <div 
        className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-3xl filter pointer-events-none" 
        style={{ backgroundColor: colors.glowBg2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6"
          >
            <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500">
              <div 
                className="rounded-full p-3"
                style={{ backgroundColor: colors.background }}
              >
                <FiMessageSquare className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400" />
              </div>
            </div>
          </motion.div>
          <h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Connect</span>
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Whether you have a project in mind or just want to chat tech, I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 
              className="text-2xl font-bold mb-8 flex items-center gap-3"
              style={{ color: colors.textPrimary }}
            >
              <div 
                className="p-2 rounded-lg"
                style={{ background: colors.iconBg }}
              >
                <FiSend className="text-blue-400" />
              </div>
              <span>Find Me Online</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-5">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative overflow-hidden group rounded-xl p-6 flex flex-col items-center justify-center text-white transition-all ${link.hover} shadow-xl`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-0 bg-noise opacity-10" />
                  <div className="relative z-10 flex flex-col items-center">
                    {link.icon}
                    <span className="mt-3 font-medium">{link.name}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 group-hover:bg-white/30 transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Direct Contact */}
          <motion.div variants={itemVariants}>
            <h3 
              className="text-2xl font-bold mb-8 flex items-center gap-3"
              style={{ color: colors.textPrimary }}
            >
              <div 
                className="p-2 rounded-lg"
                style={{ background: colors.iconBg }}
              >
                <FiPhone className="text-emerald-400" />
              </div>
              <span>Direct Contact</span>
            </h3>
            
            <div className="space-y-5">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  href={method.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden group rounded-xl p-6 flex items-center gap-5 transition-all backdrop-blur-sm border shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder
                  }}
                >
                  <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div 
                    className="p-3 rounded-lg"
                    style={{ background: colors.iconBg, color: method.textColor }}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 style={{ color: colors.textSecondary }}>{method.title}</h4>
                    <p 
                      className="text-lg font-medium"
                      style={{ color: colors.textPrimary }}
                    >
                      {method.value}
                    </p>
                  </div>
                  <div 
                    className="transition-colors"
                    style={{ 
                      color: colors.arrowColor,
                      '&:hover': {
                        color: colors.arrowHoverColor
                      }
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <p 
            className="mb-8 text-lg"
            style={{ color: colors.textSecondary }}
          >
            Ready to start your project?
          </p>
          <motion.a
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            href="mailto:eklakalam420@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold shadow-2xl hover:shadow-emerald-500/30 transition-all"
          >
            <FiMail className="text-xl" />
            <span>Send Me An Email</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}