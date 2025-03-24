"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

import { chartData } from "@/lib/constants";

// Sample data with Bitcoin-like upward trends using straight lines


export default function AIConsulting() {
  const [isChartHovered, setIsChartHovered] = useState(false);

  return (
    <div className="base-container">
      {/* Smaller Line Chart with Recharts */}
      <div
        className="w-[80%] h-[300px] mx-auto relative"
        onMouseEnter={() => setIsChartHovered(true)}
        onMouseLeave={() => setIsChartHovered(false)}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={300}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 20, left: -30, bottom: 20 }}
          >
            {/* Hide X and Y axes */}
            <XAxis
              dataKey="name"
              stroke="#0A0A14"
              tick={{ fill: "#0A0A14", fontSize: 0 }}
              axisLine={false}
            />
            <YAxis
              stroke="#0A0A14"
              tick={{ fill: "#0A0A14", fontSize: 0 }}
              axisLine={false}
              domain={[150, 400]} // Adjusted domain for better visibility
            />

            {/* Efficiency Line */}
            <Line
              type="linear"
              dataKey="efficiency"
              stroke="#00FFFF"
              strokeWidth={4} // Thicker line
              dot={false} // Hide all dots
              activeDot={false}
              style={{ filter: "drop-shadow(0 0 15px #00FFFF)" }}
            />
            {/* Reference Dot for Efficiency Line */}
            <ReferenceDot
              x={3} // Index 4 corresponds to the 5th data point
              y={chartData[3].efficiency} // Y value of the 5th data point
              r={8} // Dot size
              fill="#00FFFF"
              stroke="none"
              ifOverflow="extendDomain"
            />

            {/* Cost Reduction Line */}
            <Line
              type="linear"
              dataKey="costReduction"
              stroke="#00C4CC"
              strokeWidth={4} // Thicker line
              dot={false} // Hide all dots
              activeDot={false}
              style={{
                filter: "drop-shadow(0 0 15px #00C4CC)",
              }}
            />
            {/* Reference Dot for Cost Reduction Line */}
            <ReferenceDot
              x={5} // Index 4 corresponds to the 5th data point
              y={chartData[5].costReduction} // Y value of the 5th data point
              r={8} // Dot size
              fill="#00C4CC"
              stroke="none"
              ifOverflow="extendDomain"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Buttons positioned over the chart */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Efficiency Button */}
          <div
            className={`absolute top-4 left-4 pointer-events-auto transition-transform duration-500 ease-in-out ${
              isChartHovered ? "translate-x-24 -translate-y-1" : ""
            }`}
          >
            <button className="px-4 py-1 border-white/20 border rounded-md bg-gradient-to-r from-slate-400 to-cyan-300 bg-clip-text text-transparent shadow-[0_0_3px_#00FFFF] ">
              <span className="text-sm">Efficiency +</span>
            </button>
          </div>
          {/* Cost Reduction Button */}
          <div
            className={`absolute bottom-4 right-4 pointer-events-auto transition-transform duration-500 ease-in-out ${
              isChartHovered ? "-translate-x-24 -translate-y-6" : ""
            }`}
          >
            <button className="px-4 py-1 border-white/20 border rounded-md  bg-gradient-to-r from-slate-400 to-cyan-300 bg-clip-text text-transparent shadow-[0_0_3px_#00FFFF] ">
              <span className="text-sm">Cost Reduction +</span>
            </button>
          </div>
        </div>
      </div>

      {/* Left-aligned Title and Tagline */}
      <div className="w-full text-left mt-auto">
        {" "}
        {/* Add padding-bottom */}
        <h2 className="service-title">
          AI Consulting
        </h2>
        <p className="service-description">
          Our experts offer cutting-edge strategic guidance, helping your
          business harness AI solutions to unlock transformative growth.
        </p>
      </div>
    </div>
  );
}
