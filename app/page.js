"use client";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import QA from "@/components/QA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Animation variants
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

const servicesVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const processVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const pricingVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const contactVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
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

        <motion.div
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          variants={servicesVariants}
        >
          <Services />
        </motion.div>

        <motion.div
          id="process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          variants={processVariants}
        >
          <Process />
        </motion.div>

        <motion.div
          id="pricing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          variants={pricingVariants}
        >
          <Pricing />
        </motion.div>

        <motion.div
          id="faq"
          className="scroll-mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          variants={pricingVariants}
        >
          <QA />
        </motion.div>

        <motion.div
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -300px 0px" }}
          variants={contactVariants}
        >
          <Contact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Footer />
        </motion.div>
      </main>
    </div>
  );
}