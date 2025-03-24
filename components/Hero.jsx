"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav"; // Adjust path as needed
import useOrbsAnimation from "@/hooks/useOrbsAnimation";

export default function Hero() {
  const canvasRef = useRef(null);
  const introControls = useAnimation();
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);

  // Apply the orbs animation to the canvas
  useOrbsAnimation(canvasRef);

  // Animation sequence for intro and hero
  useEffect(() => {
    if (showIntro) {
      introControls
        .start({
          y: 0,
          opacity: 1,
          transition: { duration: 1.5, ease: "easeOut" },
        })
        .then(() => {
          return introControls.start({
            opacity: 0,
            transition: { duration: 0.5 },
          });
        })
        .then(() => {
          setShowIntro(false);
          setShowHero(true);
        });
    }
  }, [introControls, showIntro]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 blur-md" />

      {/* Intro: "LLM GEM" */}
      {showIntro && (
        <motion.h1
          className="absolute text-5xl md:text-7xl font-bold tracking-wide text-white z-20"
          initial={{ y: "100vh", opacity: 0 }}
          animate={introControls}
        >
          LLM GEM
        </motion.h1>
      )}

      {/* Hero Section */}
      {showHero && (
        <motion.div
          className="relative z-10 text-center text-white flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-[120px] md:text-[200px] font-bold tracking-wide bg-gradient-to-r from-slate-900/50 via-cyan-400/50 to-slate-900/50 bg-clip-text text-transparent relative">
            LLM GEM
          </h1>

          <div className="mt-8 flex gap-4 justify-center">
            <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition">
              Our Services
            </button>
            <button className="px-6 py-3 bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white rounded-full transition">
              Contact Us
            </button>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      {showHero && <Nav />}

      {/* Bottom Mask */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-30"
        style={{ pointerEvents: "none" }} // Ensure the mask doesn't block interactions
      />
    </section>
  );
}
