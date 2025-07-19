"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    title: "CEO, Shanaya Training",
    quote: "Eklak transformed our online presence completely. His technical expertise is unmatched. The website exceeded all our expectations.",
    rating: 5,
    project: "Shanaya Training Website",
    date: "March 2023"
  },
  {
    id: 2,
    name: "Priya Patel",
    title: "Founder, Blix Media",
    quote: "Working with Eklak was a game-changer. He understood our vision perfectly and executed it flawlessly with top-notch React skills.",
    rating: 5,
    project: "Blix Media Platform",
    date: "January 2024"
  },
  {
    id: 3,
    name: "Amit Kumar",
    title: "CTO, TechSolutions Inc",
    quote: "The AI background removal tool Eklak built saved us hundreds of hours. His solution was both innovative and reliable.",
    rating: 4,
    project: "AI Background Remover",
    date: "November 2023"
  },
  {
    id: 4,
    name: "Neha Gupta",
    title: "Director, Balaji Institute",
    quote: "Exceptional work delivered ahead of schedule with excellent post-launch support. Highly professional throughout the project.",
    rating: 5,
    project: "Balaji Training Portal",
    date: "August 2023"
  },
  {
    id: 5,
    name: "Vikram Singh",
    title: "Senior Developer",
    quote: "Impressed by Eklak's clean code and architecture decisions. A true professional who delivers quality work consistently.",
    rating: 5,
    project: "Code Review Collaboration",
    date: "February 2024"
  }
];

export function TestimonialsSection() {
  const [displayedTestimonials, setDisplayedTestimonials] = useState([...testimonials, ...testimonials]);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Testimonials</span>
          </h2>
          <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
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
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="w-[380px] h-[380px] shrink-0 rounded-3xl border border-zinc-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-xl">
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <div className="flex gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i} 
              size={18}
              className={i < testimonial.rating ? "fill-current" : "text-zinc-300 dark:text-zinc-600"} 
            />
          ))}
        </div>
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {testimonial.rating}.0
        </span>
      </div>
      
      <div className="relative h-full flex flex-col">
        <Quote className="absolute top-0 left-0 text-blue-400/20 text-5xl dark:text-blue-600/10" />
        
        <p className="text-lg leading-relaxed text-neutral-800 dark:text-gray-200 mb-6 mt-4">
          "{testimonial.quote}"
        </p>
        
        <div className="mb-6">
          <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
            {testimonial.project}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Completed: {testimonial.date}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-lg text-neutral-900 dark:text-white">
                {testimonial.name}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {testimonial.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}