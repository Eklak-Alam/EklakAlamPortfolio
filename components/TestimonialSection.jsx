"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Sawrabh ",
    title: "CEO, Shanaya Training",
    quote: "Eklak transformed our online presence completely. His technical expertise is unmatched. The website exceeded all our expectations.",
    rating: 5,
    project: "Shanaya Training Website",
    date: "March 2023"
  },
  {
    id: 2,
    name: "Sanskar ",
    title: "Founder, Blix Media",
    quote: "Working with Eklak was a game-changer. He understood our vision perfectly and executed it flawlessly with top-notch React skills.",
    rating: 5,
    project: "Blix Media Platform",
    date: "January 2024"
  },
  {
    id: 3,
    name: "Eklak Alam",
    title: "CTO, TechSolutions Inc",
    quote: "The AI background removal tool Eklak built saved us hundreds of hours. His solution was both innovative and reliable.",
    rating: 4,
    project: "AI Background Remover",
    date: "November 2023"
  },
  {
    id: 4,
    name: "RAHUL MAHAWER",
    title: "Director, Balaji Institute",
    quote: "Exceptional work delivered ahead of schedule with excellent post-launch support. Highly professional throughout the project.",
    rating: 5,
    project: "Balaji Training Portal",
    date: "August 2023"
  },
  {
    id: 5,
    name: "Random Guys from networking ",
    title: "Senior Developer",
    quote: "Impressed by Eklak's clean code and architecture decisions. A true professional who delivers quality work consistently.",
    rating: 5,
    project: "Code Review Collaboration",
    date: "February 2024"
  }
];

export function TestimonialsSection() {
  const { darkMode } = useTheme();
  const [displayedTestimonials, setDisplayedTestimonials] = useState([...testimonials, ...testimonials]);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Color schemes for both modes
  const darkColors = {
    background: "#0f172a",
    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    cardBg: "#1e293b",
    cardBorder: "rgba(255, 255, 255, 0.1)",
    accentGradient: "from-blue-600 to-indigo-600",
    quoteText: "#e2e8f0",
    quoteIcon: "#93c5fd",
    ratingText: "#9ca3af",
    borderColor: "rgba(255, 255, 255, 0.1)"
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    cardBg: "#f8fafc",
    cardBorder: "rgba(0, 0, 0, 0.1)",
    accentGradient: "from-blue-500 to-indigo-500",
    quoteText: "#334155",
    quoteIcon: "#3b82f6",
    ratingText: "#6b7280",
    borderColor: "rgba(0, 0, 0, 0.1)"
  };

  const colors = darkMode ? darkColors : lightColors;

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: ['0%', '-100%'],
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    }
  }, [isInView, controls]);

  return (
    <section 
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Client <span className={`text-transparent bg-clip-text bg-gradient-to-r ${colors.accentGradient}`}>Testimonials</span>
          </h2>
          <p 
            className="text-2xl max-w-4xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Hear what industry leaders say about working with me
          </p>
        </div>

        <div 
          ref={ref}
          className="relative h-[420px] overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 flex gap-8"
            animate={controls}
          >
            {displayedTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.id}-${index}`} 
                testimonial={testimonial}
                colors={colors}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, colors }) {
  return (
    <div 
      className="w-[380px] h-[380px] shrink-0 rounded-3xl border p-8 shadow-xl"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.borderColor
      }}
    >
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <div className="flex gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i} 
              size={18}
              className={i < testimonial.rating ? "fill-current" : "text-zinc-300"} 
            />
          ))}
        </div>
        <span 
          className="text-sm font-medium"
          style={{ color: colors.ratingText }}
        >
          {testimonial.rating}.0
        </span>
      </div>
      
      <div className="relative h-full flex flex-col">
        <Quote 
          className="absolute top-0 left-0 text-5xl opacity-20" 
          style={{ color: colors.quoteIcon }}
        />
        
        <p 
          className="text-lg leading-relaxed mb-6 mt-4"
          style={{ color: colors.quoteText }}
        >
          "{testimonial.quote}"
        </p>
        
        <div className="mb-6">
          <div 
            className="text-sm font-semibold mb-1"
            style={{ color: colors.quoteIcon }}
          >
            {testimonial.project}
          </div>
          <div 
            className="text-xs"
            style={{ color: colors.ratingText }}
          >
            Completed: {testimonial.date}
          </div>
        </div>

        <div 
          className="mt-auto pt-4 border-t"
          style={{ borderColor: colors.borderColor }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl"
            >
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <div 
                className="font-medium text-lg"
                style={{ color: colors.textPrimary }}
              >
                {testimonial.name}
              </div>
              <div 
                className="text-sm"
                style={{ color: colors.textSecondary }}
              >
                {testimonial.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}