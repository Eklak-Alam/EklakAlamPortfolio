"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiGithub,
  FiMail,
  FiSun,
  FiMoon,
  FiMessageSquare,
} from "react-icons/fi";
import { SiX } from "react-icons/si";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import { FaLinkedinIn } from "react-icons/fa";

export function Navbar() {
  const [hidden, setHidden] = useState(false); // Controls hide/show
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { darkMode, toggleTheme } = useTheme();

  // --- Configuration ---
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <FiGithub size={18} />, url: "https://github.com/Eklak-Alam", name: "GitHub" },
    { icon: <FaLinkedinIn size={18} />, url: "https://www.linkedin.com/in/eklak-alam/", name: "LinkedIn" },
    { icon: <SiX size={18} />, url: "https://x.com/dev_eklak", name: "Twitter" },
    { icon: <FiMail size={18} />, url: "mailto:eklakalam420@gmail.com", name: "Email" },
  ];

  // --- Colors & Styles ---
  const colors = darkMode
    ? {
        glass: "rgba(20, 20, 20, 0.8)",
        border: "rgba(255, 255, 255, 0.1)",
        textMain: "#e5e5e5",      // Main Text (Soft White)
        textHover: "#ffffff",     // Hover Text (Pure White)
        bgHover: "rgba(255, 255, 255, 0.1)", // Subtle Hover Bg
        activeBg: "rgba(255, 255, 255, 0.15)",
      }
    : {
        glass: "rgba(255, 255, 255, 0.9)",
        border: "rgba(0, 0, 0, 0.08)",
        textMain: "#525252",      // Main Text (Neutral 600)
        textHover: "#000000",     // Hover Text (Black)
        bgHover: "rgba(0, 0, 0, 0.05)", // Subtle Hover Bg
        activeBg: "rgba(0, 0, 0, 0.08)",
      };

  // --- Logic ---
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href.replace("#", ""));
  };

  useEffect(() => { setIsMounted(true); }, []);

  // --- Scroll Visibility Logic ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // If scrolling DOWN and passed 150px -> Hide
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      // If scrolling UP -> Show
      setHidden(false);
    }
  });

  if (!isMounted) return null;

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: -150 }, // Moves up 150px to completely clear the screen
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <motion.div
          layout
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="pointer-events-auto backdrop-blur-xl rounded-full shadow-2xl flex items-center p-2 px-5 md:px-6 gap-4 md:gap-6"
          style={{
            backgroundColor: colors.glass,
            border: `1px solid ${colors.border}`,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          
          {/* 1. Logo (Clean Font) */}
          <div 
            onClick={() => scrollToSection("home")}
            className="cursor-pointer"
          >
            <span 
              className="font-sans font-bold text-xl tracking-tight whitespace-nowrap" 
              style={{ color: darkMode ? "#fff" : "#000" }} // Always pure black or white for logo
            >
              Eklak Alam
            </span>
          </div>

          {/* 2. Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{ 
                  color: pathname === item.href ? (darkMode ? "#fff" : "#000") : colors.textMain,
                  backgroundColor: pathname === item.href ? colors.activeBg : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.textHover;
                  e.currentTarget.style.backgroundColor = colors.bgHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = pathname === item.href ? (darkMode ? "#fff" : "#000") : colors.textMain;
                  e.currentTarget.style.backgroundColor = pathname === item.href ? colors.activeBg : "transparent";
                }}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* 3. Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Divider */}
            <div className="hidden lg:block w-px h-5 bg-gray-500/20"></div>

            {/* Social Icons (Expand on Hover) */}
            <div className="hidden lg:flex overflow-hidden">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: isHovered ? "auto" : 0, 
                  opacity: isHovered ? 1 : 0 
                }}
                className="flex items-center gap-1"
              >
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full transition-colors"
                    style={{ color: colors.textMain }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.textHover}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textMain}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              style={{ color: colors.textMain }}
              title="Toggle Theme"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Chat Button (Monochrome) */}
            <a
              href="https://wa.me/919473384492"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95 ${
                darkMode 
                  ? "bg-white text-black hover:bg-gray-200" 
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              <span className="hidden sm:inline">Let's Chat</span>
              <span className="sm:hidden"><FiMessageSquare size={18} /></span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              style={{ color: colors.textMain }}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </motion.div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 mx-auto max-w-sm"
          >
            <div 
              className="backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-2"
              style={{ backgroundColor: colors.glass, border: `1px solid ${colors.border}` }}
            >
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors"
                    style={{ 
                        color: pathname === item.href ? (darkMode ? "#fff" : "#000") : colors.textMain,
                        backgroundColor: pathname === item.href ? colors.activeBg : "transparent"
                    }}
                  >
                    {item.name}
                  </button>
                ))}
                
                {/* Mobile Socials */}
                <div className="flex justify-between px-4 py-3 mt-1 border-t border-gray-500/10">
                   {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: colors.textMain }}
                    >
                      {social.icon}
                    </a>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}