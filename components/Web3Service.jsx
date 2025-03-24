"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWallet } from "react-icons/fa";
import { CRYPTOS, WALLET_ADDRESS, RECEIVER_ADDRESS } from "@/lib/constants";

export default function Web3Service() {
  const [step, setStep] = useState(0); // 0: idle, 1: connected, 2: crypto, 3: transfer, 4: history
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [transactions, setTransactions] = useState([]);

  // Simulated Data
  const amount = "0.1";
  const simulationCryptos = CRYPTOS.filter((c) =>
    ["BTC", "ETH", "USDT"].includes(c.id)
  );

  // Helper to simulate realistic delays (with slight randomness)
  const randomDelay = (base = 1500, variance = 300) => {
    return base + Math.floor(Math.random() * variance);
  };

  // Randomly select a crypto for the transaction
  const selectRandomCrypto = () => {
    const randomCrypto =
      simulationCryptos[Math.floor(Math.random() * simulationCryptos.length)];
    setSelectedCrypto(randomCrypto.id);
  };

  // One-Click Simulation
  const handleConnectWallet = () => {
    setStep(1); // Wallet connected
    selectRandomCrypto(); // Randomly select a crypto

    setTimeout(() => {
      setStep(2); // Crypto selection step
      setTimeout(() => {
        setStep(3); // Transfer step
        setTimeout(() => {
          const crypto = CRYPTOS.find((c) => c.id === selectedCrypto);
          setTransactions([
            {
              date: new Date().toLocaleString(),
              from: WALLET_ADDRESS,
              to: RECEIVER_ADDRESS,
              amount: `${amount} ${selectedCrypto}`,
              gasFee: `${crypto?.gasFee} ${selectedCrypto}`,
              status: "Completed",
            },
          ]);
          setStep(4); // Show history/confirmation
        }, 3000);
      }, randomDelay());
    }, randomDelay());
  };

  // Reset simulation
  const resetSimulation = () => {
    setStep(0);
    setTransactions([]);
  };

  return (
    <div className="w-full h-[500px] border border-[rgba(0,255,255,0.1)]  rounded-lg bg-[rgba(10,10,20,0.9)] flex flex-col overflow-hidden px-10">
      {/* Top: Crypto Icons with Full Masking */}
      <div className="relative w-full h-12 overflow-hidden mt-6 ">
        {/* Masks (Top, Bottom, Left, Right) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,20,0.9)] via-transparent to-[rgba(10,10,20,0.9)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,20,0.9)] via-transparent to-[rgba(10,10,20,0.9)] z-10" />

        {/* Marquee with Grayscale-to-Color Effect */}
        <div className="absolute top-0 w-full h-12 overflow-hidden mask-fade bg-slate-900/10">
          <div className="flex animate-infinite-scroll-left">
            {[...CRYPTOS, ...CRYPTOS].map((crypto, index) => (
              <div key={`${crypto.id}-${index}`} className="mx-8 shrink-0">
                <crypto.icon className="text-cyan-300/20 text-5xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: Simulation */}
      <div className="w-full flex-1 px-6 py-1.5 overflow-y-auto flex flex-col items-start overflow-hidden">
        {step === 0 ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleConnectWallet}
            className="flex items-center justify-center my-auto gap-2 px-4 py-3 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors cursor-pointer mx-auto"
          >
            <FaWallet /> Connect Wallet
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full space-y-4 text-sm text-slate-500"
          >
            {/* Step 1: Connected Wallet */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 "
            >
              Wallet: <span className="text-cyan-300">{WALLET_ADDRESS}</span>
              {/* Small spinner next to wallet address */}
              {step === 1 && (
                <span className="animate-spin border-t border-cyan-300 rounded-full w-4 h-4"></span>
              )}
            </motion.div>

            {/* Step 2: Select Crypto (BTC, ETH, USDT only) */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="w-full grid grid-cols-3 gap-4"
                >
                  {simulationCryptos.map((crypto) => (
                    <div
                      key={crypto.id}
                      className={`flex justify-center p-3 rounded-lg ${
                        selectedCrypto === crypto.id
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-[rgba(20,20,40,0.9)] text-slate-300 opacity-50"
                      }`}
                    >
                      <crypto.icon className={`${crypto.color} text-4xl`} />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3 & 4: Transfer */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="w-full space-y-2"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <p>
                      From:{" "}
                      <span className="text-cyan-300">{WALLET_ADDRESS}</span>
                    </p>
                    <p>
                      To:{" "}
                      <span className="text-cyan-300">{RECEIVER_ADDRESS}</span>
                    </p>
                    <p>
                      Amount: {amount} {selectedCrypto}
                    </p>
                    <p>
                      Gas:{" "}
                      {CRYPTOS.find((c) => c.id === selectedCrypto)?.gasFee}{" "}
                      {selectedCrypto} <span className="text-xs text-slate-600 italic">simulated</span>
                    </p>
                  </div>
                  <p className="text-center text-cyan-300">
                    {step === 3 ? "Transferring..." : "Transfer Complete!"}
                  </p>
                  {/* Show confirmation checkmark when transfer is complete */}
                  {step === 4 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center mt-2"
                    >
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Bottom: Title & Tagline */}
      <div className="w-full text-left px- py-6 border-cyan-500/20">
        <h2 className="service-title">Web3 Integration</h2>
        <p className="service-description">
          Revolutionize your business with Web3 innovation, using decentralized
          networks to optimize operations and boost transparency.
        </p>
      </div>
    </div>
  );
}
