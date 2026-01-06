"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiGithub, 
  FiInstagram,
  FiMail,
  FiYoutube,
  FiArrowUp,
  FiTwitter
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";
import { TerminalSquare, ArrowUpRight } from "lucide-react";

export function Footer() {
  const { darkMode } = useTheme();
  
  // 1. Theme Config (Monochrome Luxury)
  const themeStyles = darkMode ? {
    bg: "bg-[#050505]",
    borderTop: "border-white/10",
    textMain: "text-white",
    textSub: "text-neutral-400",
    textDim: "text-neutral-600",
    hoverText: "hover:text-white",
    iconBg: "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20",
    buttonBg: "bg-white text-black hover:bg-neutral-200",
    grid: "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
  } : {
    bg: "bg-white",
    borderTop: "border-black/5",
    textMain: "text-neutral-900",
    textSub: "text-neutral-600",
    textDim: "text-neutral-400",
    hoverText: "hover:text-black",
    iconBg: "bg-black/5 border-black/5 hover:bg-black/10 hover:border-black/20",
    buttonBg: "bg-black text-white hover:bg-neutral-800",
    grid: "bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]"
  };

  const socialLinks = [
    { icon: <FiGithub className="w-4 h-4" />, url: "https://github.com/Eklak-Alam", name: "GitHub" },
    { icon: <FiTwitter className="w-4 h-4" />, url: "https://x.com/dev_eklak", name: "Twitter" },
    { icon: <FaLinkedinIn className="w-4 h-4" />, url: "https://www.linkedin.com/in/eklak-alam/", name: "LinkedIn" },
    { icon: <FiInstagram className="w-4 h-4" />, url: "https://www.instagram.com/eklak__alam/", name: "Instagram" },
    { icon: <FiYoutube className="w-4 h-4" />, url: "https://www.youtube.com/@eklakalam04", name: "YouTube" },
    { icon: <FaTelegramPlane className="w-4 h-4" />, url: "https://t.me/stack_connect", name: "Telegram" },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden border-t py-16 px-4 sm:px-6 ${themeStyles.bg} ${themeStyles.borderTop} transition-colors duration-500`}>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* BRAND COLUMN (Span 5) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className={`p-2 rounded-lg border transition-colors ${themeStyles.iconBg}`}>
                 <TerminalSquare className={`w-5 h-5 ${themeStyles.textMain}`} />
              </div>
              <h3 className={`text-xl font-bold tracking-tight ${themeStyles.textMain}`}>
                Eklak Alam
              </h3>
            </Link>
            
            <p className={`text-sm leading-relaxed max-w-sm ${themeStyles.textSub}`}>
              Architecting digital ecosystems with precision and passion. 
              Focused on scalable infrastructure and high-performance applications.
            </p>
            
            {/* Social Links Row */}
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className={`p-2.5 rounded-lg border transition-all duration-300 ${themeStyles.iconBg} ${themeStyles.textSub} ${themeStyles.hoverText}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* NAVIGATION COLUMN (Span 3) */}
          <div className="md:col-span-3 space-y-6">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-widest ${themeStyles.textDim}`}>
              // Directory
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-sm flex items-center gap-2 group transition-colors ${themeStyles.textSub} ${themeStyles.hoverText}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT COLUMN (Span 4) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className={`text-xs font-mono font-bold uppercase tracking-widest ${themeStyles.textDim}`}>
              // Initiate Uplink
            </h4>
            <div className="space-y-4">
              <a 
                href="mailto:eklakalam420@gmail.com"
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${themeStyles.iconBg}`}
              >
                <div className="flex items-center gap-3">
                   <FiMail className={`w-5 h-5 ${themeStyles.textSub}`} />
                   <span className={`text-sm font-medium ${themeStyles.textMain}`}>eklakalam420@gmail.com</span>
                </div>
                <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${themeStyles.textSub}`} />
              </a>

              <div className={`p-4 rounded-xl border border-dashed ${themeStyles.borderTop} bg-transparent`}>
                 <p className={`text-xs font-mono mb-1 ${themeStyles.textDim}`}>CURRENT LOCATION</p>
                 <p className={`text-sm font-medium ${themeStyles.textMain}`}>Chapra, Bihar, India (IST)</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={`border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 ${themeStyles.borderTop}`}>
          <div className="flex flex-col md:flex-row items-center gap-4">
             <p className={`text-xs ${themeStyles.textSub}`}>
               © {new Date().getFullYear()} Eklak Alam. All rights reserved.
             </p>
             <span className={`hidden md:block w-1 h-1 rounded-full ${themeStyles.textDim} bg-current`}></span>
          </div>
          
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${themeStyles.buttonBg}`}
          >
            Top <FiArrowUp className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}