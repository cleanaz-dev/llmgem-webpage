"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { FaGem } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  "Services",
  "Process",
  "Pricing",
  "FAQ",
  "Contact",
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Nav() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 text-white py-4 md:py-5 bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-2xl shadow-md shadow-black/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center ">
        {/* Logo */}
        <button
          className="flex items-center text-2xl font-bold gap-2 cursor-pointer group"
          onClick={() => scrollToSection("home")}
        >
          <FaGem className="fill-cyan-400 size-5 mt-0.5 shimmer group-hover:scale-125 transition-all duration-500" stroke={1} />
          <span className="text-base md:text-2xl">LLM GEM</span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-8 ">
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase();
            return (
              <li key={id}>
                <motion.button
                  onClick={() => scrollToSection(id)}
                  className="hover:text-teal-500 transition-all duration-500 cursor-pointer"
                >
                  {item}
                </motion.button>
              </li>
            );
          })}
        </ul>

        {/* Mobile Navigation Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <motion.button 
              className="sm:hidden text-teal-500 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-6 w-6 cursor-pointer" />
            </motion.button>
          </SheetTrigger>
          
          <SheetContent
            side="top"
            className="bg-[#0a0a14]/95 border-b border-cyan-500/20 backdrop-blur-2xl"
          >
            <SheetHeader className="text-center">
              <SheetTitle className="text-white font-light tracking-wider text-2xl">Menu</SheetTitle>
              <SheetDescription>{""}</SheetDescription>
            </SheetHeader>
            
            <motion.div 
              className="flex flex-col h-full pb-8"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <nav className="flex-1 space-y-4 pt-4">
                {NAV_ITEMS.map((item) => {
                  const id = item.toLowerCase();
                  return (
                    <SheetClose asChild key={id}>
                      <motion.button
                        variants={itemVariants}
                        onClick={() => scrollToSection(id)}
                        className="flex flex-col mx-auto text-center text-lg tracking-wide text-teal-500 hover:text-white hover:tracking-widest  cursor-pointer transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item}
                      </motion.button>
                    </SheetClose>
                  );
                })}
              </nav>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}