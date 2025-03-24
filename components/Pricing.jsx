"use client";

import { CircleCheck } from "lucide-react";
import { pricingTiers } from "@/lib/constants";

export default function Pricing() {

  return (
    <div className="flex flex-col items-center w-full p-4 md:p-8 bg-black">
      {/* Title */}
      <div className="w-full max-w-5xl my-10 px-4 lg:px-0">
        <h1 className="section-header">
            AI Solutions
        </h1>
        <p className="section-description">
          Explore our versatile AI products designed to improve your business
          with innovative chatbots, voice assistants, and CRM integrations. No
          matter if you're just starting with AI or looking for advanced
          solutions, we supply strategies customized to your goals and budget.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="w-full max-w-5xl md:px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className="border border-slate-900 rounded-lg p-6 bg-[rgba(10,10,20,0.8)] flex flex-col justify-between h-full hover:border-cyan-400 hover:scale-105 transition-all duration-700"
            >
              <div>
                <h2 className="text-lg font-light text-cyan-300 mb-4">
                  {tier.title}
                </h2>
                {tier.subtext && (
                  <p className="text-slate-400 mb-2">{tier.subtext}</p>
                )}
                <p className="text-4xl font-bold text-slate-300 mb-4">
                  {tier.price}
                </p>
                <p className="text-slate-400 mb-6">{tier.description}</p>
                <ul className="mb-6 space-y-2 text-slate-400">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2">
                      <CircleCheck className="text-cyan-400" strokeWidth={1} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button className="w-full py-2 bg-cyan-300 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200">
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}