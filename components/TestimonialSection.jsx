"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Sawrabh",
    title: "CEO, Shanaya Training",
    quote: "Eklak transformed our online presence completely. His technical expertise is unmatched. The website exceeded all our expectations.",
    rating: 5,
    project: "Shanaya Training Website",
    date: "March 2023",
    avatar: "S"
  },
  {
    id: 2,
    name: "Sanskar",
    title: "Founder, Blix Media",
    quote: "Working with Eklak was a game-changer. He understood our vision perfectly and executed it flawlessly with top-notch React skills.",
    rating: 5,
    project: "Blix Media Platform",
    date: "January 2024",
    avatar: "S"
  },
  {
    id: 4,
    name: "Rahul Mahawer",
    title: "Director, Balaji Institute",
    quote: "Exceptional work delivered ahead of schedule with excellent post-launch support. Highly professional throughout the project.",
    rating: 5,
    project: "Balaji Training Portal",
    date: "August 2023",
    avatar: "R"
  },
  {
    id: 5,
    name: "Aman Gupta",
    title: "Senior Developer",
    quote: "Impressed by Eklak's clean code and architecture decisions. A true professional who delivers quality work consistently.",
    rating: 5,
    project: "Code Review Collaboration",
    date: "February 2024",
    avatar: "A"
  }
];

export function TestimonialsSection() {
  const { darkMode } = useTheme();

  // Duplicate the array to create the seamless infinite loop
  const infiniteTestimonials = [...testimonials, ...testimonials];

  // Colors based on theme
  const bgSection = darkMode ? "bg-black" : "bg-neutral-50";
  const headingColor = darkMode ? "text-white" : "text-neutral-900";
  const subHeadingColor = darkMode ? "text-neutral-400" : "text-neutral-600";
  
  // Gradient Masks for smooth fade in/out on edges
  const maskImage = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";

  return (
    <section className={`pb-10 relative overflow-hidden ${bgSection}`}>
      {/* Background Decor */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${darkMode ? "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" : "bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]"} bg-[size:32px_32px]`} />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${headingColor}`}>
            Client <span className={darkMode ? "text-blue-500" : "text-blue-600"}>Testimonials</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${subHeadingColor}`}>
            Trusted by founders and tech leaders. Here is what they have to say about our collaboration.
            </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div 
        className="flex relative overflow-hidden"
        style={{ maskImage: maskImage, WebkitMaskImage: maskImage }}
      >
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: "-50%" }}
          transition={{
            duration: 40, // Speed of scroll (higher = slower)
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "fit-content" }}
        >
          {infiniteTestimonials.map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} data={item} darkMode={darkMode} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ data, darkMode }) {
  // Dynamic Card Styles
  const cardBg = darkMode ? "bg-[#111111]" : "bg-white";
  const cardBorder = darkMode ? "border-neutral-800" : "border-neutral-100 shadow-xl shadow-neutral-200/50";
  const textColor = darkMode ? "text-neutral-300" : "text-neutral-600";
  const nameColor = darkMode ? "text-white" : "text-neutral-900";
  
  return (
    <div 
      className={`relative w-[350px] md:w-[400px] flex-shrink-0 p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${cardBg} ${cardBorder}`}
    >
      {/* Quote Icon Background */}
      <Quote className={`absolute top-6 right-8 w-12 h-12 opacity-[0.05] ${darkMode ? "text-white" : "text-black"}`} />

      {/* Header: Avatar + Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg`}>
          {data.avatar}
        </div>
        <div>
          <h4 className={`text-lg font-bold ${nameColor}`}>{data.name}</h4>
          <p className={`text-xs uppercase tracking-wide opacity-70 ${nameColor}`}>{data.title}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < data.rating ? "fill-yellow-400 text-yellow-400" : "fill-neutral-700 text-neutral-700"}`} 
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className={`text-base leading-relaxed mb-6 italic ${textColor}`}>
        "{data.quote}"
      </blockquote>

      {/* Footer: Project Info */}
      <div className={`pt-4 border-t flex justify-between items-center ${darkMode ? "border-neutral-800" : "border-neutral-100"}`}>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500">
            {data.project}
        </span>
        <span className={`text-xs font-medium opacity-50 ${nameColor}`}>
            {data.date}
        </span>
      </div>
    </div>
  );
}