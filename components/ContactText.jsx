"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactText() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Titles array
  const titles = ["Let's talk!", "Got an idea?", "Connect Now!"];

  // Cycle through titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [titles.length]);

  return (
    <motion.h2
      key={titles[currentTitleIndex]} // Key ensures animation triggers on text change
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      className="text-3xl md:text-5xl tracking-wide font-bold text-cyan-300 mb-4"
    >
      {titles[currentTitleIndex]}
    </motion.h2>
  );
}