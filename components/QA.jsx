"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { qaData } from "@/lib/constants";

export default function QA() {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleIndex = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-10 bg-black ">
      {/* Title and Tagline */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={letterVariants}
        viewport={{ once: true, margin: "-20%" }}
        className="relative text-center mb-10"
      >
        <h1 className="mb-8 text-6xl bg-gradient-to-r from-slate-400 to-cyan-300 bg-clip-text text-transparent">
          Answers
        </h1>
        <p className="text-gray-400 mt-2">
          Get answers to the most common questions about our AI solutions.
        </p>
      </motion.div>

      {/* Q/A Items */}
      <div className="relative w-full max-w-4xl space-y-4">
        {qaData.map((item, index) => {
          const isExpanded = expandedIndices.includes(index);
          return (
            <div
              key={index}
              className={`border rounded-lg px-4 py-6 transition-colors duration-300 cursor-pointer bg-[rgba(10,10,20,0.8)] ${
                isExpanded
                  ? "border-cyan-300"
                  : "border-slate-800 hover:border-slate-600"
              }`}
              onClick={() => toggleIndex(index)}
            >
              {/* Question */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium text-slate-200">
                  {item.question}
                </h2>
                <span className="p-1 rounded-sm border border-cyan-400/30 shadow-cyan-200/30 shadow">
                  <ChevronRight
                    className={`text-slate-400/90 transition-transform duration-300 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                    size={20}
                  />
                </span>
              </div>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="content-wrapper"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 text-gray-400">
                      <p>{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
