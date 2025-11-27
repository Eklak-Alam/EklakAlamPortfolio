"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail, FiSun, FiMoon } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { FaTelegram } from "react-icons/fa";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { darkMode, toggleTheme } = useTheme();

  // Enhanced color schemes with better contrast
  const darkColors = {
    primary: "#ffffff",
    secondary: "#e5e5e5",
    accent: "#9ca3af",
    dark: "#000000",
    medium: "#111111",
    light: "#ffffff",
    border: "rgba(255, 255, 255, 0.08)",
    glass: "rgba(0, 0, 0, 0.85)",
    text: "#ffffff",
    background: "#000000",
    highlight: "rgba(255, 255, 255, 0.04)",
  };

  const lightColors = {
    primary: "#2563eb",
    secondary: "#059669",
    accent: "#7c3aed",
    dark: "#f1f5f9",
    medium: "#cbd5e1",
    light: "#0f172a",
    border: "rgba(0,0,0,0.06)",
    glass: "rgba(255,255,255,0.9)",
    text: "#0f172a",
    background: "#ffffff",
    highlight: "rgba(0,0,0,0.03)",
  };

  const colors = darkMode ? darkColors : lightColors;

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Handle click on nav items
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
  };

  const socialLinks = [
    { 
      icon: <FiGithub />, 
      url: "https://github.com/Eklak-Alam", 
      name: "GitHub",
      color: darkMode ? "text-gray-300" : "text-gray-700",
      hoverColor: darkMode ? "hover:text-white" : "hover:text-gray-900",
      bgColor: darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
    },
    { 
      icon: <FiLinkedin />, 
      url: "https://www.linkedin.com/in/eklak-alam-40ba632b5/", 
      name: "LinkedIn",
      color: darkMode ? "text-blue-400" : "text-blue-600",
      hoverColor: darkMode ? "hover:text-blue-300" : "hover:text-blue-700",
      bgColor: darkMode ? "hover:bg-blue-900/30" : "hover:bg-blue-100/50"
    },
    { 
      icon: <FiTwitter />, 
      url: "https://x.com/dev_eklak", 
      name: "Twitter",
      color: darkMode ? "text-blue-400" : "text-blue-500",
      hoverColor: darkMode ? "hover:text-blue-300" : "hover:text-blue-600",
      bgColor: darkMode ? "hover:bg-blue-900/30" : "hover:bg-blue-100/50"
    },
    { 
      icon: <FiMail />, 
      url: "mailto:eklakalam420@gmail.com", 
      name: "Email",
      color: darkMode ? "text-amber-400" : "text-amber-600",
      hoverColor: darkMode ? "hover:text-amber-300" : "hover:text-amber-700",
      bgColor: darkMode ? "hover:bg-amber-900/20" : "hover:bg-amber-100/50"
    },
    { 
      icon: <FaTelegram />, 
      url: "https://t.me/stack_connect", 
      name: "Telegram",
      color: darkMode ? "text-blue-400" : "text-blue-500",
      hoverColor: darkMode ? "hover:text-blue-300" : "hover:text-blue-600",
      bgColor: darkMode ? "hover:bg-blue-900/30" : "hover:bg-blue-100/50"
    }
  ];

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    // { name: "Skills", href: "#techStack" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  // Set mounted state to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced scroll behavior with smoother transitions
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 30) {
      setIsScrolled(true);
      if (mobileMenuOpen) setMobileMenuOpen(false);
    } else if (latest < previous || latest <= 30) {
      setIsScrolled(false);
    }
  });

  // Only render client-side to avoid hydration mismatch
  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isScrolled ? -100 : 0,
          opacity: 1
        }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          mass: 0.5,
          opacity: { duration: 0.3 }    
        }}
        className="fixed top-6 inset-x-0 z-50 mx-auto w-[92%] lg:w-[76%] max-w-7xl"
      >
        <div className="relative">
          {/* Premium glass background with smoother transitions */}
          <motion.div
            className="backdrop-blur-xl rounded-xl shadow-2xl"
            style={{
              backgroundColor: colors.glass,
              border: `1px solid ${colors.border}`,
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0,0,0,0.25)' 
                : '0 8px 32px rgba(0,0,0,0.1)'
            }}
            whileHover={{ 
              backdropFilter: "blur(20px)",
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="px-6 sm:px-8 py-4">
              <div className="flex justify-between items-center">
                {/* Enhanced Animated Logo */}
                <motion.span
                  onClick={() => scrollToSection('home')}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundPosition: "100%"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="text-2xl font-bold bg-clip-text text-transparent bg-[length:300%] bg-left hover:bg-right transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
                  }}
                >
                  Eklak Alam
                </motion.span>

                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Enhanced Desktop Navigation */}
                  <div className="hidden lg:flex items-center gap-6">
                    {navItems.map((item) => (
                      <motion.button
                        key={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`relative cursor-pointer px-1 py-2 text-[15px] font-medium transition-colors ${
                          pathname === item.href
                            ? darkMode 
                              ? "text-white" 
                              : "text-slate-900"
                            : darkMode 
                              ? "text-slate-300 hover:text-white"
                              : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {item.name}
                        {pathname === item.href && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute left-0 top-full h-[2px] w-full"
                            style={{
                              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                              boxShadow: `0 2px 8px ${colors.primary}80`
                            }}
                            transition={{ 
                              type: "spring", 
                              bounce: 0.25, 
                              duration: 0.6 
                            }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Enhanced Theme Toggle - Hidden on tablet, visible on desktop */}
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 15,
                      backgroundColor: darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)"
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      rotate: 0
                    }}
                    className="hidden lg:flex p-2 cursor-pointer rounded-full focus:outline-none transition-all"
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                    style={{
                      backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)",
                      color: darkMode ? "#f8fafc" : "#0f172a",
                      boxShadow: darkMode 
                        ? "0 2px 8px rgba(255,255,255,0.1)" 
                        : "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                  >
                    {darkMode ? (
                      <FiSun size={20} className="text-yellow-400" />
                    ) : (
                      <FiMoon size={20} className="text-slate-800" />
                    )}
                  </motion.button>

                  {/* Enhanced Social links - desktop - Hidden on tablet */}
                  <div className="hidden xl:flex items-center gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          y: -3, 
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 500 }
                        }}
                        whileTap={{ 
                          scale: 0.9,
                          transition: { type: "spring", stiffness: 500 }
                        }}
                        className={`p-2 rounded-lg cursor-pointer transition-all ${social.color} ${social.hoverColor} ${social.bgColor}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>

                  {/* Enhanced Mobile Menu Button - Show on tablet and mobile */}
                  <motion.button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)"
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      rotate: mobileMenuOpen ? 90 : 0
                    }}
                    className="lg:hidden flex p-2 focus:outline-none rounded-lg transition-all"
                    aria-label="Toggle menu"
                    style={{
                      backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)",
                      color: darkMode ? "#f8fafc" : "#0f172a",
                      boxShadow: darkMode 
                        ? "0 2px 8px rgba(255,255,255,0.1)" 
                        : "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                  >
                    {mobileMenuOpen ? (
                      <FiX size={24} />
                    ) : (
                      <FiMenu size={24} />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu with smoother animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="fixed top-28 inset-x-0 z-40 mx-auto w-[90%] max-w-7xl"
            key="mobile-menu"
          >
            <motion.div 
              className="backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: colors.glass,
                border: `1px solid ${colors.border}`,
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0,0,0,0.3)' 
                  : '0 8px 32px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <div className="flex flex-col divide-y divide-white/10 dark:divide-black/10">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-6 py-4 text-base font-medium transition-colors text-left w-full ${
                      pathname === item.href
                        ? darkMode
                          ? "bg-white/10 text-white"
                          : "bg-black/10 text-slate-900"
                        : darkMode
                          ? "text-slate-300 hover:bg-white/5 hover:text-white"
                          : "text-slate-600 hover:bg-black/5 hover:text-slate-900"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 * index,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {item.name}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="mobile-nav-indicator"
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                            boxShadow: `0 0 8px ${colors.primary}80`,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                        />
                      )}
                    </div>
                  </motion.button>
                ))}               
                
                {/* Enhanced Theme Toggle - Mobile */}
                <motion.div 
                  className="px-6 py-4 flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.05 * navItems.length,
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                >
                  <span className={`text-base font-medium ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)"
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      rotate: 15
                    }}
                    className="p-2 rounded-full transition-all"
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                    style={{
                      backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)",
                      color: darkMode ? "#f8fafc" : "#0f172a",
                      boxShadow: darkMode 
                        ? "0 2px 6px rgba(255,255,255,0.1)" 
                        : "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                  >
                    {darkMode ? (
                      <FiSun size={20} className="text-yellow-400" />
                    ) : (
                      <FiMoon size={20} className="text-slate-800" />
                    )}
                  </motion.button>
                </motion.div>
                
                {/* Enhanced Social links - mobile */}
                <motion.div 
                  className="flex justify-center gap-4 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.05 * (navItems.length + 1),
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        y: -3, 
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 500 }
                      }}
                      whileTap={{ 
                        scale: 0.9,
                        transition: { type: "spring", stiffness: 500 }
                      }}
                      className={`p-3 rounded-lg transition-all ${social.color} ${social.hoverColor} ${social.bgColor}`}
                      aria-label={social.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.1 * index,
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}