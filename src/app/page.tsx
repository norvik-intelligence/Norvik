import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import UseCases from "@/components/sections/UseCases";
import Process from "@/components/sections/Process";
import Deliverables from "@/components/sections/Deliverables";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-[#060E1D]">
      <Navbar />
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <UseCases />
      <Process />
      <Deliverables />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
