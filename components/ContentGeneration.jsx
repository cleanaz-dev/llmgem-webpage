"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContentGeneration() {
  const [isActive, setIsActive] = useState(false); // Track active state for hover/tap
  const [generationState, setGenerationState] = useState("idle"); // idle, loading, generated

  const handleGenerateClick = () => {
    if (generationState === "idle") {
      setGenerationState("loading"); // Start loading
      setTimeout(() => {
        setGenerationState("generated"); // Show image after delay
      }, 2000); // 2-second "processing" delay
    }
  };

  return (
    <div className="base-container">
      {/* Generated Image Area */}
      <div className="w-full relative mt-1.5 mb-2.5">
        {/* Image Placeholder with Space Pixels */}
        <div className="w-full h-56 bg-gray-800/10 rounded-lg border border-cyan-500/20 relative overflow-hidden">
          {/* Space Pixels Effect (Visible when idle) */}
          {generationState === "idle" &&
            [...Array(20)].map((_, i) => {
              const angle = (i / 20) * 2 * Math.PI;
              const distance = Math.random() * 100 + 50;

              return (
                <motion.div
                  key={`pixel-${i}`}
                  className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
                  style={{ top: "50%", left: "50%" }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

          {/* Loading Spinner (Visible during loading) */}
          {generationState === "loading" && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}

          {/* Neon Mona Lisa Image (Appears when generated) */}
          {generationState === "generated" && (
            <motion.img
              src="/neon-monalisa.webp"
              alt="Generated neon Mona Lisa"
              className="w-full h-full object-cover rounded-lg saturate-150"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            />
          )}

          {/* Generate Button (Visible when idle) */}
          {generationState === "idle" && (
            <button
              className="absolute bg-gray-800/60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 text-white rounded-md shadow-md border border-cyan-400/50 transition-all duration-300 z-20 ease-in cursor-pointer text-xs md:text-base"
            >
              <p className="font-light">Generate Image</p>
            </button>
          )}
        </div>
      </div>

      {/* Prompt Input with Generate Button Inside */}
      <div className="w-full mt-6 cursor-pointer group">
        <motion.div
          className="w-full px-4 py-3 rounded-md border border-cyan-500/30 text-slate-300 text-sm font-light relative overflow-hidden flex items-center justify-between group-hover:border-cyan-500/50 transition-all duration-300"
          onHoverStart={() => setIsActive(true)} // Hover effect for desktop
          onHoverEnd={() => setIsActive(false)} // Hover effect for desktop
          onTapStart={() => setIsActive(true)} // Tap effect for mobile
          onTapEnd={() => setIsActive(false)} // Tap effect for mobile
          onClick={handleGenerateClick} // Click anywhere to generate
        >
          {/* Scroll-Up Text Effect */}
          <div className="flex-1 relative overflow-hidden h-6">
            <motion.div
              className="absolute inset-0 flex items-center"
              initial={{ y: 0 }}
              animate={{ y: isActive ? "-100%" : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <span className="text-sm md:text-base text-slate-400">Generate an image of...</span>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center"
              initial={{ y: "100%" }}
              animate={{ y: isActive ? 0 : "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <span className="text-sm md:text-base text-slate-400">A neon Mona Lisa</span>
            </motion.div>
          </div>

          {/* Generate Button Inside Input (Visual only) */}
          <button
            className="px-2 md:px-4 py-1 bg-cyan-500/20 text-cyan-300 rounded-md border border-cyan-400/50 cursor-pointer group-hover:bg-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-base"
            disabled={generationState !== "idle"}
          >
            Generate
          </button>
        </motion.div>
      </div>

      {/* Title and Tagline */}
      <div className="mt-8 flex justify-start w-full">
        <div className="text-left">
          <h2 className="service-title">
            Content Generation
          </h2>
          <p className="service-description">
            Create stunning visuals with AI that turn your prompts into works of art, captivating your audience with every pixel.
          </p>
        </div>
      </div>
    </div>
  );
}