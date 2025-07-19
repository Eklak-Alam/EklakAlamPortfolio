// components/Navbar.tsx
"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Color scheme matching the hero section
  const colors = {
    primary: "#1e40af",       // Blue-800
    secondary: "#047857",     // Emerald-700
    accent: "#4338ca",        // Indigo-700
    dark: "#1e293b",          // Slate-800
    medium: "#475569",        // Slate-600
    light: "#f8fafc",         // Slate-50
    border: "rgba(255,255,255,0.1)", // Glass border
    glass: "rgba(15,23,42,0.8)",     // Glass background
  };

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
              backgroundColor: "rgba(15,23,42,0.9)"
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

                {/* Desktop Navigation with enhanced indicators */}
                <div className="hidden md:flex items-center gap-8">
                  {navItems.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      passHref
                    >
                      <motion.span
                        className={`relative px-1 py-2 text-lg font-medium transition-colors ${
                          pathname === item.href
                            ? "text-white"
                            : "text-slate-300 hover:text-white"
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

                {/* Social links - desktop */}
                <div className="hidden md:flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.span
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-slate-300 hover:text-white p-2 cursor-pointer transition-colors text-lg"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.span>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden text-white focus:outline-none p-2 rounded-lg"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <FiX size={24} className="text-white" />
                  ) : (
                    <FiMenu size={24} className="text-white" />
                  )}
                </motion.button>
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
              <div className="flex flex-col divide-y divide-white/10">
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
                          ? "bg-white/10 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
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
                      className="text-slate-300 hover:text-white p-3 transition-colors text-xl"
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