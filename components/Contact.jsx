"use client";

import { Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import ChatUI from "./ChatUI"; // Import the new ChatUI component

export default function Contact() {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Updated titles array with "Connect Now!"
  const titles = ["Let's talk!", "Got an idea?", "Connect Now!"];

  // Cycle through titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [titles.length]);

  return (
    <div className="w-full bg-black p-8">
      {/* Centered Container */}
      <div className="max-w-4xl mx-auto">
        {/* Two-Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Contact Information */}
          <div className="flex flex-col justify-around md:w-1/2">
            <div>
              <motion.h2
                key={titles[currentTitleIndex]} // Key ensures animation triggers on text change
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                className="text-5xl tracking-wide font-bold text-cyan-300 mb-4"
              >
                {titles[currentTitleIndex]}
              </motion.h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300 flex items-center gap-2">
                <Mail className="text-cyan-300" size={20} />
                Email:{" "}
                <a
                  href="mailto:info@llmgem.com"
                  className="text-cyan-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  info@llmgem.com
                </a>
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <Phone className="text-cyan-300" size={20} />
                Phone:{" "}
                <a
                  href="tel:+12267902753"
                  className="text-cyan-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  +1 (226) 790-2753
                </a>
              </p>
            </div>
          </div>

          {/* Right Side: Chat UI */}
          <div className="md:w-1/2">
            <ChatUI
              userInfo={userInfo}
              isUserInfoSubmitted={isUserInfoSubmitted}
              onUserInfoSubmit={(updatedUserInfo) => {
                setUserInfo(updatedUserInfo);
                setIsUserInfoSubmitted(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}