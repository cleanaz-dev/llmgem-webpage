import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import QA from "@/components/QA";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto custom-scrollbar ">
      {/* <script src="//code.tidio.co/ssdacbdjryaeixylhf4zpgmcmzgghsib.js" async></script> */}
      <main>
        <Hero />
        <Services />
        <Process />
        <Pricing />
        <QA />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}