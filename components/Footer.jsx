"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { privacyPolicyHTML, termsOfServiceHTML } from "@/lib/constants";

export default function Footer() {
  const [openModal, setOpenModal] = useState(null); // 'privacy' or 'terms'

  return (
    <footer className="w-full p-6 bg-[rgba(10,10,20,0.95)] border-t border-[rgba(0,255,255,0.1)]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} LLM GEM. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpenModal("privacy")}
            className="text-slate-400 hover:text-cyan-300 text-sm cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => setOpenModal("terms")}
            className="text-slate-400 hover:text-cyan-300 text-sm cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </div>

      {/* Modal System */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setOpenModal(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-slate-50 rounded-lg border border-cyan-500/20 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto p-6 custom-scrollbar">
                {openModal === "privacy" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: privacyPolicyHTML }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: termsOfServiceHTML }}
                  />
                )}
              </div>
              <div className="p-4 border-t border-cyan-500/10 flex justify-end">
                <button
                  onClick={() => setOpenModal(null)}
                  className="px-4 py-2 text-cyan-300 hover:bg-cyan-500/10 rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
