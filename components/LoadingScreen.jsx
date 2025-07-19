'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiCode, FiCpu, FiLayers, FiZap } from 'react-icons/fi';

export function LoadingScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress with more realistic increments
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // More realistic loading curve - slower at start and end
        const baseIncrement = prev < 30 ? 5 : 
                            prev < 70 ? 10 : 
                            prev < 90 ? 5 : 
                            2;
        
        const randomVariance = Math.floor(Math.random() * 5);
        return prev + baseIncrement + randomVariance;
      });
    }, 200);

    // Hide loader when complete
    if (loadingProgress >= 100) {
      setTimeout(() => {
        setIsVisible(false);
      }, 800); // Slightly longer delay for smoother transition
    }

    return () => clearInterval(interval);
  }, [loadingProgress]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -15 }}
        animate={{ 
          scale: [0.8, 1, 0.95, 1],
          rotate: [-15, 0, 0, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <div className="relative w-32 h-32">
          <motion.div 
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-xl"
          />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <motion.div 
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-[length:200%] bg-clip-text text-transparent"
            >
              E A
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 mb-8">
        {[FiCode, FiCpu, FiLayers, FiZap].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [0, -15, 0],
              opacity: [0, 1, 1]
            }}
            transition={{
              duration: 2,
              delay: index * 0.3,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            className="text-blue-400"
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="w-64 h-2.5 bg-slate-800 rounded-full overflow-hidden mb-2 relative">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 relative"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-1 bg-white"
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      <motion.p 
        className="text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {loadingProgress < 100 ? (
          `Loading portfolio... ${loadingProgress}%`
        ) : (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 100,
              damping: 10
            }}
            className="text-teal-400 font-medium"
          >
            Ready to explore!
          </motion.span>
        )}
      </motion.p>
    </motion.div>
  );
}