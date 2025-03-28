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
        <div className="relative w-full h-[50vh] min-h-[500px] flex items-center justify-center overflow-visible">
          {/* Split Text Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4">
            <span className="text-[40vw] md:text-[20vw] font-bold bg-gradient-to-b from-slate-700/10 via-cyan-400/10 to-slate-700/10 bg-clip-text text-transparent tracking-tight leading-[0.8]">
              LLM
            </span>
            <span className="text-[40vw] md:text-[20vw] font-bold bg-gradient-to-b from-slate-700/10 via-cyan-400/10 to-slate-700/10 bg-clip-text text-transparent tracking-tight leading-[0.8]">
              GEM
            </span>
          </div>

          {/* Tagline Text - Centered overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-slate-500 text-xl md:text-3xl px-6 py-3 text-center max-w-2xl mx-auto ">
              We develop custom AI solutions for innovative companies.
            </p>
          </div>
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
