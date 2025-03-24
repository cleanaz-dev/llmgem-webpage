"use client";

import { motion } from "framer-motion";
import { Plus, ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { RiNotionFill } from "react-icons/ri";

export default function ChatDevelopment() {
  const [step, setStep] = useState(0); // Tracks conversation progress
  const chatRef = useRef(null); // Ref for the chat container

  // Start conversation when chat scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && step === 0) {
          // Check if screen is small (below md: 768px)
          const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
          const baseDelay = isSmallScreen ? 1500 : 1000; // Slower base delay for sm screens

          const timers = [
            setTimeout(() => setStep(1), baseDelay), // User message: 1.5s (sm) vs 1s (md+)
            setTimeout(() => setStep(2), baseDelay + 1500), // AI response: 3s (sm) vs 2.5s (md+)
            setTimeout(() => setStep(3), baseDelay + 4000), // AI asks: 5.5s (sm) vs 5s (md+)
          ];
          return () => timers.forEach(clearTimeout); // Cleanup
        }
      },
      { threshold: 0.5 } // Trigger when 50% of chat is visible
    );

    if (chatRef.current) {
      observer.observe(chatRef.current);
    }

    return () => {
      if (chatRef.current) {
        observer.unobserve(chatRef.current);
      }
    };
  }, [step]);

  const handleYesClick = () => {
    setStep(4); // Show Notion link
    setTimeout(() => setStep(0), 3000); // Restart after 3 seconds
  };

  return (
    <div className="base-container">
      {/* Chat Area */}
      <div
        ref={chatRef}
        className="w-full bg-gray-800/60 mt-1.5 p-3 md:p-6 rounded-lg border border-cyan-500/10 backdrop-blur-sm cursor-pointer z-10 relative"
      >
        <div className="h-[215px] md:h-[175px] scrollbar-hide group">
          <motion.div
            className="space-y-2 z-20" // Reduced spacing to fit within height
            initial={{ y: 0 }}
            animate={{ y: 0 }} // No scrolling
            transition={{ duration: 0.3 }}
          >
            {/* User Message */}
            {step >= 1 && (
              <motion.div
                className="flex flex-col items-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-400">You</span>
                  <span className="text-xs text-gray-500">10:15 AM</span>
                </div>
                <div className="text-white text-sm">
                  Can you summarize today's meeting notes?
                </div>
              </motion.div>
            )}

            {/* AI Assistant Response */}
            {step >= 2 && (
              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-400">
                    AI Assistant
                  </span>
                  <span className="text-xs text-gray-500">10:16 AM</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-white text-sm">
                    Sure! The key points were project deadlines, budget adjustments, and client feedback.
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Asks About Notion */}
            {step >= 3 && step < 4 && (
              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-400">
                    AI Assistant
                  </span>
                  <span className="text-xs text-gray-500">10:17 AM</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-white text-sm">
                    Upload to Notion?
                    <button
                      onClick={handleYesClick}
                      className="ml-2 px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded hover:bg-cyan-500/40 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notion Link After "Yes" */}
            {step >= 4 && (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center text-slate-400 text-sm py-1 mt-4">
                  Uploaded to{" "}
                  <button
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-800/50 text-cyan-400 hover:text-cyan-300 hover:bg-gray-800/70 transition-all duration-200 ml-2 text-sm"
                  >
                    <RiNotionFill className="w-4 h-4" />
                    Notion
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex w-full mt-8 p-3 text-slate-300 rounded-lg border border-cyan-500/30 justify-between items-center cursor-pointer">
        <div className="flex items-center">
          <div className="border border-slate-800 rounded-sm p-1.5 md:p-2 mr-4">
            <Plus className="size-3 md:size-4 text-slate-600" />
          </div>
          <p className="text-sm md:text-base text-slate-400">Message AI Assistant...</p>
        </div>
        <div className="border border-cyan-400/50 rounded-sm p-1.5 md:p-2 shadow-[0_0_15px_rgba(6,182,212,0.8)]">
          <ArrowUp className="size-3 md:size-4 text-cyan-300/50" />
        </div>
      </div>

      {/* Title and Tagline */}
      <div className="mt-8 flex justify-start w-full">
        <div className="text-left">
          <h2 className="service-title">
            Chatbot Development
          </h2>
          <p className="service-description">
          We craft intelligent chatbots to streamline your workflows and boost productivity across every industry.
          </p>
        </div>
      </div>
    </div>
  );
}