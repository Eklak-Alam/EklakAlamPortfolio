"use client";

import { motion } from "framer-motion";
import { 
  FiMail, 
  FiPhone, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram,
  FiMapPin,
  FiArrowUpRight,
  FiCopy,
  FiCheck
} from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export function Contact() {
  const { darkMode } = useTheme();
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub className="w-5 h-5" />,
      url: "https://github.com/Eklak-Alam",
      color: "group-hover:text-white",
      bgColor: "group-hover:bg-black",
      borderColor: "group-hover:border-black"
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/eklak-alam/",
      color: "group-hover:text-white",
      bgColor: "group-hover:bg-[#0077b5]",
      borderColor: "group-hover:border-[#0077b5]"
    },
    {
      name: "Twitter",
      icon: <FiTwitter className="w-5 h-5" />,
      url: "https://x.com/dev_eklak",
      color: "group-hover:text-white",
      bgColor: "group-hover:bg-[#1DA1F2]",
      borderColor: "group-hover:border-[#1DA1F2]"
    },
    {
      name: "Instagram",
      icon: <FiInstagram className="w-5 h-5" />,
      url: "https://www.instagram.com/eklak__alam/",
      color: "group-hover:text-white",
      bgColor: "group-hover:bg-pink-600",
      borderColor: "group-hover:border-pink-600"
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane className="w-5 h-5" />,
      url: "https://t.me/stack_connect",
      color: "group-hover:text-white",
      bgColor: "group-hover:bg-[#0088cc]",
      borderColor: "group-hover:border-[#0088cc]"
    }
  ];

  const contactMethods = [
    {
      id: "email",
      icon: <FiMail className="w-5 h-5" />,
      title: "Email",
      value: "eklakalam420@gmail.com",
      action: "mailto:eklakalam420@gmail.com",
      bgClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      id: "phone",
      icon: <FiPhone className="w-5 h-5" />,
      title: "WhatsApp", 
      value: "+91 9473384492",
      action: "https://wa.me/9473384492",
      bgClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    },
    {
      id: "location",
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Location",
      value: "Chapra, Bihar, India",
      action: "https://maps.google.com/?q=Chapra,Bihar,India",
      bgClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    }
  ];

  return (
    <section 
      id="contact" 
      // FIX: w-full, max-w-[100vw], and overflow-x-hidden prevents mobile scrolling issues
      className={`w-full max-w-[100vw] overflow-x-hidden py-20 px-4 sm:px-6 lg:px-8 relative ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Background Decor */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${
         darkMode 
           ? "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" 
           : "bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:24px_24px]"
      }`} />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Let's <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Connect</span>
          </h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new projects and opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Column: Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              Contact Details
              <span className={`h-px flex-1 ml-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></span>
            </h3>

            {contactMethods.map((method) => (
              <div 
                key={method.id}
                className={`group relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  darkMode 
                    ? "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:shadow-neutral-900/50" 
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-xl"
                }`}
              >
                <div className={`p-3.5 rounded-xl transition-transform group-hover:scale-110 ${method.bgClass}`}>
                  {method.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium mb-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {method.title}
                  </p>
                  <p className={`font-semibold text-base truncate ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {method.value}
                  </p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Action Button (Mail/Call/Map) */}
                  <a
                    href={method.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-neutral-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-black"
                    }`}
                    title={`Open ${method.title}`}
                  >
                    <FiArrowUpRight className="w-5 h-5" />
                  </a>
                  
                  {/* Copy Button (Only for Email/Phone) */}
                  {method.id !== 'location' && (
                    <button
                      onClick={() => handleCopy(method.value, method.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode ? "hover:bg-neutral-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-black"
                      }`}
                      title="Copy to clipboard"
                    >
                      {copied === method.id ? <FiCheck className="w-5 h-5 text-green-500" /> : <FiCopy className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Column: Social Links Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
             <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              Social Profiles
              <span className={`h-px flex-1 ml-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                    darkMode 
                      ? "bg-neutral-900/30 border-neutral-800 text-gray-300" 
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  } ${link.bgColor} ${link.borderColor} ${link.color}`}
                >
                  <div className={`transition-transform duration-300 group-hover:scale-110`}>
                    {link.icon}
                  </div>
                  <span className="font-medium">{link.name}</span>
                  <FiArrowUpRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Optional: Resume Download CTA */}
            <div className={`mt-8 p-6 rounded-2xl border text-center ${
                darkMode ? "bg-neutral-900 border-neutral-800" : "bg-gray-50 border-gray-200"
            }`}>
                <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Prefer a traditional resume?
                </p>
                <a 
                    href="/EklakResume.pdf" // Replace with actual path
                    download
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
                        darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                    }`}
                >
                    Download Resume
                </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}