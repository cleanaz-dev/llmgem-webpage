"use client";

import { FaGem } from "react-icons/fa";
import { analyzeIcons } from "@/lib/constants"; // Import the icons data

export default function Analyze() {
  return (
    <div className="base-container lg:h-[470px]">
      {/* Logos Container */}
      <div className="flex border border-slate-900 rounded-lg px-6 py-3 items-center justify-between relative w-full max-w-2xl cursor-pointer group overflow-visible">
        {/* Top Masking Effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[rgba(10,10,20,0.95)] to-transparent pointer-events-none rounded-lg opacity-100 group-hover:opacity-0 transition-opacity duration-1000 z-10" />

        {/* Bottom Masking Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[rgba(10,10,20,0.95)] to-transparent pointer-events-none rounded-lg opacity-100 group-hover:opacity-0 transition-opacity duration-1000 z-10" />

        {/* Left Side Logos */}
        <div className="flex flex-col items-end mr-8 relative">
          {analyzeIcons.slice(0, 3).map((logo) => (
            <div
              key={logo.id}
              className={`logo-glow size-14 md:size-16 flex items-center justify-center ${logo.position}`}
            >
              <span className="text-slate-600 text-2xl">{logo.icon}</span>
            </div>
          ))}
        </div>

        {/* Central Logo */}
        <div className="size-14 md:size-16 border border-slate-900 rounded-md flex items-center justify-center">
          <span className="text-white text-4xl">
            <FaGem className="fill-cyan-400 size-8 mt-0.5 shimmer" stroke={1} />
          </span>
        </div>

        {/* Right Side Logos */}
        <div className="flex flex-col items-start ml-8 relative">
          {analyzeIcons.slice(3).map((logo) => (
            <div
              key={logo.id}
              className={`logo-glow size-14 md:size-16 flex items-center justify-center ${logo.position}`}
            >
              <span className="text-slate-600 text-2xl">{logo.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Text at the Bottom */}
      <div className="mt-8 max-w-4xl w-full">
        <h1 className="text-4xl mb-4 text-white">
          <span className="process-number">01</span>{" "}
          <span className="tracking-tight">Analyze</span>
        </h1>
        <p className="process-description">
          We start by analyzing your current systems, identifying inefficiencies,
          and understanding your goals to create a tailored AI solution.
        </p>
      </div>
    </div>
  );
}