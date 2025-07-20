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

export function Footer() {
  const { darkMode } = useTheme();
  const socialLinks = [
    { icon: <FiGithub className="text-xl" />, url: "https://github.com/Eklak-Alam", name: "GitHub" },
    { icon: <FiTwitter className="text-xl" />, url: "https://x.com/dev_eklak", name: "Twitter" },
    { icon: <FiLinkedin className="text-xl" />, url: "https://www.linkedin.com/in/eklak-alam-40ba632b5/", name: "LinkedIn" },
    { icon: <FiInstagram className="text-xl" />, url: "https://www.instagram.com/eklak__alam/", name: "Instagram" },
    { icon: <FiYoutube className="text-xl" />, url: "https://www.youtube.com/@eklakalam04", name: "YouTube" },
    { icon: <FiMail className="text-xl" />, url: "mailto:eklakalam420@email.com", name: "Email" },
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
    inputFocus: "focus:ring-purple-500/50",
    copyrightBorder: "border-slate-800/50"
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
    inputFocus: "focus:ring-purple-400/50",
    copyrightBorder: "border-slate-200/50"
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
        damping: 10
      }
    }
  };

  const hoverVariant = {
    hover: { 
      x: 5,
      color: darkMode ? "#ffffff" : "#1e293b"
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
                  whileHover={{ 
                    y: -4, 
                    scale: 1.1,
                    backgroundColor: darkMode ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.7)",
                    boxShadow: darkMode ? "0 4px 14px 0 rgba(0, 118, 255, 0.2)" : "0 4px 14px 0 rgba(0, 118, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`${colors.textSecondary} ${darkMode ? "hover:text-white" : "hover:text-slate-900"} text-xl p-3 transition-all ${colors.cardBg} rounded-xl backdrop-blur-sm`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className={`text-lg font-semibold ${colors.textPrimary} flex items-center gap-2`}>
              <span className={`w-2 h-2 rounded-full ${colors.accent1}`}></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 6).map((link, index) => (
                <motion.li 
                  key={index}
                  variants={hoverVariant}
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className={`${colors.textSecondary} ${darkMode ? "hover:text-white" : "hover:text-slate-900"} flex items-center gap-2 transition-colors group`}
                  >
                    <FiArrowRight className={`opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-current`} />
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
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`w-full px-5 py-3 rounded-xl ${colors.inputBg} border ${colors.inputBorder} focus:outline-none focus:ring-2 ${colors.inputFocus} ${colors.textPrimary} placeholder-slate-500 backdrop-blur-sm`}
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: darkMode ? "0 4px 14px 0 rgba(124, 58, 237, 0.3)" : "0 4px 14px 0 rgba(124, 58, 237, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-gradient-to-r ${colors.buttonGradient} text-white font-medium text-sm`}
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
          transition={{ delay: 0.4 }}
          className={`border-t ${colors.copyrightBorder} mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${colors.textSecondary}`}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Eklak Alam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className={`text-sm hover:${colors.textPrimary} transition-colors`}>
              Privacy Policy
            </Link>
            <Link href="/" className={`text-sm hover:${colors.textPrimary} transition-colors`}>
              Terms of Service
            </Link>
            <Link href="/" className={`text-sm hover:${colors.textPrimary} transition-colors`}>
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}