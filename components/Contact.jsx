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

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Collaboration",
    message: ""
  });

  // --- MONOCHROME THEME CONFIG ---
  const themeStyles = darkMode ? {
    bg: "bg-[#050505]",
    textMain: "text-white",
    textSub: "text-neutral-400",
    textDim: "text-neutral-500",
    cardBg: "bg-[#0A0A0A]",
    cardBorder: "border-white/10",
    cardHoverBorder: "hover:border-white/30",
    inputBg: "bg-[#0f0f0f]",
    inputBorder: "border-white/10",
    focusBorder: "focus:border-white",
    divider: "border-white/10",
    accent: "text-white", 
    iconBg: "bg-white/5",
  } : {
    bg: "bg-white",
    textMain: "text-neutral-900",
    textSub: "text-neutral-600",
    textDim: "text-neutral-400",
    cardBg: "bg-gray-50/70",
    cardBorder: "border-black/5",
    cardHoverBorder: "hover:border-black/30",
    inputBg: "bg-neutral-50",
    inputBorder: "border-neutral-200",
    focusBorder: "focus:border-black",
    divider: "border-neutral-100",
    accent: "text-black",
    iconBg: "bg-black/5",
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
    // EmailJS logic ...
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
    { name: "Twitter", icon: <FiTwitter className="w-5 h-5" />, url: "https://x.com/eklak__alam" },
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
      className={`w-full relative overflow-hidden lg:pb-10 pt-24 px-4 sm:px-6 lg:px-8 ${themeStyles.bg} transition-colors duration-500`}
    >
      <AutofillStyle />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${themeStyles.cardBorder} ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
               <TerminalSquare className={`w-4 h-4 ${themeStyles.textSub}`} />
               <span className={`text-xs font-mono font-bold tracking-wider uppercase ${themeStyles.textSub}`}>
                 /contact-me
               </span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] ${themeStyles.textMain}`}>
              Let's Build Something
            </h2>
          </div>
          <div className="md:text-right max-w-md">
             <p className={`text-sm md:text-base ${themeStyles.textSub} leading-relaxed`}>
               Have a project in mind? Let's discuss how we can engineer a robust solution for your needs.
             </p>
          </div>
        </motion.div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* --- LEFT COLUMN: INFO + SOCIALS --- */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-col gap-6"
          >
            {/* 1. Contact Info Cards */}
            <div className="flex flex-col gap-4">
                {contactMethods.map((method) => (
                <div 
                    key={method.id} 
                    className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 
                    ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardHoverBorder}`}
                >
                    <div className={`p-3 rounded-lg flex-shrink-0 border ${themeStyles.cardBorder} ${themeStyles.iconBg}`}>
                    {method.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5 ${themeStyles.textDim}`}>
                        {method.title}
                    </p>
                    <p className={`font-medium text-[12px] lg:text-sm md:text-base break-words ${themeStyles.textMain}`}>
                        {method.value}
                    </p>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {method.id !== 'location' && (
                        <button 
                        onClick={() => handleCopy(method.value, method.id)} 
                        className={`p-2 rounded-md hover:bg-white/10 transition-colors ${themeStyles.textSub}`}
                        title="Copy"
                        >
                        {copied === method.id ? <FiCheck className={`w-4 h-4 ${themeStyles.accent}`} /> : <FiCopy className="w-4 h-4" />}
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

            {/* 2. Simple Social Row (No big box) */}
            <div>
              <p className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-4 ${themeStyles.textDim}`}>Social Networks</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex-1 min-w-[50px] h-[50px] flex items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg 
                      ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.textMain} hover:bg-white/5`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

          </motion.div>


          {/* --- RIGHT COLUMN: COMPACT FORM --- */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <div className={`p-6 md:p-8 rounded-2xl border relative overflow-hidden flex flex-col justify-center ${themeStyles.cardBg} ${themeStyles.cardBorder}`}>
              
              {/* Decorative HUD Lines */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent`}></div>
              <div className={`absolute top-4 right-4 w-2 h-2 border-t border-r ${themeStyles.divider}`}></div>
              <div className={`absolute bottom-4 left-4 w-2 h-2 border-b border-l ${themeStyles.divider}`}></div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  // Success State - Monochrome
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${themeStyles.cardBorder} bg-white/5`}>
                      <FiCheck className={`w-8 h-8 ${themeStyles.accent}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${themeStyles.textMain}`}>Transmission Received</h3>
                      <p className={`text-sm ${themeStyles.textSub}`}>I'll decode your message and respond within 24 hours.</p>
                    </div>
                    <button 
                      onClick={() => setStatus("idle")}
                      className={`mt-4 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider 
                        ${darkMode ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"}`}
                    >
                      New Message
                    </button>
                  </motion.div>
                ) : (
                  // Form State
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-4" // Reduced spacing
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className={`w-5 h-5 ${themeStyles.textDim}`} />
                        <h3 className={`text-lg font-bold ${themeStyles.textMain}`}>Send a Transmission</h3>
                    </div>

                    {/* Compact Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Name</label>
                        <input 
                          type="text" name="name" required
                          value={formData.name} onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all duration-300 font-medium 
                            ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Phone</label>
                        <input 
                          type="tel" name="phone" 
                          value={formData.phone} onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all duration-300 font-medium 
                            ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          placeholder="+91..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Email</label>
                        <input 
                          type="email" name="email" required
                          value={formData.email} onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm transition-all duration-300 font-medium 
                            ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Subject</label>
                        <div className="relative">
                          <select 
                            name="subject" 
                            value={formData.subject} 
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm appearance-none cursor-pointer transition-all duration-300 font-medium 
                              ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                          >
                            {subjects.map(sub => <option key={sub} value={sub} className="bg-black text-white">{sub}</option>)}
                          </select>
                          <FiChevronDown className={`absolute right-3 top-3.5 pointer-events-none ${themeStyles.textSub}`} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-[10px] font-mono font-bold uppercase tracking-wider ${themeStyles.textDim}`}>Message</label>
                      <textarea 
                        name="message" required 
                        rows="3" 
                        value={formData.message} onChange={handleInputChange}
                        className={`w-full px-3 py-2.5 rounded-lg border outline-none min-h-[100px] text-sm resize-y transition-all duration-300 font-medium 
                          ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textMain} ${themeStyles.focusBorder}`}
                        placeholder="Project details..."
                      />
                    </div>

                    {/* Compact Submit Button */}
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className={`w-full py-3 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mt-2 transition-all active:scale-[0.98]
                        ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}
                        ${darkMode ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"}
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