"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactText() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [startCycling, setStartCycling] = useState(false);

  const titles = ["Let's talk!", "Have an idea?", "Connect Now!"];

  useEffect(() => {
    if (!startCycling) return;

    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [startCycling, titles.length]);

  return (
    <motion.div
      onViewportEnter={() => setStartCycling(true)}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <motion.h2
        key={titles[currentTitleIndex]}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-3xl md:text-5xl tracking-wide font-bold text-cyan-300 mb-4"
      >
        {titles[currentTitleIndex]}
      </motion.h2>
    </motion.div>
  );
}