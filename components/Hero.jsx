'use client';

import { Github, Download, ArrowDown, Youtube } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGitlab } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';

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
    socialBg: "rgba(255, 255, 255, 0.05)",
    socialBorder: "rgba(255, 255, 255, 0.1)",
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#000000",
    textSecondary: "#374151",
    accent: "#000000",
    badgeBg: "rgba(0, 0, 0, 0.05)",
    badgeBorder: "rgba(0, 0, 0, 0.1)",
    socialBg: "rgba(0, 0, 0, 0.05)",
    socialBorder: "rgba(0, 0, 0, 0.1)",
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
      // Add classes in JSX to target these animations
      gsap.fromTo(".hero-title span", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.5 }
      );

      gsap.fromTo(".hero-badge",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
      );

      gsap.fromTo(".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1.2 }
      );

      gsap.fromTo(".hero-button",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 1.5 }
      );

      gsap.fromTo(".social-icon",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", delay: 2 }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const { scrollY } = useScroll();
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

  const socialLinks = [
    { 
      icon: <FaLinkedinIn className="w-5 h-5" />, 
      href: "https://www.linkedin.com/in/eklak-alam-40ba632b5/",
      name: "LinkedIn",
      darkIconColor: "#ffffff",
      lightIconColor: "#0A66C2"
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      href: "https://github.com/Eklak-Alam",
      name: "GitHub",
      darkIconColor: "#ffffff",
      lightIconColor: "#181717"
    },
    { 
      icon: <FiGitlab className="w-5 h-5" />, 
      href: "https://gitlab.com/eklakalam420",
      name: "GitLab",
      darkIconColor: "#E85405",
      lightIconColor: "#E85405"
    },
    { 
      icon: <FaXTwitter className="w-5 h-5" />, 
      href: "https://x.com/eklak__alam",
      name: "Twitter",
      darkIconColor: "#ffffff",
      lightIconColor: "#000000"
    },
    {
      icon: <Youtube className="w-5 h-5" />, 
      href: "https://www.youtube.com/@eklakalam04",
      name: "YouTube",
      darkIconColor: "#FF0000",
      lightIconColor: "#FF0000"
    }
  ];

  return (
    <div 
      ref={heroRef}
      // CHANGED: Added max-w-[100vw] and overflow-x-hidden to strict viewport limits
      className="relative w-full max-w-[100vw] overflow-x-hidden pt-28"
      style={{ backgroundColor: colors.background }}
    >
      {/* Main content */}
      {/* CHANGED: Ensure internal container doesn't force width beyond 100% */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-auto px-4 sm:px-6 lg:px-8 text-center max-w-full">
        <motion.div 
          className="w-full max-w-4xl mx-auto py-8"
          style={{ opacity }}
        >
          {/* Professional badge */}
          <div className="hero-badge inline-flex mb-4 lg:mb-2 items-center px-4 py-2 backdrop-blur-md rounded-full shadow-lg"
            style={{
              backgroundColor: colors.badgeBg,
              border: `1px solid ${colors.badgeBorder}`
            }}
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
            <span className="text-xs sm:text-sm font-medium" style={{ color: colors.textSecondary }}>
              Available for select projects
            </span>
          </div>

          {/* Main headline */}
          <div className="hero-title space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight overflow-hidden break-words">
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
          </div>

          {/* Description */}
          <p
            className="hero-description text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 mb-6 sm:mb-8"
            style={{ color: colors.textSecondary }}
          >
            Blending cutting-edge technology with elegant design to create digital products that 
            captivate users and drive measurable results.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 px-4">
            <a
              href="/EklakResume.pdf"
              download="Eklak_Alam_Resume.pdf"
              className="hero-button cursor-pointer group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 text-white rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              style={{
                backgroundColor: colors.socialBg,
                border: `1px solid ${colors.socialBorder}`,
                color: colors.textPrimary
              }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Download Resume</span>
            </a>
            
            <button
              onClick={scrollToProjects}
              className="hero-button flex cursor-pointer items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
              style={{
                backgroundColor: colors.socialBg,
                border: `1px solid ${colors.socialBorder}`,
                color: colors.textPrimary
              }}
            >
              <span className="text-sm sm:text-base">Explore Work</span>
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Social links */}
          <div className="pt-8 sm:pt-12 px-4">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              {socialLinks.map((social, index) => {
                const iconColor = darkMode ? social.darkIconColor : social.lightIconColor;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon p-3 rounded-lg flex items-center justify-center transition-all duration-300"
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
                  </a>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        /* Minimal Reset for Overflow */
        html, body {
          max-width: 100vw;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;