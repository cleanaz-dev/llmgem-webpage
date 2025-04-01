"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav"; // Adjust path as needed
import useOrbsAnimation from "@/hooks/useOrbsAnimation";
import { FaGem } from "react-icons/fa";
import { scrollToId } from "@/lib/utils";

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
      <canvas ref={canvasRef} className="absolute inset-0 z-0 " />

      {/* Intro: "LLM GEM" */}
      {showIntro && (
        <motion.h1
          className="absolute text-5xl md:text-7xl font-bold tracking-wide text-white z-20"
          initial={{ y: "100vh", opacity: 0 }}
          animate={introControls}
        >
          <FaGem />
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
            <span className="text-[40vw] md:text-[200px] leading-1 md:leading-0">
              LLM
            </span>{" "}
            <span className="text-[40vw] md:text-[200px] leading-1 md:leading-0">
              GEM
            </span>
          </h1>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => scrollToId("services")}
              className="relative px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-full cursor-pointer transition-all duration-500 
               border border-cyan-500/30 hover:border-cyan-500/50
               shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]
               group overflow-hidden hover:scale-105"
            >
              <span className="relative z-10">Our Services</span>
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.4),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 "></span>
            </button>

            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="relative px-6 py-3 bg-transparent hover:bg-slate-900/30 text-cyan-100 rounded-full cursor-pointer transition-all duration-500
               border border-cyan-500/20 hover:border-cyan-500/40
               shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]
               group overflow-hidden hover:scale-105"
            >
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
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
