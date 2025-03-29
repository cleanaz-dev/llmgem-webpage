"use client";

import Analyze from "./Analyze"; // Import the Analyze section
import BuildAndImplement from "./BuildAndImplement";
import MaintainAndImprove from "./MaintainAndImprove";
import { motion } from "framer-motion";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};


export default function Process() {
  return (
    <div className="w-full bg-black md:py-8 lg:py-16">
      {/* Process Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        variants={letterVariants}
        className="flex flex-col max-w-[1500px] mx-auto justify-center items-center pt-12">
        <h1 className="section-header text-center w-full">The process</h1>
        <p className="section-description px-10">
        We analyze, build, and refine — transforming your business with AI solutions that drive efficiency, security, and growth.
        </p>
      </motion.div>

      {/* Analyze Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto px-4 md:px-10 lg:px-6 pt-20 max-w-[1500px]">
        <Analyze />
        <BuildAndImplement />
        <MaintainAndImprove />
      </div>
    </div>
  );
}
