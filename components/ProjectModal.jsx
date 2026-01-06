"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  X, ChevronLeft, ChevronRight, Github, ExternalLink, 
  Calendar, Users, Trophy, Zap, Server, Database, Activity, Tag 
} from "lucide-react";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { darkMode } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // For pausing auto-scroll on hover

  // --- 1. DATA PREPARATION ---
  const galleryImages = project ? [
    { url: project.coverImage || project.image, caption: "Project Cover" },
    ...(project.gallery || [])
  ] : [];

  // --- 2. SCROLL LOCKING ---
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
    setCurrentImageIndex(0); // Reset slide on open
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [isOpen]);

  // --- 3. AUTO-SCROLL LOGIC ---
  useEffect(() => {
    if (!isOpen || isPaused || galleryImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, [isOpen, isPaused, galleryImages.length]);

  // --- 4. NAVIGATION HANDLERS ---
  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  if (!project) return null;

  // Theme Constants
  const theme = darkMode ? {
    bg: "bg-[#0A0A0A]",
    textMain: "text-white",
    textSub: "text-neutral-400",
    border: "border-neutral-800",
    cardBg: "bg-[#111]",
    cardBorder: "border-white/5",
    chipBg: "bg-white/5 text-neutral-300 border-white/10",
    accentText: "text-blue-400",
    accentBg: "bg-blue-500/10"
  } : {
    bg: "bg-white",
    textMain: "text-gray-900",
    textSub: "text-gray-600",
    border: "border-gray-200",
    cardBg: "bg-gray-50",
    cardBorder: "border-gray-200",
    chipBg: "bg-gray-100 text-gray-700 border-gray-200",
    accentText: "text-blue-600",
    accentBg: "bg-blue-50"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full h-full sm:h-[95vh] max-w-[1400px] flex flex-col rounded-xl sm:rounded-3xl shadow-2xl overflow-hidden border ${theme.bg} ${theme.border}`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* --- FIXED CLOSE BUTTON --- */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-black/70 transition-all hover:scale-110 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>

            {/* --- SCROLLABLE CONTENT AREA --- */}
            <div 
              className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar"
              data-lenis-prevent="true"
            >
              
              {/* A. CLEAN HERO GALLERY (Auto-Scroll) */}
              <div 
                className="relative w-full h-[40vh] sm:h-[60vh] bg-neutral-900 group cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={galleryImages[currentImageIndex]?.url}
                    alt="Project Preview"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Gradient Shadow at bottom for smooth blend */}
                <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${darkMode ? "from-[#0A0A0A]" : "from-white"} to-transparent opacity-50`} />

                {/* Gallery Controls */}
                {galleryImages.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    {/* Dots Indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {galleryImages.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* B. CONTENT BODY */}
              <div className={`p-6 sm:p-10 lg:p-12 ${theme.bg}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  
                  {/* --- LEFT MAIN COLUMN (8 Cols) --- */}
                  <div className="lg:col-span-8 space-y-12">
                    
                    {/* 1. PROJECT HEADER (Title & Tags) */}
                    <section className="border-b pb-8 border-dashed" style={{ borderColor: darkMode ? '#333' : '#e5e7eb' }}>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {project.status && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                            project.status.includes("Live") 
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}>
                            {project.status}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${theme.chipBg}`}>
                          {project.category || "Development"}
                        </span>
                      </div>
                      
                      <h1 className={`text-4xl sm:text-5xl font-black leading-tight mb-4 ${theme.textMain}`}>
                        {project.title}
                      </h1>
                      <p className={`text-xl sm:text-2xl font-medium ${theme.textSub}`}>
                        {project.tagline}
                      </p>
                    </section>

                    {/* 2. OVERVIEW */}
                    <section>
                      <h3 className={`text-lg font-bold mb-4 uppercase tracking-widest ${theme.textMain}`}>Overview</h3>
                      <p className={`text-base sm:text-lg leading-relaxed whitespace-pre-line ${theme.textSub}`}>
                        {project.description}
                      </p>
                    </section>

                    {/* 3. IMPACT METRICS (Bento Grid) */}
                    {project.impactMetrics && (
                      <section>
                        <h3 className={`text-lg font-bold mb-6 uppercase tracking-widest ${theme.textMain} flex items-center ml-2`}>
                          Key Impact
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {project.impactMetrics.map((metric, idx) => (
                            <div key={idx} className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} hover:border-blue-500/30 transition-colors`}>
                              <div className={`text-4xl font-black mb-2 bg-clip-text text-transparent bg-black dark:bg-white`}>
                                {metric.value}
                              </div>
                              <div className={`text-sm font-bold ${theme.textMain}`}>{metric.label}</div>
                              <div className={`text-xs mt-1 ${theme.textSub}`}>{metric.description}</div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* 4. ENGINEERING DEEP DIVE */}
                    {(project.technicalDecisions || project.architecture) && (
                      <section className={`p-8 rounded-3xl border ${theme.cardBg} ${theme.cardBorder}`}>
                        <h3 className={`text-xl font-bold mb-8 flex items-center gap-2 ${theme.textMain}`}>
                          <Server className="text-purple-500 w-6 h-6" /> Engineering Decisions
                        </h3>
                        
                        {project.technicalDecisions?.map((decision, idx) => (
                          <div key={idx} className="mb-8 last:mb-0">
                            <h4 className={`text-lg font-bold mb-2 ${theme.textMain}`}>{decision.title}</h4>
                            <p className={`text-base leading-relaxed ${theme.textSub}`}>{decision.reason}</p>
                          </div>
                        ))}

                        {project.architecture && (
                          <div className={`mt-8 pt-8 border-t ${darkMode ? "border-white/10" : "border-gray-200"}`}>
                            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme.textSub} flex items-center gap-2`}>
                              <Database className="w-4 h-4" /> Architecture Pattern
                            </h4>
                            <p className={`text-base font-mono p-4 rounded-xl ${darkMode ? "bg-black/30 text-white" : "bg-white text-black border"}`}>
                              {project.architecture}
                            </p>
                          </div>
                        )}
                      </section>
                    )}
                  </div>

                  {/* --- RIGHT SIDEBAR (Sticky) --- */}
                  <div className="lg:col-span-4 space-y-8">
                    <div className="sticky top-3 space-y-8">
                      
                      {/* Project Meta Box */}
                      <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder}`}>
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-6 ${theme.textSub}`}>Project Details</h4>
                        
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-lg ${theme.chipBg}`}>
                              <Users className="w-5 h-5" />
                            </div>
                            <div>
                              <p className={`text-xs font-bold uppercase ${theme.textSub}`}>Team</p>
                              <p className={`font-semibold ${theme.textMain}`}>{project.team || "Solo Project"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-lg ${theme.chipBg}`}>
                              <Trophy className="w-5 h-5" />
                            </div>
                            <div>
                              <p className={`text-xs font-bold uppercase ${theme.textSub}`}>Role</p>
                              <p className={`font-semibold ${theme.textMain}`}>{project.role || "Full Stack"}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-lg ${theme.chipBg}`}>
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                              <p className={`text-xs font-bold uppercase ${theme.textSub}`}>Timeline</p>
                              <p className={`font-semibold ${theme.textMain}`}>{project.duration || "Ongoing"}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3">
                          {project.links?.live && (
                            <Button 
                              className={`w-full h-12 text-base font-bold shadow-lg ${darkMode ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"}`}
                              onClick={() => window.open(project.links.live, "_blank")}
                            >
                              <ExternalLink className="mr-2 w-4 h-4" /> Visit Live Site
                            </Button>
                          )}
                          {project.links?.github && (
                            <Button 
                              variant="outline" 
                              className={`w-full h-12 text-base ${theme.border} ${theme.textMain} hover:bg-neutral-100 dark:hover:bg-white/5`}
                              onClick={() => window.open(project.links.github, "_blank")}
                            >
                              <Github className="mr-2 w-4 h-4" /> View Source
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Tech Stack Box */}
                      <div>
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${theme.textSub}`}>Technologies</h4>
                        <div className="space-y-5">
                          {Array.isArray(project.techStack) ? (
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((t, i) => (
                                <span key={i} className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium border ${theme.chipBg}`}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : (
                            Object.entries(project.techStack || {}).map(([key, techs]) => (
                              <div key={key}>
                                <p className={`text-[10px] font-bold uppercase mb-2 opacity-60 ${theme.textMain}`}>{key}</p>
                                <div className="flex flex-wrap gap-2">
                                  {techs.map((t, i) => (
                                    <span key={i} className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium border ${theme.chipBg}`}>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;