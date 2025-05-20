"use client";

import { motion } from "framer-motion";
import { Mic, Phone, PhoneOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaHeadset, FaPhoneVolume } from "react-icons/fa";

export default function VoiceAgentServices() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState("inbound"); // "inbound" or "outbound"
  const voiceRef = useRef(null);

  // Start voice interaction when component scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && step === 0) {
          const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
          const baseDelay = isSmallScreen ? 1500 : 1000;

          const timers = [
            setTimeout(() => setStep(1), baseDelay), // Start call
            setTimeout(() => setStep(2), baseDelay + 2000), // First message
            setTimeout(() => setStep(3), baseDelay + 4500), // Response
            setTimeout(() => setStep(4), baseDelay + 7000), // Final message
          ];
          return () => timers.forEach(clearTimeout);
        }
      },
      { threshold: 0.5 }
    );

    if (voiceRef.current) {
      observer.observe(voiceRef.current);
    }

    return () => {
      if (voiceRef.current) {
        observer.unobserve(voiceRef.current);
      }
    };
  }, [step]);

  // Toggle between inbound and outbound examples
  const toggleMode = () => {
    setMode(mode === "inbound" ? "outbound" : "inbound");
    setStep(0); // Reset the conversation
    setTimeout(() => setStep(1), 500); // Restart after mode toggle
  };

  // End call action
  const handleEndCall = () => {
    setStep(5); // Show call ended
    setTimeout(() => {
      setStep(0); // Reset after 3 seconds
    }, 3000);
  };

  // Content based on inbound or outbound mode
  const content = {
    inbound: {
      title: "Inbound Support",
      messages: [
        "Hi, I'm calling about my recent order #45872. It hasn't arrived yet.",
        "I understand your concern. I see your order shipped 2 days ago and is scheduled for delivery tomorrow. Would you like me to send the tracking details to your email?",
        "Yes, please. That would be helpful, thank you."
      ]
    },
    outbound: {
      title: "Outbound Sales",
      messages: [
        "Hello! Is this Sarah? I'm calling from TechSolutions about your recent website inquiry.",
        "Yes, I was looking for information about your AI integration services. Can you tell me more about pricing?",
        "Absolutely. For your business size, we offer packages starting at $199/month with a free 14-day trial. Would you like me to schedule a demo with one of our specialists?"
      ]
    }
  };

  return (
    <div className="base-container">
      {/* Voice Call Interface */}
      <div
        ref={voiceRef}
        className="w-full bg-gray-800/60 mt-1.5 p-3 md:p-6 rounded-lg border border-cyan-500/10 backdrop-blur-sm cursor-pointer z-10 relative"
      >
        <div className="h-[215px] md:h-[175px] scrollbar-hide group">
          {/* Call Status Area */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${step >= 1 && step < 5 ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
              <span className="text-sm font-medium text-gray-300">
                {step === 0 && "Call Ready"}
                {step >= 1 && step < 5 && "Call Active"}
                {step === 5 && "Call Ended"}
              </span>
            </div>
            <button
              onClick={toggleMode}
              className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
            >
              Switch to {mode === "inbound" ? "Outbound" : "Inbound"}
            </button>
          </div>

          {/* Call Content */}
          <div className="space-y-4">
            {/* Call Header */}
            {step >= 1 && (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 text-cyan-300">
                  {mode === "inbound" ? (
                    <FaHeadset className="w-5 h-5" />
                  ) : (
                    <FaPhoneVolume className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {content[mode].title}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {mode === "inbound" ? "Customer → AI Agent" : "AI Agent → Prospect"}
                </div>
              </motion.div>
            )}

            {/* First Message */}
            {step >= 2 && (
              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-400">
                    {mode === "inbound" ? "Customer" : "AI Agent"}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs gap-1">
                    <Mic className="w-3 h-3" />
                    <span>0:04</span>
                  </div>
                </div>
                <div className="text-white text-sm bg-gray-700/40 rounded-lg p-2">
                  {content[mode].messages[0]}
                </div>
              </motion.div>
            )}

            {/* Response */}
            {step >= 3 && (
              <motion.div
                className="flex flex-col items-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-400">
                    {mode === "inbound" ? "AI Agent" : "Prospect"}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs gap-1">
                    <Mic className="w-3 h-3" />
                    <span>0:12</span>
                  </div>
                </div>
                <div className="text-white text-sm bg-cyan-900/30 rounded-lg p-2">
                  {content[mode].messages[1]}
                </div>
              </motion.div>
            )}

            {/* Final Message */}
            {step >= 4 && (
              <motion.div
                className="flex flex-col items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-400">
                    {mode === "inbound" ? "Customer" : "AI Agent"}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs gap-1">
                    <Mic className="w-3 h-3" />
                    <span>0:07</span>
                  </div>
                </div>
                <div className="text-white text-sm bg-gray-700/40 rounded-lg p-2">
                  {content[mode].messages[2]}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex w-full mt-8 justify-center">
        <div className="flex gap-4 items-center">
          <button className="p-3 bg-gray-700/70 hover:bg-gray-600/70 rounded-full text-gray-300 transition-colors">
            <Mic className="size-5" />
          </button>
          <button 
            onClick={handleEndCall} 
            className={`p-4 ${step < 5 ? "bg-red-500/80 hover:bg-red-600/80" : "bg-green-500/80 hover:bg-green-600/80"} rounded-full text-white transition-colors`}
          >
            {step < 5 ? <PhoneOff className="size-6" /> : <Phone className="size-6" />}
          </button>
          <button className="p-3 bg-gray-700/70 hover:bg-gray-600/70 rounded-full text-gray-300 transition-colors">
            <FaHeadset className="size-5" />
          </button>
        </div>
      </div>

      {/* Title and Tagline */}
      <div className="mt-8 flex justify-start w-full">
        <div className="text-left">
          <h2 className="service-title">
            AI Voice Agents
          </h2>
          <p className="service-description">
            Human-like voice assistants that handle customer calls and outreach campaigns with natural conversations.
          </p>
        </div>
      </div>
    </div>
  );
}