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
  FiArrowUp,
  FiGitlab
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { FaTelegram } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

export function Footer() {
  const { darkMode } = useTheme();
  
  const socialLinks = [
    { 
      icon: <FiGithub className="w-4 h-4" />, 
      url: "https://github.com/Eklak-Alam", 
      name: "GitHub"
    },
    { 
      icon: <SiX className="w-4 h-4" />, 
      url: "https://x.com/dev_eklak", 
      name: "Twitter"
    },
    { 
      icon: <FaLinkedinIn className="w-4 h-4" />, 
      url: "https://www.linkedin.com/in/eklak-alam-40ba632b5/", 
      name: "LinkedIn"
    },
    { 
      icon: <FiInstagram className="w-4 h-4" />, 
      url: "https://www.instagram.com/eklak__alam/", 
      name: "Instagram"
    },
    { 
      icon: <FiYoutube className="w-4 h-4" />, 
      url: "https://www.youtube.com/@eklakalam04", 
      name: "YouTube"
    },
    { 
      icon: <FiMail className="w-4 h-4" />, 
      url: "mailto:eklakalam420@gmail.com", 
      name: "Email"
    },
    { 
      icon: <FaTelegram className="w-4 h-4" />, 
      url: "https://t.me/stack_connect", 
      name: "Telegram"
    },
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
    <footer className={`py-12 px-4 sm:px-6 border-t ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/">
              <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Eklak Alam
              </h3>
            </Link>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Full-stack developer crafting digital experiences with modern technologies.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-lg border transition-all ${
                    darkMode 
                      ? "bg-gray-900 border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white" 
                      : "bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      darkMode 
                        ? "text-gray-400 hover:text-white" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Contact
            </h4>
            <div className="space-y-2">
              <a 
                href="mailto:eklakalam420@gmail.com"
                className={`text-sm transition-colors block ${
                  darkMode 
                    ? "text-gray-400 hover:text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                eklakalam420@gmail.com
              </a>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Chapra, Bihar, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={`border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${
          darkMode ? "border-gray-800" : "border-gray-200"
        }`}>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © {new Date().getFullYear()} Eklak Alam. All rights reserved.
          </p>
          
          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg border transition-all ${
              darkMode 
                ? "bg-gray-900 border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white" 
                : "bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Back to top"
          >
            <FiArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}