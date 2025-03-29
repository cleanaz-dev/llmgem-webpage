"use client";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import QA from "@/components/QA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Hero animation only
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.3,
    },
  },
};

export default function Home() {
  return (
    <div className="h-screen overflow-hidden overflow-y-auto custom-scrollbar">
      <main>
        <motion.div id="home" initial="hidden" animate="visible" variants={heroVariants}>
          <Hero />
        </motion.div>

        <div id="services">
          <Services />
        </div>

        <div id="process">
          <Process />
        </div>

        <div id="pricing">
          <Pricing />
        </div>

        <div id="faq" className="scroll-mt-10">
          <QA />
        </div>

        <div id="contact">
          <Contact />
        </div>

        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}