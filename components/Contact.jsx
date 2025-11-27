"use client";

import { motion } from "framer-motion";
import { 
  FiMail, 
  FiPhone, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram,
  FiMessageSquare,
  FiMapPin
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { FaTelegram } from "react-icons/fa";

export function Contact() {
  const { darkMode } = useTheme();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub className="w-5 h-5" />,
      url: "https://github.com/Eklak-Alam",
      color: darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900",
      bgColor: darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/eklak-alam/",
      color: darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700",
      bgColor: darkMode ? "hover:bg-blue-900/30" : "hover:bg-blue-100"
    },
    {
      name: "Twitter",
      icon: <FiTwitter className="w-5 h-5" />,
      url: "https://x.com/dev_eklak",
      color: darkMode ? "text-sky-400 hover:text-sky-300" : "text-sky-500 hover:text-sky-600",
      bgColor: darkMode ? "hover:bg-sky-900/30" : "hover:bg-sky-100"
    },
    {
      name: "Instagram",
      icon: <FiInstagram className="w-5 h-5" />,
      url: "https://www.instagram.com/eklak__alam/",
      color: darkMode ? "text-pink-400 hover:text-pink-300" : "text-pink-500 hover:text-pink-600",
      bgColor: darkMode ? "hover:bg-pink-900/30" : "hover:bg-pink-100"
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="w-5 h-5" />,
      url: "https://t.me/stack_connect",
      color: darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-600",
      bgColor: darkMode ? "hover:bg-blue-900/30" : "hover:bg-blue-100"
    }
  ];

  const contactMethods = [
    {
      icon: <FiMail className="w-5 h-5" />,
      title: "Email",
      value: "eklakalam420@gmail.com",
      action: "mailto:eklakalam420@gmail.com",
      color: darkMode ? "text-blue-400" : "text-blue-600"
    },
    {
      icon: <FiPhone className="w-5 h-5" />,
      title: "WhatsApp", 
      value: "+91 9473384492",
      action: "https://wa.me/9473384492",
      color: darkMode ? "text-emerald-400" : "text-emerald-600"
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Location",
      value: "Chapra, Bihar, India",
      action: "https://maps.app.goo.gl/EUW8rqKbuzySo8cdA",
      color: darkMode ? "text-amber-400" : "text-amber-600"
    }
  ];

  return (
    <section 
      id="contact" 
      className={`py-16 px-4 sm:px-6 ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Get In Touch
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Let's discuss your project and build something amazing together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Social Links - Clean Icons Only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Connect With Me
            </h3>
            
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${link.color} ${link.bgColor} ${
                    darkMode ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${darkMode ? "bg-black" : "bg-gray-100"}`}>
                    {link.icon}
                  </div>
                  <span className="font-medium">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Direct Contact
            </h3>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    darkMode 
                      ? "bg-black border-gray-800" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${method.color} ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {method.title}
                    </div>
                    <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {method.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}