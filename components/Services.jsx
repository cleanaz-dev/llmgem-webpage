"use client";

import AIConsulting from "./AIConsulting";
import ChatDevelopment from "./ChatDevelopment";
import ContentGeneration from "./ContentGeneration";
import LocalLLM from "./LocalLLM";
import Web3Service from "./Web3Service";
import WorkflowAutomations from "./WorkflowAutomations";

export default function Services() {
  return (
    <section className="w-full bg-black text-white">
      <div className="relative text-center">
        {/* Foreground Content */}
        <div className="relative z-10 py-24">
          {/* LLM GEM Text (Foreground) */}
          <h1 className="text-[75px] md:text-[200px] lg:text-[300px] bg-gradient-to-b from-slate-700/10 via-cyan-400/10 to-slate-700/10 bg-clip-text text-transparent tracking-wide scale-y-[1.3] md:scale-y-[1.1] transform whitespace-nowrap overflow-hidden">
            LLM GEM
          </h1>

          {/* Tagline Text (Centered over LLM GEM Text) */}
          <p
            className="text-slate-500 text-xl md:text-3xl w-full"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            We develop custom AI solutions for innovative companies.
          </p>
        </div>
      </div>

      <div className="mx-auto lg:max-w-[1500px] mb-16">
        <h1 className="section-header">Services</h1>
        <p className="section-description px-4 md:px-0">
          We specialize in building and implementing custom AI solutions
          tailored to your specific needs. Our team of experts will help you
          develop AI-powered solutions that meet your business objectives, while
          ensuring secure, efficient, and reliable systems.
        </p>
      </div>
      <div className="space-y-8">
        <div className="mx-auto lg:max-w-[1500px] px-4 md:px-10 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChatDevelopment />
          <ContentGeneration />
        </div>

        <div className="mx-auto lg:max-w-[1500px] px-4 md:px-10 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <WorkflowAutomations />
          <AIConsulting />
          <Web3Service />
        </div>
      </div>
    </section>
  );
}
