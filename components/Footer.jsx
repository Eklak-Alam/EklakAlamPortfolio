// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram,
  FiMail,
  FiYoutube,
  FiArrowRight
} from "react-icons/fi";

export function Footer() {
  const socialLinks = [
    { icon: <FiGithub className="text-xl" />, url: "https://github.com/Eklak-Alam", name: "GitHub" },
    { icon: <FiTwitter className="text-xl" />, url: "https://x.com/dev_eklak", name: "Twitter" },
    { icon: <FiLinkedin className="text-xl" />, url: "https://www.linkedin.com/in/eklak-alam-40ba632b5/", name: "LinkedIn" },
    { icon: <FiInstagram className="text-xl" />, url: "https://www.instagram.com/eklak__alam/", name: "Instagram" },
    { icon: <FiYoutube className="text-xl" />, url: "https://www.youtube.com/@eklakalam04", name: "YouTube" },
    { icon: <FiMail className="text-xl" />, url: "mailto:eklakalam420@email.com", name: "Email" },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const hoverVariant = {
    hover: { 
      x: 5,
      color: "#ffffff"
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 pt-20 pb-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-slate-700 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">EA</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Eklak Alam
                </span>
              </motion.div>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technology and innovative design solutions that drive real business results.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.1,
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    boxShadow: "0 4px 14px 0 rgba(0, 118, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-300 hover:text-white text-xl p-3 transition-all bg-slate-800/50 rounded-xl backdrop-blur-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 6).map((link, index) => (
                <motion.li 
                  key={index}
                  variants={hoverVariant}
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
                  >
                    <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  variants={hoverVariant}
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
                  >
                    <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div> */}

          {/* Newsletter Column */}
          <motion.div variants={itemVariants} className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Stay Updated
            </h3>
            <p className="text-slate-400 text-lg">
              Join my newsletter for exclusive content, latest projects, and tech insights delivered straight to your inbox.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-5 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-slate-500 backdrop-blur-sm"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 14px 0 rgba(124, 58, 237, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium text-sm"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-slate-500 text-sm">
                No spam ever. Unsubscribe anytime.
              </p>
            </form>
            
            {/* <div className="pt-4">
              <h4 className="text-sm font-medium text-slate-300 mb-3">Proudly Built With:</h4>
              <div className="flex flex-wrap gap-3">
                {["Next.js", "Tailwind", "TypeScript", "Framer Motion", "Vercel"].map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div> */}
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-slate-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500"
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Eklak Alam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="text-sm hover:text-slate-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}