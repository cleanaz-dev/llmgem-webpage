"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { tasks } from "@/lib/constants";

export default function MaintainAndImprove() {
  const [isHovered, setIsHovered] = useState(false);

  // List of tasks with status

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "text-lime-300"; // Neon green for completed tasks
      case "In Progress":
        return "text-pink-300"; // Neon pink for in-progress tasks
      case "Pending":
      default:
        return "text-cyan-300"; // Neon cyan for pending tasks
    }
  };

  return (
    <div className="base-container lg:h-[470px]">
      {/* Tasks Container */}
      <div
        className="w-full max-w-4xl border border-slate-900 rounded-lg relative group cursor-pointer "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Masking Effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[rgba(10,10,20,0.95)] to-transparent pointer-events-none rounded-lg opacity-100 z-10" />

        {/* Fixed Height Container for Tasks */}
        <div className="h-[160px] overflow-hidden ">
          <div
            className={`transition-transform duration-700 ease-in-out p-4 ${
              isHovered ? "-translate-y-[125px]" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <div
                key={index}
                className="mb-2 last:mb-0 rounded-md border border-slate-900 "
              >
                <div className="flex items-center justify-between p-4">
                  <span className="text-slate-300 text-sm md:text-base">
                    {task.name}
                  </span>
                  <span
                    className={`${getStatusColor(
                      task.status
                    )} font-light px-1 rounded-md text-xs md:text-sm whitespace-nowrap`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Update Available Section */}
        <div className="p-4 bg-[rgba(10,10,20,1)] border-t border-slate-900 relative z-20 ">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Update Available</span>
            <button className="flex items-center gap-2 text-cyan-300 hover:text-cyan-400 transition-colors duration-200">
              Update Now <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="w-full max-w-4xl mt-8">
        <h1 className="text-left text-white text-4xl mb-4">
          <span className="process-number">
            03
          </span>{" "}
          <span className="tracking-tight">Maintain</span>
        </h1>
        <p className="process-description">
          We continuously monitor and enhance your AI systems to ensure they
          remain efficient, secure, and up-to-date.
        </p>
      </div>
    </div>
  );
}
