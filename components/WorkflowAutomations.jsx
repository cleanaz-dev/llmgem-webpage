"use client";

import { FaAws, FaGoogle, FaPython, FaDocker, FaGithub, FaTwitter, FaSlack, FaMailchimp, FaDiscord, FaInstagram  } from "react-icons/fa";
import { SiAirtable, SiGmail, SiNotion } from "react-icons/si";

export default function WorkflowAutomations() {
  const logos = [
    FaAws,
    FaGoogle,
    FaPython,
    FaDocker,
    FaGithub,
    FaTwitter,
    FaSlack,
    SiAirtable,
    FaMailchimp,
    FaDiscord,
    SiGmail,
    SiNotion,
    FaInstagram
  ];

  return (
    <div className="base-container">
      {/* Scrolling Container */}
      <div className="w-full h-64 relative overflow-hidden">
        {/* Top Row: Left-to-Right */}
        <div className="absolute top-0 w-full h-24 overflow-hidden mask-fade">
          <div className="flex animate-infinite-scroll-left">
            {logos.map((Icon, index) => (
              <div key={index} className="mx-8 shrink-0">
                <Icon className="brand-logo "/>
              </div>
            ))}
            {/* Duplicate icons for seamless looping */}
            {logos.map((Icon, index) => (
              <div key={`duplicate-top-${index}`} className="mx-8 shrink-0">
                <Icon className="brand-logo " />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Right-to-Left */}
        <div className="absolute bottom-0 w-full h-24 overflow-hidden mask-fade">
          <div className="flex animate-infinite-scroll-right">
            {logos.map((Icon, index) => (
              <div key={index} className="mx-8 shrink-0">
                <Icon className="brand-logo" />
              </div>
            ))}
            {/* Duplicate icons for seamless looping */}
            {logos.map((Icon, index) => (
              <div key={`duplicate-bottom-${index}`} className="mx-8 shrink-0">
                <Icon className="brand-logo" />
              </div>
            ))}
          </div>
        </div>

        {/* Centered Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gray-800 flex items-center justify-center text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10">
          <p className="flex flex-col text-center">
            <span className="text-4xl">100+</span>
            <span className="text-slate-500">Automations</span>
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="mt-auto w-full text-left">
        <h2 className="service-title">
          Workflow Automations
        </h2>
        <p className="service-description">Automate your workflows with us to cut out repetitive tasks, improve efficiency, save time, and remove errors.</p>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-infinite-scroll-left {
          animation: scroll-left 45s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-infinite-scroll-right {
          animation: scroll-right 45s linear infinite;
          display: flex;
          width: max-content;
        }

        .mask-fade {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}