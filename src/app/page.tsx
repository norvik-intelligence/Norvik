import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Positioning from "@/components/sections/Positioning";
import Process from "@/components/sections/Process";
import Deliverables from "@/components/sections/Deliverables";
import SampleOutput from "@/components/sections/SampleOutput";
import UseCases from "@/components/sections/UseCases";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Positioning />
      <Process />
      <Deliverables />
      <SampleOutput />
      <UseCases />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
