"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaGem } from "react-icons/fa";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="absolute top-0 left-0 w-full z-20 text-white py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center text-2xl font-bold gap-2">
        <FaGem className="fill-cyan-400 size-5 mt-0.5 shimmer" stroke={1} />
          LLM GEM
        </div>
        <ul className="hidden sm:flex gap-8">
          <li>
            <a href="#" className="hover:text-teal-500 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-teal-500 transition">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-teal-500 transition">
              Contact
            </a>
          </li>
        </ul>
        <button
          className="sm:hidden text-teal-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>
      {isOpen && (
        <div className="sm:hidden bg-black/90 px-4 py-6 flex flex-col gap-4">
          <a href="#" className="hover:text-teal-500 transition">
            Home
          </a>
          <a href="#" className="hover:text-teal-500 transition">
            Services
          </a>
          <a href="#" className="hover:text-teal-500 transition">
            Contact
          </a>
        </div>
      )}
    </motion.nav>
  );
}
