'use client';

import { Github, Linkedin, Mail, ArrowDown, Download, Youtube } from 'lucide-react';
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const { darkMode } = useTheme();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const particlesRef = useRef([]);
  const blobRefs = useRef([]);

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Content Creator",
    "Generative AI Engineer"
  ];

  const darkColors = {
    background: "#000000",
    textPrimary: "#ffffff",
    textSecondary: "#d1d5db",
    accent: "#ffffff",
    badgeBg: "rgba(255, 255, 255, 0.05)",
    badgeBorder: "rgba(255, 255, 255, 0.1)",
    buttonGradient: "linear-gradient(to right, #111111, #000000)",
    buttonHoverGradient: "linear-gradient(to right, #1a1a1a, #0a0a0a)",
    socialBg: "rgba(255, 255, 255, 0.05)",
    socialBorder: "rgba(255, 255, 255, 0.1)",
    socialIcon: "#ffffff",
    socialHover: "#d1d5db",
    particleBg: "rgba(255, 255, 255, 0.08)",
    blobBg1: "rgba(255, 255, 255, 0.03)",
    blobBg2: "rgba(255, 255, 255, 0.04)",
    blobBg3: "rgba(255, 255, 255, 0.02)"
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#000000", // Changed to pure black
    textSecondary: "#374151", // Darker gray for better contrast
    accent: "#000000", // Black accent
    badgeBg: "rgba(0, 0, 0, 0.05)",
    badgeBorder: "rgba(0, 0, 0, 0.1)",
    buttonGradient: "linear-gradient(to right, #000000, #333333)", // Black gradient
    buttonHoverGradient: "linear-gradient(to right, #333333, #666666)",
    socialBg: "rgba(0, 0, 0, 0.05)",
    socialBorder: "rgba(0, 0, 0, 0.1)",
    socialIcon: "#000000",
    socialHover: "#333333",
    particleBg: "rgba(0, 0, 0, 0.1)",
    blobBg1: "rgba(0, 0, 0, 0.05)",
    blobBg2: "rgba(0, 0, 0, 0.04)",
    blobBg3: "rgba(0, 0, 0, 0.02)"
  };

  const colors = darkMode ? darkColors : lightColors;

  // Enhanced typewriter effect
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

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate the title with split text effect
      gsap.fromTo(".hero-title span", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Animate the badge
      gsap.fromTo(".hero-badge",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.3
        }
      );

      // Animate the description
      gsap.fromTo(".hero-description",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 1.2
        }
      );

      // Animate buttons
      gsap.fromTo(".hero-button",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1.5
        }
      );

      // Animate social icons
      gsap.fromTo(".social-icon",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 2
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  const scrollToProjects = () => {
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.scrollTo('#projects', {
        offset: -80,
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Updated social links configuration
  const socialLinks = [
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: "https://www.linkedin.com/in/eklak-alam-40ba632b5/",
      color: "#0A66C2",
      name: "LinkedIn",
      darkIconColor: "#ffffff",
      lightIconColor: "#0A66C2"
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      href: "https://github.com/Eklak-Alam",
      color: darkMode ? "#ffffff" : "#181717",
      name: "GitHub",
      darkIconColor: "#ffffff",
      lightIconColor: "#181717"
    },
    { 
      icon: <FaXTwitter className="w-5 h-5" />, 
      href: "https://x.com/dev_eklak",
      color: darkMode ? "#ffffff" : "#000000",
      name: "Twitter",
      darkIconColor: "#ffffff",
      lightIconColor: "#000000"
    },
    {
      icon: <Youtube className="w-5 h-5" />, 
      href: "https://www.youtube.com/@eklakalam04",
      color: "#FF0000",
      name: "YouTube",
      darkIconColor: "#FF0000",
      lightIconColor: "#FF0000"
    },
    {
      icon: <FaTelegram className="w-5 h-5" />, 
      href: "https://t.me/stack_connect",
      color: "#0088cc",
      name: "Telegram",
      darkIconColor: "#0088cc",
      lightIconColor: "#0088cc"
    }
  ];

  return (
    <div 
      ref={heroRef}
      className="relative w-full overflow-hidden pt-28"
      style={{ backgroundColor: colors.background }}
    >
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="w-full max-w-4xl mx-auto py-8"
          style={{ opacity }}
        >
          {/* Professional badge */}
          <motion.div
            className="inline-flex mb-4 lg:mb-2 items-center px-4 py-2 backdrop-blur-md rounded-full shadow-lg"
            style={{
              backgroundColor: colors.badgeBg,
              border: `1px solid ${colors.badgeBorder}`
            }}
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
            <span className="text-xs sm:text-sm font-medium" style={{ color: colors.textSecondary }}>
              Available for select projects
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            className="space-y-2 sm:space-y-3 mb-4 sm:mb-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight overflow-hidden">
              <span className="block" style={{ color: colors.textPrimary }}>Elevating</span>
              <span className="block" style={{ color: colors.textPrimary }}>
                Digital Experiences
              </span>
            </h1>
            
            {/* Dynamic role */}
            <div className="h-12 sm:h-16 flex items-center justify-center mb-2 sm:mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium px-2" style={{ color: colors.textSecondary }}>
                <span style={{ color: colors.textPrimary }}>{displayText}</span>
                <span className="ml-1.5 text-emerald-400 animate-pulse">|</span>
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 mb-6 sm:mb-8"
            style={{ color: colors.textSecondary }}
          >
            Blending cutting-edge technology with elegant design to create digital products that 
            captivate users and drive measurable results.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 px-4"
          >
            {/* Download Resume Button */}
            <motion.a
              href="/EklakResume.pdf"
              download="Eklak_Alam_Resume.pdf"
              className="cursor-pointer group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 text-white rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              style={{
                backgroundColor: colors.socialBg,
                border: `1px solid ${colors.socialBorder}`,
                color: colors.textPrimary
              }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Download Resume</span>
            </motion.a>
            
            {/* See My Work Button */}
            <motion.button
              onClick={scrollToProjects}
              className="flex cursor-pointer items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
              style={{
                backgroundColor: colors.socialBg,
                border: `1px solid ${colors.socialBorder}`,
                color: colors.textPrimary
              }}
            >
              <span className="text-sm sm:text-base">Explore Work</span>
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>

          {/* Enhanced Social links with consistent layout */}
          <motion.div
            className="pt-8 sm:pt-12 px-4" 
          >
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              {socialLinks.map((social, index) => {
                const iconColor = darkMode ? social.darkIconColor : social.lightIconColor;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: colors.socialBg,
                      border: `1px solid ${colors.socialBorder}`,
                      color: iconColor,
                      minWidth: '44px',
                      minHeight: '44px'
                    }}
                    aria-label={social.name}
                  >
                    {React.cloneElement(social.icon, {
                      className: "w-4 h-4 sm:w-5 sm:h-5",
                      color: iconColor
                    })}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Global styles for overflow prevention */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }
        
        .particle {
          will-change: transform, opacity;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .particle, .hero-badge, .hero-title span, .hero-description, .hero-button, .social-icon {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Ensure no horizontal overflow */
        * {
          box-sizing: border-box;
        }

        /* Responsive font sizes for very small screens */
        @media (max-width: 360px) {
          .hero-title h1 {
            font-size: 2rem !important;
          }
          
          .hero-description {
            font-size: 0.9rem !important;
          }
        }

        /* Fix for mobile viewport height */
        .min-h-screen {
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height for mobile */
        }
      `}</style>
    </div>
  );
};

export default HeroSection;