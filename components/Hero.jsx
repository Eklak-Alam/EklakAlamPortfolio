'use client';

import { Github, Linkedin, Mail, ArrowDown, Download, Youtube } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const { darkMode } = useTheme();

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Content Creator",
    "Generative Ai"
  ];

  // Color schemes for both modes
  const darkColors = {
    background: "#0f172a",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    accent: "#38bdf8",
    badgeBg: "rgba(255, 255, 255, 0.05)",
    badgeBorder: "rgba(255, 255, 255, 0.1)",
    buttonGradient: "linear-gradient(to right, #3b82f6, #6366f1)",
    buttonHoverGradient: "linear-gradient(to right, #60a5fa, #818cf8)",
    socialBg: "rgba(255, 255, 255, 0.05)",
    socialBorder: "rgba(255, 255, 255, 0.1)",
    socialIcon: "#ffffff",
    socialHover: "#38bdf8",
    particleBg: "rgba(255, 255, 255, 0.1)",
    blobBg1: "rgba(59, 130, 246, 0.05)",
    blobBg2: "rgba(16, 185, 129, 0.05)",
    blobBg3: "rgba(99, 102, 241, 0.05)"
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    accent: "#0284c7",
    badgeBg: "rgba(15, 23, 42, 0.05)",
    badgeBorder: "rgba(15, 23, 42, 0.1)",
    buttonGradient: "linear-gradient(to right, #2563eb, #4f46e5)",
    buttonHoverGradient: "linear-gradient(to right, #1d4ed8, #4338ca)",
    socialBg: "rgba(15, 23, 42, 0.05)",
    socialBorder: "rgba(15, 23, 42, 0.1)",
    socialIcon: "#0f172a",
    socialHover: "#0284c7",
    particleBg: "rgba(15, 23, 42, 0.1)",
    blobBg1: "rgba(37, 99, 235, 0.05)",
    blobBg2: "rgba(13, 148, 136, 0.05)",
    blobBg3: "rgba(79, 70, 229, 0.05)"
  };

  const colors = darkMode ? darkColors : lightColors;

  // Typewriter effect
  useEffect(() => {
    const roleText = roles[currentRole];
    let timeoutId;

    if (isTyping) {
      if (displayText.length < roleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(roleText.slice(0, displayText.length + 1));
        }, 120);
      } else {
        timeoutId = setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 60);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentRole]);

  // Parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  // Function to handle scroll to projects
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative py-32 min-h-screen overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Animated background elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div 
          className="absolute top-20 left-20 w-80 h-80 rounded-full blur-3xl animate-float-slow"
          style={{ backgroundColor: colors.blobBg1 }}
        />
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-float-medium"
          style={{ backgroundColor: colors.blobBg2 }}
        />
        <div 
          className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full blur-2xl animate-float-fast"
          style={{ backgroundColor: colors.blobBg3 }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 5 + 2 + 'px',
            height: Math.random() * 5 + 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
            backgroundColor: colors.particleBg,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div 
          className="max-w-5xl mx-auto space-y-10"
          style={{ opacity }}
        >
          {/* Professional badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-5 py-2.5 backdrop-blur-md rounded-full shadow-lg"
            style={{
              backgroundColor: colors.badgeBg,
              border: `1px solid ${colors.badgeBorder}`
            }}
          >
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3" />
            <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
              Currently available for select projects
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block" style={{ color: colors.textPrimary }}>Elevating</span>
              <span 
                className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Digital Experiences
              </span>
            </h1>
            
            {/* Dynamic role */}
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-medium" style={{ color: colors.textSecondary }}>
                <span style={{ color: colors.textPrimary }}>{displayText}</span>
                <span className="ml-1.5 text-emerald-400 animate-pulse">|</span>
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: colors.textSecondary }}
          >
            Blending cutting-edge technology with elegant design to create digital products that 
            captivate users and drive measurable results.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            {/* Download Resume Button */}
            <motion.a
              href="/Eklak_Resume.pdf"
              download="Eklak_Alam_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-3 px-8 py-4 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ background: colors.buttonGradient }}
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </motion.a>
            
            {/* See My Work Button */}
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-all duration-300"
              style={{
                backgroundColor: colors.socialBg,
                border: `1px solid ${colors.socialBorder}`,
                color: colors.textPrimary
              }}
            >
              <span>Explore Work</span>
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Social links - Improved visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center space-x-6 pt-12"
          >
            {[
              { 
                icon: <Linkedin className="w-5 h-5" />, 
                href: "https://www.linkedin.com/in/eklak-alam-40ba632b5/",
                hoverColor: "#0A66C2"
              },
              { 
                icon: <Github className="w-5 h-5" />, 
                href: "https://github.com/Eklak-Alam",
                hoverColor: "#181717"
              },
              { 
                icon: <Mail className="w-5 h-5" />, 
                href: "mailto:eklakalam420@gmail.com",
                hoverColor: "#EA4335"
              },
              {
                icon: <Youtube className="w-5 h-5" />, 
                href: "https://www.youtube.com/@eklakalam04",
                hoverColor: "#FF0000"
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: social.hoverColor }}
                whileTap={{ scale: 0.9 }}
                className="p-4 backdrop-blur-md rounded-xl shadow-sm transition-all duration-300"
                style={{
                  backgroundColor: colors.socialBg,
                  border: `1px solid ${colors.socialBorder}`,
                  color: colors.socialIcon
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(-10px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default HeroSection;