"use client";
import { motion } from "framer-motion";
import AIConsulting from "./AIConsulting";
import ChatDevelopment from "./ChatDevelopment";
import ContentGeneration from "./ContentGeneration";
import Web3Service from "./Web3Service";
import WorkflowAutomations from "./WorkflowAutomations";


// Animation for LLM/GEM text only
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export default function Services() {
  return (
    <section className="w-full bg-black text-white">
      <div className="relative text-center">
        <div className="relative w-full h-[50vh] min-h-[500px] flex items-center justify-center overflow-visible">
          {/* Animated LLM GEM Text */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4">
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={letterVariants}
              className="service-main-text"
            >
              LLM
            </motion.span>
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={letterVariants}
              transition={{ delay: 1.2 }}
              className="service-main-text"
            >
              GEM
            </motion.span>
          </div>

          {/* Static Tagline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={letterVariants}
            transition={{ delay: 1.8 }} 
            className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-slate-500 text-xl md:text-3xl px-6 py-3 text-center max-w-2xl mx-auto">
              We develop custom AI solutions for innovative companies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Static Content Below */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        variants={letterVariants} 
        transition={{delay: 2.2}}
        className="mx-auto lg:max-w-[1500px] mb-16">
        <h1 className="section-header">Services</h1>
        <p className="section-description px-4 md:px-0">
          We specialize in building and implementing custom AI solutions
          tailored to your specific needs. Our team of experts will help you
          develop AI-powered solutions that meet your business objectives, while
          ensuring secure, efficient, and reliable systems.
        </p>
      </motion.div>
      
      <div className="space-y-8">
        <div className="mx-auto lg:max-w-[1500px] px-4 md:px-10 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChatDevelopment />
          <ContentGeneration />
        </div>

        <div className="mx-auto lg:max-w-[1500px] px-4 md:px-10 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <WorkflowAutomations />
          <AIConsulting />
          <Web3Service />
        </div>
      </div>
    </section>
  );
}