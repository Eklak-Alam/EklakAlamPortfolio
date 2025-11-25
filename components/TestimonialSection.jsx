"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Sawrabh",
    title: "CEO, Shanaya Training",
    quote: "Eklak transformed our online presence completely. His technical expertise is unmatched. The website exceeded all our expectations.",
    rating: 5,
    project: "Shanaya Training Website",
    date: "March 2023"
  },
  {
    id: 2,
    name: "Sanskar",
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
    name: "Random Guys from networking",
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

  // Pure black & white color scheme
  const darkColors = {
    background: "#000000",
    textPrimary: "#ffffff",
    textSecondary: "#a0a0a0",
    cardBg: "#111111",
    cardBorder: "rgba(255, 255, 255, 0.2)",
    accent: "#3b82f6",
    quoteText: "#e0e0e0",
    quoteIcon: "#93c5fd",
    ratingText: "#9ca3af",
    borderColor: "rgba(255, 255, 255, 0.2)"
  };

  const lightColors = {
    background: "#ffffff",
    textPrimary: "#000000",
    textSecondary: "#666666",
    cardBg: "#f8f8f8",
    cardBorder: "rgba(0, 0, 0, 0.2)",
    accent: "#2563eb",
    quoteText: "#333333",
    quoteIcon: "#3b82f6",
    ratingText: "#6b7280",
    borderColor: "rgba(0, 0, 0, 0.2)"
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
      className="relative py-16 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            Client Testimonials
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Hear what industry leaders say about working with me
          </p>
        </div>

        <div 
          ref={ref}
          className="relative h-80 overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 flex gap-6"
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
      className="w-80 h-72 shrink-0 rounded-xl border p-6"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.borderColor
      }}
    >
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className="flex gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i} 
              size={16}
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
          className="absolute top-0 left-0 text-4xl opacity-20" 
          style={{ color: colors.quoteIcon }}
        />
        
        <p 
          className="text-base leading-relaxed mb-4 mt-2 line-clamp-4"
          style={{ color: colors.quoteText }}
        >
          "{testimonial.quote}"
        </p>
        
        <div className="mb-4">
          <div 
            className="text-sm font-semibold mb-1"
            style={{ color: colors.accent }}
          >
            {testimonial.project}
          </div>
          <div 
            className="text-xs"
            style={{ color: colors.ratingText }}
          >
            {testimonial.date}
          </div>
        </div>

        <div 
          className="mt-auto pt-4 border-t"
          style={{ borderColor: colors.borderColor }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm"
            >
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <div 
                className="font-medium text-base"
                style={{ color: colors.textPrimary }}
              >
                {testimonial.name}
              </div>
              <div 
                className="text-xs"
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