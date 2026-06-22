import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ClientMarquee from "@/components/sections/ClientMarquee";
import About from "@/components/sections/About";
import Foundation from "@/components/sections/Foundation";
import Services from "@/components/sections/Services";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientMarquee />
        <About />
        <Foundation />
        <Services />
        <Results />
        <CaseStudies />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
