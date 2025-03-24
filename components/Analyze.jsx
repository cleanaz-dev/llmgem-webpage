"use client";

import { FaGem } from "react-icons/fa";
import { motion } from "framer-motion";
import { analyzeIcons } from "@/lib/constants"; // Import the icons data

export default function Analyze() {
  return (
    <div className="base-container lg:h-[470px]">
      {/* Logos Container */}
      <motion.div
        className="flex border border-slate-900 rounded-lg px-6 py-3 items-center justify-between relative w-full max-w-2xl cursor-pointer group overflow-visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        {/* Top Masking Effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[rgba(10,10,20,0.95)] to-transparent pointer-events-none rounded-lg opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10" />

        {/* Bottom Masking Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[rgba(10,10,20,0.95)] to-transparent pointer-events-none rounded-lg opacity-100 group-hover:opacity-0 transition-opacity duration-300 z-10" />

        {/* Left Side Logos */}
        <div className="flex flex-col items-end mr-8 relative">
          {analyzeIcons.slice(0, 3).map((logo) => (
            <motion.div
              key={logo.id}
              className={`logo-glow w-16 h-16 flex items-center justify-center ${logo.position}`}
              variants={{ hidden: { opacity: 0.3 }, visible: { opacity: 1 } }}
            >
              <span className="text-slate-600/50 text-2xl">{logo.icon}</span>
            </motion.div>
          ))}
        </div>

        {/* Central Logo */}
        <div className="w-16 h-16 border border-slate-900 rounded-md flex items-center justify-center">
          <span className="text-white text-4xl">
            <FaGem className="fill-cyan-400 size-8 mt-0.5 shimmer" stroke={1} />
          </span>
        </div>

        {/* Right Side Logos */}
        <div className="flex flex-col items-start ml-8 relative">
          {analyzeIcons.slice(3).map((logo) => (
            <motion.div
              key={logo.id}
              className={`logo-glow w-16 h-16 flex items-center justify-center ${logo.position}`}
              variants={{ hidden: { opacity: 0.3 }, visible: { opacity: 1 } }}
            >
              <span className="text-slate-600 text-2xl">{logo.icon}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Text at the Bottom */}
      <div className="mt-8 max-w-4xl w-full">
        <h1 className="text-4xl mb-4 text-white">
          <span className="process-number">01</span>{" "}
          <span className="tracking-tight">Analyze</span>
        </h1>
        <p className="process-description">
          We start by analyzing your current systems, identifying inefficiencies,
          and understanding your goals to create a tailored AI solution.
        </p>
      </div>
    </div>
  );
}
