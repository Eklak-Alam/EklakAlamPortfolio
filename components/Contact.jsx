"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMail, FiPhone, FiGithub, FiInstagram,
  FiMapPin, FiArrowUpRight, FiCopy, FiCheck, FiSend, FiLoader, 
  FiChevronDown
} from "react-icons/fi";
import { SiX } from "react-icons/si";
import { FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import emailjs from '@emailjs/browser';

// --- Global Style to Fix Autofill Background Color ---
const AutofillStyle = () => (
  <style jsx global>{`
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: inherit !important;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  `}</style>
);

export function Contact() {
  const { darkMode } = useTheme();
  
  // UI States
  const [copied, setCopied] = useState(null);
  const [status, setStatus] = useState("idle");

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Collaboration",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone_number: formData.phone,
      subject: formData.subject,
      message: formData.message,
      to_name: "Eklak Alam", 
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "Collaboration", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  // --- Configuration ---
  const socialLinks = [
    { name: "GitHub", icon: <FiGithub className="w-5 h-5" />, url: "https://github.com/Eklak-Alam" },
    { name: "LinkedIn", icon: <FaLinkedinIn className="w-5 h-5" />, url: "https://www.linkedin.com/in/eklak-alam/" },
    { name: "Twitter", icon: <SiX className="w-5 h-5" />, url: "https://x.com/dev_eklak" },
    { name: "Instagram", icon: <FiInstagram className="w-5 h-5" />, url: "https://www.instagram.com/eklak__alam/" },
    { name: "Telegram", icon: <FaTelegramPlane className="w-5 h-5" />, url: "https://t.me/stack_connect" }
  ];

  const contactMethods = [
    { id: "email", icon: <FiMail className="w-5 h-5 md:w-6 md:h-6" />, title: "Email", value: "eklakalam420@gmail.com", action: "mailto:eklakalam420@gmail.com" },
    { id: "phone", icon: <FiPhone className="w-5 h-5 md:w-6 md:h-6" />, title: "WhatsApp", value: "+91 9473384492", action: "https://wa.me/9473384492" },
    { id: "location", icon: <FiMapPin className="w-5 h-5 md:w-6 md:h-6" />, title: "Location", value: "Chapra, Bihar, India", action: "https://maps.google.com/?q=Chapra,Bihar,India" }
  ];

  const subjects = ["Collaboration", "Freelance Project", "Job Opportunity", "General Inquiry", "Just saying Hi"];

  // --- Theme Constants ---
  const sectionBg = darkMode ? "bg-black" : "bg-[#F9FAFB]";
  const textColor = darkMode ? "text-gray-400" : "text-gray-500";
  const headingColor = darkMode ? "text-white" : "text-gray-900";
  
  // Input Styles
  const inputBg = darkMode ? "bg-[#161616]" : "bg-white";
  const inputBorder = darkMode ? "border-zinc-800" : "border-gray-200";
  const inputText = darkMode ? "text-white placeholder:text-zinc-600" : "text-black placeholder:text-gray-400";
  const focusRing = darkMode ? "focus:border-zinc-600 focus:ring-0" : "focus:border-gray-400 focus:ring-0";

  // Card Styles
  const cardBg = darkMode ? "bg-[#111]" : "bg-white";
  const cardBorder = darkMode ? "border-zinc-800" : "border-gray-100";
  const iconBg = darkMode ? "bg-[#1A1A1A] text-white" : "bg-gray-50 text-black";

  return (
    <section 
      id="contact" 
      className={`w-full max-w-[100vw] overflow-x-hidden py-12 md:py-24 px-4 sm:px-6 lg:px-8 relative ${sectionBg}`}
    >
      <AutofillStyle />

      <div className="max-w-6xl mx-auto">
        
        {/* Header - Compact on mobile */}
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${headingColor}`}>
            Get in Touch
          </h2>
          <p className={`text-sm md:text-lg max-w-xl mx-auto ${textColor}`}>
            Ready to start your next project? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Contact Details */}
          <div className="flex flex-col gap-8 order-1">
            
            {/* Contact Cards */}
            <div className="space-y-3 md:space-y-4">
              <h3 className={`text-lg font-semibold ${headingColor}`}>Contact Information</h3>
              
              {contactMethods.map((method) => (
                <div 
                  key={method.id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${cardBg} ${cardBorder}`}
                >
                  <div className={`p-3 rounded-xl flex-shrink-0 ${iconBg}`}>
                    {method.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5 ${textColor}`}>
                      {method.title}
                    </p>
                    <p className={`font-medium text-[13px] md:text-base break-words ${headingColor}`}>
                      {method.value}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {method.id !== 'location' && (
                      <button 
                        onClick={() => handleCopy(method.value, method.id)} 
                        className={`p-2 rounded-lg ${darkMode ? "bg-[#1A1A1A] text-gray-400" : "bg-gray-50 text-gray-500"}`}
                      >
                        {copied === method.id ? <FiCheck className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> : <FiCopy className="w-4 h-4 md:w-5 md:h-5" />}
                      </button>
                    )}
                    
                    <a 
                      href={method.action} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`p-2 rounded-lg ${darkMode ? "bg-[#1A1A1A] text-gray-400" : "bg-gray-50 text-gray-500"}`}
                    >
                      <FiArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Social Profiles</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`p-3 md:p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${cardBg} ${cardBorder} ${headingColor} ${darkMode ? "hover:border-zinc-700" : "hover:border-gray-300"}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="order-2">
            <div className={`p-5 md:p-8 rounded-3xl border ${cardBg} ${cardBorder}`}>
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  // Success State
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-10 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                      <FiCheck className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold mb-2 ${headingColor}`}>Message Sent</h3>
                      <p className={`text-sm md:text-base ${textColor}`}>I will get back to you within 24 hours.</p>
                    </div>
                    <button 
                      onClick={() => setStatus("idle")}
                      className={`mt-4 px-8 py-3 rounded-xl text-sm font-semibold ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  // Form State
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-4" // Tighter vertical spacing on mobile
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-4 md:mb-6">
                      <h3 className={`text-xl md:text-2xl font-bold ${headingColor}`}>Send a Message</h3>
                    </div>

                    {/* Row 1: Name & Phone (2 Cols on Desktop, Stacked on Mobile) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ml-1 ${textColor}`}>Name</label>
                        <input 
                          type="text" name="name" required
                          value={formData.name} onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border outline-none transition-colors ${inputBg} ${inputBorder} ${inputText} ${focusRing}`}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ml-1 ${textColor}`}>Phone</label>
                        <input 
                          type="tel" name="phone" 
                          value={formData.phone} onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border outline-none transition-colors ${inputBg} ${inputBorder} ${inputText} ${focusRing}`}
                          placeholder="+91..."
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Subject (2 Cols on Desktop, Stacked on Mobile) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ml-1 ${textColor}`}>Email</label>
                        <input 
                          type="email" name="email" required
                          value={formData.email} onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border outline-none transition-colors ${inputBg} ${inputBorder} ${inputText} ${focusRing}`}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ml-1 ${textColor}`}>Subject</label>
                        <div className="relative">
                          <select 
                            name="subject" 
                            value={formData.subject} 
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border outline-none appearance-none cursor-pointer transition-colors ${inputBg} ${inputBorder} ${inputText} ${focusRing}`}
                          >
                            {subjects.map(sub => <option key={sub} value={sub} className={darkMode ? "bg-[#111]" : "bg-white"}>{sub}</option>)}
                          </select>
                          <FiChevronDown className={`absolute right-4 top-3 md:top-3.5 pointer-events-none ${textColor}`} />
                        </div>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <label className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ml-1 ${textColor}`}>Message</label>
                      <textarea 
                        name="message" required 
                        rows="3" 
                        value={formData.message} onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border outline-none min-h-[100px] resize-y transition-colors ${inputBg} ${inputBorder} ${inputText} ${focusRing}`}
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Button - Compact & Easy to See */}
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className={`w-full py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-2 transition-transform active:scale-95
                        ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}
                        ${darkMode ? "bg-white text-black" : "bg-black text-white"}
                      `}
                    >
                      {status === "loading" ? (
                        <>
                          <FiLoader className="animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Send Message <FiSend />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}