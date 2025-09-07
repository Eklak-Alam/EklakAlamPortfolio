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

  // Enhanced color schemes
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

      // Animate blobs with GSAP for smoother performance
      blobRefs.current.forEach((blob, index) => {
        if (blob) {
          gsap.to(blob, {
            y: index % 2 === 0 ? -30 : 30,
            x: index % 3 === 0 ? -20 : 20,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: 10 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });

      // Animate particles with GSAP
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            y: (Math.random() - 0.5) * 100,
            x: (Math.random() - 0.5) * 50,
            rotation: Math.random() * 360,
            duration: 10 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
          });
        }
      });

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

  // Create floating particles
  const createParticles = () => {
    return [...Array(15)].map((_, i) => (
      <div
        key={i}
        ref={el => particlesRef.current[i] = el}
        className="absolute rounded-full particle"
        style={{
          width: Math.random() * 5 + 2 + 'px',
          height: Math.random() * 5 + 2 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          opacity: Math.random() * 0.5 + 0.1,
          backgroundColor: colors.particleBg,
        }}
      />
    ));
  };

  // Create animated blobs
  const createBlobs = () => {
    return [
      { className: "top-20 left-20 w-80 h-80", color: colors.blobBg1, ref: 0 },
      { className: "bottom-20 right-20 w-96 h-96", color: colors.blobBg2, ref: 1 },
      { className: "top-1/3 right-1/3 w-64 h-64", color: colors.blobBg3, ref: 2 }
    ].map((blob, i) => (
      <div
        key={i}
        ref={el => blobRefs.current[i] = el}
        className={`absolute rounded-full blur-3xl ${blob.className}`}
        style={{ backgroundColor: blob.color }}
      />
    ));
  };

  return (
    <div 
      ref={heroRef}
      className="relative py-32 min-h-screen overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Animated background elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 overflow-hidden"
      >
        {createBlobs()}
      </motion.div>

      {/* Floating particles */}
      {createParticles()}

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
            className="hero-badge inline-flex items-center px-5 py-2.5 backdrop-blur-md rounded-full shadow-lg"
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
            className="space-y-6 hero-title"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight overflow-hidden">
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
            className="hero-description text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
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
              className="hero-button group flex items-center space-x-3 px-8 py-4 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
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
              className="hero-button flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-lg transition-all duration-300"
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

          {/* Enhanced Social links with consistent layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-12"
          >
            <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
              {socialLinks.map((social, index) => {
                const iconColor = darkMode ? social.darkIconColor : social.lightIconColor;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      y: -5, 
                      backgroundColor: `${social.color}20`,
                      borderColor: social.color,
                      color: social.color
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="social-icon p-3.5 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: colors.socialBg,
                      border: `1px solid ${colors.socialBorder}`,
                      color: iconColor,
                      minWidth: '44px'
                    }}
                    aria-label={social.name}
                  >
                    {React.cloneElement(social.icon, {
                      className: "w-5 h-5",
                      color: iconColor
                    })}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>
          Scroll to explore
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
        </motion.div>
      </motion.div>

      {/* Animation styles */}
      <style jsx global>{`
        .particle {
          will-change: transform, opacity;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .particle, .hero-badge, .hero-title span, .hero-description, .hero-button, .social-icon {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;