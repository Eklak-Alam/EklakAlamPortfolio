// components/LoadingScreen.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiCode, FiCpu, FiLayers, FiZap } from 'react-icons/fi';

export function LoadingScreen() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 15) + 5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    // Hide loader when complete
    if (loadingProgress >= 100) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [loadingProgress]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="mb-8"
      >
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-xl opacity-20" />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              EA
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4 mb-8">
        {[FiCode, FiCpu, FiLayers, FiZap].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-blue-400"
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <p className="text-slate-400">
        {loadingProgress < 100 ? (
          `Loading portfolio... ${loadingProgress}%`
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-teal-400"
          >
            Ready!
          </motion.span>
        )}
      </p>
    </motion.div>
  );
}