// components/Navbar.js
"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail, FiSun, FiMoon } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { darkMode, toggleTheme } = useTheme();

  // Color schemes for both modes
  const darkColors = {
    primary: "#1e40af",
    secondary: "#047857",
    accent: "#4338ca",
    dark: "#1e293b",
    medium: "#475569",
    light: "#f8fafc",
    border: "rgba(255,255,255,0.1)",
    glass: "rgba(15,23,42,0.8)",
    text: "#f8fafc",
    background: "#0f172a",
  };

  const lightColors = {
    primary: "#2563eb",
    secondary: "#f97316",
    accent: "#ec4899",
    dark: "#f1f5f9",
    medium: "#cbd5e1",
    light: "#0f172a",
    border: "rgba(0,0,0,0.06)",
    glass: "rgba(255,255,255,0.6)",
    text: "#0f172a",
    background: "#ffffff",
  };

  const colors = darkMode ? darkColors : lightColors;

  // Set mounted state to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced scroll behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 30) {
      setIsScrolled(true);
      if (mobileMenuOpen) setMobileMenuOpen(false);
    } else {
      setIsScrolled(false);
    }
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#techStack" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <FiGithub />, url: "https://github.com/Eklak-Alam", name: "GitHub" },
    { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/eklak-alam-40ba632b5/", name: "LinkedIn" },
    { icon: <FiTwitter />, url: "https://x.com/dev_eklak", name: "Twitter" },
    { icon: <FiMail />, url: "mailto:eklakalam420@gmail.com", name: "Email" }
  ];

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
          opacity: { duration: 0.5 }    
        }}
        className="fixed top-6 inset-x-0 z-50 mx-auto w-[90%] max-w-7xl"
      >
        <div className="relative">
          {/* Premium glass background */}
          <motion.div
            className="backdrop-blur-xl rounded-xl shadow-2xl"
            style={{
              backgroundColor: colors.glass,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
            }}
            whileHover={{ 
              backdropFilter: "blur(16px)",
              backgroundColor: darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)"
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-8 py-4">
              <div className="flex justify-between items-center">
                {/* Animated Logo */}
                <Link href="/" passHref>
                  <motion.span
                    whileHover={{ 
                      scale: 1.05,
                      backgroundPosition: "100%"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-2xl font-bold bg-clip-text text-transparent bg-[length:200%] bg-left hover:bg-right transition-all duration-500"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.accent})`
                    }}
                  >
                    Eklak Alam
                  </motion.span>
                </Link>

                <div className="flex items-center gap-6">
                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        passHref
                      >
                        <motion.span
                          className={`relative px-1 py-2 text-lg font-medium transition-colors ${
                            pathname === item.href
                              ? "text-white dark:text-slate-800"
                              : darkMode 
                                ? "text-slate-300 hover:text-white"
                                : "text-slate-600 hover:text-slate-900"
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.name}
                          {pathname === item.href && (
                            <motion.span
                              layoutId="nav-underline"
                              className="absolute left-0 top-full h-[2px] w-full"
                              style={{
                                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                              }}
                              transition={{ 
                                type: "spring", 
                                bounce: 0.3, 
                                duration: 0.8 
                              }}
                            />
                          )}
                        </motion.span>
                      </Link>
                    ))}
                  </div>

                  {/* Theme Toggle */}
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full focus:outline-none"
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                    style={{
                      backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#f1f5f9", // Slate-100
                      color: darkMode ? "#f8fafc" : "#0f172a", // Stronger contrast
                      boxShadow: darkMode 
                        ? "0 2px 6px rgba(255,255,255,0.1)" 
                        : "0 2px 8px rgba(0,0,0,0.06)"
                    }}
                  >
                    {darkMode ? (
                      <FiSun size={20} className="text-yellow-400" />
                    ) : (
                      <FiMoon size={20} className="text-slate-800" />
                    )}
                  </motion.button>

                  {/* Social links - desktop */}
                  <div className="hidden md:flex items-center gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 cursor-pointer transition-colors text-lg ${
                          darkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile Menu Button */}
                  <motion.button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="lg:hidden focus:outline-none p-2 rounded-lg"
                    aria-label="Toggle menu"
                    style={{
                      backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#f1f5f9", // Slate-100
                      color: darkMode ? "#f8fafc" : "#0f172a", // Stronger contrast
                      boxShadow: darkMode 
                        ? "0 2px 6px rgba(255,255,255,0.1)" 
                        : "0 2px 8px rgba(0,0,0,0.06)"
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

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-28 inset-x-0 z-40 mx-auto w-[90%] max-w-7xl"
            key="mobile-menu"
          >
            <motion.div 
              className="backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: colors.glass,
                border: `1px solid ${colors.border}`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex flex-col divide-y divide-white/10 dark:divide-black/10">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    passHref
                    legacyBehavior
                  >
                    <motion.a
                      className={`px-6 py-4 text-base font-medium transition-colors ${
                        pathname === item.href
                          ? darkMode 
                            ? "bg-white/10 text-white" 
                            : "bg-black/10 text-slate-900"
                          : darkMode 
                            ? "text-slate-300 hover:bg-white/5 hover:text-white"
                            : "text-slate-600 hover:bg-black/5 hover:text-slate-900"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        {item.name}
                        {pathname === item.href && (
                          <motion.div
                            layoutId="mobile-nav-indicator"
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                            }}
                          />
                        )}
                      </div>
                    </motion.a>
                  </Link>
                ))}
                
                {/* Theme Toggle - Mobile */}
                <div className="px-6 py-4 flex items-center justify-between">
                  <span className={`text-base font-medium ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full"
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                    style={{
                      backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#f1f5f9", // Slate-100
                      color: darkMode ? "#f8fafc" : "#0f172a", // Stronger contrast
                      boxShadow: darkMode 
                        ? "0 2px 6px rgba(255,255,255,0.1)" 
                        : "0 2px 8px rgba(0,0,0,0.06)"
                    }}
                  >
                    {darkMode ? (
                      <FiSun size={20} className="text-yellow-400" />
                    ) : (
                      <FiMoon size={20} className="text-slate-800" />
                    )}
                  </motion.button>
                </div>
                
                {/* Social links - mobile */}
                <div className="flex justify-center gap-6 p-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 transition-colors text-xl ${
                        darkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}