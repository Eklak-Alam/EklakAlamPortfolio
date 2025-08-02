"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram,
  FiMail,
  FiYoutube,
  FiArrowRight
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { FaTelegram } from "react-icons/fa";

export function Footer() {
  const { darkMode } = useTheme();
  
  // Social links with specific colors
  const socialLinks = [
    { 
      icon: <FiGithub />, 
      url: "https://github.com/Eklak-Alam", 
      name: "GitHub",
      color: "text-gray-700 dark:text-gray-300",
      hoverColor: "hover:text-gray-900 dark:hover:text-white",
      bgColor: "bg-gray-100 dark:bg-gray-800"
    },
    { 
      icon: <FiTwitter />, 
      url: "https://x.com/dev_eklak", 
      name: "Twitter",
      color: "text-blue-400 dark:text-blue-400",
      hoverColor: "hover:text-blue-500 dark:hover:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
    { 
      icon: <FiLinkedin />, 
      url: "https://www.linkedin.com/in/eklak-alam-40ba632b5/", 
      name: "LinkedIn",
      color: "text-blue-600 dark:text-blue-400",
      hoverColor: "hover:text-blue-700 dark:hover:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
    { 
      icon: <FiInstagram />, 
      url: "https://www.instagram.com/eklak__alam/", 
      name: "Instagram",
      color: "text-pink-600 dark:text-pink-400",
      hoverColor: "hover:text-pink-700 dark:hover:text-pink-300",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    { 
      icon: <FiYoutube />, 
      url: "https://www.youtube.com/@eklakalam04", 
      name: "YouTube",
      color: "text-red-600 dark:text-red-400",
      hoverColor: "hover:text-red-700 dark:hover:text-red-300",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    { 
      icon: <FiMail />, 
      url: "mailto:eklakalam420@email.com", 
      name: "Email",
      color: "text-amber-600 dark:text-amber-400",
      hoverColor: "hover:text-amber-700 dark:hover:text-amber-300",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    { 
      icon: <FaTelegram />, 
      url: "https://t.me/stack_connect", 
      name: "Telegram",
      color: "text-blue-500 dark:text-blue-400",
      hoverColor: "hover:text-blue-600 dark:hover:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Color schemes for both modes
  const darkColors = {
    background: "bg-gradient-to-b from-slate-900 to-slate-950",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    border: "border-slate-800",
    cardBg: "bg-slate-800/50",
    hoverBg: "hover:bg-slate-700/50",
    buttonGradient: "from-purple-500 to-blue-500",
    accent1: "bg-teal-400",
    accent2: "bg-blue-400",
    accent3: "bg-purple-400",
    arrowColor: "text-teal-400",
    inputBg: "bg-slate-800/50",
    inputBorder: "border-slate-700",
    inputFocus: "focus:ring-purple-500/50 focus:border-purple-500",
    copyrightBorder: "border-slate-800/50",
    linkHover: "hover:text-white"
  };

  const lightColors = {
    background: "bg-gradient-to-b from-slate-50 to-slate-100",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    border: "border-slate-200",
    cardBg: "bg-slate-100/80",
    hoverBg: "hover:bg-slate-200/50",
    buttonGradient: "from-purple-400 to-blue-400",
    accent1: "bg-teal-500",
    accent2: "bg-blue-500",
    accent3: "bg-purple-500",
    arrowColor: "text-teal-500",
    inputBg: "bg-slate-100/80",
    inputBorder: "border-slate-300",
    inputFocus: "focus:ring-purple-400/50 focus:border-purple-400",
    copyrightBorder: "border-slate-200/50",
    linkHover: "hover:text-slate-900"
  };

  const colors = darkMode ? darkColors : lightColors;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        damping: 10,
        mass: 0.5
      }
    }
  };

  const hoverVariant = {
    hover: { 
      x: 5,
      color: darkMode ? "#ffffff" : "#1e293b",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const socialIconHover = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <footer className={`${colors.background} ${colors.textPrimary} pt-20 pb-12 border-t ${colors.border}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <div className={`relative h-12 w-12 rounded-full overflow-hidden border-2 ${colors.border} bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">EA</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Eklak Alam
                </span>
              </motion.div>
            </Link>
            <p className={`${colors.textSecondary} text-lg leading-relaxed`}>
              Crafting exceptional digital experiences with cutting-edge technology and innovative design solutions that drive real business results.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ scale: 1 }}
                  className={`${social.color} ${social.hoverColor} text-xl p-3 transition-all ${social.bgColor} rounded-xl backdrop-blur-sm flex items-center justify-center`}
                  aria-label={social.name}
                  custom={index}
                >
                  <motion.div variants={socialIconHover}>
                    {social.icon}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className={`text-lg font-semibold ${colors.textPrimary} flex items-center gap-2`}>
              <span className={`w-2 h-2 rounded-full ${colors.accent1}`}></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  variants={hoverVariant}
                  whileHover="hover"
                  custom={index}
                >
                  <Link
                    href={link.href}
                    className={`${colors.textSecondary} ${colors.linkHover} flex items-center gap-2 transition-colors duration-200 group`}
                  >
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      className="inline-block"
                      whileHover={{ 
                        opacity: 1,
                        x: 0,
                        color: colors.arrowColor
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FiArrowRight className="text-sm" />
                    </motion.span>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div variants={itemVariants} className="space-y-4 lg:col-span-2">
            <h3 className={`text-lg font-semibold ${colors.textPrimary} flex items-center gap-2`}>
              <span className={`w-2 h-2 rounded-full ${colors.accent3}`}></span>
              Stay Updated
            </h3>
            <p className={`${colors.textSecondary} text-lg`}>
              Join my newsletter for exclusive content, latest projects, and tech insights delivered straight to your inbox.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <motion.input
                  type="email"
                  placeholder="Your email address"
                  whileFocus={{
                    boxShadow: darkMode 
                      ? "0 0 0 2px rgba(139, 92, 246, 0.5)" 
                      : "0 0 0 2px rgba(167, 139, 250, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  className={`w-full px-5 py-3 rounded-xl ${colors.inputBg} border ${colors.inputBorder} focus:outline-none focus:ring-2 ${colors.inputFocus} ${colors.textPrimary} placeholder-slate-500 backdrop-blur-sm transition-all duration-200`}
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: darkMode 
                      ? "0 4px 14px 0 rgba(124, 58, 237, 0.3)" 
                      : "0 4px 14px 0 rgba(124, 58, 237, 0.2)"
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    boxShadow: "none"
                  }}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-gradient-to-r ${colors.buttonGradient} text-white font-medium text-sm shadow-md`}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className={`${colors.textSecondary} text-sm`}>
                No spam ever. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className={`border-t ${colors.copyrightBorder} mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${colors.textSecondary}`}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Eklak Alam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -2,
                  color: darkMode ? "#ffffff" : "#1e293b"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href="/" className={`text-sm ${colors.textSecondary} ${colors.linkHover} transition-colors`}>
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}