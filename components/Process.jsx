"use client";

import Analyze from "./Analyze"; // Import the Analyze section
import BuildAndImplement from "./BuildAndImplement";
import MaintainAndImprove from "./MaintainAndImprove";

export default function Process() {
  return (
    <div className="w-full bg-black md:py-8 lg:py-16">
      {/* Process Title */}
      <div className="flex flex-col max-w-[1500px] mx-auto justify-center items-center pt-12">
        <h1 className="section-header text-center w-full">The process</h1>
        <p className="section-description">
        We analyze, build, and refine — transforming your business with AI solutions that drive efficiency, security, and growth.
        </p>
      </div>

      {/* Analyze Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto px-4 md:px-10 lg:px-6 pt-20 max-w-[1500px]">
        <Analyze />
        <BuildAndImplement />
        <MaintainAndImprove />
      </div>
    </div>
  );
}
