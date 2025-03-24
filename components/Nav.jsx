"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGem } from "react-icons/fa";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsOpen(false); // Close mobile menu after clicking a link
    }
  };

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "process", "pricing", "faq", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-20 text-white py-6  backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
          <FaGem className="fill-cyan-400 size-5 mt-0.5 shimmer" stroke={1} />
          LLM GEM
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-8">
          {["Home", "Services", "Process", "Pricing", "FAQ", "Contact"].map((item) => (
            <li key={item.toLowerCase()}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
                className={`hover:text-teal-500 transition ${
                  activeSection === item.toLowerCase() ? "text-teal-500" : ""
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-teal-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden bg-black/90 px-4 py-6 flex flex-col gap-4"
          >
            {["Home", "Services", "Process", "Pricing", "FAQ", "Contact"].map((item) => (
              <a
                key={item.toLowerCase()}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                }}
                className={`hover:text-teal-500 transition ${
                  activeSection === item.toLowerCase() ? "text-teal-500" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}