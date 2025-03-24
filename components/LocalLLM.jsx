"use client";

import { Cpu, HardDrive, Shield, Zap } from "lucide-react"; // Lucide icons
import { motion } from "framer-motion";

export default function LocalLLMService() {
  return (
    <div className="base-container p-8 bg-black text-white">
      {/* Visual Representation */}
      <div className="relative h-[400px] w-full bg-[rgba(10,10,20,0.95)] border border-cyan-500/20 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden">
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,rgba(6,182,212,0)_70%)]" />

        {/* Local Processing Core */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute h-32 w-32 bg-cyan-500/10 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.5)]"
        >
          <div className="h-16 w-16 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <Zap className="h-8 w-8 text-cyan-300 animate-pulse" />
          </div>
        </motion.div>

        {/* Local Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute left-8 top-8 flex flex-col items-center gap-2"
        >
          <HardDrive className="h-12 w-12 text-cyan-300" />
          <span className="text-xs text-cyan-300">Local Storage</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute right-8 top-8 flex flex-col items-center gap-2"
        >
          <Cpu className="h-12 w-12 text-cyan-300" />
          <span className="text-xs text-cyan-300">Local Processing</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <Shield className="h-12 w-12 text-cyan-300" />
          <span className="text-xs text-cyan-300">No Internet</span>
        </motion.div>

        {/* No Internet Symbol */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 flex items-center gap-2 text-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.242 0L7.05 16.95M3 3l3.536 3.536m0 0L7.05 7.05m-3.536 0a5 5 0 000 7.072m0 0L3 21"
            />
          </svg>
          <span className="text-sm">Offline</span>
        </motion.div>
      </div>

      {/* Title and Description */}
      <div className="mt-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-4xl font-bold text-cyan-300"
        >
          Local LLM
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-4 text-slate-300 max-w-md mx-auto"
        >
          Fully offline, secure, and private language models. Process data locally
          without connecting to the internet.
        </motion.p>
      </div>
    </div>
  );
}


