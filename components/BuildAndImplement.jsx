"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHtml5, FaCss3, FaReact } from "react-icons/fa";

export default function BuildAndImplement() {
  const [activeTab, setActiveTab] = useState("HTML");

  const codeSamples = {
    HTML: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sample Code</title>
</head>
<body>
  <h1>Hello, World!</h1>
`,
    React: `import React from "react";
import "./App.css";
function App() {
  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>LLM GEM 😎</p>
    </div>
  );
}

export default App;
`,
    CSS: `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
}
h1 {
  color: #333;
  font-size: 2rem;
}
`,
  };

  const tabs = [
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3 /> },
    { name: "React", icon: <FaReact /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.name === prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].name;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [tabs]);

  const maxLines = 7;
  const codeLines = codeSamples[activeTab]
    .split("\n")
    .concat(Array(maxLines).fill(""))
    .slice(0, maxLines);

  return (
    <div className="base-container lg:h-[470px]">
      {/* Code Editor and Tabs Container */}
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {/* Tabs Container (Always on Top) */}
        <div className="w-full flex flex-row border border-slate-900 rounded-lg overflow-hidden">
          {tabs.map((tab) => (
            <motion.button
              key={tab.name}
              className={`flex-1 py-3 text-center text-sm font-medium cursor-pointer transition-all duration-200 ${
                activeTab === tab.name
                  ? "text-cyan-300 bg-[rgba(10,10,20,0.9)]"
                  : "text-slate-500 hover:text-slate-400 bg-[rgba(10,10,20,0.8)]"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <div className="flex items-center justify-center gap-2">
                {tab.icon} {/* Render the icon */}
                {tab.name} {/* Render the tab name */}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Code Editor Container */}
        <div className="flex-1 bg-[rgba(10,10,20,0.8)] border border-slate-900 rounded-lg overflow-hidden">
          <div className="flex">
            {/* Line Numbers */}
            <div className="w-12 bg-[rgba(10,10,20,0.9)] text-slate-500 text-sm p-2 border-r border-slate-900">
              {codeLines.map((_, index) => (
                <div key={index} className="text-right pr-2">
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Code Content with Framer Motion */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-1 p-2 font-mono text-sm text-slate-300"
              >
                {codeLines.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap">
                    <span className="text-sm">{line}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="w-full max-w-4xl mt-8">
        <h1 className="text-left text-white text-4xl mb-4">
          <span className="process-number">
            02
          </span>{" "}
          <span className="tracking-tight">Build & Implement</span>
        </h1>
        <p className="process-description">
          Then, our developers will start crafting custom AI-solutions for your
          company, continuously prioritising quality and safety.
        </p>
      </div>
    </div>
  );
}