"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QA() {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleIndex = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Q/A data
  const qaData = [
    {
      question: "Is my company a good fit for LLM GEM?",
      answer:
        "LLM GEM is designed to benefit businesses of all sizes and industries. Whether you're a startup or an enterprise, our solutions can be tailored to meet your specific needs.",
    },
    {
      question: "Are your solutions secure?",
      answer:
        "Yes, security is our top priority. We use industry-standard encryption and follow best practices to ensure your data is safe and secure.",
    },
    {
      question: "Do you offer continuous support?",
      answer:
        "Absolutely! We provide 24/7 support to ensure your AI solutions run smoothly and efficiently.",
    },
    {
      question: "How long does it take to implement a request?",
      answer:
        "Implementation time varies depending on the complexity of the request. However, most requests are completed within 2-4 weeks.",
    },
    {
      question: "Can I customize the AI solutions?",
      answer:
        "Yes, our AI solutions are fully customizable to fit your business requirements and goals.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We specialize in a wide range of industries, including healthcare, finance, retail, and more. Our solutions are adaptable to any industry.",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-10 bg-black">
      
     
      {/* Title and Tagline */}
      <div className="relative text-center mb-10">
        <h1 className="mb-8 text-6xl bg-gradient-to-r from-slate-400 to-cyan-300 bg-clip-text text-transparent">
          Answers
        </h1>
        <p className="text-gray-400 mt-2">
          Get answers to the most common questions about our AI solutions.
        </p>
      </div>

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
