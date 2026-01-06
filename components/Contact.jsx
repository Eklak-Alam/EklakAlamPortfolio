"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMail, FiPhone, FiGithub, FiMapPin, FiArrowUpRight, 
  FiCopy, FiCheck, FiSend, FiLoader, FiChevronDown, FiTwitter 
} from "react-icons/fi";
import { FaLinkedinIn, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { TerminalSquare, MessageSquare } from "lucide-react";

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

  // Theme Config (Monochrome Luxury)
  const themeStyles = darkMode ? {
    bg: "bg-[#050505]",
    textMain: "text-white",
    textSub: "text-neutral-400",
    textDim: "text-neutral-500",
    cardBg: "bg-[#0A0A0A]",
    cardBorder: "border-white/10",
    inputBg: "bg-[#0f0f0f]",
    inputBorder: "border-white/5",
    focusBorder: "focus:border-white/30",
    divider: "border-white/10",
    grid: "bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
  } : {
    bg: "bg-white",
    textMain: "text-neutral-900",
    textSub: "text-neutral-600",
    textDim: "text-neutral-400",
    cardBg: "bg-white",
    cardBorder: "border-black/5",
    inputBg: "bg-neutral-50",
    inputBorder: "border-neutral-200",
    focusBorder: "focus:border-black/20",
    divider: "border-neutral-100",
    grid: "bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]"
  };

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

  const socialLinks = [
    { name: "GitHub", icon: <FiGithub className="w-5 h-5" />, url: "https://github.com/Eklak-Alam" },
    { name: "LinkedIn", icon: <FaLinkedinIn className="w-5 h-5" />, url: "https://www.linkedin.com/in/eklak-alam/" },
    { name: "Twitter", icon: <FiTwitter className="w-5 h-5" />, url: "https://x.com/dev_eklak" },
    { name: "Instagram", icon: <FaInstagram className="w-5 h-5" />, url: "https://www.instagram.com/eklak__alam/" },
    { name: "Telegram", icon: <FaTelegramPlane className="w-5 h-5" />, url: "https://t.me/stack_connect" }
  ];

  const contactMethods = [
    { id: "email", icon: <FiMail className="w-5 h-5" />, title: "Email", value: "eklakalam420@gmail.com", action: "mailto:eklakalam420@gmail.com" },
    { id: "phone", icon: <FiPhone className="w-5 h-5" />, title: "WhatsApp", value: "+91 9473384492", action: "https://wa.me/9473384492" },
    { id: "location", icon: <FiMapPin className="w-5 h-5" />, title: "Location", value: "Chapra, Bihar, India", action: "https://maps.google.com/?q=Chapra,Bihar,India" }
  ];

  const subjects = ["Collaboration", "Freelance Project", "Job Opportunity", "General Inquiry", "Just saying Hi"];

  return (
    <section 
      id="contact" 
      className={`w-full relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 ${themeStyles.bg} transition-colors duration-500`}
    >
      <AutofillStyle />

      {/* 1. BACKGROUND LAYERS */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 2. SECTION HEADER (Terminal Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${themeStyles.cardBorder} ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
               <TerminalSquare className={`w-4 h-4 ${themeStyles.textSub}`} />
               <span className={`text-xs font-mono font-bold tracking-wider uppercase ${themeStyles.textSub}`}>
                 /contact-me
               </span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] ${themeStyles.textMain}`}>
              Let's Build Something
            </h2>
          </div>
          
          <div className="md:text-right max-w-md">
             <p className={`text-base md:text-lg ${themeStyles.textSub} leading-relaxed`}>
               Have a project in mind? Let's discuss how we can engineer a robust solution for your needs.
             </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Contact Details */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-col gap-10 order-2 lg:order-1"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              <h3 className={`text-sm font-mono font-bold uppercase tracking-widest mb-6 ${themeStyles.textDim}`}>// Coordinates</h3>
              
              {contactMethods.map((method) => (
                <div 
                  key={method.id} 
                  className={`group flex items-center gap-5 p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 
                    ${themeStyles.cardBg} ${themeStyles.cardBorder} hover:border-white/20`}
                >
                  <div className={`p-3 rounded-lg flex-shrink-0 border ${themeStyles.cardBorder} ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    {method.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-1 ${themeStyles.textDim}`}>
                      {method.title}
                    </p>
                    <p className={`font-medium text-base break-words ${themeStyles.textMain}`}>
                      {method.value}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {method.id !== 'location' && (
                      <button 
                        onClick={() => handleCopy(method.value, method.id)} 
                        className={`p-2 rounded-md hover:bg-white/10 transition-colors ${themeStyles.textSub}`}
                        title="Copy"
                      >
                        {copied === method.id ? <FiCheck className="w-4 h-4 text-emerald-500" /> : <FiCopy className="w-4 h-4" />}
                      </button>
                    )}
                    
                    <a 
                      href={method.action} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`p-2 rounded-md hover:bg-white/10 transition-colors ${themeStyles.textSub}`}
                      title="Open"
                    >
                      <FiArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons (Dock Style) */}
            <div>
              <h3 className={`text-sm font-mono font-bold uppercase tracking-widest mb-6 ${themeStyles.textDim}`}>// Social Uplink</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`p-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg 
                      ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.textMain} hover:bg-white/10`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="order-1 lg:order-2"
          >
            <div className={`p-6 md:p-10 rounded-2xl border relative overflow-hidden ${themeStyles.cardBg} ${themeStyles.cardBorder}`}>
              
              {/* Decorative HUD Lines */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent`}></div>
              <div className={`absolute top-5 right-5 w-2 h-2 border-t border-r ${themeStyles.divider}`}></div>
              <div className={`absolute bottom-5 left-5 w-2 h-2 border-b border-l ${themeStyles.divider}`}></div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  // Success State
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <FiCheck className="w-10 h-10 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${themeStyles.textMain}`}>Transmission Received</h3>
                      <p className={`text-base ${themeStyles.textSub}`}>I'll decode your message and respond within 24 hours.</p>
                    </div>
                    <button 
                      onClick={() => setStatus("idle")}
                      className={`mt-6 px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
                    >
                      New Message
                    </button>
                  </motion.div>
                ) : (
                  // Form State
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className={`w-5 h-5 ${themeStyles.textDim}`} />
                        <h3 className={`text-xl font-bold ${themeStyles.textMain}`}>Send a Transmission</h3>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Name</label>
                        <input 
                          type="text" name="name" required
                          value={formData.name} onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 font-medium 
                            ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Phone</label>
                        <input 
                          type="tel" name="phone" 
                          value={formData.phone} onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 font-medium 
                            ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          placeholder="+91..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Email</label>
                        <input 
                          type="email" name="email" required
                          value={formData.email} onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 font-medium 
                            ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Subject</label>
                        <div className="relative">
                          <select 
                            name="subject" 
                            value={formData.subject} 
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border outline-none appearance-none cursor-pointer transition-all duration-300 font-medium 
                              ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          >
                            {subjects.map(sub => <option key={sub} value={sub} className="bg-black text-white">{sub}</option>)}
                          </select>
                          <FiChevronDown className={`absolute right-4 top-4 pointer-events-none ${themeStyles.textSub}`} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Message</label>
                      <textarea 
                        name="message" required 
                        rows="4" 
                        value={formData.message} onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border outline-none min-h-[120px] resize-y transition-all duration-300 font-medium 
                          ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                        placeholder="Project details, timeline, or just a hello..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 mt-4 transition-all active:scale-[0.98]
                        ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}
                        ${darkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}
                      `}
                    >
                      {status === "loading" ? (
                        <> <FiLoader className="animate-spin" /> Processing... </>
                      ) : (
                        <> Send Message <FiSend /> </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}